
import React from 'react';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { useIsLowPerformanceDevice } from '@/hooks/use-mobile';

const ResultSkeleton: React.FC = () => {
  const isLowPerformance = useIsLowPerformanceDevice();
  
  // Simplified skeleton for low performance devices
  if (isLowPerformance) {
    return (
      <div className="min-h-screen bg-[#fffaf7] p-4">
        <div className="flex justify-center mb-6">
          <LoadingSpinner size="lg" />
        </div>
        <div className="text-center text-[#432818]">
          <h2 className="text-xl font-medium mb-2">Carregando seu resultado...</h2>
          <p>Estamos preparando sua análise de estilo personalizada</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-[#fffaf7]">
      {/* Header Skeleton */}
      <div className="border-b border-[#B89B7A]/10 bg-white">
        <div className="container mx-auto p-4 flex justify-between items-center">
          <Skeleton className="h-8 w-32" />
          <div className="hidden sm:block">
            <Skeleton className="h-6 w-40" />
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-6 max-w-4xl">
        {/* Main Card Skeleton */}
        <Card className="p-6 mb-10 bg-white shadow-md border border-[#B89B7A]/20">
          {/* Style Title & Progress */}
          <div className="text-center mb-8">
            <div className="max-w-md mx-auto mb-6">
              <div className="flex justify-between items-center mb-2">
                <Skeleton className="h-4 w-36" />
                <Skeleton className="h-4 w-12" />
              </div>
              <Skeleton className="h-2 w-full rounded-full" />
            </div>
            
            {/* Pulsating loading for visual feedback */}
            <div className="flex items-center justify-center mb-8">
              <LoadingSpinner size="md" color="#B89B7A" />
            </div>
          </div>
          
          {/* Style Content Skeleton */}
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              {/* Description skeleton */}
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-4 w-full" />
              </div>
              
              {/* Secondary styles box skeleton */}
              <div className="bg-white rounded-lg p-4 shadow-sm border border-[#B89B7A]/10">
                <Skeleton className="h-5 w-48 mb-3" />
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between mb-1">
                      <Skeleton className="h-3 w-20" />
                      <Skeleton className="h-3 w-8" />
                    </div>
                    <Skeleton className="h-2 w-full rounded-full" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <Skeleton className="h-3 w-24" />
                      <Skeleton className="h-3 w-8" />
                    </div>
                    <Skeleton className="h-2 w-full rounded-full" />
                  </div>
                </div>
              </div>
            </div>
            
            {/* Style image skeleton */}
            <div>
              <Skeleton className="w-full h-64 md:h-80 rounded-lg" />
            </div>
          </div>
          
          {/* Guide image skeleton */}
          <div className="mt-8">
            <Skeleton className="w-full h-48 md:h-64 rounded-lg" />
          </div>
        </Card>
        
        {/* Additional sections skeletons */}
        <div className="space-y-10">
          <Card className="p-6 border-[#B89B7A]/20">
            <Skeleton className="h-8 w-60 mx-auto mb-4" />
            <div className="space-y-2 max-w-lg mx-auto">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
            </div>
          </Card>
          
          <Card className="p-6 border-[#B89B7A]/20">
            <Skeleton className="h-8 w-48 mx-auto mb-4" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Skeleton className="h-32 rounded-lg" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            </div>
          </Card>
          
          <Card className="p-6 border-[#B89B7A]/20">
            <Skeleton className="h-8 w-40 mx-auto mb-4" />
            <div className="flex justify-center">
              <Skeleton className="h-10 w-52 rounded-md" />
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ResultSkeleton;
