module.exports = (err, req, res, next) => {
  console.log("At global error");
  console.log(err);
  if (err.name === "JsonWebTokenError:") {
    res.status(200).json({
      name: err.name,
      // message: err.message,
      message: "Either the token is empty or the token has been tampered with",
      ...err,
    });
  } else {
    res.status(200).json({
      name: err.name,
      message: err.message,
      ...err,
    });
  }
};
