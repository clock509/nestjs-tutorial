import { MongoClient, ServerApiVersion } from 'mongodb';

const password = 'skdisk12!!';
const uri = `mongodb+srv://8kwchoi8:${password}@mongodb.xx1alvq.mongodb.net/?retryWrites=true&w=majority`;
// const client = new MongoClient(uri, {
//   // useNewUrlParser: true,
//   // useUnifiedTopology: true,
//   serverApi: ServerApiVersion.v1,
// });

const client = new MongoClient(uri);
export async function run() {
  try {
    const database = client.db('sample_restaurants');
    const restaurants = database.collection('restaurants');
    const query = { cuisine: 'American', borough: 'Brooklyn' };
    const restaurant = await restaurants.findOne(query);
    console.log(restaurant);

    // const list = await movies.find(query);
    // // print a message if no documents were found
    // if ((await list.count()) === 0) {
    //   console.log('No documents found!');
    // }
    // // replace console.dir with your callback to access individual elements
    // await list.forEach(console.dir);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
