import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { Request, Response } from 'express';

import UserModel from '@models/User';

const User = UserModel;

const generateToken = (params = {}) => {
  const secret = process.env.MD5_AUTH? process.env.MD5_AUTH : 'someKey';
  return sign(params, secret, {
    expiresIn: 86400, // 86400s === 1 day
  });
};

export async function register(req: Request, res: Response) {
  const { email } = req.body;

  try {
    if (await User.findOne({ email })) {
      return res.status(400).send({ error: 'Email already exists' });
    }

    const dbUser = await User.create(req.body);

    const token = generateToken({ id: dbUser.id });
    const user = {
      _id: dbUser.id,
      name: dbUser.name,
      email: dbUser.email,
    };

    return res.send({ user, token });
  }
  catch (error) {
    return res.status(400).send({ error: 'Sign-up error' });
  }
}

export async function authenticate(req: Request, res: Response) {
  const { email, password } = req.body;
  const dbUser = await User.findOne({ email }).select('+password');

  if (!dbUser) {
    return res.status(400).send({ error: 'User not found' });
  }
  if (!await compare(password, dbUser.password)) {
    return res.status(400).send({ error: 'Invalid password' });
  }

  const token = generateToken({ id: dbUser.id });
  const user = {
    _id: dbUser.id,
    name: dbUser.name,
    email: dbUser.email,
  };

  return res.send({ user, token });
}
