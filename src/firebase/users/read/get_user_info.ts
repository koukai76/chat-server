import admin from '../..';
import { Constant } from '../../../constant';
import { T_Users } from '../type';

// ユーザ情報
export const get_user_info = async (uid: string) => {
  const ret = await admin
    .database()
    .ref(Constant.firebase_databases.users)
    .child(uid)
    .once('value');

  const value: T_Users['key'] = ret.val();

  if (value == null) {
    return null;
  }

  return value;
};
