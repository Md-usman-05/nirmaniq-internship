const ispalindrome=(str)=>{
    const cleaned=str.toLowerCase().replace(/[^a-z0-9]/g,'');
    return cleaned===cleaned.split('').reverse().join('');
};
console.log("Palindrome 'A man a plan':", ispalindrome("A man a plan"));