module.exports = (err, req, res, next) => {
  console.error(err);
  res.status(500).render('internalError', { title: 'Internal Server Error' });
};
