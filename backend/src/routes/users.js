import bcrypt from 'bcrypt';
import passport from 'passport';
import express from 'express';
import async from 'async';
import nodemailer from 'nodemailer';
import mg from 'nodemailer-mailgun-transport';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import secret from '../authentication/config'
import '../authentication/passport';
import {
  getAllUsers,
  getUsersById,
  addUser,
  updateUser,
  deleteUser,
  getUserByEmail,
  comparePassword,
  validateResetInfo
} from '../controllers/users_controller';

const router = express.Router();
const auth = { auth: { api_key: process.env.API_KEY, domain: process.env.DOMAIN } }
const nodemailerMailgun = nodemailer.createTransport(mg(auth));
const encryptPass = (password) => {
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, (error, hash) => {
      if (error) {
        throw error;
      }
      password = hash;
      return password;
    })
  })
}

router.get('/users', async (req, res) => {
  try {
    await getAllUsers().then(users => res.status(200).json(users));
  } catch (err) {
    res
      .status(502)
      .json(err)
  }
});

router.get('/users/:id', async (req, res) => {
  try {
    await getUsersById(req.params.id).then(user => res.status(200).json(user));
  } catch (err) {
    res
      .status(502)
      .json(err)
  }
});

router.delete('/users/:userId', async (req, res) => {
  try {
    await deleteUser(req.params.userId).then(() => res.status(200).json({ message: 'user deleted successfully' }));
  } catch (err) {
    res
      .status(502)
      .json(err)
  }
});

router.post('/users', async (req, res) => {
  let { password } = req.body;
  const { email, orgName } = req.body;
  await bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, async (error, hash) => {
      if (error) {
        throw error;
      }
      password = hash;
      await addUser({ salt_password: password, email: email, org_name: orgName }).then(user => res.json(user))
    })
  })
});
router.put('/users/:userId', async (req, res) => {
  let { password } = req.body;
  const { email } = req.body;
  await bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, async (error, hash) => {
      if (error) {
        throw error;
      }
      password = hash;
      await updateUser(req.params.userId, {
        salt_password: password,
        email
      }).then(() => res.json({ message: 'user updated successfully' }))
    })
  })
});

router.post('/signup', async (req, res) => {
  let { password } = req.body;
  const { fullname, email, organisation } = req.body;
  if (email.length > 0 && password.length > 0) {
    await getUserByEmail(email).then(user => {
      if (user.length > 0) {
        res.json({ success: false, message: 'User is already found' })
      } else {
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(password, salt, (error, hash) => {
            if (error) {
              throw error;
            }
            password = hash;
            addUser({
              salt_password: password, email, fullname, organisation
            })
              .then(userData => {
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
    res.json({ success: false, message: 'You have to add email and password' })
  }
})

router.post('/login', async (req, res) => {
  const { password, email } = req.body;
  try {
    await getUserByEmail(email).then(userInfo => {
      if (userInfo.length <= 0) {
        res
          .status(403)
          .json({ success: false, message: 'User is not registered' })
      } else {
        comparePassword(password, userInfo[0].salt_password, (err, isMatch) => {
          if (err) {
            throw err;
          }
          if (isMatch) {
            const token = jwt.sign({
              sub: userInfo[0].id,
              fullname: userInfo[0].fullname,
              sucess: 'true'
            }, secret);
            res
              .status(200)
              .json({ token, user: userInfo });
          } else {
            res
              .status(403)
              .json({ success: false, message: 'Password is not match' })
          }
        })
      }
    })
  } catch (err) {
    throw err
  }
})

router.get('/users/profile', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.json({ success: true })
})

router.post('/forgot', (req, res) => {
  async.waterfall([
    (done) => {
      crypto.randomBytes(20, (err, buf) => {
        const token = buf.toString('hex');
        if (err) {
          res.status(502).json(err);
        }
        try {
          getUserByEmail(req.body.email).then(user => {
            let { resetPasswordExpires, resetPasswordToken } = user[0];
            if (!user || user.length <= 0) {
              res.status(502).json({ success: false, message: 'User dose not exist!' })
            } else {
              resetPasswordToken = token;
              resetPasswordExpires = (Date.now() + 3600000).toString(); // 1 hour
              updateUser(user[0].id, {
                resetPasswordExpires, resetPasswordToken
              })
                .then(() => {
                  nodemailerMailgun.sendMail({
                    from: 'dirctoryofservice@hotmail.com',
                    to: `${req.body.email}`,
                    subject: 'Reset User Password',
                    text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n
          Please click on the following link, or paste this into your browser to complete the process:\n\n
          http://${req.headers.host}/reset/${token}\n\n
          If you did not request this, please ignore this email and your password will remain unchanged.\n`
                  }, (error) => {
                    if (error) {
                      res.status(502).json({ message: 'There is an error occurred!', error: error.error });
                    } else {
                      done(err, 'respo')
                    }
                  })
                });
            }
          })
        } catch (error) {
          res.status(502).json({ message: 'No account with that email address exists.', error });
        }
      })
    }
  ], (error, data) => {
    if (error) {
      res.status(502).json({ success: false, error })
    } else {
      res.status(200).json({ success: true, data })
    }
  });
});

router.get('/reset/:token', (req, res) => {
  validateResetInfo(req.params.token, Date.now().toString())
    .then((user) => {
      const userId = user[0].id;
      const { email } = user[0];
      if (!user || user.length <= 0) {
        res.status(502).json({ success: false, message: 'Password reset token is not invalid or has expired.' })
      } else {
        res.status(200).json({ sucess: true, userId, email })
      }
    })
});


router.post('/reset/:token', (req, res) => {
  async.waterfall([
    (done) => {
      validateResetInfo(req.params.token, Date.now().toString())
        .then(user => {
          if (!user || user.length <= 0) {
            res.status(502).json({ success: false, message: 'Password reset token is invalid or has expired.' })
          } else {
            if (req.body.password === req.body.confirm) {
              const encryptPassword = encryptPass(req.body.password)
              updateUser(user[0].id, {
                salt_password: encryptPassword,
                resetPasswordToken: '',
                resetPasswordExpires: ''
              })
                .then(() => {
                  nodemailerMailgun.sendMail({
                    from: 'dirctoryofservice@hotmail.com',
                    to: `${user[0].email}`,
                    subject: 'Your password has been changed',
                    text: `Hello,\n\n This is a confirmation that the password for your account ${user[0].email} has just been changed.\n`
                  }, (erro) => {
                    if (erro) {
                      res.status(502).json({ message: 'There is an error occurred!', error: erro.error });
                    } else {
                      done(erro, { success: true, message: 'Success! Your password has been changed' })
                    }
                  })
                })
            }
            if (req.body.password !== req.body.confirm) {
              res.status(502).json({ success: false, message: 'Password dose not match.' })
            }
          }
        });
    }
  ], (error, data) => {
    if (error) {
      res.status(502).json({ success: false, error })
    } else {
      res.status(200).json({ success: true, data })
    }
  });
});

module.exports = router;
