import { Link } from 'react-router-dom';
import { Aperture } from 'lucide-react';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 bg-neutral-50">
      <div className="text-center">
        <Aperture className="h-16 w-16 text-primary-600 mx-auto" />
        <h1 className="mt-4 text-5xl font-bold text-neutral-900">404</h1>
        <h2 className="mt-2 text-2xl font-semibold text-neutral-700">Page Not Found</h2>
        <p className="mt-4 text-neutral-500">
          Sorry, we couldn't find the page you're looking for.
        </p>
        <div className="mt-8">
          <Link
            to="/dashboard"
            className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700"
          >
            Go back to dashboard
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;