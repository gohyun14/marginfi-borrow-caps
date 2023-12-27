export default function Loading() {
  // Or a custom loading skeleton component
  return (
    <main className="flex min-h-screen flex-col items-center justify-center overflow-y-auto overflow-x-hidden bg-zinc-900">
      <h1 className="pt-8 text-center text-4xl text-zinc-100 sm:px-4 sm:pt-0 sm:text-6xl">
        marginfi borrow availability
      </h1>
      <div className="container grid grid-flow-row grid-cols-1 gap-[16px] px-4 py-8 text-zinc-100 sm:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => {
          return (
            <div
              key={i}
              className="flex w-full animate-pulse flex-col items-center rounded-[8px] border border-zinc-400 bg-zinc-700 p-4 shadow-md"
            >
              <div className="mb-2 flex w-full flex-row items-center justify-between">
                <p className="h-[20px] w-[70px] rounded-full bg-zinc-400 text-left text-sm font-[300] text-zinc-300" />

                <p className="h-[20px] w-[70px] rounded-full bg-zinc-400 text-left text-sm font-[300] text-zinc-300" />
              </div>

              <div className="mb-2 h-[64px] w-[64px] rounded-full bg-zinc-400" />

              <p className="mb-1 h-[30px] w-[220px] rounded-full bg-zinc-400 text-left text-sm font-[300] text-zinc-300" />

              <p className="h-[26px] w-[100px] rounded-full bg-zinc-400 text-left text-sm font-[300] text-zinc-300" />

              <div className="mt-2 flex w-full flex-row items-center justify-between">
                <p className="h-[20px] w-[70px] rounded-full bg-zinc-400 text-left text-sm font-[300] text-zinc-300" />
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}
