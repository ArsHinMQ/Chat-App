import isEnglish from "./is-english"
import isPersian from "./is-persian"
import transliteratePersian from "./transliterate-persian"

export default function findFirstLetter(str) {
    for (const char of str) {
        if (isPersian(char)) {
            return transliteratePersian(char).toUpperCase()
        }
        if (isEnglish(char)) {
            return char.toUpperCase()
        }
    }

    return 'A'
}