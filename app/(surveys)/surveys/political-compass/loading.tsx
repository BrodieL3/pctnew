import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="pt-20 pb-24">
      <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center p-4">
        <div className="w-full max-w-3xl mx-auto">
          <div className="space-y-12 py-8">
            <Skeleton className="h-8 w-3/4 mx-auto" />

            <div className="space-y-8 px-4">
              <div className="relative pt-5 pb-5">
                <Skeleton className="h-2 w-full rounded-full" />
                <Skeleton className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-5 rounded-full" />
              </div>

              <div className="flex justify-between text-sm">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-32" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 z-10 bg-background/80 backdrop-blur-sm border-t">
        <div className="container mx-auto p-4">
          <div className="flex justify-between">
            <Skeleton className="h-10 w-24" />
            <Skeleton className="h-10 w-24" />
          </div>
        </div>
      </div>
    </div>
  )
}

