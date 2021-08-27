import admin from '../..';
import { Constant } from '../../../constant';

export const update_user = async (params: {
  uid: string;
  icon: number;
  uname: string;
  rid: string;
  createdAt: number;
}) => {
  return await admin
    .database()
    .ref(Constant.firebase_databases.users)
    .child(params.uid)
    .update(params);
};
