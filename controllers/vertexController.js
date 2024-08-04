const { response } = require('../app');
const { generativeVisionModel } = require('../vertexConfig');
const dotenv = require('dotenv');

async function handUpVerification(req, res) {
    const {imageInput} = req.body;
    try {
        // Prepare the parts for the request
        const filePart = { inline_data: { data: imageInput, mimeType: 'image/jpeg' } };
        const instruction = 'Responde con si o no';
        const textPart = { text: 'Determina si la persona de esta imagen tiene alguna mano leventada cerca del rostro, Responde con si o no' };
        const request = {
            system_instructions: instruction,
            contents: [{ role: 'user', parts: [textPart, filePart] }]
        };

        // Call the generative vision model API
        const streamingResult = await generativeVisionModel.generateContentStream(request);
        const contentResponse = await streamingResult.response;
        
        // Log the response
        // console.log(contentResponse.candidates[0].content.parts[0].text);
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
        // Prepare the parts for the request
        const filePart = { inline_data: { data: imageInput, mimeType: 'image/jpeg' } };
        const instruction = 'Responde con si o no';
        const textPart = { text: 'Determina si la persona de esta imagen tiene los ojos cerrados, Responde con si o no' };
        const request = {
            system_instructions: instruction,
            contents: [{ role: 'user', parts: [textPart, filePart] }]
        };

        // Call the generative vision model API
        const streamingResult = await generativeVisionModel.generateContentStream(request);
        const contentResponse = await streamingResult.response;
        

        // Log the response
        // console.log(contentResponse.candidates[0].content.parts[0].text);
        res.json({response: contentResponse.candidates[0].content.parts[0].text});
    } catch (error) {
        console.error('Error:', error);
        res.status(400).json({error: error.message});
    }
}


module.exports = {
    handUpVerification,
    closesEyesVerification
};
