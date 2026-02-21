import express from "express";
import { Router } from "express";
//import session from "express-session";
import bcrypt from "bcrypt";
import passport from "passport";
import { Strategy } from "passport-local"; 
import { query } from "../config/db.js";

const router = Router()

const saltRounds = 12;

router.get("/backend", (req, res) => {
res.render("admin.ejs", { err: null })
 res.set('X-Robots-Tag', 'noindex');
})



router.post("/backend", passport.authenticate("local", {
  successRedirect: "/backend/dashboard",
  failureRedirect: "/backend"
}
))

passport.use(new Strategy(async function verify(username, password, cb) {
    try {
     const email = await query("SELECT * FROM adminCredentials WHERE username = $1", [username]);

       const admin = email.rows[0];

       
      if(admin) {

      const compare = await bcrypt.compare(password, admin.password);

      if(compare) {
       return cb(null, admin)
      } else {
        return cb(null, false, { message: "Incorrect Credentials" })
      }
      } else {
        

        return cb(null, false, { message: "Admin not found" });
      }

   } catch (err) {
    console.error("Error Logging into account", err)
    return cb(err);
   }
}))

passport.serializeUser((admin, cb) => {
  cb(null, admin.id)
})

passport.deserializeUser(async (id, cb) => {
  try{
   const finById = await query("SELECT * FROM adminCredentials WHERE id = $1", [id])

const admin = finById.rows[0]

if(admin) {
 cb(null, admin); 
} else {
  cb(null, false)
}} catch(err) {
  // Log error only in development
  if (process.env.NODE_ENV !== 'production') {
    console.log("Server error during deserialization:", err);
  }
  cb(err)
}
})

export default router