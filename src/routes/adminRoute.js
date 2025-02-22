const express = require("express");
const FAQ = require("../models/feqModel.js");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const faqs = await FAQ.find({});
    res.render("admin", { faqs });
  } catch (error) {
    console.error("Error fetching FAQs:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/admin/new", (req, res) => {
  res.render("newFAQ");
});

router.post("/admin", async (req, res) => {
  try {
    const { question, answer } = req.body;
    if (!question || !answer) return res.redirect("/admin?error=Missing fields");

    // Save FAQ
    const faq = new FAQ({ question, answer });
    await faq.save();

    res.redirect("/");
  } catch (error) {
    console.error("Error adding FAQ:", error);
    res.redirect("/admin?error=Failed to add FAQ");
  }
});

router.get("/admin/edit/:id", async (req, res) => {
  try {
    const faq = await FAQ.findById(req.params.id);
    res.render("editFAQ", { faq });
  } catch (error) {
    console.error("Error fetching FAQ:", error);
    res.redirect("/");
  }
});

router.post("/admin/edit/:id", async (req, res) => {
  try {
    await FAQ.findByIdAndUpdate(req.params.id, req.body);
    res.redirect("/");
  } catch (error) {
    console.error("Error updating FAQ:", error);
    res.redirect("/");
  }
});

router.post("/admin/delete/:id", async (req, res) => {
  try {
    await FAQ.findByIdAndDelete(req.params.id);
    res.redirect("/");
  } catch (error) {
    console.error("Error deleting FAQ:", error);
    res.redirect("/");
  }
});


module.exports = router;