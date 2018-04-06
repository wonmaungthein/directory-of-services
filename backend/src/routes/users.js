import bcrypt from 'bcrypt';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import secret from '../authentication/config'
import '../authentication/passport';
import {
  getAllUsers,
  getUsersById,
  addUser,
  updateUser,
  deleteUser,
  getUserByUserName,
  comparePassword
} from '../controllers/users_controller';

module.exports = router => {

  router.get('/users', (req, res, next) =>
    getAllUsers().then(users => {
      if (users) {
        res.json(users)
      }
      return next()
    }));

  router.get('/users/:id', (req, res, next) =>
    getUsersById(req.params.id).then(user => {
      if (user) {
        res.json(user)
      }
      return next()
    }));

  router.delete('/users/:userId', (req, res) =>
    deleteUser(req.params.userId).then(() => res.json({ message: 'user deleted successfully' })));

  router.post('/users', (req, res) => {
    let pass = req.body.salt_password;
    const { username } = req.body;
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(pass, salt, (error, hash) => {
        if (error) throw error;
        pass = hash;
        addUser({ salt_password: pass, username }).then(user => res.json(user))
      })
    })
  });
  router.put('/users/:userId', (req, res) => {
    let pass = req.body.salt_password;
    const { username } = req.body;
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(pass, salt, (error, hash) => {
        if (error) throw error;
        pass = hash;
        updateUser(req.params.userId, { salt_password: pass, username }).then(() => res.json({ message: 'user updated successfully' }))
      })
    })
  });
  // =============== Sign Up =============
  router.post('/signup', (req, res) => {
    let pass = req.body.salt_password;
    const { username } = req.body;
    getUserByUserName(username).then(user => {
      if (user) {
        res.json({ success: false, message: 'User is already found' })
      } else {
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(pass, salt, (error, hash) => {
            if (error) throw error;
            pass = hash;
            addUser({ salt_password: pass, username }).then(userData => {
              if (userData) {
                res.json({ success: true, message: 'User is registered' })
              } else {
                res.json({ success: false, message: 'User is not registered' })
              }
            });
          })
        })
      }
    })
  })
  // =============== Login =============
  router.post('/login', (req, res) => {
    const userName = req.body.username;
    const password = req.body.salt_password;
    getUserByUserName(userName).then(user => {
      if (!user) {
        res.json({ success: false, message: 'User is not registered' })
      } else {
        comparePassword(password, user.salt_password, (err, isMatch) => {
          if (err) throw err;
          if (isMatch) {
            const token = jwt.sign({
              sub: user.id,
              iat: new Date().getTime(),
              exp: new Date().setDate(new Date().getDate() + 1)
            }, secret);
            res.json({ token, user });
          } else {
            res.json({ success: false, message: 'Password is not match' })
          }
        })
      }
    })
  })

  router.get('/users/profile', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.json({ success: true })
  })
}
