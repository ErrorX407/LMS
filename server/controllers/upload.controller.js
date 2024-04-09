import aws from "aws-sdk";
import { nanoid } from "nanoid";

// Setting Up S3 Bucket
const s3 = new aws.S3({
  region: "ap-south-1",
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const generateUploadURL = async () => {
  const date = new Date();
  const imageName = `${nanoid()}-${date.getTime()}.jpeg`;

  return await s3.getSignedUrlPromise("putObject", {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: imageName,
    ContentType: "image/jpeg",
    Expires: 2000,
    // Expires: 60 * 60 * 24 * 365
  });
};

export const getUploadURL = (req, res) => {
  generateUploadURL()
    .then((url) => res.status(200).json({ uploadURL: url }))
    .catch((err) => {
        console.log(err.message)
        return res.status(500).json({Error: err.message});
    });
};
