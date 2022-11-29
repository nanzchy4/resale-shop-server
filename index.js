const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express()
const port = process.env.PORT || 5000;

require('dotenv').config();

app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.mtryllz.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
  try{
    const categoryCollection = client.db('resaleProducts').collection('categories');
    const sofaCollection = client.db('resaleProducts').collection('sofa');

    app.get('/categories', async(req,res) =>{
      const query = {};
      const cursor = categoryCollection.find(query);
      const categories = await cursor.toArray();
      res.send(categories);

    })

    app.get('/categories/:id',async(req,res) =>{
      const id = req.params.id;
      const query = {_id: ObjectId(id)};
      const cursor = sofaCollection.find(query);
      const sofas = await cursor.toArray();
      res.send(sofas);

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