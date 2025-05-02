
import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { Card } from '@/components/ui/card';

export const ResultSkeleton: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#fffaf7] px-4 py-8">
      <div className="container mx-auto max-w-4xl">
        {/* Logo skeleton */}
        <Card className="p-4 mb-6 flex justify-center">
          <Skeleton className="h-16 w-48" />
        </Card>

        {/* Primary Style Card */}
        <Card className="p-6 mb-10">
          <div className="text-center mb-8">
            <Skeleton className="h-10 w-3/4 mx-auto mb-4" />
            
            <div className="max-w-md mx-auto mb-6">
              <div className="flex justify-between items-center mb-2">
                <Skeleton className="h-5 w-20" />
                <Skeleton className="h-5 w-12" />
              </div>
              <Skeleton className="h-2 w-full" />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-5/6" />
              
              <div className="bg-white rounded-lg p-4 mt-4">
                <Skeleton className="h-6 w-3/4 mb-3" />
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <Skeleton className="h-4 w-1/4" />
                    <Skeleton className="h-4 w-12" />
                  </div>
                  <Skeleton className="h-2 w-full" />
                  
                  <div className="flex justify-between items-center">
                    <Skeleton className="h-4 w-1/4" />
                    <Skeleton className="h-4 w-12" />
                  </div>
                  <Skeleton className="h-2 w-full" />
                </div>
              </div>
            </div>
            <div>
              <Skeleton className="h-72 w-full rounded-lg" />
            </div>
          </div>
          
          <div className="mt-8">
            <Skeleton className="h-64 w-full rounded-lg" />
          </div>
        </Card>

        {/* Secondary Content */}
        <div className="space-y-8">
          <Card className="p-6">
            <Skeleton className="h-8 w-1/2 mx-auto mb-6" />
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <Skeleton className="h-6 w-3/4" />
                <div className="space-y-3">
                  <div className="flex gap-2">
                    <Skeleton className="h-5 w-5 rounded-full flex-shrink-0" />
                    <Skeleton className="h-5 w-full" />
                  </div>
                  <div className="flex gap-2">
                    <Skeleton className="h-5 w-5 rounded-full flex-shrink-0" />
                    <Skeleton className="h-5 w-full" />
                  </div>
                  <div className="flex gap-2">
                    <Skeleton className="h-5 w-5 rounded-full flex-shrink-0" />
                    <Skeleton className="h-5 w-full" />
                  </div>
                </div>
              </div>
              <Skeleton className="h-52 rounded-lg" />
            </div>
          </Card>

          {/* Bonus Section */}
          <Card className="p-6">
            <Skeleton className="h-7 w-1/2 mx-auto mb-4" />
            <div className="grid md:grid-cols-2 gap-4">
              <Skeleton className="h-40 rounded-lg" />
              <Skeleton className="h-40 rounded-lg" />
            </div>
          </Card>

          {/* CTA Section */}
          <Card className="p-6">
            <div className="space-y-4">
              <Skeleton className="h-48 w-full rounded-lg mb-4" />
              <div className="flex justify-center gap-6">
                <div className="text-center">
                  <Skeleton className="h-4 w-20 mx-auto mb-2" />
                  <Skeleton className="h-6 w-16 mx-auto" />
                </div>
                <div className="text-center">
                  <Skeleton className="h-4 w-20 mx-auto mb-2" />
                  <Skeleton className="h-8 w-24 mx-auto" />
                </div>
              </div>
              <Skeleton className="h-12 w-64 mx-auto rounded-md" />
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
