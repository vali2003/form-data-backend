const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose'); // Import mongoose

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MongoDB connection
const mongoURI = 'mongodb://localhost:27017/mydatabase'; // Replace with your MongoDB URI
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => {
        console.error('MongoDB connection error:', err);
        process.exit(1); // Exit the process with failure
    });

// Define a schema and model
const formDataSchema = new mongoose.Schema({
    fullname: String,
    email: String,
    password: String,
    date: { type: Date, default: Date.now }
});

const FormData = mongoose.model('FormData', formDataSchema);

// Handle form submission
app.post('/api/submit-form', async (req, res) => {
    const formData = req.body;

    // Validation
    if (!formData.fullname || !formData.email || !formData.password) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    try {
        // Create a new document and save it
        const newFormData = new FormData(formData);
        await newFormData.save();

        // Respond with success
        res.status(200).json({ message: 'Form submission successful!', data: formData });
    } catch (err) {
        // Respond with error
        res.status(500).json({ message: 'Error saving data', error: err });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
