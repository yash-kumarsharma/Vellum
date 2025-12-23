const service = require("./questions.service");

const add = async (req, res, next) => {
  try {
    const question = await service.addQuestion(
      req.params.formId,
      req.body
    );
    res.status(201).json(question);
  } catch (err) {
    next(err);
  }
};

const list = async (req, res, next) => {
  try {
    const questions = await service.getFormQuestions(req.params.formId);
    res.json(questions);
  } catch (err) {
    next(err);
  }
};

const update = async (req, res, next) => {
  try {
    const question = await service.updateQuestion(
      req.params.id,
      req.body
    );
    res.json(question);
  } catch (err) {
    next(err);
  }
};

const remove = async (req, res, next) => {
  try {
    await service.deleteQuestion(req.params.id);
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};

module.exports = { add, list, update, remove };
