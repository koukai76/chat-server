import admin from '../..';
import { Constant } from '../../../constant';

// 部屋削除
export const delete_rooms = async (params: { rid: string }) => {
  return await admin
    .database()
    .ref(Constant.firebase_databases.rooms)
    .child(params.rid)
    .remove();
};
