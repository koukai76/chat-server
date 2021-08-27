import * as Express from 'express';
import * as nodeCron from 'node-cron';

import { get_rooms } from '../firebase/rooms/read/get_rooms';
import { exit_room } from '../firebase/rooms/update/exit_rooms';

import { T_Rooms } from '../firebase/rooms/type';

import admin from '../firebase';

const orderBy = require('lodash.orderby');

require('dotenv').config();

export const cron = async () => {
  try {
    // 全ルーム
    const rooms: T_Rooms[] = orderBy(
      await get_rooms(),
      (item: T_Rooms) => item.info.createdAt,
      ['desc']
    ) as T_Rooms[];

    for (let room of rooms) {
      const uids = Object.keys(room.member);

      for (let uid of uids) {
        // 管理人のIDなら
        if (uid === process.env.OWNER_UID) {
          continue;
        }

        // 強制退室
        if (
          new Date(admin.database.ServerValue.TIMESTAMP as number).getTime() -
            room.member[uid].updatedAt >
          600000
        ) {
          await exit_room(uid, room.info.rid);
        }
      }
    }

    return {};
  } catch (error) {
    return {};
  }
};

const app = Express();
app.listen(process.env.PORT || 8081);

nodeCron.schedule('*/5 * * * *', () => {
  cron();
});
