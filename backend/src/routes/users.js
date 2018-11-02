import bcrypt from 'bcrypt';
import passport from 'passport';
import express from 'express';
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
  updateUserbyEmail,
  deleteUser,
  getUserByEmail,
  comparePassword,
  validateResetInfo
} from '../controllers/users_controller';

const router = express.Router();
const auth = {
  auth: {
    api_key: process.env.MAILGUN_API_KEY,
    domain: process.env.MAILGUN_DOMAIN
  }
}
const nodemailerMailgun = nodemailer.createTransport(mg(auth));

router.get('/users', async (req, res) => {
  try {
    const data = await getAllUsers();
    const users = data.map(user => ({
      id: user.id,
      fullname: user.fullname,
      role: user.role,
      organisation: user.organisation,
      last_updated: user.last_updated,
      hasRequestedEditor: user.hasRequestedEditor,
      rejectedByAdmin: user.rejectedByAdmin,
      email: user.email
    }));
    res.status(200).json(users)
  } catch (err) {
    res
      .status(502)
      .json(err)
  }
});

router.get('/users/:id', async (req, res) => {
  try {
    const response = await getUsersById(req.params.id);
    res.status(200).json(response);
  } catch (err) {
    res
      .status(502)
      .json(err)
  }
});

router.delete('/users/:userId', async (req, res) => {
  try {
    const response = await deleteUser(req.params.userId);
    res.status(200).json({ success: true, message: 'user deleted successfully', response });
  } catch (err) {
    res.status(502).json({ success: false, message: 'There is an error occurred', err })
  }
});

router.post('/users', async (req, res) => {
  let {
    password
  } = req.body;
  const {
    email,
    orgName,
    fullname
  } = req.body;
  await bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, async (error, hash) => {
      if (error) {
        throw error;
      }
      password = hash;
      await addUser({
        salt_password: password,
        email: email,
        fullname: fullname,
        organisation: orgName
      }).then(user => res.json(user))
    })
  })
});

router.put('/users/:userId', async (req, res) => {
  let {
    password
  } = req.body;
  const {
    email,
    fullname,
    organisation
  } = req.body;
  await bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, async (error, hash) => {
      if (error) {
        throw error;
      }
      password = hash;
      await updateUser(req.params.userId, {
        salt_password: password,
        email,
        fullname,
        organisation
      }).then(() => res.json({
        message: 'user updated successfully'
      }))
    })
  })
});

router.put('/requestEditor', async (req, res) => {
  const {
    hasRequestedEditor,
    email
  } = req.body;
  console.log('request editor called with:', req.body)
  await updateUserbyEmail(email, {
    hasRequestedEditor
  }).then(() => {
    console.log('success on call')
    res.json({
      message: 'Requested To Become An Editor'
    })
  })
    .catch(err => {
      console.log('err happened', err)
    })
});

router.put('/acceptEditor', async (req, res) => {
  console.log('acceptEditor')
  const {
    role,
    hasRequestedEditor,
    id
  } = req.body;
  await updateUser(id, {
    hasRequestedEditor,
    role
  }).then(() => {
    console.log('success on call')
    res.json({
      message: 'Accepted To Become An Editor'
    })
  })
    .catch(err => {
      console.log('err happened', err)
    })
});

router.put('/rejectEditor', async (req, res) => {
  const {
    hasRequestedEditor,
    id,
    role,
    rejectedByAdmin
  } = req.body;
  await updateUser(id, {
    hasRequestedEditor,
    role,
    rejectedByAdmin
  }).then(() => {
    console.log('success on call')
    res.json({
      message: 'Rejecged To Become An Editor'
    })
  })
    .catch(err => {
      console.log('err happened', err)
    })
});

// Use this route to modify user role, org name, fullname
router.put('/user/role', async (req, res) => {
  try {
    const {
      role,
      fullname,
      organisation,
      id
    } = req.body
    await updateUser(id, {
      role,
      fullname,
      organisation,
      id
    });
    res.status(200).json({
      success: true,
      message: 'User updated successfully'
    })
  } catch (err) {
    res.status(502).json({
      success: false,
      message: 'User has not been updated',
      err
    })
  }
})

