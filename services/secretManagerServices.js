const {
  GetSecretValueCommand,
  SecretsManagerClient,
} = require("@aws-sdk/client-secrets-manager");

require("dotenv").config();
const client = new SecretsManagerClient({
  region: "us-east-1"
});

const getSecretValue = async (secretName = "QuickServe") => {
  try {
    console.log(secretName);
    const response = await client.send(
      new GetSecretValueCommand({
        SecretId: secretName,
        VersionStage: "AWSCURRENT"
      })
    );
    console.log(response);
    if ("SecretString" in response) {
      const data = JSON.parse(response.SecretString);
      return data;
    } else {
      const buff = Buffer.from(data.SecretBinary, "base64");
      return JSON.parse(buff.toString("ascii"));
    }
  } catch (err) {
    console.log("error while retrieving secret values", err);
  }
};


module.exports = getSecretValue;
