const express = require('express');
const multer = require('multer');
const pdf = require('pdf-parse');
const fs = require('fs');
const Menu = require('../models/Menu');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/upload-menu', upload.single('menu'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

    const dataBuffer = fs.readFileSync(req.file.path);
    const data = await pdf(dataBuffer);

    const parsedMenu = parseMenuText(data.text);
    await Menu.deleteMany({});
    const savedMenu = await Menu.insertMany(parsedMenu);

    fs.unlinkSync(req.file.path);
    res.json({ success: true, menu: savedMenu });
  } catch (error) {
    console.error('Error processing menu:', error);
    res.status(500).json({ error: 'Failed to process menu' });
  }
});

router.get('/menu', async (req, res) => {
  try {
    console.log("did the food menu go delivered");
    const menuCategories = await Menu.find({});
    res.json(menuCategories);
  } catch (error) {
    console.error('Error fetching menu:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

function parseMenuText(text) {
  const lines = text.split('\n').map(l => l.trim()).filter(Boolean);
  const menu = [];
  let currentCategory = null;

  for (let line of lines) {
    if (line.startsWith("## CATEGORY:")) {
      if (currentCategory) menu.push(currentCategory);
      currentCategory = {
        category: line.replace("## CATEGORY:", "").trim(),
        items: []
      };
    } else if (line.startsWith("ITEM:")) {
      const [_, itemPart] = line.split("ITEM:");
      const [name, price] = itemPart.split("| PRICE:");
      if (currentCategory) {
        currentCategory.items.push({
          _id: `${name.trim()}-${price.trim()}`,
          name: name.trim(),
          price: parseInt(price.replace(/[₹₹]/g, '').trim())
        });
      }
    }
  }

  if (currentCategory) menu.push(currentCategory);
  return menu;
}

module.exports = router;
