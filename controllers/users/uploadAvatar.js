const {
  uploadFileService,
  localFileService,
} = require("../../service/file-storage");

const uploadAvatar = async (req, res, next) => {
  const uploadService = new uploadFileService(
    localFileService,
    req.file,
    req.user
  );

  const avatarUrl = await uploadService.updateAvatar();
  res.status(200).json({ data: { avatarUrl } });
};

module.exports = uploadAvatar;
