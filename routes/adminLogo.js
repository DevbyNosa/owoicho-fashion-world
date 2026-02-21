import express from 'express';
import { Router } from 'express';
import { query } from '../config/db.js';
import multer from 'multer';
import path from 'path';

const router = Router();

// Configure multer for logo uploads
const logoStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'logo-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const uploadLogo = multer({ storage: logoStorage });

router.get("/backend/logo", async (req, res) => {
  if (!req.isAuthenticated()) {
    return res.redirect("/backend");
  }
  try {
    const result = await query("SELECT logo_path FROM content_upload LIMIT 1");
    const data = result.rows[0] || {};
    res.render("adminLogo.ejs", { data });
  } catch (err) {
    console.error("Error fetching logo:", err);
    res.status(500).send("Error loading logo management");
  }
});

router.post("/backend/logo", uploadLogo.single('logo'), async (req, res) => {
  if (!req.isAuthenticated()) {
    return res.redirect("/backend");
  }
  try {
    const logoPath = req.file ? '/images/' + req.file.filename : null;
    if (logoPath) {
      await query("UPDATE content_upload SET logo_path = $1 WHERE id = 1", [logoPath]);
    }
    res.redirect("/backend/logo");
  } catch (err) {
    console.error("Error uploading logo:", err);
    res.status(500).send("Error uploading logo");
  }
});

export default router;