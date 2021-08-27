import admin from '../..';
import { Constant } from '../../../constant';

export const create_system_message = async (rid: string, message: string) => {
  admin.database().ref(Constant.firebase_databases.talks).child(rid).push({
    uid: 'system',
    icon: 0,
    uname: 'system',
    message: message,
    kind: 2,
    createdAt: new Date().getTime(),
  });
};
