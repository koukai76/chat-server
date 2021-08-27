import * as Express from 'express';
import * as Cors from 'cors';

import { create_room } from '../controller/create_room';
import { join_room } from '../controller/join_room';
import { exit_room } from '../controller/exit_room';

import { update_host } from '../controller/update_host';
import { update_limit } from '../controller/update_limit';
import { update_rname } from '../controller/update_rname';
import { update_blacklist } from '../controller/update_blacklist';

import { create_talk } from '../controller/create_talk';

const app = Express();

// postリクエスト使えるようにする
app.use(Express.json({ limit: '10mb' }));
app.use(Express.urlencoded({ extended: true, limit: '10mb' }));

app.use(Cors());

app.post('/create_room', async (req, res) => {
  try {
    if (req.headers.authorization == null) {
      throw new Error('');
    }

    const ret = await create_room({
      __ow_headers: { authorization: req.headers.authorization },
      rname: req.body['rname'],
      limit: req.body['limit'],
    });
    res.send(JSON.parse(ret.body));
  } catch (error) {
    res.sendStatus(500);
  }
});

app.post('/join_room', async (req, res) => {
  try {
    if (req.headers.authorization == null) {
      throw new Error('');
    }

    const ret = await join_room({
      __ow_headers: { authorization: req.headers.authorization },
      rid: req.body['rid'],
    });
    res.send(JSON.parse(ret.body));
  } catch (error) {
    res.sendStatus(500);
  }
});

app.get('/exit_room', async (req, res) => {
  try {
    if (req.headers.authorization == null) {
      throw new Error('');
    }

    const ret = await exit_room({
      __ow_headers: { authorization: req.headers.authorization },
    });
    res.send(JSON.parse(ret.body));
  } catch (error) {
    res.sendStatus(500);
  }
});

app.post('/create_talk', async (req, res) => {
  try {
    if (req.headers.authorization == null) {
      throw new Error('');
    }

    await create_talk({
      __ow_headers: { authorization: req.headers.authorization },
      message: req.body['message'],
    });
    res.send({});
  } catch (error) {
    res.sendStatus(500);
  }
});

app.post('/update_host', async (req, res) => {
  try {
    if (req.headers.authorization == null) {
      throw new Error('');
    }

    const ret = await update_host({
      __ow_headers: { authorization: req.headers.authorization },
      transfer: req.body['transfer'],
    });
    res.send(JSON.parse(ret.body));
  } catch (error) {
    res.sendStatus(500);
  }
});

app.post('/update_rname', async (req, res) => {
  try {
    if (req.headers.authorization == null) {
      throw new Error('');
    }

    const ret = await update_rname({
      __ow_headers: { authorization: req.headers.authorization },
      rname: req.body['rname'],
    });
    res.send(JSON.parse(ret.body));
  } catch (error) {
    res.sendStatus(500);
  }
});

app.post('/update_limit', async (req, res) => {
  try {
    if (req.headers.authorization == null) {
      throw new Error('');
    }

    const ret = await update_limit({
      __ow_headers: { authorization: req.headers.authorization },
      limit: req.body['limit'],
    });
    res.send(JSON.parse(ret.body));
  } catch (error) {
    res.sendStatus(500);
  }
});

app.post('/update_blacklist', async (req, res) => {
  try {
    if (req.headers.authorization == null) {
      throw new Error('');
    }

    const ret = await update_blacklist({
      __ow_headers: { authorization: req.headers.authorization },
      uid: req.body['uid'],
    });
    res.send(JSON.parse(ret.body));
  } catch (error) {
    res.sendStatus(500);
  }
});

app.listen(process.env.PORT || 8080);

console.log('start');
