const getMe = async (req, res) => {
  const { _id, name, email, avatarUrl } = req.user;

  res.status(200).json({ _id, name, email, avatarUrl });
};

module.exports = { getMe };
