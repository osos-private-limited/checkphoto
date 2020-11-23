require("dotenv").config();
const express = require("express");
const db = require("./models");
const axios = require("axios"); //you can use any http client
const cron = require("node-cron");
const fs = require("fs");
const tf = require("@tensorflow/tfjs-node");
const ngrok = require("ngrok");
const redis = require("redis");
const client = redis.createClient();

const nsfw = require("nsfwjs");
const jpeg = require("jpeg-js");
const cmd = require("node-run-cmd");
ObjectId = require("mongodb").ObjectID;
const Agenda = require("agenda");
var Agendash = require("agendash2");

var spawn = require("child_process").spawn;
const Sentry = require("@sentry/node");

Sentry.init({
  dsn: "https://fb01474a091247e89364a9ea0ea80fe9@o471689.ingest.sentry.io/5504019",

  // We recommend adjusting this value in production, or using tracesSampler
  // for finer control
  tracesSampleRate: 1.0,
});

const transaction = Sentry.startTransaction({
  op: "test",
  name: "My First Test Transaction",
});
//db.collection("agendaJobs").drop();
// var wstream = fs.createWriteStream(
//   "/home/thinclients/user5/Desktop/db_backup/sqlBackup/backup.sql",
// );
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const compression = require("compression");
const app = express();

const checkPhoto = require("./checkPhoto");
const deleteDuplicatePhoto = require("./deletePhoto");
app.set("view engine", "ejs");
app.use(express.static(`${__dirname}/public`));
// app.use(morgan("dev"));
app.use(cors());
app.use(helmet());
app.use(compression());
ObjectId = require("mongodb").ObjectID;
const mongoString = `mongodb://127.0.0.1:27017/cloud?retryWrites=true&w=majority`;
const load_model = async () => {
  _model = await nsfw.load();
};

