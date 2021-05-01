const asyncHandler = (handler) => {
  return async (req, res, next) => {
    try {
      await handler(req, res);
      next();
    } catch (error) {
      console.log(error);
      const errorMessage = error.message;
      if (errorMessage.startsWith("E11000")) {
        return res
          .status(500)
          .send({ errors: [{ message: "User already exists", data: null }] });
      }
      return res
        .status(500)
        .send({ errors: [{ message: "server error", data: null }] });
      //next();
    }
  };
};

module.exports = asyncHandler;
