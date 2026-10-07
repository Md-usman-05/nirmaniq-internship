import { useState, useMemo } from 'react';
import { useDebounce } from './hooks';
const activities = Array.from({ length: 100 }, (_, i) => `Construction Task ${i + 1}`);
export const ActivitySearch = () => {
    const [search, setSearch] = useState('');
    const debounced = useDebounce(search, 500);
    const filtered = useMemo(() => activities.filter(a => a.toLowerCase().includes(debounced.toLowerCase())), [debounced]);
    return (<div>
      <h3>Activity Search</h3>
      <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search..."/>
      <p>Found {filtered.length} results for: {debounced}</p>
      <ul style={{ height: '150px', overflowY: 'scroll', border: '1px solid black' }}>
        {filtered.map(a => <li key={a}>{a}</li>)}
      </ul>
    </div>);
};
