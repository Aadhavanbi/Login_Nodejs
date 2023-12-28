require('dotenv').config();
const express = require('express');
const app = express();
const session = require("express-session");
const flash = require('express-flash');
const path = require('path');
const cookieParser = require("cookie-parser");
// const swaggerJsdoc = require('swagger-jsdoc');
// const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');

app.set('views', path.join(__dirname, 'app\\views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'storage/css')));
app.use(cookieParser());
app.use(session({secret: "secret",saveUninitialized: false ,cookie:{ expires:10000 } ,resave: false}));
app.use(flash());
app.use(express.json());  
app.use(express.urlencoded({ extended: true }));


// Swagger setup
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Password-Based Authentication',
      version: '1.0.0',
      description: 'Documentation for your API',
    },
  },
  // Path to the API specs
  apis: ['./app/routes/routes.js'],
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));




const go_home = require('./app/routes/routes');
const { log } = require('winston');
app.use('/',go_home)

const PORT_NUMBER =  process.env.SERVER_PORT;
app.listen({ port: PORT_NUMBER }, async () => {
  console.log(`Server up on http://localhost:${PORT_NUMBER}`)
})

