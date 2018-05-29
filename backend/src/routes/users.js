import bcrypt from 'bcrypt';
import passport from 'passport';
import express from 'express';
import async from 'async';
import nodemailer from 'nodemailer';
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
  comparePassword
} from '../controllers/users_controller';

const router = express.Router();

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
        done(err, token);
      });
    },
    (token, done) => {
      getUserByEmail(req.body.email).then((err, user) => {
        if (!user || err) {
          res.status(502).json({ message: 'No account with that email address exists.', err });
        }
        user.resetPasswordToken = token;
        user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

        addUser(user).then((error) => {
          done(error, token, user);
        });
      })
    },
    (token, user, done) => {
      const smtpTransport = nodemailer.createTransport({
        service: 'Mailgun',
        auth: {
          user: process.env.Mail_USER,
          pass: process.env.MAIL_PASS
        }
      });
      const mailOptions = {
        to: user.email,
        from: 'test@test.com',
        subject: 'User Password Reset',
        text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n
          Please click on the following link, or paste this into your browser to complete the process:\n\n
          http://${req.headers.host}/reset/${token}\n\n
          If you did not request this, please ignore this email and your password will remain unchanged.\n`
      };
      smtpTransport.sendMail(mailOptions, (err) => {
        console.log('mail sent');
        res.status(200).json({ success: true, message: `An e-mail has been sent to ${user.email} with further instructions.` });
        done(err, 'done');
      });
    }
  ], (err) => {
    if (err) {
      res.status(502).json(err)
    }
    return null;
  });
});

module.exports = router;
