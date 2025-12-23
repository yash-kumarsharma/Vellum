const prisma = require("../../config/db");
const { getIO } = require("../../config/socket");

const submitResponse = async (formId, answers) => {
  const response = await prisma.response.create({
    data: { formId, answers }
  });

  // 🔥 Emit realtime update
  getIO().to(`form:${formId}`).emit("response:new", {
    formId,
    responseId: response.id
  });

  return response;
};

const getFormResponses = async (formId) => {
  return prisma.response.findMany({
    where: { formId },
    orderBy: { createdAt: "desc" }
  });
};

module.exports = { submitResponse, getFormResponses };
