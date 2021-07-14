const elasticsearch = require('elasticsearch');
const ESclient = new elasticsearch.Client({
  node: 'http://elasticsearch:9200',
});

module.exports = ESclient;
