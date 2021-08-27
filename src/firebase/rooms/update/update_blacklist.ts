import admin from '../..';
import { Constant } from '../../../constant';
import { create_system_message } from '../../talks/create/create_system_message';
import { T_Rooms } from '../type';

export const update_blacklist = async (
  hostid: string,
  rid: string,
  bid: string
) => {
  if (hostid === bid) {
    return;
  }

  const upvotesRef = admin
    .database()
    .ref(Constant.firebase_databases.rooms + '/' + rid);

  await upvotesRef.transaction((value: T_Rooms) => {
    if (value == null) {
      return value;
    }

    // ホストでないなら
    if (hostid !== value['info']['hostid']) {
      return value;
    }

    // メンバでないなら
    if (value['member'][bid] == null) {
      return value;
    }

    // ブラックリスト入り
    if (value.blacklist != null) {
      value['blacklist'][bid] = {
        createdAt: new Date().getTime(),
      };
    } else {
      value['blacklist'] = {
        [bid]: {
          createdAt: new Date().getTime(),
        },
      };
    }

    create_system_message(
      rid,
      `--${value['member'][bid]?.uname}さんが追放されました`
    );

    // 退室させる
    let tmp = value as any;
    tmp['member'][bid] = null;

    return tmp;
  });
};
