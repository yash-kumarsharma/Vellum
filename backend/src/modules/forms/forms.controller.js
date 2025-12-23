const formService = require("./forms.service");

const create = async (req, res, next) => {
  try {
    const form = await formService.createForm(
      req.body.title,
      req.user.userId
    );
    res.status(201).json(form);
  } catch (err) {
    next(err);
  }
};

const list = async (req, res, next) => {
  try {
    const forms = await formService.getUserForms(req.user.userId);
    res.json(forms);
  } catch (err) {
    next(err);
  }
};

const getPublic = async (req, res, next) => {
  try {
    const form = await formService.getPublicForm(req.params.id);
    if (!form) return res.status(404).json({ message: "Form not found" });
    res.json(form);
  } catch (err) {
    next(err);
  }
};

module.exports = { create, list, getPublic };
