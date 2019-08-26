const express = require('express');
const router = express.Router();

const User = require('../models/User');

const passport = require('passport');

router.get('/users/singin', (req, res) => {
  //res.send('Ingresando a la aplicación');
  res.render('users/singin');
});

router.post('/users/singin', passport.authenticate('local', {
  successRedirect: '/notes', 
  failureRedirect: '/users/singin',
  failureFlash: true
}));


router.get('/users/singup', (req, res) => {
  //res.send('Formulario de autenticación en la aplicación');
  res.render('users/singup');
});

router.post('/users/singup', async (req, res) => {
  //console.log(req.body);
  const {name, email, password, confirm_password} = req.body;
  const errors = [];
  if (name.length < 1) { errors.push({text:'debe agregar un nombre'})}
  if (email.length < 1) { errors.push({text:'debe agregar un coreo electrónico'})}
  if (password.length < 1) { errors.push({text:'debe agregar una contraseña'})}
  if (password != confirm_password) { errors.push({text:'las contraseñas no coinciden'})}
  if (password.length < 4) { errors.push({text:'la contraseña debe ser de al menos 4 caracteres'})}
  if (errors.length > 0) {
    res.render('users/singup', {errors, name, email, password, confirm_password})
  } else {
    //res.send('ok');
    const emailUser = await User.findOne({email: email});
    if (emailUser) {
      // lo que está comentado debería ser loq ue se busca al final (flashdata con los errores)
      //req.flash('error', 'el correo indicado ya se encurntra en uso');
      //res.redirect('/users/singup');
      errors.push({text: 'el correo indicado ya se encurntra en uso'});
      res.render('users/singup', {errors, name, email, password, confirm_password})
    } else { // no debería ser necesario meter el resto de código en el else, pero lo hago con el fin de que quede claro el bucle
      const newUser = new User({name, email, password});
      newUser.password = await newUser.encryptPassword(password);
      await newUser.save();
      req.flash('success_msg', 'has sido registrado exitosamente');
      res.redirect('/users/singin');
    }
  }

  //res.render('users/singup');
});

router.get('/users/logout', (req, res) => {
  req.logOut();
  res.redirect('/');
});

module.exports = router;