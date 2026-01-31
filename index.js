const express = require('express')
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express()
const port = process.env.PORT || 3000

app.use(cors())
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASS}@cluster0.spgu1hn.mongodb.net/?appName=Cluster0`;

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

app.get('/', (req, res) => {
    res.send('Traveller server is running!');
})

async function run() {
    try {
        // await client.connect();

        // collections
        const db = client.db('traveller_db');
        const usersCollection =  db.collection('users');
        const destinationsCollection = db.collection('destinations');
        const feedbacksCollection = db.collection('feedbacks');

        // User related APIs
        app.post('/users', async (req, res) => {
            const user = req.body;
            user.role = 'user';
            user.createdAt = new Date();
            const email = user.email;

            const isExisting = await usersCollection.findOne({email});
            if(isExisting) {
                return res.send({message: 'User already exists'});
            }

            const result = await usersCollection.insertOne(user);
            res.send(result);
        });

        // Destination related APIs
        app.get('/popular-destinations', async (req, res) => {

        });

        app.get('/destinations', async (req, res) => {

        });

        app.post('/destinations', async(req, res) => {

        });

        app.delete('/destinations/:id', async(req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await destinationsCollection.deleteOne(query);
            res.send(result);
        })

        // await client.db("admin").command({ ping: 1 });
        // console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } catch (err) {
        console.error(err);
    }
}
run().catch(console.dir);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})