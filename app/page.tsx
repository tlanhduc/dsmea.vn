import Link from 'next/link';
import { getAllMarkdownFiles } from '@/lib/markdown';

export default function Home() {
  const markdownFiles = getAllMarkdownFiles();

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-5xl mx-auto px-6 py-12">
        <header className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            Thông tin Dự án Bất động sản
          </h1>
          <p className="text-lg text-gray-600">
            Hệ thống quản lý và hiển thị thông tin dự án
          </p>
        </header>

        {markdownFiles.length === 0 ? (
          <div className="text-center py-16 bg-gray-50 rounded-lg">
            <p className="text-gray-500 text-lg">
              Chưa có dự án nào trong hệ thống
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {markdownFiles.map((file) => (
              <Link
                key={file.slug}
                href={`/project/${file.slug}`}
                className="block p-6 bg-white border border-gray-200 rounded-lg hover:border-gray-300 hover:shadow-md transition-all"
              >
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  {file.title}
                </h2>
                <p className="text-sm text-gray-500">
                  Cập nhật: {new Date(file.modifiedDate).toLocaleDateString('vi-VN')}
                </p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
