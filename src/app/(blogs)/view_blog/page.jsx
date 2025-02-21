"use client";
import Viewpage_Navbar from '@/components/Viewpage_Navbar';
import Card from '../../../components/Card';
import useAuth from "@/app/hooks/useAuth";

export default function View_Blog() {
    useAuth()

  return (
    <div>
        <Viewpage_Navbar/>
    <div className="flex min-h-screen bg-gray-50">
        

      {/* Main Content */}
      <div className="flex-1 p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">For You</h1>
          <div className="flex space-x-4 text-gray-600 text-sm">
            <span className="font-semibold border-b-2 border-black pb-1">For you</span>
            <span className="hover:text-gray-900 cursor-pointer">Following</span>
            <span className="hover:text-gray-900 cursor-pointer">Health</span>
            <span className="hover:text-gray-900 cursor-pointer">Books</span>
            <span className="hover:text-gray-900 cursor-pointer">Education</span>
          </div>
        </div>

        {/* Featured Posts Section */}
        <div className="space-y-8">
          <Card
            title="$50/Hour Remote Jobs You Can Start Without Interviews"
            description="Are you dreaming of a flexible work-from-home job that pays well and allows you to manage your time?"
            date="Jan 14"
            stats={{ views: 192, comments: 3 }}
          />
          <Card
            title="Serendipity In Stripes"
            description="The unexpected joys of book-hunting and discovering hidden gems in the most unlikely places."
            date="1 day ago"
            stats={{ views: 482, comments: 10 }}
          />
          <Card
            title="Interviewer: Senior Developer? Let’s See How You Handle This Code Challenge"
            description="Why experience alone isn't enough: The art of continuous improvement."
            date="Sep 4, 2024"
            stats={{ views: 631, comments: 25 }}
          />
        </div>
      </div>

      {/* Right Sidebar (Staff Picks + Writing Tips) */}
      <aside className="hidden lg:block w-1/4 p-6 bg-white shadow-md">
        <h2 className="text-xl font-bold mb-4">Staff Picks</h2>
        <div className="space-y-4">
          <Card
            title="The Art of Auditioning For SNL Producers"
            description="The third time is also 'No' – Stacey Smith"
            date="Feb 7"
          />
          <Card
            title="Software Engineering Needs A Hippocratic Oath"
            description="A new ethical standard for developers."
            date="Feb 7"
          />
        </div>

        {/* Writing on Medium Section */}
        <div className="mt-8 p-4 bg-blue-100 rounded-lg">
          <h3 className="font-semibold text-lg">Writing on Medium</h3>
          <ul className="text-sm text-gray-700 space-y-2 mt-2">
            <li>New writer FAQ</li>
            <li>Expert writing advice</li>
            <li>Grow your readership</li>
          </ul>
          <button className="mt-4 px-4 py-2 bg-black text-white rounded-full">
            Start Writing
          </button>
        </div>
      </aside>
    </div>
    </div>
  );
}