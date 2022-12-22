require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");

const cors = require("cors");
const {
  connectDB,
  productsCollection,
  usersCollection,
  userBookedCollection,
  userWishlistCollection,
  userPaymentCollection,
} = require("./connectDB");
const { verifyUser } = require("./middleware/VerifyUser");
const { ObjectId } = require("mongodb");
const stripe = require("stripe")(process.env.PAY_SECRETE_KEY);

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello, world!");
});

// ----------------------------------------------

app.post("/create-payment-intent", async (req, res) => {
  const { price } = req.body;
  const amount = price * 100;

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount,
    currency: "usd",
    payment_method_types: ["card"],
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});

// ------------------------------------------------

// public routes
app.get("/products", async (req, res) => {
  const products = await productsCollection.find({}).toArray();
  res.send(products);
});
app.get("/product/:id", async (req, res) => {
  let category = req.params.id;
  const product = await productsCollection
    .find({ brand: category, isSold: false })
    .toArray();
  res.send({ status: true, message: "Success", product });
});

// Payment router
app.get("/pay/:id", async (req, res) => {
  const id = req.params.id;
  const product = await productsCollection.findOne({ _id: ObjectId(id) });
  res.send({ status: true, message: "Success", product });
});

app.post("/payment", async (req, res) => {
  const payment = req.body;
  const productFilter = { _id: ObjectId(payment.productId) };
  const updateProductDoc = {
    $set: {
      isSold: true,
    },
  };
  const options = {
    upsert: true,
  };
  const insureProduct = await productsCollection.updateOne(
    productFilter,
    updateProductDoc,
    options
  );

  const insureBooked = await userBookedCollection.updateOne(
    {
      productId: payment.productId,
    },
    updateProductDoc,
    options
  );
  const savePayment = await userPaymentCollection.insertOne(payment);
  const removedList = await userWishlistCollection.deleteOne({
    productId: payment.productId,
  });
  res.send({
    status: true,
    message: "Success",
    info: [insureProduct, insureBooked, savePayment, removedList],
  });
});

// Authentication route
app.post("/register", async (req, res) => {
  userInfo = req.body;
  const cursor = { email: userInfo.email };
  const isUser = await usersCollection.findOne(cursor);
  if (isUser) {
    return res
      .status(400)
      .send({ status: false, message: "User already exists, Please Login" });
  }
  const token = jwt.sign({ email: userInfo.email }, process.env.JWT_SECRET);
  if (!token) {
    return res
      .status(500)
      .send({ status: false, message: "Something went wrong" });
  }
  const registerUser = await usersCollection.insertOne(userInfo);
  res.send({ status: true, message: "Success", token, registerUser });
});
app.get("/login", verifyUser, async (req, res) => {
  const user = req.decoded;
  const userInfo = await usersCollection.findOne({ email: user.email });
  if (!userInfo) {
    return res.status(404).send({ status: false, message: "Unauthenticated" });
  }
  res.send({
    status: true,
    message: "successfully authenticated",
    user: userInfo,
  });
});
app.post("/login", async (req, res) => {
  const userInfo = req.body;
  const user = await usersCollection.findOne({ email: userInfo.email });
  if (!user) {
    return res.status(404).send({
      status: false,
      message: "Invalid credentials",
    });
  }
  const token = jwt.sign({ email: userInfo.email }, process.env.JWT_SECRET);
  if (!token) {
    return res
      .status(500)
      .send({ status: false, message: "Something went wrong" });
  }
  res.send({ status: true, message: "Success", token, user });
});