const agenda = new Agenda({ db: { address: mongoString } });
app.use("/dash", Agendash(agenda));
agenda.define(
  "expirePost",
  { priority: "high", concurrency: 1 },
  async function (job, done) {
    await db.Post.updateMany(
      { expiresAt: { $lte: Date.now() } },
      { status: false, condition: "Expired" },
      function (err, res, callback) {
        if (err) {
          callback(err, null);
        }
      },
    );
    await db.Admin.updateMany(
      { expiresAt: { $lte: Date.now() } },
      { status: false, condition: "Expired" },
      function (err, res, callback) {
        if (err) {
          callback(err, null);
        }
      },
    );
    // await db.User.updateMany(
    //   { "unsafe.expiresAt": { $lte: Date.now() } },
    //   { "unsafe.freePosts": 2 },
    //   function (err, res, callback) {
    //     if (err) {
    //       callback(err, null);
    //     }
    //   },
    // );
    // await db.User.updateMany(
    //   { "greet.expiresAt": { $lte: Date.now() } },
    //   { "greet.freePosts": 2 },
    //   function (err, res, callback) {
    //     if (err) {
    //       callback(err, null);
    //     }
    //   },
    // );
    // await db.User.updateMany(
    //   { "market.expiresAt": { $lte: Date.now() } },
    //   { "market.freePosts": 8 },
    //   function (err, res, callback) {
    //     if (err) {
    //       callback(err, null);
    //     }
    //   },
    // );
    // await db.User.updateMany(
    //   { "deposit.expiresAt": { $lte: Date.now() } },
    //   { "deposit.freePosts": 1 },
    //   function (err, res, callback) {
    //     if (err) {
    //       callback(err, null);
    //     }
    //   },
    // );
    // await db.User.updateMany(
    //   { "ambulance.expiresAt": { $lte: Date.now() } },
    //   { "ambulance.freePosts": 2 },
    //   function (err, res, callback) {
    //     if (err) {
    //       callback(err, null);
    //     }
    //   },
    // );
    // await db.User.updateMany(
    //   { "showtime.expiresAt": { $lte: Date.now() } },
    //   { "showtime.freePosts": 1 },
    //   function (err, res, callback) {
    //     if (err) {
    //       callback(err, null);
    //     }
    //   },
    // );
    // await db.User.updateMany(
    //   { "pepole.expiresAt": { $lte: Date.now() } },
    //   { "people.freePosts": 2 },
    //   function (err, res, callback) {
    //     if (err) {
    //       callback(err, null);
    //     }
    //   },
    // );
    // await db.User.updateMany(
    //   { "unsafe.expiresAt": { $lte: Date.now() } },
    //   { "unsafe.freePosts": 2 },
    //   function (err, res, callback) {
    //     if (err) {
    //       callback(err, null);
    //     }
    //   },
    // );
    await db.User.updateMany(
      {},
      { $pull: { "greet.package": { expiresAt: { $lte: Date.now() } } } },
      { multi: true },
    );
    await db.User.updateMany(
      {},
      { $pull: { "market.activeInfosasSeller": { expiresAt: { $lte: Date.now() } } } },
      { multi: true },
    );
    await db.User.updateMany(
      {},
      { $pull: { "market.package": { expiresAt: { $lte: Date.now() } } } },
      { multi: true },
    );
    await db.User.updateMany(
      {},
      { $pull: { "market.categories": { expiresAt: { $lte: Date.now() } } } },
      { multi: true },
    );
    await db.User.updateMany(
      {},
      { $pull: { "showtime.package": { expiresAt: { $lte: Date.now() } } } },
      { multi: true },
    );
    await db.User.updateMany(
      {},
      { $pull: { "playtime.package": { expiresAt: { $lte: Date.now() } } } },
      { multi: true },
    );
    await db.User.updateMany(
      {},
      { $pull: { "people.package": { expiresAt: { $lte: Date.now() } } } },
      { multi: true },
    );
    await db.User.updateMany(
      {},
      { $pull: { "deposit.package": { expiresAt: { $lte: Date.now() } } } },
      { multi: true },
    );
    await db.User.updateMany(
      {},
      { $pull: { "unsafe.package": { expiresAt: { $lte: Date.now() } } } },
      { multi: true },
    );
    await db.User.updateMany(
      {},
      { $pull: { "ambulance.package": { expiresAt: { $lte: Date.now() } } } },
      { multi: true },
    );
    done();
  },
);
agenda.define(
  "checkRange",
  { priority: "high", concurrency: 1 },
  async function (done) {
    var users = await db.User.find({});
    for (var user of users) {
      const allPackages = await db.Config.find({});
      var packagess = {};
      for (var package of allPackages) {
        if (user[package.feature].package.length > 0) {
          var max = 0;
          for (var i of user[package.feature].package) {
            if (i.range > max) {
              max = i.range;
            }
            packagess[package.feature] = max;
          }
          //console.log("in top");
        } else {
          packagess[package.feature] = package.packages[0].range;
          //console.log("in below");
        }
      }
      var packages = JSON.stringify(packagess);
      client.set(`${user._id}-Payment`, packages, redis.print);
    }
    var orderss = await db.Order.find({ status: "processing" })
    for (var order of orderss) {
      dt1 = new Date();
      dt2 = order.createdAt
      var difference = diff_minutes(dt1, dt2)
      if (difference > 15) {
        order.status = "failed"
      }
      order.save()
    }
    done();
  },
);
agenda.define("addtwo", { priority: "high", concurrency: 1 }, async function (
  job,
  done,
) {
  db.User.updateMany(
    {},
    { "unsafe.freePosts": 2, "ambulance.freePosts": 2 },
    function (err, res, callback) {
      if (err) {
        callback(err, null);
      }
    },
  );
  const date = new Date();
  date.setDate(date.getDate() - 90);
  const a = new Date(date);
  const data = await db.Post.find(
    {
      condition: { $in: ["Expired", "Deleted"] },
      expiresAt: { $lt: a },
      featureName: { $in: ['greet', 'people', 'unsafe', 'ambulance'] }
    });
  for (var i of data) {
    if (i.video.length > 0) {
      for (var video of i.video) {
        await fs
          .remove(
            `/home/thinclients/user5/Desktop/final/main/nodejs_project${video.substr(video.indexOf('/image'), video.length)}`,
          )

          .catch((err) => {
            console.log(err);
          });
      }
      i.video = [];
    }
    if (i.photo.length > 0) {
      for (var photo of i.photo) {
        await fs
          .remove(
            `/home/thinclients/user5/Desktop/final/main/nodejs_project${photo.substr(photo.indexOf('/image'), photo.length)}`,
          )

          .catch((err) => {
            console.log(err);
          });
      }
      i.photo = [];
    }


    i.save()
  }
  done();
});


// agenda.define("checkPhoto", { priority: "high", concurrency: 1 }, function (
//   job,
//   done,
// ) {
//   checkPhoto();
//   done();
// });

agenda.define(
  "deletedDuplicate",
  { priority: "high", concurrency: 1 },
  function (job, done) {
    deleteDuplicatePhoto();
    done();
  },
);

agenda.on("ready", function () {
  agenda.start();
  agenda.every("5 minutes", "deletedDuplicate");
  agenda.every("15 minutes", "checkRange");
  //agenda.every("one minute", "checkPhoto");
  agenda.every("one minute", "expirePost");
  agenda.every("24 hours", "addtwo");
});

cron.schedule("0 8 * * Monday", function () {
  cmd.run([
    `rm -r /home/thinclients/user5/Desktop/db_backup/cloud`,
    `mongodump -d cloud -o /home/thinclients/user5/Desktop/db_backup/`,
  ]);
  console.log("mongodb backed up successfully");
});

//to mongodb restore enter below command
//mongorestore -d cloud /home/thinclients/nodejs1/Desktop/mongo_backup/cloud

// var mysqldump = spawn('mysqldump', [
//     '-u',
//     'DB_USER',
//     '-p',
//     'DB_PASSWORD',
//     'DB_NAME'
// ]);

