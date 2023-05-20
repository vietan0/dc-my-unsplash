const express = require('express');
const path = require('path');
const { exec } = require('node:child_process');
const multer = require('multer');
const supabase = require('./supabase');
const genFileName = require('./genFileName');
require('dotenv').config();

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, './server/images');
  },
  filename(req, file, cb) {
    cb(null, genFileName(file.originalname));
  },
});

const upload = multer({ storage });
const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json(), express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.json({
    msg: 'This is dc-my-unsplash backend 🎉😎',
    routes: {
      allImages: 'http://localhost:3000/images',
    },
  });
});

app.get('/images', async (req, res) => {
  try {
    const allImages = await supabase.getAllImages();
    res.json(allImages);
  } catch (err) {
    console.log(err.message);
  }
});

app.get('/images/:id', async (req, res) => {
  try {
    const image = await supabase.getById(req.params.id);
    res.sendFile(path.resolve(__dirname, `images/${image.filename}`));
  } catch (err) {
    console.log(err.message);
  }
});

app.post('/images', upload.single('fileFromReact'), async (req, res) => {
  // upload to server
  // then upload metadata on supabase
  try {
    const newImage = await supabase.postImage(req.file);
    res.json(newImage);
  } catch (err) {
    console.log(err.message);
  }
});

app.delete('/images/:id', async (req, res) => {
  try {
    const image = await supabase.getById(req.params.id);
    // get file name to delete
    exec(`rm ./server/images/${image.filename}`, (err, stdout) => {
      if (err) console.log(err);
    });
    // then delete record on supabase
    await supabase.deleteImage(req.params.id);
    res.json({ success: true });
  } catch (err) {
    console.log(err.message);
  }
});

app.delete('/images', async (req, res) => {
  try {
    // delete from storage
    exec('rm ./server/images/*');
    // delete records on supabase
    await supabase.deleteAllImages();
    res.json({ success: true });
  } catch (err) {
    console.log(err.message);
  }
});

app.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT} !`);
});
