const fs = require("fs");
const cloudinary = require("cloudinary").v2;

imageUploader = async (req, res, file, folder) => {
  let images = [];
  const maxSize = 1024 * 1024 * 10;
  try {
    if (file.length > 0) {
      for (i = 0; i < file.length; i++) {
        if (!file[i].mimetype.startsWith("image")) {
          return res.json("Please Upload Image Only");
        }
        if (file[i].size > maxSize) {
          return res.json("Please Upload Image of size less than 10Mb");
        }
        const result = await cloudinary.uploader.upload(file[i].tempFilePath, {
          use_filename: true,
          folder: `uploads/images/` + folder,
        });
        const sendImageToDB = result.secure_url;
        images.push(sendImageToDB);
        fs.unlinkSync(file[i].tempFilePath);
      }
    } else {
      if (!file.mimetype.startsWith("image")) {
        return res.send("Please Upload Image Only");
      }
      if (file.size > maxSize) {
        return res.json("Please Upload Image of size less than 10Mb");
      }
      const result = await cloudinary.uploader.upload(file.tempFilePath, {
        use_filename: true,
        folder: `uploads/images/` + folder,
      });
      const sendImageToDB = result.secure_url;
      images.push(sendImageToDB);
      fs.unlinkSync(file.tempFilePath);
    }
  } catch (error) {
    return res.json(error);
  }
  return images;
};

module.exports = imageUploader;
