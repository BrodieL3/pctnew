import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="relative w-full h-screen bg-background overflow-hidden">
      {/* Header with controls */}
      <div className="absolute top-0 left-0 right-0 z-10 bg-background/80 backdrop-blur-sm p-4 flex justify-between items-center">
        <Skeleton className="h-8 w-64" />
        <div className="flex items-center gap-2">
          <Skeleton className="h-10 w-10 rounded-md" />
          <Skeleton className="h-10 w-10 rounded-md" />
          <Skeleton className="h-10 w-10 rounded-md" />
        </div>
      </div>

      {/* Results panel */}
      <div className="absolute bottom-4 left-4 z-10 bg-background/80 backdrop-blur-sm p-4 rounded-lg border max-w-xs">
        <div className="space-y-4">
          <div>
            <Skeleton className="h-6 w-32 mb-2" />
            <Skeleton className="h-4 w-48" />
          </div>

          <div>
            <Skeleton className="h-5 w-24 mb-2" />
            <Skeleton className="h-6 w-40" />
          </div>

          <div>
            <Skeleton className="h-5 w-36 mb-2" />
            <Skeleton className="h-6 w-40" />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="bg-muted p-2 rounded-md">
              <Skeleton className="h-4 w-16 mx-auto mb-2" />
              <Skeleton className="h-7 w-12 mx-auto mb-1" />
              <Skeleton className="h-3 w-8 mx-auto" />
            </div>
            <div className="bg-muted p-2 rounded-md">
              <Skeleton className="h-4 w-16 mx-auto mb-2" />
              <Skeleton className="h-7 w-12 mx-auto mb-1" />
              <Skeleton className="h-3 w-8 mx-auto" />
            </div>
          </div>

          <Skeleton className="h-10 w-full" />
        </div>
      </div>

      {/* Political Compass */}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
        <div className="relative w-full max-w-[800px] max-h-[800px] aspect-square border rounded-lg">
          {/* Quadrant backgrounds */}
          <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-red-100/30"></div>
          <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-blue-100/30"></div>
          <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-green-100/30"></div>
          <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-yellow-100/30"></div>

          {/* Axes */}
          <div className="absolute top-0 bottom-0 left-1/2 w-px bg-foreground"></div>
          <div className="absolute left-0 right-0 top-1/2 h-px bg-foreground"></div>

          {/* User position placeholder */}
          <Skeleton className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full" />
        </div>
      </div>
    </div>
  )
}

