import React from "react";

interface LoadingSkeletonProps {
  count?: number;
}

export const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({
  count = 12,
}) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
      {[...Array(count)].map((_, i) => (
        <div key={i} className="bg-white rounded-lg p-4 animate-pulse">
          <div className="relative w-full aspect-[1/1] bg-gray-200 rounded" />
          <div className="h-6 bg-gray-200 rounded mt-2 w-3/4 mx-auto" />
          <div className="flex gap-2 justify-center mt-2">
            <div className="h-6 bg-gray-200 rounded w-16" />
          </div>
        </div>
      ))}
    </div>
  );
};
