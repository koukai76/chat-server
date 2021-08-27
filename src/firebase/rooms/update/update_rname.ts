import admin from '../..';
import { Constant } from '../../../constant';
import { T_Rooms } from '../type';

export const update_rname = async (uid: string, rid: string, rname: string) => {
  const upvotesRef = admin
    .database()
    .ref(Constant.firebase_databases.rooms + '/' + rid);
  await upvotesRef.transaction((value: T_Rooms) => {
    if (value == null) {
      return value;
    }

    // ホストでないなら
    if (uid !== value['info']['hostid']) {
      return value;
    }

    value['info']['rname'] = rname;
    return value;
  });
};
