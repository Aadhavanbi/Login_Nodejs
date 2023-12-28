const express = require('express');
const router = express.Router();
const Mycontroller = require('../controllers/userController');

const bodyParser = require('body-parser');

const app = express();

// Use body-parser middleware
app.use(bodyParser.urlencoded({ extended: true }));



router.get('/testsession', Mycontroller.testsession)   

// router.get('/protected', Mycontroller.protected)    



/**
 * @swagger
 * /:
 *   get:
 *     summary: Home page
 *     description: Get values for the home page.
 *     responses:
 *       200:
 *         description: Successful response
 *       500:
 *         description: Internal Server Error
 */

router.get('/', Mycontroller.homepage)





router.get('/add', Mycontroller.add)




/**
 * @swagger
 * /loginview:
 *   post:
 *     summary: User login
 *     description: Log in and generate a JWT token.
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email: 
 *                 type: 
 *               password:
 *                 type: 
 *             required:
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: User created successfully
 *       404:
 *         description: Bad request
 */

router.post('/loginview',Mycontroller.loginview); 

router.get('/logout',Mycontroller.logout);  



/**
 * @swagger
 * definitions:
 *   User:
 *     type: object
 *     properties:
 *       user_name:
 *         type: string
 *       email:
 *         type: string
 *         format: email
 *       password:
 *         type: string
 *         format: password
 *       mobile_number:
 *         type: string
 *         format: tel
 */

/**
 * @swagger
 * /addUser:
 *   post:
 *     summary: Create a new user
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/User'
 *     responses:
 *       200:
 *         description: User created successfully
 *       404:
 *         description: Bad request
 *       500:
 *         description: Internal Server Error
 */

// Your existing code for handling registration goes here


router.post('/addUser',Mycontroller.addUser)  


module.exports = router