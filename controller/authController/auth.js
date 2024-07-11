const { Router } = require("express");

const db = require("../../models/index");
const createJWTokenFunction = require("../../stores/v1/createToken");
const {
  generateOTP,
  adminVerificationFunc,
} = require("../../stores/v1/adminLogin");
const userAuthentication = require("../../stores/v1/userLoginAuthentication");
require("dotenv").config();

const router = new Router();

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY.replace(/\\n/g, "\n");

router.post("/google", async (req, res, next) => {
  const { code } = req.body;
  try {
    const userObj = await userAuthentication(code);
    console.log(userObj.userid);

    const JWTokenVar = createJWTokenFunction(
      {
        userId: `${userObj.googleId}`,
        userEmail: `${userObj.email}`,
        userName: `${userObj.displayName}`,
      },
      JWT_SECRET_KEY
    );

    res.status(200).json({ token: JWTokenVar });
  } catch (err) {
    res.status(400).json({ err });
  }
  next();
});

router.post("/generate-otp", async (req, res, next) => {
  const { phoneNumber } = req.body;

  try {
    const existingUser = await db.admin.findOne({
      where: { phoneNumber: phoneNumber },
    });
    if (!existingUser) {
      return res.status(400).json({ msg: "This User is not an Admin!" });
    }
    const otp = await generateOTP(existingUser.dataValues);
    return res.status(200).json({ otp });
  } catch (err) {
    res.status(400).json({ err });
  }
  next();
});

router.post("/verify-otp", async (req, res, next) => {
  const { inputOtp, phoneNumber } = req.body;
  try {
    const adminData = await adminVerificationFunc(phoneNumber);
    if (adminData.otp === Number(inputOtp)) {
      const JWTokenVar = createJWTokenFunction(
        {
          userId: `${adminData.id}`,
          userName: `${adminData.userName}`,
        },
        JWT_SECRET_KEY
      );
      res.status(200).json({ token: JWTokenVar });
    } else {
      res.status(400).json({ err: "Incorrect OTP" });

    }
  } catch (err) {
    res.status(400).json({ err });
  }
});

module.exports = router;
