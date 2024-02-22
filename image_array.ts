import fs from 'fs';
import Jimp from 'jimp';

/**
 * Utility to load images from disk and convert them to RGB arrays
 * and convert RGB arrays to images and save them to disk
 */
export class ImageArray {
    /**
     * Open an image from a file path and convert it to an RGB array
     * 
     * @param path path to the image file
     */
    static async getRGBArray(path: string): Promise<number[]> {
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
     */
    static async saveRGBArrayToImage(rgbArray: number[], width: number, path: string) {
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
     * Get a Pixel array with RGB colors in 24 bit integers
     * alpha channel is removed
     */
    static async getPixelArray(path:string): Promise<number[]> {
        // Read the image
        const image = await Jimp.read(path);
        const width = image.bitmap.width;
        const height = image.bitmap.height;
        let pixelArray = [];

        // Loop over each pixel
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                // Get the color of the pixel
                let pixelColor = image.getPixelColor(x, y);
                // Remove the alpha channel
                let {r, g, b} = Jimp.intToRGBA(pixelColor);
                pixelColor = (r << 16) + (g << 8) + b;
                // Push the pixel to the array
                pixelArray.push(pixelColor);
            }
        }

        return pixelArray;
    }
    
    /**
     * Convert a RGB pixel array to an image and save it to disk
     */
    static async savePixelArrayToImage(pixelArray: number[], width: number, path: string) {
        const height = pixelArray.length / width;
        // Create a new image
        const image = new Jimp(width, height);

        // Loop over each pixel
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                // Get the pixel from the array
                let pixelColor = pixelArray[y * width + x];
                // add the alpha channel
                let r = (pixelColor >> 16) & 0xFF;
                let g = (pixelColor >> 8) & 0xFF;
                let b = pixelColor & 0xFF;
                let pixel = Jimp.rgbaToInt(r, g, b, 255);
                // Set the color of the pixel
                image.setPixelColor(pixel, x, y);
            }
        }

        // Save the image to disk
        await image.writeAsync(path);
    }       
}