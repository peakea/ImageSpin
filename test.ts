import { ImgSpin } from "./img_spin";
import { ImageArray } from "./image_array";
import fs from 'fs';

/**
 * Application entry point
 */
/**
 * Write test results to disk
 */
function saveTestResults(filePath: string, data: object): void {
    const dir = filePath.substring(0, filePath.lastIndexOf('/'));
    const fileName = filePath.substring(filePath.lastIndexOf('/') + 1);
    if (dir && !fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
    const file = `${dir}/${fileName}`;
    fs.writeFileSync(file, JSON.stringify(data));
}

// Test the image spin tool
async function testImageSpin8bit() {
    // Load the test images
    // Load the test image 1
    const testImg1 = await ImageArray.getRGBArray('./test_data/test_image_1_300x200.jpg');
    saveTestResults('./test_results/test_8bit/image_1_300x200.json', testImg1);
    // Save the test image 1 as a bitmap so colors are preserved
    await ImageArray.saveRGBArrayToImage(testImg1, 300, './test_results/test_8bit/image_1_300x200.bmp');

    // Load the test image 2
    const testImg2 = await ImageArray.getRGBArray('./test_data/test_image_2_300x200.jpg');
    saveTestResults('./test_results/test_8bit/image_2_300x200.json', testImg2);
    // Save the test image 2 as a bitmap so colors are preserved
    await ImageArray.saveRGBArrayToImage(testImg2, 300, './test_results/test_8bit/image_2_300x200.bmp');

    // Load the test image 3
    const testImg3 = await ImageArray.getRGBArray('./test_data/test_image_3_300x200.jpg');
    saveTestResults('./test_results/test_8bit/test_image_3_300x200.json', testImg3);
    // Save the test image 3 as a bitmap so colors are preserved
    await ImageArray.saveRGBArrayToImage(testImg3, 300, './test_results/test_8bit/image_3_300x200.bmp');

    // Load the test image 4
    const testImg4 = await ImageArray.getRGBArray('./test_data/test_image_4_300x200.jpg');
    saveTestResults('./test_results/test_8bit/test_image_4_300x200.json', testImg4);
    // Save the test image 4 as a bitmap so colors are preserved
    await ImageArray.saveRGBArrayToImage(testImg4, 300, './test_results/test_8bit/image_4_300x200.bmp');

    // Test 8bit image spin

    // Create 8bit instance of the image spin tool
    const imgSpin = new ImgSpin(0xFF);
    /**
     * Test 8bit 1 spin by image
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
        await ImageArray.saveRGBArrayToImage(result1, 300, './test_results/test_8bit/1_300x200_result_1.bmp');
        await ImageArray.saveRGBArrayToImage(result2, 300, './test_results/test_8bit/1_300x200_result_2.bmp');
        await ImageArray.saveRGBArrayToImage(result3, 300, './test_results/test_8bit/1_300x200_result_3.bmp');
        await ImageArray.saveRGBArrayToImage(result4, 300, './test_results/test_8bit/1_300x200_result_4.bmp');
    }

    /**
     * Test 8bit 2 spin by key
     */
    {
        // Create a key for image 1
        const key = imgSpin.createKey(testImg1);
        // Save the key to disk
        saveTestResults('./test_results/test_8bit/1_300x200_key.json', key);
        // Spin image 1 forward by the key
        const result1 = imgSpin.spinImageForward(testImg1, key);
        // Spin result 1 backward by the key
        const result2 = imgSpin.spinImageBackward(result1, key);
        // Spin image 1 backward by the key
        const result3 = imgSpin.spinImageBackward(testImg1, key);
        // Spin result 3 forward by the key
        const result4 = imgSpin.spinImageForward(result3, key);
        // Save the result as a bitmap so colors are preserved
        await ImageArray.saveRGBArrayToImage(key, 300, './test_results/test_8bit/2_300x200_key.bmp');
        await ImageArray.saveRGBArrayToImage(result1, 300, './test_results/test_8bit/2_300x200_result_1.bmp');
        await ImageArray.saveRGBArrayToImage(result2, 300, './test_results/test_8bit/2_300x200_result_2.bmp');
        await ImageArray.saveRGBArrayToImage(result3, 300, './test_results/test_8bit/2_300x200_result_3.bmp');
        await ImageArray.saveRGBArrayToImage(result4, 300, './test_results/test_8bit/2_300x200_result_4.bmp');
    }

    /**
     * Test 8bit 3 spin by multiple images and then un-spin them in a different order
     */
    {
        // Spin image 1 forward by image 2 and then forward by image 3 and then backward by image 4
        const result1 = imgSpin.spinImageForward(testImg1, testImg2);
        const result2 = imgSpin.spinImageForward(result1, testImg3);
        const result3 = imgSpin.spinImageBackward(result2, testImg4);
        // Save the result as a bitmap so colors are preserved
        await ImageArray.saveRGBArrayToImage(result1, 300, './test_results/test_8bit/3_300x200_result_1.bmp');
        await ImageArray.saveRGBArrayToImage(result2, 300, './test_results/test_8bit/3_300x200_result_2.bmp');
        await ImageArray.saveRGBArrayToImage(result3, 300, './test_results/test_8bit/3_300x200_result_3.bmp');
        // Spin result 11 backward by image 3 and then forward by image 4 and then backwards by image 2
        const result4 = imgSpin.spinImageBackward(result3, testImg3);
        const result5 = imgSpin.spinImageForward(result4, testImg4);
        const result6 = imgSpin.spinImageBackward(result5, testImg2);
        // Save the result as a bitmap so colors are preserved
        await ImageArray.saveRGBArrayToImage(result4, 300, './test_results/test_8bit/3_300x200_result_4.bmp');
        await ImageArray.saveRGBArrayToImage(result5, 300, './test_results/test_8bit/3_300x200_result_5.bmp');
        await ImageArray.saveRGBArrayToImage(result6, 300, './test_results/test_8bit/3_300x200_result_6.bmp');
    }

    /**
     * Test 8bit 4 spin by multiple keys and then un-spin them in a different order
     */
    {
        // Create a 3 keys for image 1
        const key1 = imgSpin.createKey(testImg1);
        const key2 = imgSpin.createKey(testImg1);
        const key3 = imgSpin.createKey(testImg1);
        // write the keys to disk
        saveTestResults('./test_results/test_8bit/4_300x200_key1.json', key1);
        saveTestResults('./test_results/test_8bit/4_300x200_key2.json', key2);
        saveTestResults('./test_results/test_8bit/4_300x200_key3.json', key3);
        // Spin image 1 forward by key 1 and then forward by key 2 and then backward by key 3
        const result1 = imgSpin.spinImageForward(testImg1, key1);
        const result2 = imgSpin.spinImageForward(result1, key2);
        const result3 = imgSpin.spinImageBackward(result2, key3);
        // Spin result 17 backward by key 2 and then forward by key 3 and then backwards by key 1
        const result4 = imgSpin.spinImageBackward(result3, key2);
        const result5 = imgSpin.spinImageForward(result4, key3);
        const result6 = imgSpin.spinImageBackward(result5, key1);
        // Save the result as a bitmap so colors are preserved
        await ImageArray.saveRGBArrayToImage(key1, 300, './test_results/test_8bit/4_300x200_key1.bmp');
        await ImageArray.saveRGBArrayToImage(key2, 300, './test_results/test_8bit/4_300x200_key2.bmp');
        await ImageArray.saveRGBArrayToImage(key3, 300, './test_results/test_8bit/4_300x200_key3.bmp');
        await ImageArray.saveRGBArrayToImage(result1, 300, './test_results/test_8bit/4_300x200_result_1.bmp');
        await ImageArray.saveRGBArrayToImage(result2, 300, './test_results/test_8bit/4_300x200_result_2.bmp');
        await ImageArray.saveRGBArrayToImage(result3, 300, './test_results/test_8bit/4_300x200_result_3.bmp');
        await ImageArray.saveRGBArrayToImage(result4, 300, './test_results/test_8bit/4_300x200_result_4.bmp');
        await ImageArray.saveRGBArrayToImage(result5, 300, './test_results/test_8bit/4_300x200_result_5.bmp');
        await ImageArray.saveRGBArrayToImage(result6, 300, './test_results/test_8bit/4_300x200_result_6.bmp');
    }
}

/**
 * Test 24bit image spin
 */
async function testImageSpin24bit() {
    // Load the test images
    // Load the test image 1
    const testImg1 = await ImageArray.getPixelArray('./test_data/test_image_1_300x200.jpg');
    saveTestResults('./test_results/test_24bit/image_1_300x200.json', testImg1);
    // Save the test image 1 as a bitmap so colors are preserved
    ImageArray.savePixelArrayToImage(testImg1, 300, './test_results/test_24bit/image_1_300x200.bmp');

    // Load the test image 2
    const testImg2 = await ImageArray.getPixelArray('./test_data/test_image_2_300x200.jpg');
    saveTestResults('./test_results/test_24bit/image_2_300x200.json', testImg2);
    // Save the test image 2 as a bitmap so colors are preserved
    ImageArray.savePixelArrayToImage(testImg2, 300, './test_results/test_24bit/image_2_300x200.bmp');

    // Load the test image 3
    const testImg3 = await ImageArray.getPixelArray('./test_data/test_image_3_300x200.jpg');
    saveTestResults('./test_results/test_24bit/test_image_3_300x200.json', testImg3);
    // Save the test image 3 as a bitmap so colors are preserved
    ImageArray.savePixelArrayToImage(testImg3, 300, './test_results/test_24bit/image_3_300x200.bmp');

    // Load the test image 4
    const testImg4 = await ImageArray.getPixelArray('./test_data/test_image_4_300x200.jpg');
    saveTestResults('./test_results/test_24bit/test_image_4_300x200.json', testImg4);
    // Save the test image 4 as a bitmap so colors are preserved
    ImageArray.savePixelArrayToImage(testImg4, 300, './test_results/test_24bit/image_4_300x200.bmp');

    // Test 24bit image spin

    // Create 24bit instance of the image spin tool
    const imgSpin = new ImgSpin(0xFFFFFF);
    /**
     * Test 24bit 1 spin by image
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
        ImageArray.savePixelArrayToImage(result1, 300, './test_results/test_24bit/1_300x200_result_1.bmp');
        ImageArray.savePixelArrayToImage(result2, 300, './test_results/test_24bit/1_300x200_result_2.bmp');
        ImageArray.savePixelArrayToImage(result3, 300, './test_results/test_24bit/1_300x200_result_3.bmp');
        ImageArray.savePixelArrayToImage(result4, 300, './test_results/test_24bit/1_300x200_result_4.bmp');
    }

    /**
     * Test 24bit 2 spin by key
     */
    {
        // Create a key for image 1
        const key = imgSpin.createKey(testImg1);
        // Save the key to disk
        saveTestResults('./test_results/test_24bit/1_300x200_key.json', key);
        // Spin image 1 forward by the key
        const result1 = imgSpin.spinImageForward(testImg1, key);
        // Spin result 1 backward by the key
        const result2 = imgSpin.spinImageBackward(result1, key);
        // Spin image 1 backward by the key
        const result3 = imgSpin.spinImageBackward(testImg1, key);
        // Spin result 3 forward by the key
        const result4 = imgSpin.spinImageForward(result3, key);
        // Save the result as a bitmap so colors are preserved
        ImageArray.savePixelArrayToImage(key, 300, './test_results/test_24bit/2_300x200_key.bmp');
        ImageArray.savePixelArrayToImage(result1, 300, './test_results/test_24bit/2_300x200_result_1.bmp');
        ImageArray.savePixelArrayToImage(result2, 300, './test_results/test_24bit/2_300x200_result_2.bmp');
        ImageArray.savePixelArrayToImage(result3, 300, './test_results/test_24bit/2_300x200_result_3.bmp');
        ImageArray.savePixelArrayToImage(result4, 300, './test_results/test_24bit/2_300x200_result_4.bmp');
    }

    /**
     * Test 24bit 3 spin by multiple images and then un-spin them in a different order
     */
    {
        // Spin image 1 forward by image 2 and then forward by image 3 and then backward by image 4
        const result1 = imgSpin.spinImageForward(testImg1, testImg2);
        const result2 = imgSpin.spinImageForward(result1, testImg3);
        const result3 = imgSpin.spinImageBackward(result2, testImg4);
        // Save the result as a bitmap so colors are preserved
        ImageArray.savePixelArrayToImage(result1, 300, './test_results/test_24bit/3_300x200_result_1.bmp');
        ImageArray.savePixelArrayToImage(result2, 300, './test_results/test_24bit/3_300x200_result_2.bmp');
        ImageArray.savePixelArrayToImage(result3, 300, './test_results/test_24bit/3_300x200_result_3.bmp');
        // Spin result 11 backward by image 3 and then forward by image 4 and then backwards by image 2
        const result4 = imgSpin.spinImageBackward(result3, testImg3);
        const result5 = imgSpin.spinImageForward(result4, testImg4);
        const result6 = imgSpin.spinImageBackward(result5, testImg2);
        // Save the result as a bitmap so colors are preserved
        ImageArray.savePixelArrayToImage(result4, 300, './test_results/test_24bit/3_300x200_result_4.bmp');
        ImageArray.savePixelArrayToImage(result5, 300, './test_results/test_24bit/3_300x200_result_5.bmp');
        ImageArray.savePixelArrayToImage(result6, 300, './test_results/test_24bit/3_300x200_result_6.bmp');
    }

    /**
     * Test 24bit 4 spin by multiple keys and then un-spin them in a different order
     */
    {
        // Create a 3 keys for image 1
        const key1 = imgSpin.createKey(testImg1);
        const key2 = imgSpin.createKey(testImg1);
        const key3 = imgSpin.createKey(testImg1);
        // write the keys to disk
        saveTestResults('./test_results/test_24bit/4_300x200_key1.json', key1);
        saveTestResults('./test_results/test_24bit/4_300x200_key2.json', key2);
        saveTestResults('./test_results/test_24bit/4_300x200_key3.json', key3);
        // Spin image 1 forward by key 1 and then forward by key 2 and then backward by key 3
        const result1 = imgSpin.spinImageForward(testImg1, key1);
        const result2 = imgSpin.spinImageForward(result1, key2);
        const result3 = imgSpin.spinImageBackward(result2, key3);
        // Spin result 17 backward by key 2 and then forward by key 3 and then backwards by key 1
        const result4 = imgSpin.spinImageBackward(result3, key2);
        const result5 = imgSpin.spinImageForward(result4, key3);
        const result6 = imgSpin.spinImageBackward(result5, key1);
        // Save the result as a bitmap so colors are preserved
        ImageArray.savePixelArrayToImage(key1, 300, './test_results/test_24bit/4_300x200_key1.bmp');
        ImageArray.savePixelArrayToImage(key2, 300, './test_results/test_24bit/4_300x200_key2.bmp');
        ImageArray.savePixelArrayToImage(key3, 300, './test_results/test_24bit/4_300x200_key3.bmp');
        ImageArray.savePixelArrayToImage(result1, 300, './test_results/test_24bit/4_300x200_result_1.bmp');
        ImageArray.savePixelArrayToImage(result2, 300, './test_results/test_24bit/4_300x200_result_2.bmp');
        ImageArray.savePixelArrayToImage(result3, 300, './test_results/test_24bit/4_300x200_result_3.bmp');
        ImageArray.savePixelArrayToImage(result4, 300, './test_results/test_24bit/4_300x200_result_4.bmp');
        ImageArray.savePixelArrayToImage(result5, 300, './test_results/test_24bit/4_300x200_result_5.bmp');
        ImageArray.savePixelArrayToImage(result6, 300, './test_results/test_24bit/4_300x200_result_6.bmp');
    }
}

/**
 * Test the image spin tool
 */
async function testImageSpin() {
    // Test 8bit image spin
    await testImageSpin8bit();
    // Test 24bit image spin
    await testImageSpin24bit();
}
testImageSpin();