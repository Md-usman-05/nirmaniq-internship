export const fibonacci = (n: number): number => {
  let [a, b] = [0, 1];
  for (let i = 0; i < n; i++) {
    [a, b] = [b, a + b];
  }
  return a;
};

export const isPalindrome = (str: string): boolean => {
  const cleaned = str.replace(/[^A-Za-z0-9]/g, '').toLowerCase();
  return cleaned === cleaned.split('').reverse().join('');
};

export const rotateArray = <T>(arr: T[], k: number): T[] => {
  if (arr.length === 0) return [];
  const offset = k % arr.length;
  return [...arr.slice(-offset), ...arr.slice(0, arr.length - offset)];
};

export const groupBy = <T, K extends keyof T>(array: T[], key: K): Record<string, T[]> => {
  return array.reduce((acc, item) => {
    const groupValue = String(item[key]);
    if (!acc[groupValue]) {
      acc[groupValue] = [];
    }
    acc[groupValue].push(item);
    return acc;
  }, {} as Record<string, T[]>);
};

export const flattenArray = (arr: unknown[]): unknown[] => {
  return arr.reduce((acc: unknown[], item: unknown) => {
    if (Array.isArray(item)) {
      return acc.concat(flattenArray(item));
    }
    return acc.concat(item);
  }, []);
};