const Joi = require("joi");

const validationSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
});

const signup = async (req, res, next) => {
  try {
    const value = await validationSchema.validateAsync(req.body);
  } catch (err) {
    res.status(400).json({ message: err.message.replace(/"/g, "") });
    return;
  }
  next();
};

const login = async (req, res, next) => {
  try {
    const value = await validationSchema.validateAsync(req.body);
  } catch (err) {
    res.status(400).json({ message: err.message.replace(/"/g, "") });
    return;
  }
  next();
};

module.exports = { signup, login };
