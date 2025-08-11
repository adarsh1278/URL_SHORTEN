'use client';

import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { urlService } from '../lib/api';
import { copyToClipboard, formatDate, formatNumber } from '../lib/utils';
import { IUrl, AnalyticsResponse } from '../types';

export default function Analytics() {
    const [data, setData] = useState<AnalyticsResponse['data'] | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchAnalytics = async () => {
        try {
            setIsLoading(true);
            setError(null);
            const response = await urlService.getAnalytics();

            if (response.success && response.data) {
                setData(response.data);
            } else {
                setError(response.message || 'Failed to fetch analytics');
            }
        } catch (error) {
            console.error('Error fetching analytics:', error);
            setError(error instanceof Error ? error.message : 'Failed to fetch analytics');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchAnalytics();
    }, []);

    const handleCopy = async (text: string) => {
        const success = await copyToClipboard(text);
        if (success) {
            toast.success('Copied to clipboard!');
        } else {
            toast.error('Failed to copy to clipboard');
        }
    };

    if (isLoading) {
        return (
            <div className="w-full max-w-6xl mx-auto">
                <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
                    <div className="animate-pulse space-y-4">
                        <div className="h-8 bg-gray-200 rounded w-1/4"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                        <div className="space-y-3">
                            {[...Array(5)].map((_, i) => (
                                <div key={i} className="h-16 bg-gray-200 rounded"></div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="w-full max-w-6xl mx-auto">
                <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
                    <div className="text-center">
                        <div className="text-red-600 text-lg font-semibold mb-2">Error</div>
                        <p className="text-gray-600 mb-4">{error}</p>
                        <button
                            onClick={fetchAnalytics}
                            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
                        >
                            Retry
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    if (!data) {
        return (
            <div className="w-full max-w-6xl mx-auto">
                <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
                    <div className="text-center text-gray-600">No data available</div>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full max-w-6xl mx-auto space-y-6">
            {/* Header */}
            <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-green-100 rounded-lg">
                        📊
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h2>
                </div>

                {/* Summary Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-blue-50 rounded-lg p-4">
                        <div className="text-blue-600 text-sm font-medium">Total URLs</div>
                        <div className="text-2xl font-bold text-blue-900">{formatNumber(data.totalUrls)}</div>
                    </div>
                    <div className="bg-green-50 rounded-lg p-4">
                        <div className="text-green-600 text-sm font-medium">Total Clicks</div>
                        <div className="text-2xl font-bold text-green-900">{formatNumber(data.totalClicks)}</div>
                    </div>
                    <div className="bg-purple-50 rounded-lg p-4">
                        <div className="text-purple-600 text-sm font-medium">Avg Clicks per URL</div>
                        <div className="text-2xl font-bold text-purple-900">
                            {data.totalUrls > 0 ? formatNumber(Math.round(data.totalClicks / data.totalUrls)) : '0'}
                        </div>
                    </div>
                </div>
            </div>

            {/* URLs Table */}
            <div className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
                <div className="p-6 border-b border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900">All Shortened URLs</h3>
                    <p className="text-sm text-gray-600">Manage and track your shortened URLs</p>
                </div>

                {data.urls.length === 0 ? (
                    <div className="p-6 text-center text-gray-600">
                        No URLs found. Create your first shortened URL!
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        URL
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Clicks
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Created
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {data.urls.map((url: IUrl) => (
                                    <tr key={url._id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4">
                                            <div className="space-y-1">
                                                <div className="flex items-center gap-2">
                                                    <span className="text-blue-600 font-mono text-sm">
                                                        {url.shortUrl}
                                                    </span>
                                                    <button
                                                        onClick={() => handleCopy(url.shortUrl)}
                                                        className="text-gray-400 hover:text-gray-600"
                                                        title="Copy short URL"
                                                    >
                                                        📋
                                                    </button>
                                                    <a
                                                        href={url.shortUrl}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-blue-600 hover:text-blue-800"
                                                        title="Open short URL"
                                                    >
                                                        🔗
                                                    </a>
                                                </div>
                                                <div className="text-sm text-gray-500 truncate max-w-xs">
                                                    {url.originalUrl}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-1">
                                                👆
                                                <span className="text-sm font-medium text-gray-900">
                                                    {formatNumber(url.clicks)}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-1">
                                                📅
                                                <span className="text-sm text-gray-500">
                                                    {formatDate(url.createdAt || new Date())}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <button
                                                    onClick={() => handleCopy(url.originalUrl)}
                                                    className="text-gray-400 hover:text-gray-600 p-1 rounded"
                                                    title="Copy original URL"
                                                >
                                                    📋
                                                </button>
                                                <a
                                                    href={url.originalUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-blue-600 hover:text-blue-800 p-1 rounded"
                                                    title="Open original URL"
                                                >
                                                    🔗
                                                </a>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}
