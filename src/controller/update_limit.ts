import validator from 'validator';

import { FirstProcess } from '../middleware/first_process';
import { Constant } from '../constant';
import { update_limit as update } from '../firebase/rooms/update/update_limit';

export const update_limit = async (params: {
  __ow_headers: { authorization: string };
  limit: number;
}) => {
  // バリデーション
  if (params.limit == null) {
    throw new Error();
  }

  if (!validator.isInt(String(params.limit), { min: 2, max: 15 })) {
    throw new Error();
  }

  const instance = new FirstProcess(params.__ow_headers.authorization);
  await instance.method();

  if (instance.place !== Constant.place.room) {
    throw new Error();
  }

  await update(instance.uid, instance.user_info.rid, params.limit);

  return {
    statusCode: 200,
    body: JSON.stringify({
      place: Constant.place.room,
    }),
  };
};
