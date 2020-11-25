const mongoose = require("mongoose");

//mongoose.set("debug", true);
mongoose.Promise = Promise;
//mongodb+srv://osos:${process.env.DBPASSWORD}@ososdb-5wqhs.mongodb.net
mongoose.connect(
  `mongodb://127.0.0.1:27017/cloud?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  },
  (err, db) => {
    if (err) throw err;
  },
);

// module.exports.Replace = require("./checkPhotoModel");
// module.exports.User = require("./userModel");
// module.exports.Post = require("./postModel");
// module.exports.Admin = require("./adminModel");
module.exports.Backup = require("./backupModel");

module.exports.Visit = require("./apiVisit");
module.exports.DeletedUser = require("./deletedUsersModel");
module.exports.User = require("./userModel");
module.exports.Config = require("./configModel");
module.exports.Property = require("./propertiesModel");
module.exports.Category = require("./categoryModel");
module.exports.Replace = require("./checkPhotoModel");
module.exports.Post = require("./postModel");
module.exports.Report = require("./reportModel");
module.exports.Comment = require("./commentModel");
module.exports.Location = require("./locationModel");
module.exports.SubPost = require("./subPostModel");
module.exports.Order = require("./orderModel");
module.exports.Ticket = require("./ticketingModel");
module.exports.Share = require("./shareModels");
module.exports.DeletedUser = require("./deletedUsersModel");
module.exports.WebLogin = require("./webLogins");
module.exports.Activation = require("./activationModel");
module.exports.Employee = require("./employeeModel");
module.exports.Apptour = require("./appTourModel");
module.exports.Message = require("./emergencymessage");
module.exports.Admin = require("./adminModel");
module.exports.MapData = require("./mapdata");
