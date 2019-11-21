const express = require("express");
const auth = express.Router();
const passport = require("../middlewares/passport");

const naverLogin = () => passport.authenticate("naver", null);

const failMessage = (req, res) => console.log("/auth/naver failed, stopped");

const naverLoginResult = () => passport.authenticate("naver", {
  failureRedirect: "#!/auth/login"
});

const successLogin = (req, res) => {
  console.log(req.user);
  res.cookie('isLogin', 'true');
  res.redirect("http://127.0.0.1:3000");
};

auth.get("/naver", naverLogin(), failMessage);
auth.get("/naver/callback", naverLoginResult(), successLogin);

module.exports = auth;