// mysqldump
//     .stdout
//     .pipe(wstream)
//     .on('finish', function () {
//         console.log('Completed')
//     })
//     .on('error', function (err) {
//         console.log(err)
//     });

var ffmpegPath = require("@ffmpeg-installer/ffmpeg").path;
var ffmpeg = require("fluent-ffmpeg");
ffmpeg.setFfmpegPath(ffmpegPath);
var command = ffmpeg();
app.get("/compress", async (req, res) => {
  ffmpeg(`./demo.mp4`)
    .audioCodec("libmp3lame")
    .videoCodec("libx264")
    // .size("640x480")
    .size("50%")
    .on("error", function (err) {
      console.log("An error occurred: " + err.message);
    })
    .on("end", function () {
      console.log("Processing finished !");
    })
    .save('./gala.mp4');
  console.log(ffmpeg.videoWidth)
  res.send("done");
});
const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const protect = async (req, res, next) => {
  try {
    //console.log(req.headers);

    if (req.headers["user-agent"].substring(0, 7).toLowerCase() != "postman") {
      // 1) Getting token and check it's there
      let token;
      if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
      ) {
        token = req.headers.authorization.split(" ")[1];
      } else if (req.cookies.jwt) {
        token = req.cookies.jwt;
      }

      if (!token) {
        return next(
          new AppError(
            "You are not logged in! Please log in to get accesss.",
            401,
          ),
        );
      }

      // 2) Verification token
      const decoded = await promisify(jwt.verify)(
        token,
        process.env.JWT_SECRET,
      );
      if (decoded) {
        // 3) Check if user still exists
        const currentUser = await db.User.findById(decoded.id);
        if (!currentUser) {
          return res.status(401).json({
            message: "The user belonging to this token no longer exist.",
          });
        }
        const data = await db.DeletedUser.findOne({
          userId: currentUser._id,
          deleted_type: { $in: ["Suspended", "Deleted"] },
        });
        if (data) {
          return res.status(401).json({
            message: "Account suspended.",
          });
        }
        var exists = false;
        exists = checkTokenExists(currentUser, token);
        if (!exists) {
          currentUser.status = false;
          currentUser.save();
          // return res.status(409).json()

          return res.status(401).json({
            message: "The user belonging to this token no longer exist.",
          });
        }
        // 4) Check if user changed password after the token was issued
        if (currentUser.changedPasswordAfter(decoded.iat)) {
          return res.status(401).json({
            message: "User recently changed password! Please log in again.",
          });
        }
        // if (!currentUser.active) {
        //   return next(new AppError('Please contact Admin.', 401));
        // }
        if (decoded.bId) {
          // eslint-disable-next-line no-unused-vars
          if (!currentUser.activeWebLogins.find((_id) => decoded.bId)) {
            return res.status(401).json({ message: "Invalid web token" });
          }
          req.browser = decoded.bId;
        }
        // GRANT ACCESS TO PROTECTED ROUTE
        req.user = currentUser;
        res.locals.user = currentUser;
        next();
      } else {
        return res
          .status(401)
          .json({ message: "Un Authorized Please Login Again" });
      }
    } else {
      return res.status(409).json({ message: "unauthorized request" });
    }
  } catch (err) {
    console.log(err.stack.split("\n")[0]);
    console.log(err.stack.split("\n")[1]);
    console.log("------------------------------------------------>");
    return res
      .status(401)
      .json({ message: "Un Authorized Please Login Again" });
  }
};
function checkTokenExists(user, token) {
  if (user.phoneToken === token) {
    return true;
  } else {
    var found = false;
    user.activeWebLogins.forEach((list) => {
      if (list.token == token) {
        found = true;
      }
    });
    if (found) {
      return true;
    }
  }
}
const request = require("request-promise");
app.get("/getmapdata/:z/:x/:y", protect, async function (req, res) {
  try {
    res.setHeader("Content-Type", "image/png");
    const options = {
      method: "GET",
      uri: `http://43.254.41.110:3000/styles/osos/${req.params.z}/${req.params.x}/${req.params.y}`,
      headers: {
        Accept: "image/png",
      },
    };
    console.log(options.uri)
    request(options.uri, options).pipe(res);
  } catch (err) {
    console.log(err);
  }
});
// app.get("/postedAt", async (req, res) => {

//   var posts = await db.Post.find({})
//   for (var post of posts) {
//     if (!post.postedAt) {
//       post.postedAt = post.updatedAt
//       post.save();
//     }
//   }
//   res.json({ message: "updated successfully" })
// })
function diff_minutes(dt2, dt1) {

  var diff = (dt2.getTime() - dt1.getTime()) / 1000;
  diff /= 60;
  return Math.abs(Math.round(diff));

}

load_model().then(() => {
  app.listen(3011, '0.0.0.0', () => {
    console.log("connection succesfull");
  });
});
