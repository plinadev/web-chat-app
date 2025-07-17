import express from "express";

const app = express();

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

app.listen(5050, () => {
  console.log("Server is running on port 5050");
});
