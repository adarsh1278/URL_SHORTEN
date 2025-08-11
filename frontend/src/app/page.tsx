import UrlShortener from '../components/UrlShortener';

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Shorten Your URLs
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Transform long URLs into short, manageable links that are easy to share and track.
          Perfect for social media, emails, and marketing campaigns.
        </p>
      </div>

      <UrlShortener />

      <div className="mt-12 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <div className="text-blue-600 text-4xl mb-4">⚡</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Fast & Reliable</h3>
            <p className="text-gray-600">
              Generate shortened URLs instantly with our high-performance backend.
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <div className="text-green-600 text-4xl mb-4">📊</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Click Tracking</h3>
            <p className="text-gray-600">
              Monitor how many times your shortened URLs have been clicked.
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <div className="text-purple-600 text-4xl mb-4">🔒</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Secure</h3>
            <p className="text-gray-600">
              Built with security in mind, including rate limiting and validation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
