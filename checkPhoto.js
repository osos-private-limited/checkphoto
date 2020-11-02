const db = require("./models");
const axios = require("axios"); //you can use any http client
const tf = require("@tensorflow/tfjs-node");
const nsfw = require("nsfwjs");
const jpeg = require("jpeg-js");
const express = require("express");
const sharp = require("sharp");
const app = express();
app.set("view engine", "ejs");

const checkPhoto = async function () {
  const mine = `https://api.spaarksweb.com/image/image-not-available.png`;
  const data = await db.Replace.find({ status: "ongoing", dupDeleted: true });

  if (data.length) {
    var re = [];
    data.forEach(async (post) => {

      if (post.originalPhoto) {
        const newArray = await photos(post.originalPhoto, post, mine).then(
          async (newArray) => {
            await dbd(post, newArray, mine);
          },
        );
      } else {

      }
    });
  }
};
async function photos(photo, post, mine) {
  var newArray = photo;
  for (const item of photo) {
    const a = await check(item);
    a.forEach(async (list) => {
      if (list.className === "Porn" && list.probability > 0.5) {
        newArray.pull(item);
        newArray.push(mine);

      }
      if (list.className === "Hentai" && list.probability > 0.2) {
        newArray.pull(item);
        newArray.push(mine);

      }
    });
  }

  return newArray;
}

async function check(pics) {

  var responsess = [];
  console.log(pics);
  var pic = await axios.get(`${pics}`, {
    responseType: "arraybuffer",
  });
  var model = await nsfw.load(); // To load a local model, nsfw.load('file://./path/to/model/')
  // Image must be in tf.tensor3d format
  // you can convert image to tf.tensor3d with tf.node.decodeImage(Uint8Array,channels)
  var image = await tf.node.decodeImage(pic.data, 3);
  var predictions = await model.classify(image);
  image.dispose(); // Tensor memory must be managed explicitly (it is not sufficient to let a tf.Tensor go out of scope for its memory to be released).
  responsess.push(predictions[0]);
  responsess.push(predictions[1]);
  return responsess;
}
async function dbd(post, newArray, mine) {


  var stat = "unchanged";
  for (var i of newArray) {
    if (i == mine) {
      stat = "replaced";
    }
  }
  const replace = await db.Replace.findOne({ _id: post._id });
  replace.replacedPhotos = newArray;
  replace.status = stat;
  replace.save();
}




module.exports = checkPhoto;
