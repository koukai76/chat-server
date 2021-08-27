import admin from '../..';
import { Constant } from '../../../constant';
import { T_Rooms } from '../type';
import { create_system_message } from '../../talks/create/create_system_message';

export const join_room = async (params: {
  user: {
    uid: string;
    uname: string;
    icon: number;
  };
  room: {
    rid: string;
  };
}) => {
  const upvotesRef = admin
    .database()
    .ref(Constant.firebase_databases.rooms + '/' + params.room.rid);

  return await upvotesRef.transaction((value: T_Rooms) => {
    if (value == null) {
      return value;
    }

    // メンバなら
    if (value['member'][params.user.uid] != null) {
      return value;
    }

    // ブラックリストか
    if (value['blacklist'] != null) {
      if (
        Object.keys(value['blacklist']).find(m => m === params.user.uid) != null
      ) {
        return value;
      }
    }

    if (value['info']['limit'] > Object.keys(value['member']).length) {
      // 同じアイコン 名前なら
      const keys = Object.keys(value['member']);
      for (let key of keys) {
        if (
          value.member[key].icon === params.user.icon &&
          value.member[key].uname === params.user.uname
        ) {
          return value;
        }
      }

      value['member'][params.user.uid] = {
        uname: params.user.uname,
        icon: params.user.icon,
        updatedAt: new Date().getTime(),
      };

      create_system_message(
        params.room.rid,
        `--${params.user.uname}さんが入室しました`
      );

      return value;
    }

    return value;
  });
};
