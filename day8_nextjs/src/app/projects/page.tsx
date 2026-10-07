import Link from 'next/link';

const allProjects = [
  { id: 1, name: 'Alpha Tower', status: 'active' },
  { id: 2, name: 'Beta Complex', status: 'completed' }
];

export default async function Projects({ searchParams }: { searchParams: Promise<{ status?: string }> }) {
  const resolvedParams = await searchParams;
  const s = resolvedParams.status;
  const filtered = s ? allProjects.filter(p => p.status === s) : allProjects;
  
  return (
    <div>
      <h1>Projects</h1>
      <div style={{ marginBottom: '20px' }}>
        <Link href="/projects" style={{ marginRight: '10px', fontWeight: !s ? 'bold' : 'normal' }}>All</Link>
        <Link href="/projects?status=active" style={{ fontWeight: s === 'active' ? 'bold' : 'normal' }}>Active</Link>
      </div>
      <ul>
        {filtered.map(p => (
          <li key={p.id}>
            <Link href={`/projects/${p.id}`}>{p.name} ({p.status})</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}