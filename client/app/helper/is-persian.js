const isPersian = (char) => {
    return /^[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF]$/.test(char);
}

export default isPersian