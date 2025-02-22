const translate = require("google-translate-api-x");

const translateText = async (text, targetLang) => {
  try {
    const result = await translate(text, { to: targetLang });
    return result.text;
  } catch (error) {
    console.error("Translation Error:", error);
    return text; 
  }
};

module.exports = translateText;


