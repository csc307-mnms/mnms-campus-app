import express from "express";
// import cors from "cors";
import utils from "./utils.js";
import process from "process";

import buildingsRoutes from "./routes/buildingsRoutes.js";
import usersRoutes from "./routes/usersRoutes.js";
import schedulesRoutes from "./routes/schedulesRoutes.js";
import shuttleRoutes from "./routes/shuttleRoutes.js";
import coureseRoutes from "./routes/coursesRoutes.js";

const app = express();
const port = 8000;

// app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("This is the PolyBuddy Backend!");
});

// Use routes to clean up backend.js
app.use("/users", usersRoutes);
app.use("/buildings", buildingsRoutes);
app.use("/schedules", schedulesRoutes);
app.use("/shuttle", shuttleRoutes);
app.use("/courses", coureseRoutes);

utils.connectToDatabase();

app.listen(process.env.PORT || port, () => {
  console.log("REST API is listening.");
});

export default app;
