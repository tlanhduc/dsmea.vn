import Link from 'next/link';
import { getAllDocuments } from '@/lib/document';

export default function ProjectsListPage() {
  const documents = getAllDocuments();

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            Danh sách Dự án Bất động sản
          </h1>
          <p className="text-lg text-gray-600">
            Hệ thống quản lý và hiển thị thông tin dự án
          </p>
        </div>

        {documents.length === 0 ? (
          <div className="text-center py-16 bg-gray-50 rounded-lg">
            <p className="text-gray-500 text-lg">
              Chưa có dự án nào trong hệ thống
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {documents.map((file) => (
              <Link
                key={file.slug}
                href={`/projects/${file.slug}`}
                className="block p-6 bg-white border border-gray-200 rounded-lg hover:border-gray-300 hover:shadow-md transition-all"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">
                      {file.title}
                    </h2>
                    <p className="text-sm text-gray-500">
                      Cập nhật: {new Date(file.modifiedDate).toLocaleDateString('vi-VN')}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

