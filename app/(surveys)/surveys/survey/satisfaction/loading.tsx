import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="pt-20 pb-24">
      <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center p-4">
        <div className="w-full max-w-3xl mx-auto p-8 border rounded-lg">
          <div className="space-y-8">
            <Skeleton className="h-8 w-3/4 mx-auto" />

            <div className="pt-8">
              <div className="relative">
                <div className="h-1 bg-muted rounded-full"></div>
                <div className="flex justify-between relative mt-2">
                  {Array.from({ length: 7 }).map((_, i) => (
                    <Skeleton key={i} className="h-4 w-4 rounded-full" />
                  ))}
                </div>
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

