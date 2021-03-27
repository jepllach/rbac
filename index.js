require("dotenv").config()

const express = require('express')
const bodyParser = require('body-parser')

const app = express()
const port = process.env.APP_PORT

//SETTING

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

//IMPORT
const router = require("./routes/routes")



//CONTROLLERS


//MIDDLEWARE

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', process.env.SOLICITUDES_DESDE);
  res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Allow', 'GET, POST, PUT, DELETE');
  next();
});

//ROUTES
app.use(router)


app.listen(port, () => {
  console.log(`Servidor -encendido-`)
})