const express = require('express');
const {registerUser, loginUser, authorizeUser, userProfile,signoutUser, updateUser, addInterest, getInterest, searchUser} = require('../controllers/userControllers');
const { CreateLog, AddtoLog, GetUserFromLog} = require('../controllers/callControllers');
const { LoggedInRequired } = require('../middlewares/authMiddleware');
const router = express.Router();

//Routes for different functions
router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/authorize').get(LoggedInRequired, authorizeUser);
router.route('/logout').get(LoggedInRequired, signoutUser);
router.route('/profile').get(LoggedInRequired, userProfile);
router.route('/update_profile').patch(LoggedInRequired, updateUser);
router.route('/add_interest').patch(LoggedInRequired, addInterest);
router.route('/get_interest').get(LoggedInRequired, getInterest);
router.route('/search').get(LoggedInRequired, searchUser);
router.route('/call/CreateCallLog').post(CreateLog);
router.route('/call/AddUsertoLog').patch(AddtoLog);
router.route('/call/GetCallLog').get(LoggedInRequired, GetUserFromLog);

module.exports=router