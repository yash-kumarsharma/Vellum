const service = require("./responses.service");

const submit = async (req, res, next) => {
  try {
    const response = await service.submitResponse(
      req.params.formId,
      req.body.answers
    );
    res.status(201).json({ message: "Response submitted", response });
  } catch (err) {
    next(err);
  }
};

const list = async (req, res, next) => {
  try {
    console.log('Fetching responses for formId:', req.params.formId);
    const responses = await service.getFormResponses(req.params.formId);
    console.log('Found responses count:', responses.length);
    res.json(responses);
  } catch (err) {
    next(err);
  }
};

module.exports = { submit, list };
