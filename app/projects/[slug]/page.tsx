import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getAllMarkdownFiles, getMarkdownContent } from '@/lib/markdown';
import MarkdownRenderer from '@/components/MarkdownRenderer';

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const files = getAllMarkdownFiles();
  return files.map((file) => ({
    slug: file.slug,
  }));
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const content = getMarkdownContent(slug);

  if (!content) {
    notFound();
  }

  const files = getAllMarkdownFiles();
  const currentFile = files.find((f) => f.slug === slug);

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-6 py-8">
        <Link
          href="/"
          className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6 transition-colors"
        >
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Quay lại danh sách dự án
        </Link>

        {currentFile && (
          <div className="mb-6 pb-6 border-b border-gray-200">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {currentFile.title}
            </h1>
            <p className="text-sm text-gray-500">
              Cập nhật: {new Date(currentFile.modifiedDate).toLocaleDateString('vi-VN')}
            </p>
          </div>
        )}

        <MarkdownRenderer content={content} />
      </div>
    </div>
  );
}
