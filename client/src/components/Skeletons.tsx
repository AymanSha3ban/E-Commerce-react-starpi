import { Skeleton } from "./ui/skeleton";

export function ProductsSkeleton() {
  return (
    <div className="flex max-w-xs flex-col gap-6">
      <div className="flex w-full items-center gap-4">
        <Skeleton className="h-10 w-10 rounded-full" />
        <div className="space-y-2 flex-1">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
        </div>
      </div>
      <Skeleton className="h-[200px] w-full rounded-xl" />
    </div>
  );
}

export function ProductDetailsSkeleton() {
  return (
    <div className="flex flex-col gap-6 w-full p-6 border border-border rounded-md">
      <div className="flex flex-col w-full gap-4 items-center">
        <Skeleton className="h-[200px] w-[90%] rounded-xl" />
        <div className="space-y-2 w-[90%]">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-[80%]" />
        </div>
      </div>
      <div className="flex w-[90%] mx-auto justify-between items-center">
        <Skeleton className="h-4 w-[100px]" />
        <Skeleton className="h-[50px] w-[100px] rounded-md" />
      </div>
    </div>
  );
}

export function CategoriesSkeleton() {
  return (
    <div className="flex max-w-xs flex-col gap-6">
      <div className="flex w-full items-center gap-4">
        <Skeleton className="h-10 w-10 rounded-full" />
        <div className="space-y-2 flex-1">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
        </div>
      </div>
      <Skeleton className="h-[200px] w-full rounded-xl" />
    </div>
  );
}
