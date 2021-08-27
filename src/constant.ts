export class Constant {
  constructor() {
    throw new Error('');
  }

  static get firebase_databases() {
    return {
      rooms: 'rooms',
      users: 'users',
      talks: 'talks',
    };
  }

  static get place() {
    return {
      root: 'root',
      lounge: 'lounge',
      room: 'room',
    };
  }
}
