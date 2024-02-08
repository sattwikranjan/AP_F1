const dummyAuthorization = (req, res, next) => {
  try {
    req.user = {
      isAdmin: false,
    };
    if (!req.user || !req.user.isAdmin) {
      res.sendStatus(401);
      return;
    }

    next();
  } catch (error) {
    res.status(403).json({ message: error.message });
  }
};

module.exports = dummyAuthorization;
