require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
});
function welcomeEmail({ email, userName }) {
  return {
    Source: "",
    Destination: { ToAddress: [email] },
    Message: {
      Subject: {
        Charset: "UTF-8",
        Data: `Welcome to WMS`,
      },
      Body: {
        Html: {
          Charset: "UTF-8",
          Data: `
                 <div style="padding:15px;font-size:15px">
                  <center>
                   <img alt="FinGo-Logo"src="https://staging.fingoindia.com/_next/image?url=%2Fimages%2FLogo.png&w=256&q=75"/>
                   </center>
                   <p style="font-size:18px">
                   Dear <b>${userName}</b>, </p>
                   Welcome Aboard!  <br /><br />
                //    <p> Thank you for choosing FinGo to find the best loan options for your needs. Our application is designed to simplify the loan selection process, making it easier for you to compare different options and choose the one that's right for you.</p>
                   <p> If you have any questions or need any assistance, our customer support team is always available to help. You can reach us by email or call, and we will be more than happy to assist you. </p>
                   <p>We look forward to helping you find the best loan offers available. </p>
                   <p>Best regards, <br />
                   The WMS team.<br />
                   </p>
                   </div>
                    `,
        },
      },
    },
  };
}
module.exports = welcomeEmail;
