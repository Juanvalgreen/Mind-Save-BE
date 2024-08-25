const { response } = require('../app');
const { generativeVisionModel, generativeModel } = require('../vertexConfig');
const dotenv = require('dotenv');
const {EXAMPLE_RESPONSE} = require('../constants')

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
        console.log(contentResponse.candidates[0].content.parts[0].text);
        res.json({response: contentResponse.candidates[0].content.parts[0].text});
    } catch (error) {
        console.error('Error:', error);
        res.status(400).json({error: error.message});
    }
}


async function generateAnalysis(examResults) {

    
    console.log(examResults);

    const prompt = `
        Basado en el examen MMSE para la detección de deterioro cognitivo, genera en formato JSON un analisis de la prueba tal como se muestra en el ejemplo con los datos del paciente, sin textos ni titulos introductorios unicamente el JSON.
        
        Datos del paciente que debe ser analizado: ${JSON.stringify(examResults)}
        
        Ejemplo de output esperado: ${JSON.stringify(EXAMPLE_RESPONSE)}
        `;

    try{    
        const request = {
            contents: [{role: 'user', parts: [{text: prompt}]}],
        };

        console.log(request.contents[0].parts);
        const result = await generativeModel.generateContent(request);

        // Extract and clean the JSON content
        let parseResult = result.response.candidates[0].content.parts[0].text;

        console.log('antes de limpiarlo y parsearlo', parseResult);

        // Clean content
        parseResult = parseResult.replace(/```json\n|```/g, '').replace(/\\n/g, '').replace(/\\\"/g, '"').replace(/^```json\n|```$/g, '');
        

        // Parse the cleaned JSON string
        const jsonResponse = JSON.parse(parseResult);

        // console.log('Response: ', jsonResponse);

        return jsonResponse;
    }catch(error){
        console.error('Error:', error)
        throw error

    }
};


async function sentenceVerification(req, res) {
    const {sentence} = req.body;
    
    const prompt = `Respondiendo unicamente con las palabras si o no, determina si esta frase tiene sentido gramaticalmentey esta completa
    Frase:${sentence}`;
    const instruction = 'Responde con si o no';

    try{    
        const request = {
            contents: [{role: 'user', parts: [{text: prompt}]}],
            system_instructions: instruction,
        };

        const result = await generativeModel.generateContent(request);


        // Log the response
        console.log(result.response.candidates[0].content.parts[0].text);
        res.json({response: result.response.candidates[0].content.parts[0].text});
    }catch(error){
        console.error('Error:', error)
        res.status(400).json({error: error.message});

    }
};

module.exports = {
    handUpVerification,
    closesEyesVerification,
    generateAnalysis,
    sentenceVerification
};
