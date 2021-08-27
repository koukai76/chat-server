import validator from 'validator';

import { FirstProcess } from '../middleware/first_process';
import { Constant } from '../constant';
import { create_rooms } from '../firebase/rooms/create';
import { create_talks } from '../firebase/talks/create';
import { update_user } from '../firebase/users/update';

export const create_room = async (params: {
  __ow_headers: { authorization: string };
  rname: string;
  limit: number;
}) => {
  // バリデーション
  if (params.rname == null || params.limit == null) {
    throw new Error();
  }

  if (!validator.isLength(params.rname, { min: 1, max: 15 })) {
    throw new Error();
  }

  if (!validator.isInt(String(params.limit), { min: 2, max: 15 })) {
    throw new Error();
  }

  const instance = new FirstProcess(params.__ow_headers.authorization);
  await instance.method();

  if (instance.place !== Constant.place.lounge) {
    throw new Error();
  }

  const rid = String(
    [...Array(15)]
      .map(
        () =>
          'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'[
            Math.floor(Math.random() * 62)
          ]
      )
      .join('') + new Date().getTime()
  );

  // 部屋作成
  await create_rooms({
    user: {
      uid: instance.uid,
      uname: instance.user_info.uname,
      icon: instance.user_info.icon,
    },
    room: {
      rname: params.rname,
      limit: params.limit,
      rid: rid,
    },
  });

  // ユーザ更新
  await update_user({
    uid: instance.uid,
    ...instance.user_info,
    rid: rid,
  });

  // システムメッセージ作成
  await create_talks({
    rid: rid,
    uid: 'system',
    uname: 'system',
    icon: 0,
    kind: 2,
    createdAt: new Date().getTime(),
    message: `--${instance.user_info.uname}さんが入室しました`,
  });

  return {
    statusCode: 200,
    body: JSON.stringify({
      place: Constant.place.room,
    }),
  };
};
