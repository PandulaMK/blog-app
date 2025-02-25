import Image from 'next/image';
import Link from 'next/link';

export default function Hero() {
  return (
    <div className="bg-[#fdfaf4] min-h-screen flex items-center justify-center px-10 relative overflow-hidden">
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-10">
        
        {/* Left Content */}
        <div className="flex flex-col justify-center">
          <h1 className="text-[80px] leading-[1.1] font-serif font-bold text-[#1a1a1a]">
            Human <br /> stories & ideas
          </h1>
          <p className="text-lg text-gray-700 mt-4">
            A place to read, write, and deepen your understanding.
          </p>
          <Link href="/view_blog" passHref>
            <button className="bg-black text-white px-6 py-3 rounded-full text-lg mt-6">
              Start reading
            </button>
          </Link>
        </div>

        {/* Right-Side Image - Bigger & Lower */}
        <div className="absolute bottom-[100px] right-[-0px] w-[460px] h-[600px]">
          <Image 
            src="/images/hero-image.webp" // Ensure image is in 'public/images/'
            alt="Hero Illustration"
            layout="fill"
            objectFit="contain"
          />
        </div>

      </div>
    </div>
  );
}