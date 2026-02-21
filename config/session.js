import session from "express-session";
import connectPgSimple from "connect-pg-simple";
import pool from "./db.js";

const PgSession = connectPgSimple(session);

const sessionConfig = session({
  store: new PgSession({
    pool: pool,
    tableName: "user_sessions",
    createTableIfMissing: true
  }),
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    httpOnly: true,
    secure: false 
  }
});

export default sessionConfig;