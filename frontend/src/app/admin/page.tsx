import Analytics from '../../components/Analytics';

export default function AdminPage() {
    return (
        <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                    Admin Dashboard
                </h1>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                    Monitor and manage all shortened URLs. Track click statistics and analyze usage patterns.
                </p>
            </div>

            <Analytics />
        </div>
    );
}
