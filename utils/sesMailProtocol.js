const AWS = require("aws-sdk");
require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
});

const forgotMailTemplate = require("./mailTemplates/forgotPassword");
const verifyEmail = require("./mailTemplates/verifyEmail");
const welcomeMail = require("./mailTemplates/welcomeMail");
const sendDownloadFile = require("./mailTemplates/sendDownloadFile");

function sendEmail(props) {
  //Email templates
  function templates() {
    switch (props.template) {
      //   case "verifyEmail":
      //     return verifyEmail(props);
      //   case "welcomeEmail":
      //     return welcomeMail(props);
      //   case "sendDownloadFile":
      //     return sendDownloadFile(props);
      default:
        return welcomeMail(props);
    }
  }

  const AWSConfig = {
    accessKeyId: process.env.AWS_SES_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SES_SECRET_ACCESS_KEY,
    hostname: process.env.AWS_SES_HOST,
    region: process.env.AWS_REGION,
    port: process.env.AWS_SES_PORT,
    apiVersion: "2010-12-01",
  };
  return props.template === "sendDownloadFile"
    ? new AWS.SES(AWSConfig).sendRawEmail(templates()).promise()
    : new AWS.SES(AWSConfig).sendEmail(templates()).promise();
}
module.exports = sendEmail;
