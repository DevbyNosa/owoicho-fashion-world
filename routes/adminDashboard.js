import express from 'express';
import { Router } from 'express';
import { query } from '../config/db.js';

const router = Router();

////////////


router.get("/backend/dashboard", (req, res) => {
 if (!req.isAuthenticated()) { 
    return res.redirect("/backend"); 
  } else {
    res.render("adminDashboard.ejs")
  }
})

router.post("/backend/maintenance", async (req, res) => {
  if (!req.isAuthenticated()) {
    return res.redirect("/backend");
  }
  const { mode, message } = req.body;
  try {
    await query("UPDATE adminCredentials SET maintenance_mode = $1, maintenance_message = $2 WHERE id = 1", [mode === 'on', message]);
    res.redirect("/backend/dashboard");
  } catch (err) {
    console.error("Error updating maintenance mode:", err);
    res.status(500).send("Error updating maintenance mode");
  }
});

router.get("/backend/maintenance", async (req, res) => {
  if (!req.isAuthenticated()) {
    return res.redirect("/backend");
  }
  try {
    const result = await query("SELECT maintenance_mode, maintenance_message FROM adminCredentials WHERE id = 1");
    const data = result.rows[0] || { maintenance_mode: false, maintenance_message: '' };
    res.render("maintenanceSettings.ejs", { data });
  } catch (err) {
    console.error("Error fetching maintenance settings:", err);
    res.status(500).send("Error loading maintenance settings");
  }
});

export default router