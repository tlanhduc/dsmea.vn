import { notFound } from 'next/navigation';
import { getAllDocuments, getDocumentContent } from '@/lib/document';
import DocumentRenderer from '@/components/DocumentRenderer';

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const files = getAllDocuments();
  return files.map((file) => ({
    slug: file.slug,
  }));
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const documentData = await getDocumentContent(slug);

  if (!documentData) {
    notFound();
  }

  const { content, type } = documentData;

  const files = getAllDocuments();
  const currentFile = files.find((f) => f.slug === slug);

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-6 py-8">
        {currentFile && currentFile.title && (
          <div className="mb-8 pb-6 border-b border-gray-200 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              {currentFile.title}
            </h1>
          </div>
        )}

        <DocumentRenderer content={content} type={type} />
      </div>
    </div>
  );
}
