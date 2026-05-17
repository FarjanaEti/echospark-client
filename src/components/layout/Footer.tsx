import Link from "next/link";
import { Leaf } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-green-950 text-green-300 py-12 px-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-7 h-7 bg-green-700 rounded-full flex items-center justify-center">
              <Leaf className="w-3.5 h-3.5 text-green-200" />
            </div>
            <span className="text-white font-semibold">EcoSpark Hub</span>
          </div>
          <p className="text-sm text-green-500 leading-relaxed">
            Community-powered sustainability ideas for a greener planet.
          </p>
        </div>
        <div>
          <h4 className="text-white text-sm font-medium mb-3">Explore</h4>
          <div className="flex flex-col gap-2 text-sm">
            <Link href="/ideas" className="hover:text-white transition-colors">All Ideas</Link>
            <Link href="/about" className="hover:text-white transition-colors">About Us</Link>
            <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
          </div>
        </div>
        <div>
          <h4 className="text-white text-sm font-medium mb-3">Account</h4>
          <div className="flex flex-col gap-2 text-sm">
            <Link href="/login" className="hover:text-white transition-colors">Login</Link>
            <Link href="/register" className="hover:text-white transition-colors">Register</Link>
            <Link href="/dashboard/member" className="hover:text-white transition-colors">Dashboard</Link>
          </div>
        </div>
        <div>
          <h4 className="text-white text-sm font-medium mb-3">Contact</h4>
          <div className="flex flex-col gap-2 text-sm">
            <span>hello@ecosparkhub.com</span>
            <span>+880 1700 000000</span>
          </div>
        </div>
      </div>
      <div className="max-w-6xl mx-auto border-t border-green-900 mt-8 pt-6 flex flex-wrap justify-between text-xs text-green-600 gap-2">
        <span>© 2025 EcoSpark Hub. All rights reserved.</span>
        <div className="flex gap-4">
          <Link href="/privacy" className="hover:text-green-400">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-green-400">Terms of Use</Link>
        </div>
      </div>
    </footer>
  );
}