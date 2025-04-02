import isEnglish from "./is-english"
import isPersian from "./is-persian"


const getDirection = (text) => {
    for (const c of text) {
        if (isPersian(c)) {
            return 'rtl'
        }
        if (isEnglish(c)) {
            return 'ltr'
        }
    }
}

export default getDirection