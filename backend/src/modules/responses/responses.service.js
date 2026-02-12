const prisma = require("../../config/db");
const { getIO } = require("../../config/socket");

const submitResponse = async (formId, answers) => {
  const response = await prisma.response.create({
    data: { formId, answers }
  });

  // 🔥 Emit realtime update
  try {
    getIO().to(`form:${formId}`).emit("response:new", {
      formId,
      responseId: response.id
    });
  } catch (err) {
    console.error("Realtime update failed:", err.message);
  }

  return response;
};

const getFormResponses = async (formId) => {
  return prisma.response.findMany({
    where: { formId },
    orderBy: { createdAt: "desc" }
  });
};

module.exports = { submitResponse, getFormResponses };
