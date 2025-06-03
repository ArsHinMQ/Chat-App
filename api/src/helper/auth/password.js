import bcrypt from 'bcrypt'

const hashPassword = async (password) => {
    const saltRounds = 10 // Higher is more secure but slower
    const hashedPassword = await bcrypt.hash(password, saltRounds)
    return hashedPassword
}

const comparePassword = async (password, hashedPassword) => {
    const isMatch = await bcrypt.compare(password, hashedPassword)
    return isMatch
}
export {
    hashPassword,
    comparePassword,
}