const service = require("./collaborators.service");

const add = async (req, res, next) => {
  try {
    const collaborator = await service.addCollaborator(
      req.params.formId,
      req.body.userId,
      req.body.role
    );
    res.status(201).json(collaborator);
  } catch (err) {
    next(err);
  }
};

const list = async (req, res, next) => {
  try {
    const collaborators = await service.getCollaborators(req.params.formId);
    res.json(collaborators);
  } catch (err) {
    next(err);
  }
};

module.exports = { add, list };
