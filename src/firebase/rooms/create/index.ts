import admin from '../..';
import { Constant } from '../../../constant';
import { T_Rooms } from '../type';

// 部屋作成
export const create_rooms = async (params: {
  user: {
    uid: string;
    uname: string;
    icon: number;
  };
  room: {
    rname: string;
    rid: string;
    limit: number;
  };
}) => {
  const upvotesRef = admin
    .database()
    .ref(Constant.firebase_databases.rooms + '/' + params.room.rid);

  return await upvotesRef.transaction((value: T_Rooms) => {
    if (value !== null) {
      return value;
    }

    return {
      info: {
        rid: params.room.rid,
        limit: params.room.limit,
        rname: params.room.rname,
        hostid: params.user.uid,
        createdAt: admin.database.ServerValue.TIMESTAMP,
      },
      member: {
        [params.user.uid]: {
          uname: params.user.uname,
          icon: params.user.icon,
          updatedAt: admin.database.ServerValue.TIMESTAMP,
        },
      },
    };
  });
};
