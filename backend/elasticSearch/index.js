const elasticsearch = require('elasticsearch');
const ESclient = new elasticsearch.Client({
  host: process.env.ELASTICSEARCH_HOST,
});

module.exports = ESclient;
