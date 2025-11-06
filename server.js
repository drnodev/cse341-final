const env             = require("dotenv").config()
const express         = require('express');
const bodyParser      = require('body-parser');
const mongodb         = require('./db/connect');
const swaggerUi       = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');


const app = express();
const port = process.env.PORT || 8080;

app
.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
.use(bodyParser.json())
.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json');
  next();
})
.use('/', require('./routes'));

app.listen(port, () => {
    console.log(`app listening on ${port}`)
    mongodb.initDb()
})
