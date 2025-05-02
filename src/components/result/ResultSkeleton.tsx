
import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { Card } from '@/components/ui/card';

export const ResultSkeleton: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#fffaf7] px-4 py-8">
      <div className="container mx-auto max-w-4xl">
        {/* Logo skeleton */}
        <div className="flex justify-center mb-8">
          <Skeleton className="h-16 w-32" />
        </div>

        {/* Header skeleton */}
        <div className="text-center mb-8">
          <Skeleton className="h-10 w-3/4 mx-auto mb-4" />
          <Skeleton className="h-6 w-1/2 mx-auto" />
        </div>

        {/* Primary Style Card */}
        <Card className="p-6 mb-10">
          <div className="flex justify-between items-center mb-4">
            <Skeleton className="h-6 w-1/3" />
            <Skeleton className="h-6 w-16" />
          </div>
          <Skeleton className="h-3 w-full mb-8" />

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-5/6" />
            </div>
            <div>
              <Skeleton className="h-64 w-full rounded-lg" />
            </div>
          </div>
        </Card>

        {/* Secondary Content */}
        <div className="space-y-8">
          <Card className="p-6">
            <Skeleton className="h-8 w-1/3 mx-auto mb-4" />
            <div className="grid md:grid-cols-2 gap-6">
              <Skeleton className="h-40 rounded-lg" />
              <div className="space-y-3">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            </div>
          </Card>

          {/* Offer */}
          <Card className="p-6">
            <Skeleton className="h-8 w-2/3 mx-auto mb-6" />
            <Skeleton className="h-48 w-full rounded-lg mb-4" />
            <div className="flex justify-center mb-6">
              <Skeleton className="h-12 w-48" />
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
