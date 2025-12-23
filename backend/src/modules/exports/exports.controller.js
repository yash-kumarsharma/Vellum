const service = require("./exports.service");

const exportExcel = async (req, res, next) => {
  try {
    const workbook = await service.exportResponsesToExcel(req.params.formId);

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=responses.xlsx"
    );

    await workbook.xlsx.write(res);
    res.end();
  } catch (err) {
    next(err);
  }
};

module.exports = { exportExcel };
