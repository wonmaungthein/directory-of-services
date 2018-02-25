import express from 'express';
import connectDB from '../../config/Db';

const router = express.Router();

connectDB();

router.get('/', (req, res) => {
  res.json('hello');
});

module.exports = router;
