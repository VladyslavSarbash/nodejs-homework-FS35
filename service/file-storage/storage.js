const Jimp = require("jimp");

class fileStorage {
  constructor(Storage, file, user) {
    this.storage = new Storage(file, user);
    this.pathFile = file.path;
  }

  async updateAvatar() {
    await this.transformAvatar(this.pathFile);
    const userUrlAvatar = await this.storage.save();
    return userUrlAvatar;
  }
  async transformAvatar(pathFile) {
    const picture = await Jimp.read(pathFile);
    // обрезание и центрирование аватарки
    await picture
      .autocrop()
      .cover(
        200,
        200,
        Jimp.HORIZONTAL_ALIGN_CENTER | Jimp.VERTICAL_ALIGN_MIDDLE
      )
      .writeAsync(pathFile);
  }
}

module.exports = fileStorage;
