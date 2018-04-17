import passport from 'passport';
import { getUsersById, getUserByUserName, comparePassword } from '../controllers/users_controller';
import secret from './config';

const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');

// JSON WEB TOKENS STRATEGY
const option = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: secret
}
passport.use(new JwtStrategy(option, (payload, done) =>
  (
    getUsersById(payload.sub).then(user => {
      if (!user) {
        return done(null, false);
      }
      return done(null, user);
    }).catch(error => done(error, false))
  )));

// LOCAL STRATEGY
const userVerification = {
  password: 'salt_password',
  username: 'username'
}
passport.use(new LocalStrategy(userVerification, (username, password, done) =>
  (
    getUserByUserName({ username }).then(user => {
      if (!user) {
        return done(null, false);
      }
      return comparePassword(password).the(isMatch => {
        if (!isMatch) {
          return done(null, false);
        }
        return done(null, user);
      }).catch(error => done(error, false));
    })
  )));
