const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express()
const port = process.env.PORT || 5000;

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
    const bookingsCollection = client.db('resaleProducts').collection('bookings');

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

    app.post('/bookings',async(req,res) =>{
        const booking = req.body;
        console.log(booking)
        const result = await bookingsCollection.insertOne(booking);
        res.send(result)
    })

  }
  finally{

  }
}
run().catch(error => console.log(error));


app.get('/', (req, res) => {
    res.send('Hello Earth!')
  })
  
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })