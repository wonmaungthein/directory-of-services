import bcrypt from 'bcrypt';
import passport from 'passport';
import express from 'express';
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

const router = express.Router();

router.get('/users', async (req, res) => {
  try {
    await getAllUsers().then(users => res.json(users));
  } catch (err) {
    res.json(err)
  }
});

router.get('/users/:id', async (req, res) => {
  try {
    await getUsersById(req.params.id).then(user => res.json(user));
  } catch (err) {
    res.json(err)
  }
});

router.delete('/users/:userId', async (req, res) => {
  await deleteUser(req.params.userId)
    .then(() => res.json({ message: 'user deleted successfully' }));
});

router.post('/users', async (req, res) => {
  let { password } = req.body;
  const { username, orgName } = req.body;
  await bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, async (error, hash) => {
      if (error) throw error;
      password = hash;
      await addUser({ salt_password: password, username, org_name: orgName }).then(user => res.json(user))
    })
  })
});
router.put('/users/:userId', async (req, res) => {
  let { password } = req.body;
  const { username } = req.body;
  await bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, async (error, hash) => {
      if (error) throw error;
      password = hash;
      await updateUser(req.params.userId, { salt_password: password, username }).then(() => res.json({ message: 'user updated successfully' }))
    })
  })
});

router.post('/signup', async (req, res) => {
  let { password } = req.body;
  const { username } = req.body;
  if (username.length > 0 && password.length > 0) {
    await getUserByUserName(username).then(user => {
      if (user.length > 0) {
        res.json({ success: false, message: 'User is already found' })
      } else {
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(password, salt, (error, hash) => {
            if (error) throw error;
            password = hash;
            addUser({ salt_password: password, username }).then(userData => {
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
  } else {
    res.json({ success: false, message: 'You have to add username and password' })
  }
})

router.post('/login', async (req, res) => {
  const { password, username } = req.body;
  await getUserByUserName(username).then(userInfo => {
    if (userInfo.length <= 0) {
      res.json({ success: false, message: 'User is not registered' })
    } else {
      comparePassword(password, userInfo[0].salt_password, (err, isMatch) => {
        if (err) throw err;
        if (isMatch) {
          const token = jwt.sign({
            sub: userInfo[0].id,
            username: userInfo[0].username,
            sucess: 'true'
          }, secret);
          res.json({ token });
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

module.exports = router;