// sellers routes
app.get("/my-products", verifyUser, async (req, res) => {
  try {
    const user = req.decoded;
    const products = await productsCollection
      .find({ email: user.email })
      .toArray();
    res.send({ status: true, message: "success", products });
  } catch (error) {
    res.send({ status: false, message: "Server error", error });
  }
});
app.get("/products/advertise", async (req, res) => {
  const filter = { isAdvertised: true, isSold: false };
  const products = await productsCollection.find(filter).toArray();
  if (!products) {
    return res
      .status(404)
      .send({ status: false, message: "No products found" });
  }

  res.send({ status: true, message: "success", products });
});
app.post("/sellers/add-product", verifyUser, async (req, res) => {
  const user = req.decoded;
  const isSeller = await usersCollection.findOne({
    email: user.email,
    role: "seller",
  });
  if (!isSeller) {
    return res
      .status(404)
      .send({ status: false, message: "Your are not authorized" });
  }
  const product = req.body;
  const result = await productsCollection.insertOne(product);
  res.send({ status: true, message: "Success", result });
});
app.post("/product/advertise/:id", async (req, res) => {
  const id = req.params.id;
  const filter = { _id: ObjectId(id) };
  const options = { upsert: true };
  const updateDoc = {
    $set: {
      isAdvertised: true,
    },
  };

  const product = await productsCollection.updateOne(
    filter,
    updateDoc,
    options
  );
  res.send({ status: true, message: "success", result: product });
});
app.delete("/product/delete/:id", async (req, res) => {
  const id = req.params.id;
  const filter = { _id: ObjectId(id) };
  const user = await productsCollection.deleteOne(filter);
  res.send({ status: true, message: "success", user });
});

// Admin routes
app.get("/all-seller", async (req, res) => {
  const seller = await usersCollection.find({ role: "seller" }).toArray();
  res.send({ status: true, message: "success", seller });
});
app.get("/all-buyer", async (req, res) => {
  const buyer = await usersCollection.find({ role: "buyer" }).toArray();
  res.send({ status: true, message: "success", buyer });
});
app.post("/seller/verify/:id", async (req, res) => {
  const id = req.params.id;
  const filter = { _id: ObjectId(id) };
  const productFilter = { userId: id };
  const options = { upsert: true };
  const updateDoc = {
    $set: {
      isVerified: true,
    },
  };
  const updated = await productsCollection.updateMany(
    productFilter,
    updateDoc,
    options
  );
  const user = await usersCollection.updateOne(filter, updateDoc, options);
  res.send({ status: true, message: "success", user, updated });
});
app.delete("/seller/delete/:id", async (req, res) => {
  const id = req.params.id;
  const filter = { _id: ObjectId(id) };
  const user = await usersCollection.deleteOne(filter);
  res.send({ status: true, message: "success", user });
});
app.delete("/buyer/delete/:id", async (req, res) => {
  const id = req.params.id;
  const filter = { _id: ObjectId(id) };
  const user = await usersCollection.deleteOne(filter);
  res.send({ status: true, message: "success", user });
});

// Buyer Routes
app.get("/my-orders/:id", async (req, res) => {
  const id = req.params.id;
  const bookedInfo = await userBookedCollection.find({ userId: id }).toArray();
  res.send({ status: true, message: "success", booked: bookedInfo });
});
app.get("/my-wishlist/:id", async (req, res) => {
  const id = req.params.id;
  const wishlist = await userWishlistCollection.find({ userId: id }).toArray();

  res.send({ status: true, message: "success", wishlist });
});
app.post("/booked", async (req, res) => {
  const book = req.body;
  const id = { userId: book.userId, productId: book.productId };
  const result = await userBookedCollection.findOne(id);
  if (result) {
    return res.send({
      status: false,
      message: "You have Already Booked this product",
    });
  }
  const bookInfo = await userBookedCollection.insertOne(book);
  res.send({ status: true, message: "success", bookInfo });
});
app.post("/add-wishlist", async (req, res) => {
  const wishlist = req.body;
  const id = { productId: wishlist.productId, userId: wishlist.userId };
  const result = await userWishlistCollection.findOne(id);
  if (result) {
    return res.send({
      status: false,
      message: "You have Already wishlist this product",
    });
  }
  const wishlistInfo = await userWishlistCollection.insertOne(wishlist);
  res.send({ status: true, message: "success", wishlistInfo });
});

// Server Running
const custom = 5001;
app.listen(process.env.PORT | custom, () => {
  console.log("Server listening on port " + custom);
  connectDB();
});
