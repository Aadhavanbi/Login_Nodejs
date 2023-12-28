const db = require('../models/index');
const dbconnect = db.User;
const bcrypt = require('bcrypt');
const saltRounds = 10;
const {logMsg} = require('../logger/logger')


// Start the User Logout 
module.exports.logout = async (req, res, next) => {
    try {
        console.log('Logout');
        res.cookie('email', '', { expires: new Date(0) });
        res.cookie('UserDetial', '', { expires: new Date(0) });
        res.cookie('displayName', '', { expires: new Date(0) });
        //   req.logout();
        req.session.destroy();
        res.redirect('/');
    } catch (error) {
        logMsg.info("Logout ->Internal Server Error!");

        // Handle errors appropriately (e.g., log the error)
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}


// Start  Home Page 
module.exports.homepage = async (req, res, next) => {
    try {
        const errorMessage = req.flash('error')[0];
        var user = req.cookies.UserDetial
        var email = req.cookies.email
        if (user && email) {
            res.redirect('/testsession')
        }
        res.cookie('register', '', { expires: new Date(0) });
        res.render('homepage', {
            title: 'User Register...',
            errorMessage
        });
    } catch (error) {
        logMsg.info("Homepage ->Internal Server Error!");

        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}


// Start Dashboard  User Details in DB 
module.exports.loginview = async (req, res, next) => {
    try {
        const emailid = req.body.email;
        const password = req.body.password;
        const user = await dbconnect.findOne({ where: { email: emailid } });
        const comparison = await bcrypt.compare(password, user.dataValues.password)

        if (comparison) {
            logMsg.info("User Enter Data and DB Same!");
            res.cookie('UserDetial', user, { maxAge: 20000, httpOnly: true });
            res.cookie('email', req.body.email, { maxAge: 20000, httpOnly: true });
            res.redirect('/testsession');
        } else {
            logMsg.info("Invalid username or password!");
            res.send({ status: 404, message: "Login Failed", data: "Invalid username or password" });
            // req.flash('error', 'Invalid username or password');
            // res.redirect('/');
        }
    } catch (error) {
        logMsg.info("Loginview ->Internal Server Error!");
        console.error(error);
        req.flash('error', 'Internal Server Error');
        res.redirect('/');
    }
}


// Start Go to Register Page
module.exports.add = async (req, res, next) => {
    try {
        res.cookie('register', 'true', { maxAge: 60000, httpOnly: true });
        res.render('register', {
            title: 'Add Author ...',
        });
    } catch (error) {
        logMsg.info("Add ->Internal Server Error!");

        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};


//Start Store the New User In DB
module.exports.addUser = async (req, res, next) => {
    try {
        const password = req.body.password;
        const encryptedPassword = await bcrypt.hash(password, saltRounds)
        const info = {
            user_name: req.body.user_name,
            email: req.body.email,
            password: encryptedPassword,
            mobile_number: req.body.mobile_number,
        }
        const datastore = await dbconnect.create(info);
        if (datastore) {
            logMsg.info("User Add Successfully!");

          res.send({ status: 200, message: "Success", data: datastore });
            // res.redirect('/')
        } else {
            logMsg.info("User Not Added!");

            res.status(500).send('Ops... ')
        }
        res.end()
    } catch (error) {
        logMsg.info("AddUser ->Internal Server Error!", error);
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}


//  Start This is Check the Cookie and Dashboard page
module.exports.testsession = async (req, res, next) => {
    try {
        if (req.cookies.email) {

            const user = await dbconnect.findOne({ where: { email: req.cookies.email } });
            if (user) {
                logMsg.info("Enter Data and DB Data are same!");

              res.send({ status: 200, message: "Login Success", data: user });
              // res.render('authorlogined', {
                //     user
                // })
            }else{
                logMsg.info("Enter Data not Same in DB , User Not Register!");

                res.send({ status: 404, message: "Login Failed", data: "User Not Register" });
            }
        } else {
            logMsg.info("Enter Data not Same in DB , User Not Register!");

          res.send({ status: 404, message: "Login Failed", data: "User Not Register" });
            // res.redirect('/')
        }
    } catch (error) {
        logMsg.info("Testsession ->Internal Server Error!");
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}

