const prisma = require("../../config/db");

const addCollaborator = async (formId, userId, role) => {
  return prisma.collaborator.create({
    data: { formId, userId, role }
  });
};

const getCollaborators = async (formId) => {
  return prisma.collaborator.findMany({
    where: { formId }
  });
};

module.exports = { addCollaborator, getCollaborators };
