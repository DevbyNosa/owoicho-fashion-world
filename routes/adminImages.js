import express from 'express';
import { Router } from 'express';
import { query } from '../config/db.js';
import multer from 'multer';
import path from 'path';

const router = Router();

// Configure multer for image uploads
const imageStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'image-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const uploadImage = multer({ storage: imageStorage });

router.get("/backend/images", async (req, res) => {
  if (!req.isAuthenticated()) {
    return res.redirect("/backend");
  }
  try {
    const result = await query("SELECT image_path FROM content_upload LIMIT 1");
    const data = result.rows[0] || {};
    res.render("adminImages.ejs", { data });
  } catch (err) {
    console.error("Error fetching images:", err);
    res.status(500).send("Error loading image management");
  }
});

router.post("/backend/images", uploadImage.single('image'), async (req, res) => {
  if (!req.isAuthenticated()) {
    return res.redirect("/backend");
  }
  try {
    const imagePath = req.file ? '/images/' + req.file.filename : null;
    if (imagePath) {
      await query("UPDATE content_upload SET image_path = $1 WHERE id = 1", [imagePath]);
    }
    res.redirect("/backend/images");
  } catch (err) {
    console.error("Error uploading image:", err);
    res.status(500).send("Error uploading image");
  }
});

export default router;