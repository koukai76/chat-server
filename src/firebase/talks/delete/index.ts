import admin from '../..';
import { Constant } from '../../../constant';

export const delete_talks_room = async (rid: string) => {
  admin.database().ref(Constant.firebase_databases.talks).child(rid).remove();
};
