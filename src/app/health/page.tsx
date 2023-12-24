import { redirect } from "next/navigation";

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
      <form action={handleSearch}>
        <input type="text" name="address" className="text-black" />
        <button>Search</button>
        <p>kylesamani.sol</p>
      </form>

      {error && <div>No address provided</div>}
    </main>
  );
}
