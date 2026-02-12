const prisma = require("../../config/db");

const createForm = async (userId, data) => {
  const { title, description, questions } = data;
  return prisma.form.create({
    data: {
      title: title || "Untitled form",
      description,
      ownerId: userId,
      questions: {
        create: questions?.map((q, index) => ({
          type: q.type,
          label: q.label,
          required: q.required || false,
          options: q.options || [],
          order: index
        }))
      }
    },
    include: { questions: true }
  });
};

const getUserForms = async (userId) => {
  return prisma.form.findMany({
    where: { ownerId: userId },
    include: {
      _count: {
        select: { responses: true }
      }
    },
    orderBy: { createdAt: 'desc' }
  });
};

const deleteForm = async (id, userId) => {
  // Verify ownership
  const existing = await prisma.form.findUnique({ where: { id } });
  if (!existing || existing.ownerId !== userId) {
    throw new Error("Form not found or unauthorized");
  }

  return prisma.form.delete({ where: { id } });
};

const getPublicForm = async (id) => {
  return prisma.form.findFirst({
    where: { id, isPublic: true },
    include: { questions: true }
  });
};

const getFormById = async (id, userId) => {
  const form = await prisma.form.findUnique({
    where: { id },
    include: { questions: { orderBy: { order: 'asc' } } }
  });
  if (!form || form.ownerId !== userId) {
    throw new Error("Form not found or unauthorized");
  }
  return form;
};

const updateForm = async (id, userId, data) => {
  const { title, description, questions, isPublic } = data;

  // Verify ownership
  const existing = await prisma.form.findUnique({ where: { id } });
  if (!existing || existing.ownerId !== userId) {
    throw new Error("Form not found or unauthorized");
  }

  return prisma.$transaction(async (tx) => {
    // Update form basic info
    const updatedForm = await tx.form.update({
      where: { id },
      data: { title, description, isPublic }
    });

    if (questions) {
      // For simplicity in this implementation, we'll replace existing questions
      // A more robust approach would be to diff them, but for FormBuilder's 'Save' flow, replacement is often cleaner
      await tx.question.deleteMany({ where: { formId: id } });

      for (const [index, q] of questions.entries()) {
        await tx.question.create({
          data: {
            formId: id,
            type: q.type,
            label: q.label,
            required: q.required || false,
            options: q.options || [],
            order: index
          }
        });
      }
    }

    return tx.form.findUnique({
      where: { id },
      include: { questions: true }
    });
  });
};

module.exports = { createForm, getUserForms, getPublicForm, updateForm, deleteForm, getFormById };
