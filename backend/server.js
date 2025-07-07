import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import authRoutes from "./routes/auth.js";
import ticketRoutes from "./routes/ticket.js";
import studioRoutes from "./routes/studio.js";
import memberParkirRoutes from "./routes/memberParkir.js";

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Middleware penting
app.use(cors());
app.use(express.json()); // ✅ Gunakan ini (bukan bodyParser.json())

// ✅ Routing
app.use("/api/auth", authRoutes);
app.use("/api/ticket", ticketRoutes);
app.use("/api/studio", studioRoutes);
app.use("/api/member-parkir", memberParkirRoutes);

app.get("/", (req, res) => {
  res.send("Inventory API is running!");
});

app.listen(PORT, () =>
  console.log(`✅ Server running on http://localhost:${PORT}`)
);
