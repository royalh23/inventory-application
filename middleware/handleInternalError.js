module.exports = (err, req, res, next) => {
  res.status(500).render('internalError', { title: 'Internal Server Error' });
};
