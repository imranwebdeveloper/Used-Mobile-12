const { MongoClient, ServerApiVersion } = require("mongodb");
const client = new MongoClient(process.env.DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

const productsCollection = client.db("usedMobile").collection("products");
const usersCollection = client.db("usedMobile").collection("users");
const userBookedCollection = client.db("usedMobile").collection("booked");
const userWishlistCollection = client.db("usedMobile").collection("wishlist");
const userPaymentCollection = client.db("usedMobile").collection("payments");
const connectDB = () => {
  client.connect((err) => {
    if (err) {
      console.log(err.message);
    } else {
      console.log("Database connected successfully");
    }
  });
};

module.exports = {
  connectDB,
  productsCollection,
  usersCollection,
  userBookedCollection,
  userWishlistCollection,
  userPaymentCollection,
};
