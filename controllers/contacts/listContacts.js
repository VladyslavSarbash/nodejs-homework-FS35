const Contact = require("../../schemas/contactSchema");

const listContacts = async (req, res, next) => {
  const { id: userId } = req.user;
  const { limit = 10, skip = 0, favorite } = req.query;

  try {
    let total = await Contact.find({ owner: userId }).countDocuments();
    let result = Contact.find({ owner: userId }).populate({
      path: "owner",
      select: "name email subscription",
    });
    console.log(typeof favorite);
    result = await result.skip(Number(skip)).limit(Number(limit));
    total = (await result).length;

    if (favorite === "true") {
      result = result.filter((el) => el.favorite === true);
    }

    if (favorite === "false") {
      result = result.filter((el) => el.favorite === false);
    }

    if (result.length > 0) {
      res.status(200).json({
        total,
        data: result,
      });
    } else {
      res.status(404).json({ message: "Contacts not found!" });
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = listContacts;
