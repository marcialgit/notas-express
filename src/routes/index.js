const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  //res.send('Index inicial');
  //res.render('index.hbs'); // cuando no está configurado el motor de plantillas
  //res.render('index');
  res.render('index');
});

router.get('/about', (req, res) => {
  res.render('about');
  //res.render('about.hbs');
  //res.send('Acerca de la aplicación');
});

module.exports = router;