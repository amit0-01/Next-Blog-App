const LoadingSkeleton = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
        <p className="mt-4 text-lg text-gray-700">Loading...</p>
      </div>
    );
  };

export default function Loading() {
    return <LoadingSkeleton />
  }