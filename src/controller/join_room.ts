import { FirstProcess } from '../middleware/first_process';
import { Constant } from '../constant';
import { join_room as join } from '../firebase/rooms/update/join_rooms';
import { update_user } from '../firebase/users/update';

export const join_room = async (params: {
  __ow_headers: { authorization: string };
  rid: string;
}) => {
  // バリデーション
  if (params.rid == null) {
    throw new Error();
  }

  const instance = new FirstProcess(params.__ow_headers.authorization);
  await instance.method();

  if (instance.place !== Constant.place.lounge) {
    throw new Error();
  }

  await join({
    user: {
      uid: instance.uid,
      uname: instance.user_info.uname,
      icon: instance.user_info.icon,
    },
    room: { rid: params.rid },
  });

  // ユーザ更新
  await update_user({
    uid: instance.uid,
    ...instance.user_info,
    rid: params.rid,
  });

  return {
    statusCode: 200,
    body: JSON.stringify({
      place: Constant.place.room,
      rid: params.rid,
    }),
  };
};
