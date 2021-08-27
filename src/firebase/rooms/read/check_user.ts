import admin from '../..';
import { Constant } from '../../../constant';
import { T_Rooms } from '../type';

export const check_user = async (params: { uid: string; rid: string }) => {
  const ret = await admin
    .database()
    .ref(Constant.firebase_databases.rooms)
    .child(params.rid)
    .child('member')
    .child(params.uid)
    .once('value');

  const value: T_Rooms['member']['key'] = ret.val();

  if (value == null) {
    return null;
  }

  return value;
};
