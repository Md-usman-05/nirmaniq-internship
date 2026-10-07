import { useFetch, useLocalStorage } from './hooks';
export const ProjectDashboard = () => {
    const { data, loading, error } = useFetch('https://jsonplaceholder.typicode.com/posts?_limit=4');
    const [view, setView] = useLocalStorage('dash-view', 'grid');
    if (loading)
        return <div>Loading...</div>;
    if (error)
        return <div style={{ color: 'red' }}>{error}</div>;
    return (<div style={{ marginBottom: '20px' }}>
      <h3>Dashboard</h3>
      <button onClick={() => setView(view === 'grid' ? 'list' : 'grid')}>View:{view}</button>
      <div style={{ display: view === 'grid' ? 'grid' : 'block', gridTemplateColumns: '1fr 1fr', gap: '10px', marginTop: '10px' }}>
        {data?.map(p => (<div key={p.id} style={{ border: '1px solid black', padding: '10px' }}>
            <h4>{p.title.slice(0, 15)}</h4>
            <p>{p.body.slice(0, 30)}</p>
          </div>))}
      </div>
    </div>);
};
