export const fibonacci = (n) => {
    let [a, b] = [0, 1];
    for (let i = 0; i < n; i++) {
        [a, b] = [b, a + b];
    }
    return a;
};
export const isPalindrome = (str) => {
    const cleaned = str.replace(/[^A-Za-z0-9]/g, '').toLowerCase();
    return cleaned === cleaned.split('').reverse().join('');
};
export const rotateArray = (arr, k) => {
    if (arr.length === 0)
        return [];
    const offset = k % arr.length;
    return [...arr.slice(-offset), ...arr.slice(0, arr.length - offset)];
};
export const groupBy = (array, key) => {
    return array.reduce((acc, item) => {
        const groupValue = String(item[key]);
        if (!acc[groupValue]) {
            acc[groupValue] = [];
        }
        acc[groupValue].push(item);
        return acc;
    }, {});
};
export const flattenArray = (arr) => {
    return arr.reduce((acc, item) => {
        if (Array.isArray(item)) {
            return acc.concat(flattenArray(item));
        }
        return acc.concat(item);
    }, []);
};
