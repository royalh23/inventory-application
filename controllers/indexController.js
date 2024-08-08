const getIndex = (req, res) => {
  res.render('index', { title: 'Home' });
};

module.exports = { getIndex };
