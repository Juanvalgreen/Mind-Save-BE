const path = require('path');
const jimp = require('jimp');
const fft = require('fft-js').fft;
const fftUtil = require('fft-js').util;

const referenceImagePath = path.join(__dirname, '../assets/shapes.png');

let referenceFft = null;

const loadReferenceContour = async () => {
    try {
        const referenceImage = await jimp.read(referenceImagePath);
        const { width, height } = referenceImage.bitmap;

        const contour = [];
        for (let x = 0; x < width; x++) {
            for (let y = 0; y < height; y++) {
                const pixel = referenceImage.getPixelColor(x, y);
                const rgba = jimp.intToRGBA(pixel);
                if (rgba.a > 0 && (rgba.r < 255 || rgba.g < 255 || rgba.b < 255)) {
                    contour.push([x, y]);
                }
            }
        }

        if (contour.length === 0) {
            throw new Error('No contours found in reference image.');
        }

        const contourComplex = contour.map(point => [point[0], point[1]]);
        console.log('Contour Complex (length):', contourComplex.length);
        console.log('Contour Complex (sample):', contourComplex.slice(0, 10));

        if (contourComplex.length === 0) {
            throw new Error('Contour complex array is empty.');
        }

        // Verificar si hay algún valor undefined en el contorno complejo
        for (let i = 0; i < contourComplex.length; i++) {
            if (contourComplex[i][0] === undefined || contourComplex[i][1] === undefined) {
                throw new Error(`Undefined value found at index ${i} in contourComplex`);
            }
        }

        console.log('Before FFT - contourComplex:', contourComplex);

        const phasors = fft(contourComplex);
        const frequencies = fftUtil.fftFreq(phasors, 1);
        const magnitudes = fftUtil.fftMag(phasors);

        return { frequencies, magnitudes };
    } catch (error) {
        console.error('Error loading reference contour:', error);
        throw error;
    }
};



(async () => {
    try {
        referenceFft = await loadReferenceContour();
        console.log('Reference FFT loaded successfully');
    } catch (error) {
        console.error('Error initializing reference FFT:', error.message);
    }
})();

const contourToFft = (contour) => {
    const contourComplex = contour.map(point => [point.x, point.y]);
    console.log('Input contour complex (length):', contourComplex.length); // Añadir registro de longitud
    console.log('Input contour complex (sample):', contourComplex.slice(0, 10)); // Añadir muestra de contorno complejo

    if (contourComplex.length === 0) {
        throw new Error('Input contour complex array is empty.');
    }

    // Añadir registro antes de la llamada a FFT
    console.log('Before FFT - input contourComplex:', contourComplex);

    const phasors = fft(contourComplex);
    const frequencies = fftUtil.fftFreq(phasors, 1);
    const magnitudes = fftUtil.fftMag(phasors);
    return { frequencies, magnitudes };
};


const flattenSvgPath = (svgPath) => {
    const flattenedPath = [];

    svgPath.forEach(item => {
        if (Array.isArray(item)) {
            item.forEach(subItem => flattenedPath.push(subItem));
        } else {
            flattenedPath.push(item);
        }
    });

    return flattenedPath;
};

const compareShape = (req, res) => {
    try {
        if (!referenceFft) {
            throw new Error('Reference FFT not loaded.');
        }

        const { svgPath } = req.body;
        const flattenedSvgPath = flattenSvgPath(svgPath);

        const contour = flattenedSvgPath.map(command => {
            const coords = command.slice(1).split(',').map(Number);
            return { x: coords[0], y: coords[1] };
        });

        if (contour.length === 0) {
            throw new Error('Input contour array is empty.');
        }

        console.log('Input contour:', contour.slice(0, 10)); // Mostrar los primeros 10 puntos del contorno de entrada

        const inputFft = contourToFft(contour);

        const comparison = referenceFft.magnitudes.map((refMag, i) => {
            return Math.abs(refMag - inputFft.magnitudes[i]);
        });

        const averageDifference = comparison.reduce((acc, diff) => acc + diff, 0) / comparison.length;

        res.json({ averageDifference });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};




module.exports = {
    compareShape
}