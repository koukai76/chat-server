import validator from 'validator';

import { FirstProcess } from '../middleware/first_process';
import { Constant } from '../constant';
import { update_rname as update } from '../firebase/rooms/update/update_rname';

export const update_rname = async (params: {
  __ow_headers: { authorization: string };
  rname: string;
}) => {
  // バリデーション
  if (params.rname == null) {
    throw new Error();
  }

  if (!validator.isLength(params.rname, { min: 1, max: 15 })) {
    throw new Error();
  }

  const instance = new FirstProcess(params.__ow_headers.authorization);
  await instance.method();

  if (instance.place !== Constant.place.room) {
    throw new Error();
  }

  await update(instance.uid, instance.user_info.rid, params.rname);

  return {
    statusCode: 200,
    body: JSON.stringify({
      place: Constant.place.room,
    }),
  };
};
