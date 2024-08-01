const { response } = require('../app');
const { generativeVisionModel } = require('../vertexConfig');
const dotenv = require('dotenv');


// Function to check if a string is Base64 encoded
function isBase64(str) {
    try {
        return btoa(atob(str)) === str;
    } catch (err) {
        return false;
    }
}

async function handUpVerification(req, res) {
    console.log(req);
    const {imageInput} = req.body;
    try {
        let base64Image;

        if (isBase64(imageInput)) {
            base64Image = imageInput;
        } else {
            // If it's not Base64 encoded, assume it's a file and convert it
            base64Image = await getBase64(imageInput);
        }

        // Prepare the parts for the request
        const filePart = { inline_data: { data: base64Image, mimeType: 'image/jpeg' } };
        const instruction = 'Responde con si o no';
        const textPart = { text: 'Determina si la persona de esta imagen tiene la mano leventada cerca del rostro, Responde con si o no' };
        const request = {
            system_instructions: instruction,
            contents: [{ role: 'user', parts: [textPart, filePart] }]
        };

        // Call the generative vision model API
        const streamingResult = await generativeVisionModel.generateContentStream(request);
        const contentResponse = await streamingResult.response;
        
        // Log the response
        console.log(contentResponse.candidates[0].content.parts[0].text);
        res.json({response: contentResponse.candidates[0].content.parts[0].text});
    } catch (error) {
        console.error('Error:', error);
        res.status(400).json({error: error.message});
    }
}

async function closesEyesVerification(req, res) {
    console.log(req);
    const {imageInput} = req.body;
    try {
        let base64Image;

        if (isBase64(imageInput)) {
            base64Image = imageInput;
        } else {
            // If it's not Base64 encoded, assume it's a file and convert it
            base64Image = await getBase64(imageInput);
        }

        // Prepare the parts for the request
        const filePart = { inline_data: { data: base64Image, mimeType: 'image/jpeg' } };
        const instruction = 'Responde con si o no';
        const textPart = { text: 'Determina si la persona de esta imagen tiene loso ojos cerrados, Responde con si o no' };
        const request = {
            system_instructions: instruction,
            contents: [{ role: 'user', parts: [textPart, filePart] }]
        };

        // Call the generative vision model API
        const streamingResult = await generativeVisionModel.generateContentStream(request);
        const contentResponse = await streamingResult.response;
        
        // Log the response
        console.log(contentResponse.candidates[0].content.parts[0].text);
        res.json({response: contentResponse.candidates[0].content.parts[0].text});
    } catch (error) {
        console.error('Error:', error);
        res.status(400).json({error: error.message});
    }
}

// Function to convert image to Base64
function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result.split(',')[1]); // remove the data URL prefix
        reader.onerror = error => reject(error);
    });
}

module.exports = {
    handUpVerification,
    closesEyesVerification
};
