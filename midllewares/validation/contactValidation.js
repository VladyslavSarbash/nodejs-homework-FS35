const Joi = require("joi");

const validationSchema = Joi.object({
  name: Joi.string().alphanum().max(30).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
  favorite: Joi.boolean().optional(),
});

const updateSchema = Joi.object({
  name: Joi.string().alphanum().max(30).optional(),
  email: Joi.string().email().optional(),
  phone: Joi.string().optional(),
  favorite: Joi.boolean().optional(),
}).or("name", "email", "phone", "favorite");

const favoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

const querySchema = Joi.object({
  limit: Joi.number().min(5).max(100).optional(),
  skip: Joi.number().min(0).optional(),
  favorite: Joi.boolean().optional(),
});

const favoriteValidation = async (req, res, next) => {
  try {
    const value = await favoriteSchema.validateAsync(req.body);
  } catch (err) {
    res.status(400).json({ message: err.message.replace(/"/g, "") });
    return;
  }
  next();
};

const queryValidate = async (req, res, next) => {
  try {
    const value = await querySchema.validateAsync(req.body);
  } catch (err) {
    res.status(400).json({ message: err.message.replace(/"/g, "") });
    return;
  }
  next();
};

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
  favoriteValidation,
  queryValidate,
};
