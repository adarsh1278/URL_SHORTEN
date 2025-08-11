'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
    const pathname = usePathname();

    return (
        <header className="bg-white shadow-sm border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center gap-2">
                        <div className="p-2 bg-blue-100 rounded-lg">
                            🔗
                        </div>
                        <h1 className="text-xl font-bold text-gray-900">URL Shortener</h1>
                    </div>

                    <nav className="flex items-center gap-4">
                        <Link
                            href="/"
                            className={`px-4 py-2 rounded-lg font-medium transition-colors ${pathname === '/'
                                    ? 'bg-blue-100 text-blue-700'
                                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                                }`}
                        >
                            Home
                        </Link>
                        <Link
                            href="/admin"
                            className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${pathname === '/admin'
                                    ? 'bg-green-100 text-green-700'
                                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                                }`}
                        >
                            📊 Admin
                        </Link>
                    </nav>
                </div>
            </div>
        </header>
    );
}
