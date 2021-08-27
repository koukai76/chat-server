import { FirstProcess } from '../middleware/first_process';
import { Constant } from '../constant';
import { update_host as update } from '../firebase/rooms/update/update_host';

export const update_host = async (params: {
  __ow_headers: { authorization: string };
  transfer: string;
}) => {
  // バリデーション
  if (params.transfer == null) {
    throw new Error();
  }

  const instance = new FirstProcess(params.__ow_headers.authorization);
  await instance.method();

  if (instance.place !== Constant.place.room) {
    throw new Error();
  }

  await update(instance.uid, instance.user_info.rid, params.transfer);

  return {
    statusCode: 200,
    body: JSON.stringify({
      place: Constant.place.room,
    }),
  };
};
