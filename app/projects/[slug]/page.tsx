import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getAllProjects, getProjectBySlug } from '@/lib/markdown';
import MarkdownViewer from '@/components/MarkdownViewer';

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const projects = getAllProjects();
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="bg-gradient">
      <div className="container" style={{maxWidth: '1200px', padding: '2rem 1rem'}}>
        <Link
          href="/"
          className="btn btn-primary"
          style={{marginBottom: '1.5rem', display: 'inline-flex', alignItems: 'center', textDecoration: 'none'}}
        >
          <svg style={{width: '1.25rem', height: '1.25rem', marginRight: '0.5rem'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Quay lại danh sách
        </Link>

        <div className="card" style={{padding: '3rem', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'}}>
          <header style={{marginBottom: '2rem', borderBottom: '1px solid #e5e7eb', paddingBottom: '1.5rem'}}>
            <h1 style={{fontSize: '2.5rem', fontWeight: '700', color: '#111827', marginBottom: '0.5rem'}}>
              {project.title}
            </h1>
          </header>

          <main>
            <MarkdownViewer content={project.content} />
          </main>
        </div>
      </div>
    </div>
  );
}
