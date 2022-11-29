const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express()
const port = process.env.PORT || 5000;
// const axios = require('axios').default;
var bodyParser = require('body-parser');

var jsonParser = bodyParser.json();

require('dotenv').config();

app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.mtryllz.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
  try{
    const categoryCollection = client.db('resaleProducts').collection('categories');
    const productsCollection = client.db('resaleProducts').collection('products');

    app.get('/categories', async(req,res) =>{
      const query = {};
      const cursor = categoryCollection.find(query);
      const categories = await cursor.toArray();
      res.send(categories);

    })

    app.get('/categories/:id',async(req,res) =>{
      const id = req.params.id;
      const query = {categoryId: id};
  
      const cursor = productsCollection.find(query);
      const products = await cursor.toArray();
      res.send(products);
      
    })

  }
  finally{

  }
}
run().catch(error => console.log(error));



app.get('/', (req, res) => {
    res.send('Hello World!')
  })
  
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })