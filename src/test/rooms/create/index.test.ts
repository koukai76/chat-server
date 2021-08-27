import { create_rooms } from '../../../firebase/rooms/create';
import admin from '../../../firebase';
import { Constant } from '../../../constant';

describe('create_rooms', () => {
  afterEach(async done => {
    await admin.database().ref(Constant.firebase_databases.rooms).remove();
    done();
  });

  test('src/firebase/rooms/create/index.ts', async () => {
    await create_rooms({
      user: {
        uid: 'uid1',
        uname: 'uname1',
        icon: 0,
      },
      room: {
        rname: 'rname1',
        rid: 'rid1',
        limit: 5,
      },
    });

    expect(true).toEqual(true);
  });
});
