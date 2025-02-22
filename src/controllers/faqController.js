const FAQ = require("../models/feqModel.js");
const translateText = require('../utils/translate'); 


 const createFAQ = async (req, res) => {
  try {
    const { question, answer } = req.body;

    if (!question || !answer) {
      return res.status(400).json({ success: false, message: "Question and answer are required" });
    }

    
    const existingFAQ = await FAQ.findOne({ question });
    if (existingFAQ) {
      return res.status(400).json({ success: false, message: "FAQ with this question already exists" });
    }

    
    const translations = {};
    const languages = ["hi", "bn"]; 

    for (const lang of languages) {
      try {
        translations[lang] = await translateText(question, lang);
        translations[`${lang}_answer`] = await translateText(answer, lang);
      } catch (error) {
        console.error(`Translation error for ${lang}:`, error);
        translations[lang] = question;
        translations[`${lang}_answer`] = answer;
      }
    }

    // Save FAQ
    const faq = new FAQ({ question, answer, translations });
    await faq.save();

    // Clear cache after creating a new FAQ
    // await redis.del("faqs");

    return res.status(201).json({ success: true, data: faq });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const getAll = async (req, res) => {
  try {
    const response = await FAQ.find({}); 

    console.log("Fetched data successfully");
    res.status(200).json(response);
  } catch (error) {
    console.error("Error fetching FAQs:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};


const getFAQs = async (req, res) => {
  try {
    const lang = req.query.lang || "en"; 

   
    const supportedLanguages = ["en", "hi", "bn"];
    if (!supportedLanguages.includes(lang)) {
      return res.status(400).json({ success: false, error: "Invalid language parameter" });
    }

    let faqs;

    if (lang === "en") {
     
      faqs = await FAQ.find({}, "question answer");
    } else {
      faqs = await FAQ.find({}, `question answer translations.${lang} translations.${lang}_answer`);
      
     
      faqs = faqs.map(faq => ({
        id: faq._id,
        question: faq.translations?.[lang] || faq.question,
        answer: faq.translations?.[`${lang}_answer`] || faq.answer
      }));
    }

    console.log("Fetch successful");
    return res.status(200).json({ success: true, data: faqs });

  } catch (error) {
    console.error("Error fetching FAQs:", error);
    return res.status(500).json({ success: false, error: "Internal server error" });
  }
};

module.exports = { getAll, createFAQ, getFAQs };

