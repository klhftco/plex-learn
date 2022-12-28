const axios = require('axios');
var cors = require('cors');
var express = require('express');

var app = express();

app.use(cors());
// app.use((_req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Headers', '*');
//
//   next();
// });

const base = "http://disease.sh/v3/covid-19";

app.get('/countries', async (req, res) => {
  const url = base+'/countries';

  const ret = await axios.get(url)
    .then(response => {
      // console.log(response.data);
      // return response.data;
      return response.data;
    }).catch(err => err);

  res.json(ret);
});

app.get('/global', async (req, res) => {
  const url = base+'/all';

  const ret = await axios.get(url)
    .then(response => {
      // console.log(response.data);
      // return response.data;
      return response.data;
    }).catch(err => err);

  res.json(ret);
});

app.get('/history', async (req, res) => {
  const url = base+'/historical/all?lastdays=all';

  const ret = await axios.get(url)
    .then(response => {
      // console.log(response.data);
      // return response.data;
      return response.data;
    }).catch(err => err);

  res.json(ret);
});

const port = 4000;

app.listen(port, () =>
  console.log(`Server running on http://localhost:${port}`),
);
