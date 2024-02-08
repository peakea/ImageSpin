import { ImgSpin } from "./img_spin";
import fs from 'fs';
import Jimp from 'jimp';

/**
 * Application entry point
 */

/**
 * Open an image from a file path and convert it to an RGB array
 * 
 * @param path path to the image file
 */
async function getRGBArray(path: string): Promise<number[]> {
    // Read the image
    const image = await Jimp.read(path);
    const width = image.bitmap.width;
    const height = image.bitmap.height;
    let rgbArray = [];

    // Loop over each pixel
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            // Get the color of the pixel
            let hex = image.getPixelColor(x, y);
            let rgb = Jimp.intToRGBA(hex);

            // Push the RGB values to the array
            rgbArray.push(rgb.r);
            rgbArray.push(rgb.g);
            rgbArray.push(rgb.b);
        }
    }

    return rgbArray;
}

/**
 * Convert an RGB array to an image and save it to disk
 * 
 */
async function saveRGBArrayToImage(rgbArray: number[], width: number, path: string) {
    const height = rgbArray.length / (width * 3);
    // Create a new image
    const image = new Jimp(width, height);

    // Loop over each pixel
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            // Get the RGB values from the array
            let r = rgbArray[y * width * 3 + x * 3];
            let g = rgbArray[y * width * 3 + x * 3 + 1];
            let b = rgbArray[y * width * 3 + x * 3 + 2];

            // Set the color of the pixel
            image.setPixelColor(Jimp.rgbaToInt(r, g, b, 255), x, y);
        }
    }

    // Save the image to disk
    await image.writeAsync(path);
}

/**
 * Write test results to disk
 */
function saveTestResults(fileName: string, data: object): void {
    const file = `./test_results/${fileName}`;
    fs.writeFileSync(file, JSON.stringify(data));
}

