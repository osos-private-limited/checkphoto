require("dotenv").config();
const db = require("./models");
const fs = require("fs-extra");
var ffmpeg = require("fluent-ffmpeg");
const sharp = require("sharp");
var ffmpegPath = require("@ffmpeg-installer/ffmpeg").path;
ffmpeg.setFfmpegPath(ffmpegPath);
var command = ffmpeg();
const Sentry = require("@sentry/node");

const deletePhoto = async function () {
  try {
    const replacePost = await db.Replace.find({ dupDeleted: false });
    console.log("inn");
    for (var replace of replacePost) {
      //console.log(replace._id);
      if (!replace.dupDeleted) {
        if (replace.type == "post") {
          const post1 = await db.Post.findOne({
            _id: ObjectId(replace.postId),
          });
          const n = new Date();
          const year = n.getFullYear().toString();
          const month = n.getMonth().toString();
          const name = year + month;
          var date = new Date(post1.createdAt).getTime();
          var photo = [];
          if (post1.photo.length > 0) {

            var i = 0;

            for (var file of replace.duplicatePhotos) {
              const filename = `user-${post1.userId}-${date}-${i + 1}.jpeg`;
              await sharp(
                `${file.path}`,
              )
                .toFormat("jpeg")
                .jpeg({ quality: 70 })
                .toFile(
                  `public/image/post/${name}/${filename}`,
                )
                .catch((err) => {
                  console.log(err);
                });
              var a = false;
              photo.push(
                `https://static-content.spaarksweb.com/image/post/${name}/${filename}`,
              );


              i++;
              a = true;
              if (a) {
                await fs
                  .remove(
                    `${file.path}`,
                  )

                  .catch((err) => {
                    console.log(err);
                  });
              }
            }
          }

          if (post1.video.length > 0) {
            var video = []

            for (var file of replace.video) {
              const videofilename = `user-${post1.userId}-${date}.mp4`;
              var b = false;
              await ffmpeg(`${file.path}`)
                .audioCodec("libmp3lame")
                .videoCodec("libx264")
                // .size("640x480")
                .size("50%")
                .on("error", function (err) {
                  console.log("An error occurred: " + err.message);
                })
                .on("end", function () {
                  b = true;
                  console.log("Processing finished !");
                })
                .save(`public/image/post/${name}/${videofilename}`);

              video.push(
                `${process.env.HEADER}/image/post/${name}/${videofilename}`,
              );

              console.log(video)
              post1.video = video;


              // }
              var removevideos = setInterval(async () => {
                if (b) {
                  await fs
                    .remove(
                      `${file.path}`,
                    ).catch((err) => {
                      console.log(err);
                    });
                  post1.replaced = true;

                  replace.originalVideo = video;
                  replace.originalPhoto = photo;
                  replace.dupDeleted = true;

                  clearInterval(removevideos)

                }
              }, 2000)

            }
          }
          post1.photo = photo;
          post1.replaced = true;
          post1.save()
          replace.dupDeleted = true;
          replace.originalPhoto = photo;
          replace.save();
        } else {
          console.log('subpppppppppppppppppppppppppppppost');

          const post1 = await db.SubPost.findOne({
            _id: ObjectId(replace.postId),
          });
          const n = new Date();
          const year = n.getFullYear().toString();
          const month = n.getMonth().toString();
          const name = year + month;
          var date = new Date(post1.createdAt).getTime();
          if (post1.photo.length > 0) {
            var photo = [];
            var i = 0;

            for (var file of replace.duplicatePhotos) {
              const filename = `user-${post1.userId}-${date}-${i + 1}.jpeg`;
              await sharp(
                `${file.path}`,
              )
                .toFormat("jpeg")
                .jpeg({ quality: 70 })
                .toFile(
                  `public/image/post/${name}/${filename}`,
                )
                .catch((err) => {
                  console.log(err);
                });
              var a = false;
              photo.push(
                `${process.env.HEADER}/image/post/${name}/${filename}`,
              );
              post1.photo = photo;

              i++;
              a = true;
              if (a) {
                await fs
                  .remove(
                    `${file.path}`,
                  )

                  .catch((err) => {
                    console.log(err);
                  });
              }
            }
          }
          post1.replaced = true;
          post1.save();
          replace.originalVideo = video;
          replace.originalPhoto = photo;
          replace.dupDeleted = true;
          replace.save();
        }
      }
    }
  } catch (err) {
    console.log(err.stack.split("\n")[0]);
    Sentry.captureException(err); console.log(err.stack.split('\n')[1]);
    console.log(err.stack.split("\n")[1]);
    console.log("------------------------------------------------>");
  }
};
//
module.exports = deletePhoto;
