import { FirstProcess } from '../middleware/first_process';
import { Constant } from '../constant';
import { update_blacklist as update } from '../firebase/rooms/update/update_blacklist';

export const update_blacklist = async (params: {
  __ow_headers: { authorization: string };
  uid: string;
}) => {
  // バリデーション
  if (params.uid == null) {
    throw new Error();
  }

  const instance = new FirstProcess(params.__ow_headers.authorization);
  await instance.method();

  if (instance.place !== Constant.place.room) {
    throw new Error();
  }

  await update(instance.uid, instance.user_info.rid, params.uid);

  return {
    statusCode: 200,
    body: JSON.stringify({
      place: Constant.place.room,
    }),
  };
};
