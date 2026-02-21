import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import bodyParser from 'body-parser';
import helmet from "helmet";
import homeRoutes from './routes/homepage.js';
import adminLogin from './routes/adminLogin.js';
import chat from "./routes/chat.js";
import postContent from "./routes/postContent.js";
// ------ for Db connection to server ------- //
import { query } from './config/db.js';
import sessionConfig from './config/session.js';
import passport from "passport";
import errorMessage from "./routes/error.js"
import dashboardRoutes from './routes/adminDashboard.js'
import maintenanceMiddleware from './routes/maintenance.js';
import adminLogo from './routes/adminLogo.js';
import adminImages from './routes/adminImages.js';



const app = express();
const port = 3000;
app.use(sessionConfig);


app.use((req, res, next) => {
 
  if (process.env.NODE_ENV !== 'production') {
    console.log(`${req.method} ${req.path} - Session ID: ${req.sessionID}`);
    console.log(`Views this session: ${req.session.views}`);
  }
  if (!req.session.views) {
    req.session.views = 1;
  } else {
    req.session.views++;
  }
  next();
});

// Test route - REMOVE IN PRODUCTION
app.get("/test", (req, res) => {
  res.json({ 
    sessionId: req.sessionID, 
    views: req.session.views,
    message: "Session working!"
  });
});

app.use(passport.initialize());
app.use(passport.session())
app.use(helmet());

// Maintenance mode middleware
app.use(maintenanceMiddleware);

app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs")


app.use("/", homeRoutes)
app.use("/", adminLogin)
app.use("/", chat)
app.use("/", postContent)
app.use("/", errorMessage)
app.use("/", dashboardRoutes);
app.use("/", adminLogo);
app.use("/", adminImages);


app.listen(port, (req, res) => {
  console.log(`Server running on ${port}`)
})