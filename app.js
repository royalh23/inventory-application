const genresRouter = require('./routes/genresRouter');
const gamesRouter = require('./routes/gamesRouter');
const indexRouter = require('./routes/indexRouter');
const express = require('express');
const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use('/genres', genresRouter);
app.use('/games', gamesRouter);
app.use('/', indexRouter);
app.get('*', (req, res) => {
  res.render('notFound', { title: 'Not Found' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
