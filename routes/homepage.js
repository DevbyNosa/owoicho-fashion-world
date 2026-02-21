import express from 'express';
import { Router } from 'express';
import { query } from '../config/db.js';

const router = Router();

router.get("/", async (req, res) => {
  try {
   
    const response = await query("SELECT * FROM content_upload LIMIT 1");
    
  
    res.render("home.ejs", { data: response.rows[0] || {} });
    
  } catch (error) {
    console.error("Error fetching homepage data:", error);
    
    res.render("home.ejs", { data: {} }); 
  }
});

export default router;