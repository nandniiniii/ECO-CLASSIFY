export default function ResultSkeleton() {
  return (
    <div className="border border-white/10 rounded-lg overflow-hidden bg-surface animate-pulse">
      <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="h-6 w-20 bg-white/10 rounded-full" />
          <div className="h-4 w-32 bg-white/10 rounded" />
        </div>
        <div className="h-3 w-24 bg-white/10 rounded" />
      </div>
      <div className="px-5 py-4 border-b border-white/10 space-y-2">
        <div className="h-3 w-16 bg-white/10 rounded" />
        <div className="h-4 w-full bg-white/10 rounded" />
        <div className="h-4 w-3/4 bg-white/10 rounded" />
      </div>
      <div className="px-5 py-4 border-b border-white/10 space-y-2">
        <div className="h-3 w-24 bg-white/10 rounded" />
        <div className="h-4 w-full bg-white/10 rounded" />
        <div className="h-4 w-2/3 bg-white/10 rounded" />
      </div>
      <div className="px-5 py-4">
        <div className="h-3 w-40 bg-white/10 rounded mb-3" />
        <div className="grid grid-cols-3 gap-3">
          {[1,2,3].map((i) => (
            <div key={i} className="bg-background rounded-lg p-3 text-center space-y-2">
              <div className="h-6 w-10 bg-white/10 rounded mx-auto" />
              <div className="h-3 w-16 bg-white/10 rounded mx-auto" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
