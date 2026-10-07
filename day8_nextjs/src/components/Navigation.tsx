'use client';
import Link from'next/link';
import{usePathname}from'next/navigation';
export const Navigation=()=>{
  const p=usePathname();
  return(
    <nav className="sidebar">
      <h2 className="brand">NirmanIQ</h2>
      <Link href="/" className={`nav-link ${p==='/'?'active':''}`}>Dashboard</Link>
      <Link href="/projects" className={`nav-link ${p.startsWith('/projects')?'active':''}`}>Projects</Link>
    </nav>
  );
};