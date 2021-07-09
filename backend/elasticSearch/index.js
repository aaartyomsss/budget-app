const elasticsearch = require('elasticsearch');
const ESclient = elasticsearch.Client({
  host: 'localhost:9200',
});

module.exports = ESclient;
