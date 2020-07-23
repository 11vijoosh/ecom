const express = require('express');
const bodyparser = require('body-parser');
const path = require('path');
const cors = require('cors');

const PORT = 3000;

const userApi =  require('./routes/user');
const productsApi =  require('./routes/products');
const app = express();
app.use(cors());

app.use(bodyparser.json());

// Serve static files....
app.use(express.static(__dirname + '/dist/ecommerce'));

app.use('/user',userApi);
app.use('/products',productsApi);


// Send all requests to index.html
app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname + '/dist/ecommerce/index.html'));
  });
// default Heroku PORT
app.listen(process.env.PORT || 3000);  

// app.listen(PORT, () => {
//     console.log(`server is  running on port ${PORT}`);
// });