router.post('/signup', async (req, res) => {
  try {
    let {
      password
    } = req.body;
    const {
      fullname,
      email,
      organisation
    } = req.body;
    if (email.length > 0 && password.length > 0) {
      const user = await getUserByEmail(email)
      if (user.length > 0) {
        res.json({
          success: false,
          message: 'User is already found'
        })
      } else {
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(password, salt, (error, hash) => {
            if (error) {
              throw error;
            }
            password = hash;
            addUser({
              salt_password: password,
              email,
              fullname,
              organisation,
              hasRequestedEditor: false,
              rejectedByAdmin: false
            }).then(userData => {
              if (userData) {
                res.json({
                  success: true,
                  message: 'User is registered'
                })
              } else {
                res.json({
                  success: false,
                  message: 'User is not registered'
                })
              }
            });
          })
        })
      }
    }
  } catch (err) {
    res.status(502).json({
      success: false,
      message: 'You have to add email and password!',
      err
    })
  }
})

router.post('/login', async (req, res) => {
  try {
    const {
      password,
      email
    } = req.body;
    await getUserByEmail(email).then(userInfo => {
      if (userInfo.length <= 0) {
        res
          .status(403)
          .json({
            success: false,
            message: 'User is not registered'
          })
      } else {
        comparePassword(password, userInfo[0].salt_password, (err, isMatch) => {
          if (err) {
            throw err;
          }
          if (isMatch) {
            const token = jwt.sign({
              sub: userInfo[0].id,
              fullname: userInfo[0].fullname,
              organisation: userInfo[0].organisation,
              role: userInfo[0].role,
              email: userInfo[0].email,
              success: 'true',
              hasRequestedEditor: userInfo[0].hasRequestedEditor,
              rejectedByAdmin: userInfo[0].rejectedByAdmin
            }, secret);
            res
              .status(200)
              .json({
                token,
                user: userInfo
              });
          } else {
            res
              .status(403)
              .json({
                success: false,
                message: 'Password is not match'
              })
          }
        })
      }
    })
  } catch (err) {
    res.status(502).json({
      success: false,
      message: 'Your Password or email doesn\'t match!',
      err
    })
  }
})

router.get('/users/profile', passport.authenticate('jwt', {
  session: false
}), (req, res) => {
  res.json({
    success: true
  })
})

router.post('/forgot', (req, res) => {
  crypto.randomBytes(20, async (err, buf) => {
    if (err) {
      res.status(502).json({
        success: false,
        message: 'an error occurred!',
        err
      })
    }
    try {
      const token = buf.toString('hex');
      const user = await getUserByEmail(req.body.email);
      let {
        resetPasswordExpires,
        resetPasswordToken
      } = user[0];
      resetPasswordToken = token;
      resetPasswordExpires = (Date.now() + 3600000).toString(); // 1 hour

      await updateUser(user[0].id, {
        resetPasswordExpires,
        resetPasswordToken
      })
      await nodemailerMailgun.sendMail({
        from: `${req.body.siteEmail}`,
        to: `${req.body.email}`,
        subject: 'Reset User Password',
        text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n
          Please click on the following link, or paste this into your browser to complete the process:\n\n
          http://${req.body.siteHost}/reset/${token}\n\n
          If you did not request this, please ignore this email and your password will remain unchanged.\n`
      })

      res.status(200).json({
        success: true,
        message: 'Your request has made successfully!'
      })
    } catch (error) {
      res.status(502).json({
        success: false,
        message: 'User dose not exist!',
        error
      })
    }
  })
});

router.get('/reset/:token', async (req, res) => {
  try {
    const user = await validateResetInfo(req.params.token, Date.now().toString());
    const userId = user[0].id;
    const {
      email
    } = user[0];
    res.status(200).json({
      success: true,
      userId,
      email
    })
  } catch (err) {
    res.status(502).json({
      success: false,
      message: 'Password reset token is invalid or has expired.',
      err
    })
  }
});

router.post('/reset/:token', async (req, res) => {
  try {
    const user = await validateResetInfo(req.body.token, Date.now().toString());
    if (req.body.password === req.body.confirm) {
      let {
        password
      } = req.body;
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, async (error, hash) => {
          if (error) {
            throw error;
          }
          password = hash;
          await updateUser(user[0].id, {
            salt_password: password,
            resetPasswordToken: '',
            resetPasswordExpires: ''
          })
        })
      })
      await nodemailerMailgun.sendMail({
        from: `${req.body.siteEmail}`,
        to: `${user[0].email}`,
        subject: 'Your password has been changed',
        text: `Hello,\n\n This is a confirmation that the password for your account ${user[0].email} has just been changed.\n`
      })
    }
    res.status(200).json({
      success: true,
      message: 'Your password has been changed successfully!'
    })
  } catch (error) {
    res.status(502).json({
      message: 'Password reset token is invalid or has expired.',
      error
    });
  }
});

module.exports = router;
