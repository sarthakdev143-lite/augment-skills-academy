export default function BlogLoading() {
  return (
    <main className="mx-auto max-w-7xl px-6 py-16">
      <div className="animate-pulse space-y-6">
        <div className="h-6 w-24 rounded-full bg-white/10" />
        <div className="h-14 w-[32rem] rounded-3xl bg-white/10" />
        <div className="grid gap-6">
          {Array.from({ length: 2 }).map((_, index) => (
            <div key={index} className="h-48 rounded-[28px] bg-white/10" />
          ))}
        </div>
      </div>
    </main>
  );
}
