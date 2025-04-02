const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@#$%^&*])[A-Za-z\d@#$%^&*]{8,}$/

export default function passwordStrengthCheck(password) {
    if (password.length < 8) {
        return false
    }
    return passwordRegex.test(password)
}