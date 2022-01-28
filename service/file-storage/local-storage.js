const path = require("path");
const fs = require("fs");
const User = require("../../schemas/users");

class localStorage {
  constructor(file, user) {
    this.userId = user.id;
    this.filename = file.filename;
    this.filePath = file.path;
    this.folderAvatars = process.env.FOLDER_FOR_AVATARS;
  }

  async save() {
    const destination = path.join(this.folderAvatars, this.userId);

    await fs.mkdirSync(destination, { recursive: true });

    await fs.renameSync(this.filePath, path.join(destination, this.filename)); // tmp/userId/filename

    const avatarUrl = path.normalize(path.join(this.userId, this.filename)); // userId/filename

    await this.updateAvatar(this.userId, avatarUrl);

    return avatarUrl;
  }

  async updateAvatar(id, avatar) {
    return await User.findOneAndUpdate({ _id: id }, { avatarURL: avatar });
  }
}

module.exports = localStorage;
