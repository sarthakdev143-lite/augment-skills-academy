export default function CoursesLoading() {
  return (
    <main className="mx-auto max-w-7xl px-6 py-16">
      <div className="animate-pulse space-y-6">
        <div className="h-6 w-28 rounded-full bg-white/10" />
        <div className="h-14 w-96 rounded-3xl bg-white/10" />
        <div className="h-28 rounded-[28px] bg-white/10" />
        <div className="grid gap-6 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="h-80 rounded-[28px] bg-white/10" />
          ))}
        </div>
      </div>
    </main>
  );
}
