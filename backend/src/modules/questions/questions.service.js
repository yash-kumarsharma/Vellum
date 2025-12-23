const prisma = require("../../config/db");
const { getIO } = require("../../config/socket");

const addQuestion = async (formId, data) => {
  const question = await prisma.question.create({
    data: {
      formId,
      type: data.type,
      label: data.label,
      options: data.options || null,
      required: data.required || false,
      order: data.order
    }
  });

  getIO().to(`form:${formId}`).emit("question:added", question);
  return question;
};

const getFormQuestions = async (formId) => {
  return prisma.question.findMany({
    where: { formId },
    orderBy: { order: "asc" }
  });
};

const updateQuestion = async (id, data) => {
  return prisma.question.update({
    where: { id },
    data
  });
};

const deleteQuestion = async (id) => {
  return prisma.question.delete({ where: { id } });
};

module.exports = {
  addQuestion,
  getFormQuestions,
  updateQuestion,
  deleteQuestion
};
