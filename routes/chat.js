import express from 'express';
import { Router } from 'express';
import { query } from '../config/db.js'; 

const router = Router();

router.get("/", (req, res) => {
  res.render("home.ejs", { notify: "" });
});


router.post("/chat", async (req, res) => {
  
  const { name, text, service, message } = req.body;
  try {
    await query(
      "INSERT INTO chats (chat_name, chat_contact, chat_service, chat_message, created_at) VALUES ($1, $2, $3, $4, CURRENT_DATE)",
      [name, text, service, message]
    );
    res.render("home.ejs", {
      notify: `Hey ${name}, we have received your message`
    });
  } catch (err) {
    // Log error details only in development
    if (process.env.NODE_ENV !== 'production') {
      console.log("--- DATABASE ERROR DETAILS ---");
      console.log("Message:", err.message);
      console.log("Column:", err.column);
      console.log("Detail:", err.detail);
    }
    res.status(500).send("Database error occurred. Please try again later.");
  }
});


router.get("/api/chats/:id", async (req, res) => {
   if (!req.isAuthenticated()) { 
    return res.redirect("/backend"); 
  }
  const { id } = req.params;
  try {
    const result = await query("SELECT * FROM chats WHERE id = $1", [id]);
    if (result.rows.length > 0) {
      res.json(result.rows[0]);
    } else {
      res.status(404).json({ error: "Message not found" });
    }
  } catch (err) {
    res.status(500).json({ error: "Database error" });
  }
});


router.get("/backend/chats", 
  async (req, res) => {

   if (!req.isAuthenticated()) { 
    return res.redirect("/backend"); 
  }
  const page = parseInt(req.query.page) || 1;
  const limit = 20;
  const offset = (page - 1) * limit;
  try {
    const result = await query(
      "SELECT * FROM chats ORDER BY id DESC LIMIT $1 OFFSET $2",
      [limit, offset]
    );
    const countResult = await query("SELECT COUNT(*) FROM chats");
    const totalMessages = parseInt(countResult.rows[0].count);
    const hasMore = totalMessages > (page * limit);

    res.render("chat.ejs", { 
      messages: result.rows, 
      currentPage: page,
      hasMore: hasMore
    }); 
  } catch (err) {
    res.status(500).send("Database Error");
  }
});


router.get("/backend/chat/:id", async (req, res) => {
  const { id } = req.params;
   if (!req.isAuthenticated()) { 
    return res.redirect("/backend"); 
  }
  try {
    const result = await query("SELECT * FROM chats WHERE id = $1", [id]);
    if (result.rows.length > 0) {
      res.render("chatDetails.ejs", { chat: result.rows[0] });
    } else {
      res.status(404).send("Not found");
    }
  } catch (err) {
    res.status(500).send("Error");
  }
});

// 5. SEARCH ROUTE (Already updated)
router.get("/backend/search", 
  async (req, res) => {
     if (!req.isAuthenticated()) { 
    return res.redirect("/backend"); 
  }
  const searchTerm = req.query.q || "";

  try {
    const result = await query(
      "SELECT * FROM chats WHERE chat_name ILIKE $1 OR chat_contact ILIKE $1 ORDER BY id DESC",
      [`%${searchTerm}%`]
    );
    res.render("chat.ejs", { 
      messages: result.rows, 
      currentPage: 1, 
      hasMore: false, 
      searchQuery: searchTerm 
    });
  } catch (err) {
    res.status(500).send("Search Error");
  }
});


router.delete("/api/chats/:id", async (req, res) => {
   if (!req.isAuthenticated()) { 
    return res.redirect("/backend"); 
  }
  const { id } = req.params;
  try {
    await query("DELETE FROM chats WHERE id = $1", [id]);
    res.setHeader("HX-Redirect", "/backend/chats");
    res.status(200).send("");
  } catch (err) {
    res.status(500).send("Delete Failed");
  }
});

export default router;
