const express = require("express")
const db = require('../../models/index')
const { OAuth2Client } = require("google-auth-library");
const loadSecrets = require("../../config/secrets")


  

async function userAuthentication(code) {
    const secrets = await loadSecrets()
    const client = new OAuth2Client(
      secrets["CLIENT_ID"],
      secrets["CLIENT_SECRET"],
      "postmessage"
    );
    
    const { tokens } = await client.getToken(code);

    const idToken = tokens.id_token;

    const ticket = await client.verifyIdToken({
      idToken,
      audience: process.env.CLIENT_ID,
    });

    const payload = ticket.getPayload();

    const userid = payload["sub"];
    const userObj = {
      googleId: `${userid}`,
      displayName: `${payload["name"]}`,
      email: `${payload["email"]}`,
      image: `${payload["picture"]}`,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    await db.users.create(userObj);
    return userObj
}

module.exports = userAuthentication