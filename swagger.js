const env = require("dotenv").config()
const swaggerAutogen = require('swagger-autogen')();

const local = process.env.LOCAL === 'true';
const schemes = local ? ['http'] : ['https']
const host = local ? 'localhost:8080' : 'cse341-no.onrender.com'
console.log('LOCAL:', local)
console.log(`Generating swagger.json for host: ${host} with schemes: ${schemes}`)

const doc = {
  info: {
    title: 'Project',
    description: 'CSE-341 API'
  },
  host,
  schemes,
  tags: [
    {
      name: 'Contacts',
      description: 'Operations related to contacts', 
    },
  ],
};

const outputFile = './swagger.json';
const routes = ['./routes/index.js'];

swaggerAutogen(outputFile, routes, doc);