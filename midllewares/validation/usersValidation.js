const Joi = require("joi");

const changeSubSchema = Joi.object({
  subscription: Joi.string().valid("starter", "pro", "business").required(),
});

const changeSubValidation = async (req, res, next) => {
  try {
    const value = await changeSubSchema.validateAsync(req.body);
  } catch (err) {
    res.status(400).json({ message: err.message.replace(/"/g, "") });
    return;
  }
  next();
};

module.exports = { changeSubValidation };
