import admin from '../..';
import { Constant } from '../../../constant';

// トーク作成
export const create_talks = async (params: {
  rid: string;
  uid: string;
  icon: number;
  uname: string;
  message: string;
  kind: number;
  createdAt: number;
}) => {
  return await admin
    .database()
    .ref(Constant.firebase_databases.talks)
    .child(params.rid)
    .push({
      uid: params.uid,
      icon: params.icon,
      uname: params.uname,
      message: params.message,
      kind: params.kind,
      createdAt: params.createdAt,
    });
};
