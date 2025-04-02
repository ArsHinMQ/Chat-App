const persianToEnglishMap = {
    'آ': 'A', 'ا': 'A', 'ب': 'B', 'پ': 'P', 'ت': 'T', 'ث': 'S', 'ج': 'J',
    'چ': 'C', 'ح': 'H', 'خ': 'X', 'د': 'D', 'ذ': 'Z', 'ر': 'R',
    'ز': 'Z', 'ژ': 'Q', 'س': 'S', 'ش': 'V', 'ص': 'S', 'ض': 'Z',
    'ط': 'T', 'ظ': 'Z', 'ع': 'E', 'غ': 'G', 'ف': 'F', 'ق': 'K',
    'ک': 'K', 'گ': 'G', 'ل': 'L', 'م': 'M', 'ن': 'N', 'و': 'O',
    'ه': 'H', 'ی': 'Y'
}

// Function to transliterate a Persian word (single-character mapping)
export default function transliteratePersian(word) {
    return word.split('').map(char => persianToEnglishMap[char] || char).join('');
}