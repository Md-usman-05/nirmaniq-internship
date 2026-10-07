import { useState } from 'react';
export const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    const [text, setText] = useState('');
    const [filter, setFilter] = useState('all');
    const add = () => { if (text) {
        setTasks([...tasks, { id: Date.now(), text, completed: false }]);
        setText('');
    } };
    const toggle = (id) => setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
    const del = (id) => setTasks(tasks.filter(t => t.id !== id));
    const filtered = tasks.filter(t => filter === 'all' ? true : filter === 'active' ? !t.completed : t.completed);
    return (<div style={{ border: '1px solid black', padding: '10px', width: '300px' }}>
      <h3>Tasks</h3>
      <input value={text} onChange={e => setText(e.target.value)}/>
      <button onClick={add}>Add</button>
      <div>
        <button onClick={() => setFilter('all')}>All</button>
        <button onClick={() => setFilter('active')}>Active</button>
        <button onClick={() => setFilter('completed')}>Completed</button>
      </div>
      <ul>
        {filtered.map(t => (<li key={t.id} style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span onClick={() => toggle(t.id)} style={{ textDecoration: t.completed ? 'line-through' : 'none', cursor: 'pointer' }}>{t.text}</span>
            <button onClick={() => del(t.id)}>X</button>
          </li>))}
      </ul>
    </div>);
};
