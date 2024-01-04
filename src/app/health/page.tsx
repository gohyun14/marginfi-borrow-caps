import { redirect } from "next/navigation";

import SearchButton from "~/components/SearchButton";

export default async function HealthPage({
  searchParams,
}: {
  // eslint-disable-next-line
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const error = searchParams.error;

  const handleSearch = async (formData: FormData) => {
    "use server";

    const address = formData.get("address");
    const addressString = address?.toString();

    if (!addressString) {
      redirect(`/health?error=true`);
    }

    redirect(`/health/${addressString}`);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center overflow-y-auto overflow-x-hidden bg-zinc-900 text-zinc-100">
      <form
        action={handleSearch}
        className="flex w-full flex-col items-center justify-center gap-3 p-3"
      >
        <input
          type="text"
          name="address"
          placeholder="Address or .sol"
          className="w-full max-w-lg rounded-md bg-zinc-100 p-2 text-[18px] text-zinc-900 focus:outline-none focus:ring-2 focus:ring-rose-600"
        />
        <SearchButton />
        {/* <p>kylesamani.sol</p> */}
        {error && <div>No address provided</div>}
      </form>
    </main>
  );
}
