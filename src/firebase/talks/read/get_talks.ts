import admin from '../..';
import { Constant } from '../../../constant';
import { T_Talks } from '../type';

export const get_talks = async (params: { uid: string; rid: string }) => {
  const talks = await admin
    .database()
    .ref(Constant.firebase_databases.talks)
    .child(params.rid)
    .orderByChild('createdAt')
    .limitToLast(30)
    .once('value');

  const value: T_Talks['key'] = talks.val();

  return value;
};
