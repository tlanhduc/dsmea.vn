import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  return (
    <header className="w-full bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-center">
          <Link href="/" className="flex items-center justify-center">
            <div className="flex items-center space-x-3">
              <Image
                src="/logo.jpg"
                alt="Logo"
                width={52}
                height={48}
                className="h-auto"
                priority
              />
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
}

