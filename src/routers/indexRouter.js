import { Router } from "express";
const router = Router();

router.get("/", (req, res) => {
  return res.redirect("/views/index.html");
});

router.get("/test", (req, res) => {
  return res.redirect("/views/test/index.html");
});

export default router;
