import Link from 'next/link';
import { getAllProjects } from '@/lib/markdown';

export default function Home() {
  const projects = getAllProjects();

  return (
    <div className="bg-gradient">
      <div className="container" style={{maxWidth: '1100px', padding: '3rem 1rem'}}>
        <header style={{marginBottom: '3rem', textAlign: 'center'}}>
          <h1 style={{fontSize: '3rem', marginBottom: '1rem'}}>
            Dự Án Bất Động Sản
          </h1>
          <p style={{fontSize: '1.125rem', color: '#6b7280'}}>
            Thông tin chi tiết về các dự án bất động sản
          </p>
        </header>

        {projects.length === 0 ? (
          <div className="card" style={{padding: '2rem', textAlign: 'center'}}>
            <p style={{color: '#6b7280'}}>
              Chưa có dự án nào trong hệ thống
            </p>
          </div>
        ) : (
          <div style={{display: 'grid', gap: '1.5rem'}}>
            {projects.map((project) => (
              <Link
                key={project.slug}
                href={`/projects/${project.slug}`}
                className="card"
                style={{display: 'block', padding: '1.5rem', border: '1px solid #e5e7eb', textDecoration: 'none', color: 'inherit'}}
              >
                <h2 style={{fontSize: '1.5rem', fontWeight: '600', color: '#111827', marginBottom: '0.5rem'}}>
                  {project.title}
                </h2>
                <div className="btn btn-primary" style={{marginTop: '1rem', display: 'inline-flex', alignItems: 'center'}}>
                  Xem chi tiết
                  <svg style={{width: '1.25rem', height: '1.25rem', marginLeft: '0.5rem'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
