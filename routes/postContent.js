import express from 'express';
import { Router } from 'express';
import { query } from '../config/db.js';


const router = Router();

router.get("/backend/contents", async (req, res) => {
  if (!req.isAuthenticated()) { 
    return res.redirect("/backend"); 
  }
  try {
    
    const response = await query("SELECT * FROM content_upload LIMIT 1");
    
    
    res.render("adminContent.ejs", { data: response.rows[0] || {} }); 
    
  } catch (error) {
    console.error("Error loading admin page:", error);
    res.status(500).send("Database error");
  }
});

router.get("/backend/contents/:id", async (req, res) => {
  if (!req.isAuthenticated()) { 
    return res.redirect("/backend"); 
  }
  const { id } = req.params;
  try {
    const response = await query("SELECT * FROM content_upload WHERE id = $1", [id]);
    res.render("home.", { data: response.rows[0] });
  } catch (error) {
    console.error("Error fetching content:", error);
  }
});

router.post("/backend/contents", async (req, res) => {
  if (!req.isAuthenticated()) { 
    return res.redirect("/backend"); 
  }
  const { headerh1, headerptxt, aboutTxt, locationText, number, email} = req.body;

  try {
   const response = await query(
    "INSERT INTO content_upload (header_h1, header_text, about_text, location, number, email) VALUES ($1, $2, $3, $4, $5, $6)",
    [headerh1, headerptxt, aboutTxt, locationText, number, email]
   )

    res.redirect("/backend/contents");
  } catch (error) {
    console.error("Error creating content:", error);
    res.status(500).send("Database error");
  }
});

router.post("/backend/contents/:id", async (req, res) => {
  if (!req.isAuthenticated()) { 
    return res.redirect("/backend"); 
  }
  const { id } = req.params;
  const { headerh1, headerptxt, aboutTxt, locationText, number, email} = req.body;

  try {
   const response = await query(
    "UPDATE content_upload SET header_h1 = $1, header_text = $2, about_text = $3, location = $4, number = $5, email = $6 WHERE id = $7",
    [headerh1, headerptxt, aboutTxt, locationText, number, email, id]
   )

    res.redirect("/backend/contents");
  } catch (error) {
    console.error("Error updating content:", error);
  }
})

export default router


