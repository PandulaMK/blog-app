import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
  return (
    <nav className="bg-[#fdfaf4] border-b border-gray-300">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Left Side - Logo */}
        <Link href="/">
          <div className="flex items-center space-x-3">
            <Image
              src="/images/logo.png" // Make sure the image is in public/images/
              alt="Medium Logo"
              width={120} // Increased width
              height={50} // Increased height
              className="object-contain"
            />
          </div>
        </Link>

        {/* Center Links */}
        <div className="hidden md:flex space-x-6">
          <Link href="/our-story" className="text-gray-700 hover:text-black">
            Our story
          </Link>
          <Link href="/membership" className="text-gray-700 hover:text-black">
            Membership
          </Link>
          <Link href="/write" className="text-gray-700 hover:text-black">
            Write
          </Link>
        </div>

        {/* Right Side */}
        <div className="flex space-x-4 items-center">
          <Link href="/login" className="text-gray-700 hover:text-black">
            Sign in
          </Link>
          <Link
            href="/get-started"
            className="bg-black text-white px-5 py-2 rounded-full font-medium"
          >
            Get started
          </Link>
        </div>
      </div>
    </nav>
  );
}
