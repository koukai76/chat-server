import { create_talks } from '../../../firebase/talks/create';
import admin from '../../../firebase';
import { Constant } from '../../../constant';

describe('create_talks', () => {
  afterEach(async done => {
    await admin.database().ref(Constant.firebase_databases.talks).remove();
    done();
  });

  test('src/firebase/talks/create/index.ts', async () => {
    const ret = await create_talks({
      rid: 'rid1',
      uid: 'uid1',
      icon: 0,
      uname: 'uname1',
      message: 'こんにちは',
      kind: 0,
      createdAt: new Date().getTime(),
    });

    expect(ret.key != null).toEqual(true);
  });
});
