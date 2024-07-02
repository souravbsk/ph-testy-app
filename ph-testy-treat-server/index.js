const express = require("express");
const app = express();
require("dotenv").config();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
var cors = require("cors");
const jwt = require("jsonwebtoken");
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

//middleware

const verifyJWT = (req, res, next) => {
  const authorization = req.headers.authorization;
  if (!authorization) {
    return res
      .status(401)
      .send({ error: true, message: "unauthorized access" });
  }
  const token = authorization.split(" ")[1];

  jwt.verify(token, process.env.SECRET_ACCESS_TOKEN, (err, decoded) => {
    if (err) {
      res.status(401).send({ error: true, message: "unauthorized access" });
    }
    req.decoded = decoded;
    next();
  });
};

const uri = `mongodb+srv://${process.env.DBNAME}:${process.env.DBPASS}@cluster0.pr3rbd0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect((err) => {
      if (err) {
        console.log(err);
        return;
      }
    });

    const userCollection = client.db("PHTestyTreat").collection("users");
    const recipeCollection = client.db("PHTestyTreat").collection("recipes");

    app.post("/jwt", (req, res) => {
      const user = req.body;
      const token = jwt.sign(user, process.env.SECRET_ACCESS_TOKEN, {
        expiresIn: "1h",
      });
      res.send({ token });
    });

    //add NEw User
    // Add New User
    app.post("/api/user", async (req, res) => {
      const user = req.body;

      try {
        const query = { email: user.email };
        const existingUser = await userCollection.findOne(query);

        if (existingUser) {
          return res
            .status(200)
            .send({ success: true, message: "User already exists" });
        }

        const newUser = {
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
          coin: 50,
          createdAt: new Date(),
        };

        const result = await userCollection.insertOne(newUser);
        res.status(201).send({ success: true, result });
      } catch (error) {
        console.error("Error creating user:", error);
        res
          .status(500)
          .send({ success: false, message: "Internal Server Error" });
      }
    });

    app.put("/api/view-request/:id", verifyJWT, async (req, res) => {
      const { email, creator_Email } = req.body;
      const recipeId = req.params.id;

      try {
        const recipeFilter = { _id: new ObjectId(recipeId) };
        const userFilter = { email: email };
        const creatorFilter = { email: creator_Email };
        console.log(creatorFilter);

        // Find the user
        const user = await userCollection.findOne(userFilter);
        if (!user) {
          return res.status(404).json({ error: "User not found" });
        }
        console.log("fdsf");

        // Find the creator
        const creator = await userCollection.findOne(creatorFilter);
        if (!creator) {
          return res.status(404).json({ error: "Creator not found" });
        }

        // Check if user already purchased the recipe
        const recipe = await recipeCollection.findOne(recipeFilter);
        if (recipe.purChased_by.includes(email)) {
          return res.status(200).json({
            success: true,
            isAlreadyPurchased: true,
            message: "Recipe already purchased",
          });
        }

        // Update user coins
        const updatedUser = await userCollection.updateOne(
          { email: email },
          { $inc: { coin: -10 } }
        );

        // Update creator coins
        const updatedCreator = await userCollection.updateOne(
          { email: creator_Email },
          { $inc: { coin: 1 } }
        );

        // Update recipe
        const updatedRecipe = await recipeCollection.updateOne(recipeFilter, {
          $push: { purChased_by: email },
          $inc: { watchCount: 1 },
        });

        res.status(200).json({
          success: true,
          message: "Recipe viewed successfully",
          isNewPurchased: true,
          data: {
            updatedUser,
            updatedCreator,
            updatedRecipe,
          },
        });
      } catch (error) {
        console.error("Error processing view request:", error);
        res
          .status(500)
          .send({ success: false, message: "Internal Server Error" });
      }
    });

    //add like
    app.put("/api/recipe-like/:id", verifyJWT, async (req, res) => {
      const recipeId = req.params.id;
      const { email } = req.body;

      try {
        const recipeFilter = { _id: new ObjectId(recipeId) };
        const recipe = await recipeCollection.findOne(recipeFilter);

        if (recipe?.liked_by?.includes(email)) {
          const result = await recipeCollection.updateOne(recipeFilter, {
            $pull: { liked_by: email },
          });

          return res.status(200).json({
            success: true,
            isUnLiked: true,
            data: result,
            message: "Recipe unliked successfully",
          });
        } else {
          const result = await recipeCollection.updateOne(recipeFilter, {
            $push: { liked_by: email },
          });

          return res.status(200).json({
            success: true,
            data: result,
            isLiked: true,

            message: "Recipe liked successfully",
          });
        }
      } catch (error) {
        console.error("Error updating recipe likes:", error);
        res
          .status(500)
          .json({ success: false, message: "Internal Server Error" });
      }
    });

    //get count
    app.get("/api/stats", async (req, res) => {
      try {
        const userCount = await userCollection.countDocuments();
        const recipeCount = await recipeCollection.countDocuments();

        // Calculate total watchCount for all recipes
        const allRecipes = await recipeCollection.find({}).toArray();
        const totalWatchCount = allRecipes.reduce(
          (acc, recipe) => acc + recipe.watchCount,
          0
        );

        res.status(200).json({
          success: true,
          data: {
            userCount,
            recipeCount,
            totalWatchCount,
          },
        });
      } catch (error) {
        console.error("Error fetching stats:", error);
        res.status(500).json({
          success: false,
          message: "Internal Server Error",
        });
      }
    });

    // Get Coin Details
    app.get("/api/coin/:email", verifyJWT, async (req, res) => {
      const email = req.params.email;

      try {
        const query = { email: email };
        const existingUser = await userCollection.findOne(query);

        if (existingUser) {
          return res
            .status(200)
            .send({ success: true, coin: existingUser.coin });
        } else {
          return res
            .status(404)
            .send({ success: false, message: "User not found" });
        }
      } catch (error) {
        console.error("Error retrieving user coin details:", error);
        res
          .status(500)
          .send({ success: false, message: "Internal Server Error" });
      }
    });

    //modify coin details
    app.put("/api/coin", verifyJWT, async (req, res) => {
      const email = req.query.email;
      const { coin, dollar } = req.body;

      try {
        const filterUser = { email: email };

        const userResult = await userCollection.updateOne(filterUser, {
          $inc: { coin: coin },
        });

        res.status(200).json({
          success: true,
          message: "Coin parches successfully",
          data: userResult,
        });
      } catch (error) {
        console.error("Error retrieving user coin details:", error);
        res
          .status(500)
          .send({ success: false, message: "Internal Server Error" });
      }
    });

    //add recipe start

    // Add Recipe
    app.post("/api/recipe/create", verifyJWT, async (req, res) => {
      const recipeData = req.body;
      console.log(recipeData);

      try {
        const newRecipeData = {
          ...recipeData,
          watchCount: 0,
          purChased_by: [],
          createdAt: new Date(),
        };

        const result = await recipeCollection.insertOne(newRecipeData);
        if (!result.insertedId) {
          return res.status(500).json({ error: "Failed to insert recipe" });
        }

        // Increment user's coin count
        console.log(recipeData.creator_Email);
        const user = await userCollection.findOne({
          email: recipeData.creator_Email,
        });
        if (!user) {
          return res.status(404).json({ error: "User not found" });
        }

        const updatedUser = {
          ...user,
          coin: user.coin + 1, // Increase coin count by 1
        };

        await userCollection.updateOne(
          { email: recipeData.creator_Email },
          { $set: updatedUser }
        );

        res.status(201).json({
          success: true,
          message: "Recipe created successfully",
          data: result,
        });
      } catch (error) {
        console.error("Error creating recipe:", error);
        res.status(500).json({ error: "Internal Server Error" });
      }
    });

    //get all recipe

    app.get("/api/recipes", async (req, res) => {
      try {
        const recipes = await recipeCollection
          .find({}, { projection: { recipe_details: 0, embedded_code: 0 } })
          .toArray();
        res.status(200).json({
          success: true,
          data: recipes,
        });
      } catch (error) {
        console.error("Error fetching recipes:", error);
        res.status(500).json({ error: "Internal Server Error" });
      }
    });

    //get recipe id
    app.get("/api/recipe/:id", verifyJWT, async (req, res) => {
      const recipeId = req.params.id;

      try {
        const recipeFilter = { _id: new ObjectId(recipeId) };
        const recipe = await recipeCollection.findOne(recipeFilter);

        if (!recipe) {
          return res.status(404).json({ error: "Recipe not found" });
        }

        const suggestions = await recipeCollection
          .find(
            {
              $or: [{ category: recipe.category }, { country: recipe.country }],
              _id: { $ne: new ObjectId(recipeId) },
            },
            {
              projection: { recipe_details: 0, embedded_code: 0, createdAt: 0 },
            }
          )
          .limit(5)
          .toArray();

        res.status(200).json({
          success: true,
          data: {
            recipe,
            suggestions,
          },
        });
      } catch (error) {
        console.error("Error fetching recipe and suggestions:", error);
        res.status(500).json({ error: "Internal Server Error" });
      }
    });

    //get recipe by

    app.get("/api/recipes/:email", verifyJWT, async (req, res) => {
      try {
        const email = req?.params?.email;
        console.log(email);
        const filter = { creator_Email: email };
        const recipes = await recipeCollection
          .find(filter, { projection: { recipe_details: 0 } })
          .toArray();
        res.status(200).json({
          success: true,
          data: recipes,
        });
      } catch (error) {
        // console.error("Error fetching recipes:", error);
        res.status(500).json({ error: "Internal Server Error" });
      }
    });

    // delete recipe
    app.delete("/api/recipe/:id", verifyJWT, async (req, res) => {
      try {
        const recipeId = req?.params?.id;
        const filter = { _id: new ObjectId(recipeId) };
        const recipes = await recipeCollection.deleteOne(filter);

        res.status(200).json({
          success: true,
          data: recipes,
        });
      } catch (error) {
        console.error("Error fetching recipes:", error);
        res.status(500).json({ error: "Internal Server Error" });
      }
    });

    //get all country name
    app.get("/api/country", async (req, res) => {
      try {
        const recipes = await recipeCollection
          .find({}, { projection: { _id: 0, country: 1 } })
          .toArray();

        // Extract country names from the recipes
        const countryNames = recipes.map((recipe) => recipe?.country);

        res.status(200).json({
          success: true,
          data: { countryNames },
        });
      } catch (error) {
        console.error("Error fetching recipes:", error);
        res.status(500).json({ error: "Internal Server Error" });
      }
    });

    //add recipe end

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });

    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
