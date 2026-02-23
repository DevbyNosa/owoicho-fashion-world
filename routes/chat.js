import express from 'express';
import { Router } from 'express';
import { query } from '../config/db.js'; 

const router = Router();

router.get("/", (req, res) => {
  res.render("home.ejs", { notify: "" });
});

// GET /chat - redirect to home with success message
router.get("/chat", (req, res) => {
  res.redirect("/");
});


router.post("/chat", async (req, res) => {
  
  const { name, text, service, message } = req.body;
  
  // Validate required fields
  if (!name || !text || !service || !message) {
    try {
      const contentData = await query("SELECT * FROM content_upload LIMIT 1");
      return res.status(400).render("home.ejs", { 
        notify: "Please fill in all required fields",
        data: contentData.rows[0] || {}
      });
    } catch (e) {
      return res.status(500).send("Server error");
    }
  }
  
  try {
    // Insert the chat message
    await query(
      "INSERT INTO chats (chat_name, chat_contact, chat_service, chat_message, created_at) VALUES ($1, $2, $3, $4, CURRENT_DATE)",
      [name, text, service, message]
    );
    
    // Fetch content data for the page
    const contentData = await query("SELECT * FROM content_upload LIMIT 1");
    
    res.render("home.ejs", {
      notify: `Hey ${name}, we have received your message. We'll get back to you soon!`,
      data: contentData.rows[0] || {}
    });
  } catch (err) {
    // Log error details - important for debugging in production
    console.error("Chat Error:", {
      message: err.message,
      column: err.column,
      detail: err.detail,
      code: err.code
    });
    
    try {
      const contentData = await query("SELECT * FROM content_upload LIMIT 1");
      res.status(500).render("home.ejs", { 
        notify: "Error saving your message. Please try again or contact via WhatsApp.",
        data: contentData.rows[0] || {}
      });
    } catch (renderErr) {
      res.status(500).send("Server error");
    }
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
    return res.status(401).json({ error: "Unauthorized" }); 
  }
  const { id } = req.params;
  try {
    const result = await query("DELETE FROM chats WHERE id = $1 RETURNING id", [id]);
    
    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Chat not found" });
    }
    
    // For HTMX, send the redirect header
    res.setHeader("HX-Redirect", "/backend/chats");
    res.status(200).json({ success: true, message: "Chat deleted successfully" });
  } catch (err) {
    console.error("Delete Chat Error:", {
      message: err.message,
      code: err.code,
      detail: err.detail
    });
    res.status(500).json({ error: "Failed to delete chat" });
  }
});

export default router;
