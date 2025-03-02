const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Serve static files from the public folder
app.use(express.static(path.join(__dirname, 'public')));

// Set EJS as the templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Route to render image gallery
app.get('/', (req, res) => {
    const imageDir = path.join(__dirname, 'public/images');
    fs.readdir(imageDir, (err, files) => {
        if (err) {
            console.error('Error reading image directory:', err);
            res.status(500).send('Could not load images.');
        } else {
            const images = files.filter(file =>
                /\.(jpg|jpeg|png|gif)$/i.test(file) // Include only image files
            );
            res.render('index', { images });
        }
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
