import { FirstProcess } from '../middleware/first_process';

import { Constant } from '../constant';
import { exit_room as exit } from '../firebase/rooms/update/exit_rooms';

export const exit_room = async (params: {
  __ow_headers: { authorization: string };
}) => {
  const instance = new FirstProcess(params.__ow_headers.authorization);
  await instance.method();

  if (instance.place !== Constant.place.room) {
    throw new Error();
  }

  // 退室
  await exit(instance.uid, instance.user_info.rid);

  return {
    statusCode: 200,
    body: JSON.stringify({
      place: Constant.place.lounge,
    }),
  };
};
