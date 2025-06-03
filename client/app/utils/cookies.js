export function setCookies(cookieString) {
    if (!cookieString) return;
    
    // Split multiple cookies if present
    const cookies = cookieString.split(',');
    
    cookies.forEach(cookie => {
        // Extract the cookie name and value
        const [cookiePart] = cookie.split(';');
        const [name, value] = cookiePart.split('=');
        
        // Set the cookie
        document.cookie = `${name}=${value}; path=/`;
    });
} 