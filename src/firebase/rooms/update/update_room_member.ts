import admin from '../..';
import { Constant } from '../../../constant';

export const update_room_member = async (params: {
  rid: string;
  uid: string;
}) => {
  return await admin
    .database()
    .ref(Constant.firebase_databases.rooms)
    .child(params.rid)
    .child('member')
    .child(params.uid)
    .update({
      updatedAt: new Date().getTime(),
    });
};
