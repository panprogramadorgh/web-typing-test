import gamePhrases from "../data/gamePhrases.js";
import { Router } from "express";
const router = Router();

router.get("/", (req, res) => {
  res.json({ message: "Welcome to the typing test api" });
});

router.get("/phrases", (req, res) => {
  const { index } = req.query;
  if (!index) {
    return res.json({ gamePhrases });
  }
  const phrase = gamePhrases[parseInt(index)];
  res.json({ phrase });
});

router.get("/uptime", (req, res) => {
  return res.json(process.uptime());
});

export default router;
