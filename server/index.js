const keys = require('./keys');

// Express App SetUp
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

//postgres client SetUp
 const { Pool } = require('pg');
 const pgClient = new Pool({
     user: Keys.pgUser,
     host: Keys.pgHost,
     database: Keys.pgDatabase,
     password: Keys.pgPassword,
     port: keys.pgPort
 });

 pgClient.on('error', () => console.log('Lost PG Connection'));

 pgClient.query('CREATE TABLE IF NOT EXISTS values (number INT)')
 .catch((err=> console.log(err)));

 //Redis Client SetUp

 const redis  = require('redis');
 const redisClient = redis.createClient({
     host: Keys.redisHost,
     port: Keys.redisPort,
     retry_strategy: () => 1000
 });

 const redisPublisher = redisClient.duplicate()
