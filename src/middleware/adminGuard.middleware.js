module.exports = (req, res, next) => {
  const { role } = req.user;
  if (!role) {
    return res.formatResponse("Permission denied", 403);
  }
  if (role !== "admin") {
    return res.formatResponse("Permission denied", 403);
  }
  next();
};
