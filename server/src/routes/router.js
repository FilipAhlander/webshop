import express from "express";

const router = express.Router();

router.post('/', (req, res) => {
  console.log(req.ip);
  res.status(200).send(req.ip);
});

router.get('/', (req, res) => {
  res.status(200).send('get');
});

export default router;