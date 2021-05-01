const success = (res, data) => {
  res.status(200).send({ message: "success", data: data });
};

const failed = (res, statusCode, message) => {
  res.status(statusCode).send({ errors: [{ message, data: null }] });
};

module.exports = { success, failed };