// Test the image spin tool
async function testImageSpin() {
    {
        // Create a new instance of the image spin tool
        const imgSpin = new ImgSpin();

        /**
         * Load the test images
         */
        // Load the test image 1
        const testImg1 = await getRGBArray('./test_data/test_1_300x200.jpg');
        saveTestResults('test_image_1_300x200.json', testImg1);
        // Save the test image 1 as a bitmap so colors are preserved
        await saveRGBArrayToImage(testImg1, 300, './test_results/test_image_1_300x200.bmp');

        // Load the test image 2
        const testImg2 = await getRGBArray('./test_data/test_2_300x200.jpg');
        saveTestResults('test_image_2_300x200.json', testImg2);
        // Save the test image 2 as a bitmap so colors are preserved
        await saveRGBArrayToImage(testImg2, 300, './test_results/test_image_2_300x200.bmp');

        // Load the test image 3
        const testImg3 = await getRGBArray('./test_data/test_3_300x200.jpg');
        saveTestResults('test_image_3_300x200.json', testImg3);
        // Save the test image 3 as a bitmap so colors are preserved
        await saveRGBArrayToImage(testImg3, 300, './test_results/test_image_3_300x200.bmp');

        // Load the test image 4
        const testImg4 = await getRGBArray('./test_data/test_4_300x200.jpg');
        saveTestResults('test_image_4_300x200.json', testImg4);
        // Save the test image 4 as a bitmap so colors are preserved
        await saveRGBArrayToImage(testImg4, 300, './test_results/test_image_4_300x200.bmp');

        /**
         * Test 1 spin by image
         */
        {
            // Spin image 1 forward by image 2
            const result1 = imgSpin.spinImageForward(testImg1, testImg2);
            // Spin result 1 backward by image 2
            const result2 = imgSpin.spinImageBackward(result1, testImg2);
            // Spin image 1 backward by image 2
            const result3 = imgSpin.spinImageBackward(testImg1, testImg2);
            // Spin result 3 forward by image 2
            const result4 = imgSpin.spinImageForward(result3, testImg2);
            // Save the result as a bitmap so colors are preserved
            await saveRGBArrayToImage(result1, 300, './test_results/test_1_300x200_result_1.bmp');
            await saveRGBArrayToImage(result2, 300, './test_results/test_1_300x200_result_2.bmp');
            await saveRGBArrayToImage(result3, 300, './test_results/test_1_300x200_result_3.bmp');
            await saveRGBArrayToImage(result4, 300, './test_results/test_1_300x200_result_4.bmp');
        }

        /**
         * Test 2 spin by key
         */
        {
            // Create a key for image 1
            const key = imgSpin.createKey(testImg1);
            // Save the key to disk
            saveTestResults('test_1_300x200_key.json', key);
            // Spin image 1 forward by the key
            const result1 = imgSpin.spinImageForward(testImg1, key);
            // Spin result 1 backward by the key
            const result2 = imgSpin.spinImageBackward(result1, key);
            // Spin image 1 backward by the key
            const result3 = imgSpin.spinImageBackward(testImg1, key);
            // Spin result 3 forward by the key
            const result4 = imgSpin.spinImageForward(result3, key);
            // Save the result as a bitmap so colors are preserved
            await saveRGBArrayToImage(key, 300, './test_results/test_2_300x200_key.bmp');
            await saveRGBArrayToImage(result1, 300, './test_results/test_2_300x200_result_1.bmp');
            await saveRGBArrayToImage(result2, 300, './test_results/test_2_300x200_result_2.bmp');
            await saveRGBArrayToImage(result3, 300, './test_results/test_2_300x200_result_3.bmp');
            await saveRGBArrayToImage(result4, 300, './test_results/test_2_300x200_result_4.bmp');
        }

        /**
         * Test 3 spin by multiple images and then un-spin them in a different order
         */
        {
            // Spin image 1 forward by image 2 and then forward by image 3 and then backward by image 4
            const result1 = imgSpin.spinImageForward(testImg1, testImg2);
            const result2 = imgSpin.spinImageForward(result1, testImg3);
            const result3 = imgSpin.spinImageBackward(result2, testImg4);
            // Save the result as a bitmap so colors are preserved
            await saveRGBArrayToImage(result1, 300, './test_results/test_3_300x200_result_1.bmp');
            await saveRGBArrayToImage(result2, 300, './test_results/test_3_300x200_result_2.bmp');
            await saveRGBArrayToImage(result3, 300, './test_results/test_3_300x200_result_3.bmp');
            // Spin result 11 backward by image 3 and then forward by image 4 and then backwards by image 2
            const result4 = imgSpin.spinImageBackward(result3, testImg3);
            const result5 = imgSpin.spinImageForward(result4, testImg4);
            const result6 = imgSpin.spinImageBackward(result5, testImg2);
            // Save the result as a bitmap so colors are preserved
            await saveRGBArrayToImage(result4, 300, './test_results/test_3_300x200_result_4.bmp');
            await saveRGBArrayToImage(result5, 300, './test_results/test_3_300x200_result_5.bmp');
            await saveRGBArrayToImage(result6, 300, './test_results/test_3_300x200_result_6.bmp');
        }

        /**
         * Test 4 spin by multiple keys and then un-spin them in a different order
         */
        {
            // Create a 3 keys for image 1
            const key1 = imgSpin.createKey(testImg1);
            const key2 = imgSpin.createKey(testImg1);
            const key3 = imgSpin.createKey(testImg1);
            // write the keys to disk
            saveTestResults('test_1_300x200_key1.json', key1);
            saveTestResults('test_1_300x200_key2.json', key2);
            saveTestResults('test_1_300x200_key3.json', key3);
            // Spin image 1 forward by key 1 and then forward by key 2 and then backward by key 3
            const result1 = imgSpin.spinImageForward(testImg1, key1);
            const result2 = imgSpin.spinImageForward(result1, key2);
            const result3 = imgSpin.spinImageBackward(result2, key3);
            // Spin result 17 backward by key 2 and then forward by key 3 and then backwards by key 1
            const result4 = imgSpin.spinImageBackward(result3, key2);
            const result5 = imgSpin.spinImageForward(result4, key3);
            const result6 = imgSpin.spinImageBackward(result5, key1);
            // Save the result as a bitmap so colors are preserved
            await saveRGBArrayToImage(key1, 300, './test_results/test_4_300x200_key1.bmp');
            await saveRGBArrayToImage(key2, 300, './test_results/test_4_300x200_key2.bmp');
            await saveRGBArrayToImage(key3, 300, './test_results/test_4_300x200_key3.bmp');
            await saveRGBArrayToImage(result1, 300, './test_results/test_4_300x200_result_1.bmp');
            await saveRGBArrayToImage(result2, 300, './test_results/test_4_300x200_result_2.bmp');
            await saveRGBArrayToImage(result3, 300, './test_results/test_4_300x200_result_3.bmp');
            await saveRGBArrayToImage(result4, 300, './test_results/test_4_300x200_result_4.bmp');
            await saveRGBArrayToImage(result5, 300, './test_results/test_4_300x200_result_5.bmp');
            await saveRGBArrayToImage(result6, 300, './test_results/test_4_300x200_result_6.bmp');
        }
    }
}

testImageSpin();