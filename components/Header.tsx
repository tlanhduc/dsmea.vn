import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  return (
    <header className="w-full bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-center">
          <Link href="/" className="flex items-center justify-center">
            <div className="flex items-center space-x-3">
              {/* Logo placeholder - có thể thay bằng hình ảnh */}
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center shadow-md">
                <span className="text-white font-bold text-xl">DS</span>
              </div>
              <span className="text-xl font-bold text-gray-900 leading-tight">
                DSMEA.VN
              </span>
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
}

