export default function DashboardLoading() {
  return (
    <main className="mx-auto max-w-7xl px-6 py-12">
      <div className="animate-pulse space-y-6">
        <div className="h-6 w-32 rounded-full bg-white/10" />
        <div className="h-14 w-72 rounded-3xl bg-white/10" />
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="h-32 rounded-[24px] bg-white/10" />
          ))}
        </div>
      </div>
    </main>
  );
}
