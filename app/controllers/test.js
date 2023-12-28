
//////// Start Oauth CallBack
module.exports.protected = async(req, res, next )=>{

    const user = await dbconnect.findOne({where:{email: req.user.email}});
    console.log(user);
    console.log(req.cookies.register);
    if (req.cookies.register ) {      
      if (user) {
          res.render('alert',{
            email:req.user.email,
            text:"Your Mail Id is Already Register",
          })
      } else {
          const info ={
            user_name: req.user.displayName,
            email: req.user.email,
          }
          const datastore= await dbconnect.create(info);  
          if (datastore) {
            res.redirect('/')
          } else {
            res.status(500).send('Ops... ')
          }
        }
    }else{
      if (user == null) {
        const info ={
          user_name: req.user.displayName,
          email: req.user.email,
        }
        const datastore= await dbconnect.create(info);  
        if (datastore) {
          res.cookie('email', req.user.email, { maxAge: 20000, httpOnly: true });
          res.redirect('/testsession');
        } else {
          res.status(500).send('Ops... ')
        }
      }else{
        res.cookie('email', req.user.email, { maxAge: 20000, httpOnly: true });
        res.redirect('/testsession');
      }
    }
  }
//////// End Oauth CallBack








// //////////////////////  hashed password


const key = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);

// Mock user-entered password for encryption
const userEnteredPassword = req.body.password;

// Encrypt the password
const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
let encryptedPassword = cipher.update(userEnteredPassword, 'utf-8', 'hex');
encryptedPassword += cipher.final('hex');

console.log('Encrypted Password:', encryptedPassword);

// Decrypt the password
const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
let decryptedPassword = decipher.update(encryptedPassword, 'hex', 'utf-8');
decryptedPassword += decipher.final('utf-8');

console.log('Decrypted Password:', decryptedPassword);


///////////////////////