'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';

export default function EditPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    // Load content from API
    fetch(`/api/projects/${slug}`)
      .then(res => res.json())
      .then(data => {
        if (data.content) {
          setContent(data.content);
        }
        setIsLoading(false);
      })
      .catch(err => {
        console.error('Error loading content:', err);
        setMessage({ type: 'error', text: 'Không thể tải nội dung' });
        setIsLoading(false);
      });
  }, [slug]);

  const handleSave = async () => {
    setIsSaving(true);
    setMessage(null);

    try {
      const response = await fetch(`/api/projects/${slug}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content, type: 'html' }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({ type: 'success', text: 'Đã lưu thành công!' });
        setTimeout(() => {
          router.push(`/projects/${slug}`);
        }, 1000);
      } else {
        setMessage({ type: 'error', text: data.error || 'Lỗi khi lưu file' });
      }
    } catch (error) {
      console.error('Error saving:', error);
      setMessage({ type: 'error', text: 'Lỗi khi lưu file' });
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    router.push(`/projects/${slug}`);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-gray-900">Đang tải...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">
            Chỉnh sửa: {slug}
          </h1>
          <div className="flex gap-3">
            <button
              onClick={handleCancel}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Hủy
            </button>
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed transition-colors"
            >
              {isSaving ? 'Đang lưu...' : 'Lưu'}
            </button>
          </div>
        </div>

        {message && (
          <div
            className={`mb-4 p-4 rounded-lg ${
              message.type === 'success'
                ? 'bg-green-50 text-green-800 border border-green-200'
                : 'bg-red-50 text-red-800 border border-red-200'
            }`}
          >
            {message.text}
          </div>
        )}

        <div className="border border-gray-300 rounded-lg overflow-hidden">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full h-[calc(100vh-300px)] p-4 text-base border-0 focus:outline-none focus:ring-0 resize-none text-gray-900 leading-relaxed"
            placeholder="Nhập nội dung HTML..."
            spellCheck={false}
          />
        </div>

        <div className="mt-4 text-sm text-gray-700">
          <p>
            💡 Tip: Bạn có thể chỉnh sửa HTML trực tiếp. File sẽ được lưu dưới dạng HTML.
          </p>
        </div>
      </div>
    </div>
  );
}

