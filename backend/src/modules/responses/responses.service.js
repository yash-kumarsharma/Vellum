const prisma = require("../../config/db");

const submitResponse = async (formId, answers) => {
  return prisma.response.create({
    data: {
      formId,
      answers
    }
  });
};

const getFormResponses = async (formId) => {
  return prisma.response.findMany({
    where: { formId },
    orderBy: { createdAt: "desc" }
  });
};

module.exports = { submitResponse, getFormResponses };
