const express = require("express");
const cors = require("cors");
const axios = require("axios");
const app = express();
app.use(express.json());
app.use(cors());
const PORT = 3001;
app.get("/", (req, res) => {
  res.send("Hello");
});
app.post("/save", async (req, res) => {
  const webhookURL =
    "https://webhook.site/acf644ce-f940-4d04-947f-9f843ad86264";
  try {
    const response = await axios.post(webhookURL, req.body);
    res.status(200).json({
      message: "Data sent successfully",
      data: response.data,
    });

    if (response.ok) {
      const responseData = await response.json();
      console.log("Segment saved successfully", responseData);
      res.send("data created");
    } else {
      console.error(
        "Server responded with an error",
        response.status,
        response.statusText
      );
    }
  } catch (error) {
    console.error("Error making request:", error);
  }
});
app.listen(PORT, () => {
  console.log("server runing");
});
