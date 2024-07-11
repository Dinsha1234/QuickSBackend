const express = require("express");
const db = require("../../models/index");
require("dotenv").config();
const Redis = require("ioredis");

const redis = new Redis();

const client = require("twilio")(
  process.env.ACCOUNT_ID,
  process.env.AUTH_TOKEN
);

const generatingOTP = async (body) => {
  await client.messages
    .create({
      body: `Your OTP verification for user ${body.userName} is ${otp} `,
      messagingServiceSid: process.env.SERVICE_ID,
      to: `+91${body.phoneNumber}`,
    })
    .then((message) => {
      console.log(message.sid);
      return message.sid;
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
};

async function generateOTP(body) {
  try {
    const otp = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
    console.log("b", body.phoneNumber);
    const adminObj = {
      ...body,
      otp,
    };

    await new Promise((resolve, reject) => {
      redis.set(body.phoneNumber, JSON.stringify(adminObj), (err, result) => {
        if (err) {
          return reject(new Error("Failed to store otp in redis"));
        } else {
          resolve(result);
        }
      });
    });

    //const result = await generatingOTP(body)
    return otp;
  } catch (err) {
    throw new Error(`Error Generating OTP: ${err.message}`);
  }
}

async function adminVerificationFunc(phoneNumber) {
  try {
    const adminData = await new Promise((resolve, reject) => {
      redis.get(phoneNumber, (err, res) => {
        if (err) {
          return reject(new Error("Failed to access the otp from redis"));
        } else {
          if (res) {
            resolve(JSON.parse(res));
          } else {
            resolve(null);
          }
        }
      });
    })

      await new Promise((resolve, reject)=> {
        redis.del(phoneNumber, (err, res) => {
            if(err){
                return reject(new Error("Failed to delete the otp from redis"))
            }else{
                resolve(res)
            }
        });
      })
      
      return adminData;
  } catch (err) {
    console.error('Error in adminVerificationFunc:', err.message);
    throw new Error(`Error in adminVerificationFunc: ${err.message}`);
  }
}

module.exports = { generateOTP, adminVerificationFunc };
