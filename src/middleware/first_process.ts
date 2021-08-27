import { T_Users } from '../firebase/users/type';
import { Constant } from '../constant';

import { get_uid } from '../firebase';
import { get_user_info } from '../firebase/users/read/get_user_info';
import { check_user } from '../firebase/rooms/read/check_user';

export class FirstProcess {
  private _uid: string = '';
  private _user_info: T_Users['key'] = {} as T_Users['key'];
  private _place: string = '';
  private _token: string = '';

  constructor(token: string) {
    this._token = token;
  }

  async method() {
    this._uid = await get_uid(this._token);
    this._user_info = (await get_user_info(this._uid)) as T_Users['key'];

    if (this._user_info == null) {
      this._place = Constant.place.root;
      return;
    }

    if (this._user_info.rid == null) {
      this._place = Constant.place.lounge;
      return;
    }

    const check = await check_user({
      uid: this._uid,
      rid: this._user_info.rid,
    });

    if (check == null) {
      this._place = Constant.place.lounge;
      return;
    }

    this._place = Constant.place.room;
  }

  get uid() {
    return this._uid;
  }

  get user_info() {
    return this._user_info;
  }

  get place() {
    return this._place;
  }
}
