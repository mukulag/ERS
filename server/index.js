const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const AppModel = require('./models/Application')
const app = express()
app.use(cors({ credentials: true }));
app.use(express.json())

mongoose.connect("mongodb://127.0.0.1:27017/")

app.post("/creating", (req, res) => {
    // Ensure required fields are in the request body
    const { appName, roles, status, lastReviewed ,app_rights } = req.body;
  
    // Check if all required fields are provided
    if (!appName || !roles || !status || !lastReviewed ||!app_rights) {
      return res.status(400).json({
        message: 'Missing required fields: appName, roles, status ,app_rights, or lastReviewed. ',
      });
    }
  
    // Create a new App using the request body
    AppModel.create(req.body)
      .then((app) => {
        res.status(201).json({
          message: 'App created successfully!',
          app: app,
        });
      })
      .catch((err) => {
        // Handle validation or other errors
        console.error(err);
        res.status(500).json({
          message: 'Error creating the app.',
          error: err.message,
        });
      });
  });


  app.get("/creating", async (req, res) => {
    try {
      const users = await AppModel.find(); // Assuming you're using MongoDB
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: "Error fetching users" });
    }
  });



app.listen(3000, () =>{
    console.log("I slove ");
})