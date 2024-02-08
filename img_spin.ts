import { assert } from "console";

/**
 * Image spin tool to make RGB values spin around different images
 */
export class ImgSpin {
    /**
     * Spin a byte forwards within 256 bits
     */
    spinByteForward(imgByte: number, keyByte: number): number {
        const result = (imgByte + keyByte) & 0xFF;;
        return result;
    }

    /**
     * Spin a byte backwards within 256 bits
     */
    spinByteBackward(imgByte: number, keyByte: number): number {
        const result = (imgByte - keyByte) & 0xFF;
        return result;
    }

    /**
     * Spin an image forward
     */
    spinImageForward(image: number[], key: number[]) {
        const result = [];
        for (let i = 0; i < image.length; i++) {
            result.push(this.spinByteForward(image[i], key[i]));
        }
        return result;
    }
    
    /**
     * Spin an image backward
     */
    spinImageBackward(image: number[], key: number[]) {
        const result = [];
        for (let i = 0; i < image.length; i++) {
            result.push(this.spinByteBackward(image[i], key[i]));
        }
        return result;
    }
    
    /**
     * Create a key using a random number generator for the given image
     */
    createKey(image: number[]): number[] {
        const key = [];
        for (let i = 0; i < image.length; i++) {
            key.push(Math.floor(Math.random() * 256));
        }
        return key;
    }
}