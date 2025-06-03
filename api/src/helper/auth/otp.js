import crypto from 'crypto'

/**
 * Generates a secure 6-digit OTP code
 * @returns {string} A 6-digit OTP code
 */
export function generateOTP() {
    // Generate a random number between 0 and 999999
    const randomBytes = crypto.randomBytes(3) // 3 bytes = 24 bits, enough for 6 digits
    const randomNumber = randomBytes.readUIntBE(0, 3) % 1000000
    
    // Convert to string and pad with leading zeros if necessary
    return randomNumber.toString().padStart(6, '0')
} 