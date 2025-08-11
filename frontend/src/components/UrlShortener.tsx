'use client';

import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { urlService } from '../lib/api';
import { copyToClipboard, isValidUrl } from '../lib/utils';
import { ShortenUrlResponse } from '../types';

interface UrlShortenerProps {
    onUrlShortened?: (data: ShortenUrlResponse['data']) => void;
}

export default function UrlShortener({ onUrlShortened }: UrlShortenerProps) {
    const [originalUrl, setOriginalUrl] = useState('');
    const [shortenedData, setShortenedData] = useState<ShortenUrlResponse['data'] | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!originalUrl.trim()) {
            toast.error('Please enter a URL');
            return;
        }

        if (!isValidUrl(originalUrl)) {
            toast.error('Please enter a valid URL');
            return;
        }

        setIsLoading(true);
        setShortenedData(null);

        try {
            const response = await urlService.shortenUrl({ originalUrl: originalUrl.trim() });

            if (response.success && response.data) {
                setShortenedData(response.data);
                toast.success('URL shortened successfully!');
                onUrlShortened?.(response.data);
            } else {
                toast.error(response.message || 'Failed to shorten URL');
            }
        } catch (error) {
            console.error('Error shortening URL:', error);
            toast.error(error instanceof Error ? error.message : 'Failed to shorten URL');
        } finally {
            setIsLoading(false);
        }
    };

    const handleCopy = async (text: string) => {
        const success = await copyToClipboard(text);
        if (success) {
            toast.success('Copied to clipboard!');
        } else {
            toast.error('Failed to copy to clipboard');
        }
    };

    const handleNewUrl = () => {
        setOriginalUrl('');
        setShortenedData(null);
    };

    return (
        <div className="w-full max-w-2xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-blue-100 rounded-lg">
                        🔗
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">URL Shortener</h2>
                </div>

                {!shortenedData ? (
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-2">
                                Enter your long URL
                            </label>
                            <input
                                type="url"
                                id="url"
                                value={originalUrl}
                                onChange={(e) => setOriginalUrl(e.target.value)}
                                placeholder="https://example.com/very/long/url/that/needs/shortening"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                disabled={isLoading}
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={isLoading || !originalUrl.trim()}
                            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
                        >
                            {isLoading ? (
                                <>
                                    <span className="animate-spin">⏳</span>
                                    Shortening...
                                </>
                            ) : (
                                'Shorten URL'
                            )}
                        </button>
                    </form>
                ) : (
                    <div className="space-y-4">
                        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                            <p className="text-green-800 font-medium mb-2">URL shortened successfully!</p>

                            <div className="space-y-3">
                                <div>
                                    <label className="block text-sm font-medium text-gray-600 mb-1">
                                        Original URL:
                                    </label>
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm text-gray-500 truncate flex-1">
                                            {shortenedData.originalUrl}
                                        </span>
                                        <a
                                            href={shortenedData.originalUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-600 hover:text-blue-800"
                                            title="Open original URL"
                                        >
                                            🔗
                                        </a>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-600 mb-1">
                                        Short URL:
                                    </label>
                                    <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg p-3">
                                        <span className="text-blue-600 font-mono flex-1">
                                            {shortenedData.shortUrl}
                                        </span>
                                        <button
                                            onClick={() => handleCopy(shortenedData.shortUrl)}
                                            className="text-gray-500 hover:text-gray-700 p-1 rounded"
                                            title="Copy to clipboard"
                                        >
                                            📋
                                        </button>
                                        <a
                                            href={shortenedData.shortUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-600 hover:text-blue-800 p-1 rounded"
                                            title="Open short URL"
                                        >
                                            🔗
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={handleNewUrl}
                            className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-4 rounded-lg transition-colors duration-200"
                        >
                            Shorten Another URL
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
