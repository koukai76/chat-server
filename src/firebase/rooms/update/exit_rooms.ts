import admin from '../..';
import { Constant } from '../../../constant';
import { T_Rooms } from '../type';
import { create_system_message } from '../../talks/create/create_system_message';
import { delete_talks_room } from '../../talks/delete';

export const exit_room = async (uid: string, rid: string) => {
  const upvotesRef = admin
    .database()
    .ref(Constant.firebase_databases.rooms + '/' + rid);

  await upvotesRef.transaction((value: T_Rooms) => {
    if (value == null) {
      return value;
    }

    // メンバでないなら
    if (value['member'][uid] == null) {
      return value;
    }

    // 一人なら部屋つぶす
    if (Object.keys(value['member']).length === 1) {
      // トーク削除
      delete_talks_room(rid);
      return null;
    }

    // hostでないなら退室
    if (value['info']['hostid'] !== uid) {
      create_system_message(
        rid,
        `--${value['member'][uid]?.uname}さんが退室しました`
      );

      let tmp = value as any;
      tmp['member'][uid] = null;

      return tmp;
    }

    // 権限移譲して退室
    const transfer = Object.keys(value['member']).find(
      m => m !== uid
    ) as string;

    const _uname = value['member'][uid]?.uname;

    value['info']['hostid'] = transfer;

    create_system_message(
      rid,
      `--${value['member'][transfer]?.uname}さんに権限を移譲しました`
    );

    let tmp = value as any;
    tmp['member'][uid] = null;

    create_system_message(rid, `--${_uname}さんが退室しました`);

    return tmp;
  });
};
