import { useState, useEffect } from 'react';
export const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        let isMounted = true;
        const fetchData = async () => {
            setLoading(true);
            try {
                const r = await fetch(url);
                if (!r.ok)
                    throw new Error('API Error');
                const d = await r.json();
                if (isMounted) {
                    setData(d);
                    setError(null);
                }
            }
            catch (e) {
                if (isMounted)
                    setError(e instanceof Error ? e.message : String(e));
            }
            finally {
                if (isMounted)
                    setLoading(false);
            }
        };
        fetchData();
        return () => { isMounted = false; };
    }, [url]);
    return { data, loading, error };
};
export const useDebounce = (value, delay) => {
    const [debounced, setDebounced] = useState(value);
    useEffect(() => {
        const handler = setTimeout(() => setDebounced(value), delay);
        return () => clearTimeout(handler);
    }, [value, delay]);
    return debounced;
};
export const useLocalStorage = (key, initialValue) => {
    const [value, setValue] = useState(() => {
        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        }
        catch {
            return initialValue;
        }
    });
    useEffect(() => {
        window.localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);
    return [value, setValue];
};
