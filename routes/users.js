const express = require('express');
const router = express.Router();
const passport = require('passport');

const usersController = require('../controllers/users_controller');

router.get('/profile/:id',passport.checkAuthentication, usersController.profile);

router.get('/sign-up', usersController.signUp);
router.get('/sign-in', usersController.signIn);


router.post('/create', usersController.create);
router.get('/sign-out',usersController.signOut);

// use passport as a middleware to authenticate
router.post('/create-session', passport.authenticate(
    'local',
    {failureRedirect: '/users/sign-in'},
), usersController.createSession);
router.post('/update/:id',passport.checkAuthentication,usersController.update);
router.get('/add_remove_friend/:id',passport.checkAuthentication,usersController.add_remove_friends);
router.get('/auth/google' , passport.authenticate('google',{scope:['profile','email']}));
router.get('/auth/google/callback',passport.authenticate('google',{failureRedirect:'/users/sign-in'}),usersController.createSession);
router.get('/forgot-password',usersController.forgotPassword);
router.post('/reset-email',usersController.resetEmail);
router.get('/reset-password/:token',usersController.linkResetPassword);
router.post('/new-password',usersController.newPassword);



module.exports = router;