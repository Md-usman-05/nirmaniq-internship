import Link from 'next/link';

export const instant = false;

export default async function ProjectDetail({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  
  return (
    <div>
      <h1>Project ID: {resolvedParams.id}</h1>
      <Link href={`/projects/${resolvedParams.id}/towers/A1`} style={{ color: 'blue', textDecoration: 'underline' }}>
        View Tower A1
      </Link>
    </div>
  );
}