const prisma = require("../../config/db");

const createForm = async (title, userId) => {
  return prisma.form.create({
    data: {
      title,
      ownerId: userId
    }
  });
};

const getUserForms = async (userId) => {
  return prisma.form.findMany({
    where: { ownerId: userId }
  });
};

const getPublicForm = async (id) => {
  return prisma.form.findFirst({
    where: { id, isPublic: true },
    include: { questions: true }
  });
};

module.exports = { createForm, getUserForms, getPublicForm };
