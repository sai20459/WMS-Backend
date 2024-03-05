require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
});
// require("express-async-errors");

// //packages
const express = require("express");
const cors = require("cors");
// const helmet = require("helmet");
const passport = require("passport");
// const session = require("express-session");
// const rateLimiter = require("express-rate-limit");

// //imports
const auth = require("./routes/auth");
const user = require("./routes/user");

const errorHandlerMiddleware = require("./middleware/errorHandleMiddleware");
const { authenticateMiddleware } = require("./middleware/authmiddleware");

// const {
//   decryptRequest,
//   encryptResponse,
// } = require("./middleware/decryptionMiddleware");

// const {
//   deleteExpiredOTPRecords,
//   deleteExpiredSessionRecords,
//   deleteExpiredCaptchaRecords,
//   askConsentAgain,
// } = require("./sheduled-tasks/cron");

const app = express();

// //Adding Cors
app.use(
  cors({
    origin: function (origin, callback) {
      if (process.env.ALLOWED_HOSTS.indexOf(origin) !== -1 || !origin)
        callback(null, true);
      else callback(new Error("Not allowed by CORS"));
    },
  })
);

// rateLimiter
// app.use(
//   rateLimiter({
//     windowMs: 15 * 60 * 1000, // 15 minutes
//     max: 200, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
//     standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
//   })
// );

// //database connection
// (async function () {
//   try {
//     const port = process.env.PORT || 5000;
//     app.listen(port, async () => {
//       console.log(
//         `\x1b[32m\n\tAdminJS started on ${process.env.BASE_URL}/data-management-portal\t\n\x1b[0m`
//       );
//       await deleteExpiredOTPRecords();
//       await deleteExpiredSessionRecords();
//       await deleteExpiredCaptchaRecords();
//       await askConsentAgain();
//       logger("info", `Running on port ${port}`);
//     });
//   } catch (error) {
//     console.log(error);
//   }
// })();

// // middleware
// Middleware to parse JSON request bodies
app.use(express.json());
// app.use(decryptRequest);
// app.use(
//   helmet.expectCt({
//     enforce: true,
//     maxAge: 86400, // specify the number of seconds to cache the policy
//   })
// );
// app.use(helmet.permittedCrossDomainPolicies({ permittedPolicies: "none" }));
// app.use(helmet());

// // Set up Expect-CT header manually
app.use((req, res, next) => {
  res.setHeader("Expect-CT", "max-age=86400, enforce");
  next();
});

// //passport - google auth
app.use(passport.initialize());

// //routes
app.use("/api/auth", auth);
app.use("/api/user/", authenticateMiddleware, user);

app.use((req, res, next) => {
  res.status(405).json({ error: `Method ${req.method} not allowed` });
});

app.use((req, res, next) => {
  if (res) {
    // Only send the data, not the entire res object
    res.status(200).json(res.data);
  } else {
    next();
  }
});

// //if no route found
app.all("*", (req, res, next) => {
  next({
    status: 404,
    message: `Can't find ${req?.originalUrl} on this server!`,
  });
});

app.use(errorHandlerMiddleware);

app.listen(process.env.PORT, () =>
  console.log(`App running on PORT ${process.env.PORT}.`)
);
