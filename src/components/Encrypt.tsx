import crypto from 'crypto';
const bcrypt = require('bcrypt');
require('dotenv').config();

const SALT_ROUNDS = 10;

export function encrypt(str: any) {
    return bcrypt.hash(str, SALT_ROUNDS);
}

export function encryptCheck(str: any, hashedStr: any) {
    return bcrypt.compare(str, hashedStr);
}

export function encryptWithPrivateKey(data: string) {
    return new Promise((resolve, reject) => {
        // @ts-ignore
        const key = Buffer.from(process.env.SESSION_KEY, 'base64');
        const iv = crypto.randomBytes(12);
        const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);
        
        let encrypted = cipher.update(data, 'utf8', 'base64');
        encrypted += cipher.final('base64');
        const authTag = cipher.getAuthTag().toString('base64');
        
        const encryptedString = Buffer.from(iv.toString('base64') + encrypted + authTag).toString('base64');
        resolve(encryptedString);
    });
}

export function decryptWithPrivateKey(encryptedData: WithImplicitCoercion<string> | { [Symbol.toPrimitive](hint: "string"): string; }) {
    return new Promise((resolve, reject) => {
        // @ts-ignore
        const key = Buffer.from(process.env.SESSION_KEY, 'base64');
        const encryptedBytes = Buffer.from(encryptedData, 'base64').toString();
        
        const iv = Buffer.from(encryptedBytes.slice(0, 16), 'base64');
        const encryptedText = encryptedBytes.slice(16, encryptedBytes.length - 16);
        const authTag = Buffer.from(encryptedBytes.slice(encryptedBytes.length - 16), 'base64');
        
        const decipher = crypto.createDecipheriv('aes-256-gcm', key, iv);
        decipher.setAuthTag(authTag);
        
        let decrypted = decipher.update(encryptedText, 'base64', 'utf8');
        decrypted += decipher.final('utf8');
        
        resolve(decrypted);
    });
}

export function generateRandomString(length: number) {
    const bytesNeeded = Math.ceil(length * 6 / 8);
    const randomBytes = crypto.randomBytes(bytesNeeded);
    let randomStr = randomBytes.toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
    if (randomStr.length > length) {
        randomStr = randomStr.slice(0, length);
    }
    return randomStr;
}
