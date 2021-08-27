import validator from 'validator';

import { FirstProcess } from '../middleware/first_process';
import { Constant } from '../constant';
import { create_talks } from '../firebase/talks/create';
import { gimmick } from '../util/gimmick';
import { update_room_member } from '../firebase/rooms/update/update_room_member';

export const create_talk = async (params: {
  __ow_headers: { authorization: string };
  message: string;
}) => {
  // バリデーション
  if (params.message == null) {
    throw new Error();
  }

  if (!validator.isLength(params.message, { min: 1, max: 150 })) {
    throw new Error();
  }

  if (params.message === '\n') {
    throw new Error();
  }

  const instance = new FirstProcess(params.__ow_headers.authorization);
  await instance.method();

  if (instance.place !== Constant.place.room) {
    throw new Error();
  }

  // ギミック
  const ret = gimmick(params.message);
  if (ret != null) {
    // システムメッセージ作成
    await create_talks({
      rid: instance.user_info.rid,
      uid: 'system',
      uname: 'system',
      icon: 0,
      kind: 2,
      createdAt: new Date().getTime() + 1500,
      message: ret,
    });
  }

  // メンバー更新
  await update_room_member({
    rid: instance.user_info.rid,
    uid: instance.uid,
  });

  return {
    statusCode: 200,
    body: '',
  };
};
