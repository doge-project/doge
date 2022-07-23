import { verify } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

export default (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader)
    return res.status(401).send({error: 'No auth token.'});

  const parts = authHeader.split(' ');
  if (parts.length !== 2)
    return res.status(401).send({error: 'Token error.'});

  const [ scheme, token ] = parts;
  if (!/^Bearer$/i.test(scheme))
    return res.status(401).send({error: 'Token malformatted.'});

  if (!process.env.MD5_AUTH) {
    return res.status(401).send({error: 'Error'});
  }

  verify(token, process.env.MD5_AUTH, (err, decoded) => {
    if (err || !decoded) {
      return res.status(401).send({error: 'Invalid token.'});
    }

    return next();
  });
};
