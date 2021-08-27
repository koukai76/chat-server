import admin from '../..';
import { Constant } from '../../../constant';
import { T_Rooms } from '../type';

export const get_rooms = async (
  rid?: string
): Promise<{ [key: string]: T_Rooms } | any[]> => {
  const result =
    rid === undefined
      ? await admin
          .database()
          .ref(Constant.firebase_databases.rooms)
          .once('value')
      : await admin
          .database()
          .ref(Constant.firebase_databases.rooms)
          .child(rid)
          .once('value');

  const value: { [key: string]: T_Rooms } = result.val();

  if (value == null) {
    return [];
  }

  return value;
};
