/**
 * 
 * @returns 
 * 
 * Renders when the user goes to a route that does not exist
 * 
 */
export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
      <div className="text-center max-w-md w-full flex flex-col items-center">
        
        <img
          src="/404.png"
          alt="Lost cat"
          className="w-72 sm:w-80 md:w-96 object-contain mb-6"
        />

        <h1 className="text-3xl font-semibold text-gray-800">
          404 – Page Not Found
        </h1>

        <p className="mt-3 text-gray-600">
          This page wandered off chasing a laser pointer.
        </p>

        <a
          href="/"
          className="mt-8 inline-block px-6 py-3 bg-black text-white rounded-xl font-medium hover:bg-gray-800 transition"
        >
          Back to your cats
        </a>

      </div>
    </main>
  );
}