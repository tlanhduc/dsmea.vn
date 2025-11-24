import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="w-full bg-white border-t border-gray-200 py-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col items-center justify-center space-y-4">
          <Image
            src="/logo.jpg"
            alt="Logo"
            width={52}
            height={48}
            className="h-auto"
          />
          <div className="text-center space-y-2">
            <p className="text-base font-semibold text-gray-800">
              CÔNG TY CỔ PHẦN VINA ĐẠI PHƯỚC SWANCITY ONE MEA
            </p>
            <p className="text-sm text-gray-600 italic">
              (DAI PHUOC SWANCITY ONE MEA JSC.)
            </p>
            <p className="text-sm text-gray-600">
              Địa chỉ: Cù lao Ông Cồn, Xã Đại Phước, Tỉnh Đồng Nai, Việt Nam
            </p>
            <p className="text-sm text-gray-600">
              Tel.: 028 36220786
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

