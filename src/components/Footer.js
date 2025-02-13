export default function Footer() {
    return (
        <footer className="bg-[#F7F5F0] text-gray-700 py-6 text-center border-t border-gray-300">
            <div className="flex justify-center space-x-6 text-sm">
                <a href="/help" className="hover:underline">Help</a>
                <a href="/status" className="hover:underline">Status</a>
                <a href="/about" className="hover:underline">About</a>
                <a href="/careers" className="hover:underline">Careers</a>
                <a href="/press" className="hover:underline">Press</a>
                <a href="/blog" className="hover:underline">Blog</a>
                <a href="/privacy" className="hover:underline">Privacy</a>
                <a href="/terms" className="hover:underline">Terms</a>
                <a href="/text-to-speech" className="hover:underline">Text to speech</a>
                <a href="/teams" className="hover:underline">Teams</a>
            </div>
        </footer>
    );
}
