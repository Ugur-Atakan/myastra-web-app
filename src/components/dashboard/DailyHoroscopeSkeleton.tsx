export function DailyHoroscopeSkeleton() {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      <div className="animate-pulse space-y-4">
        <div className="h-6 bg-gray-100 rounded-lg w-2/3" />
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="space-y-2">
            <div className="h-4 bg-gray-100 rounded-lg w-1/4" />
            <div className="h-4 bg-gray-100 rounded-lg w-full" />
            <div className="h-4 bg-gray-100 rounded-lg w-5/6" />
          </div>
        ))}
      </div>
    </div>
  );
}