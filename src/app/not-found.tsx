
"use client";

export default function NotFound() {
  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center px-6 text-center">
      {/* Icon */}
      <div className="text-7xl mb-4">🔍</div>

      {/* Title */}
      <h1 className="text-3xl font-bold text-gray-800">
        Page Not Found
      </h1>

      {/* Description */}
      <p className="mt-2 max-w-md text-sm text-gray-500">
        The page you're looking for doesn't exist or may have been moved.
      </p>

      {/* Actions */}
      <div className="mt-6 flex gap-3">
        <a
          href="/"
          className="rounded-md bg-black px-5 py-2 text-sm text-white hover:opacity-90"
        >
          Go Home
        </a>

        <button
          onClick={() => window.history.back()}
          className="rounded-md border px-5 py-2 text-sm text-gray-700 hover:bg-gray-100"
        >
          Go Back
        </button>
      </div>
    </div>
  );
}

