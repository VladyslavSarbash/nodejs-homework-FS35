const Joi = require("joi");

const validationSchema = Joi.object({
  name: Joi.string().alphanum().max(30).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
});

const updateSchema = Joi.object({
  name: Joi.string().alphanum().max(30).optional(),
  email: Joi.string().email().optional(),
  phone: Joi.string().optional(),
}).or("name", "email", "phone");

const addAndReplacementValidate = async (req, res, next) => {
  try {
    const value = await validationSchema.validateAsync(req.body);
  } catch (err) {
    res.status(400).json({ message: err.message.replace(/"/g, "") });
    return;
  }
  next();
};

const updateValidate = async (req, res, next) => {
  try {
    const value = await updateSchema.validateAsync(req.body);
  } catch (err) {
    const [details] = err.details;
    if (details.type === "object.missing") {
      res.status(400).json({ message: "missing fields" });
      return;
    }
  }
  next();
};

module.exports = {
  addAndReplacementValidate,
  updateValidate,
};
