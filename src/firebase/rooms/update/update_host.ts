import admin from '../..';
import { Constant } from '../../../constant';
import { T_Rooms } from '../type';
import { create_system_message } from '../../talks/create/create_system_message';

export const update_host = async (
  hostid: string,
  rid: string,
  transfer: string
) => {
  if (hostid === transfer) {
    return;
  }

  const upvotesRef = admin
    .database()
    .ref(Constant.firebase_databases.rooms + '/' + rid);
  await upvotesRef.transaction((value: T_Rooms) => {
    if (value == null) {
      return value;
    }

    if (hostid === transfer) {
      return value;
    }

    // ホストでないなら
    if (hostid !== value['info']['hostid']) {
      return value;
    }

    // メンバでないなら
    if (value['member'][transfer] == null) {
      return value;
    }

    value['info']['hostid'] = transfer;

    create_system_message(
      rid,
      `--${value['member'][transfer]?.uname}さんに権限を移譲しました`
    );

    return value;
  });
};
