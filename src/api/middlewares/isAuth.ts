import jwt from 'express-jwt';
import config from '../../config';

const getTokenFromHeader = (req) => {
  return req.headers?.authorization ? req.headers.authorization.split(' ')[1] : null;
};

const isAuth = jwt({
  secret: config.jwtSecret,
  userProperty: 'token',
  getToken: getTokenFromHeader,
});

export default isAuth;
