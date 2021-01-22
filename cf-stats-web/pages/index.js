import "tailwindcss/tailwind.css";
import Layout from "../components/Layout";
import SearchInput from "../components/SearchInput";

export default function Home() {
  return (
    <Layout title={"Crossfit Stats"}>
      <div className="flex flex-1 flex-col justify-center items-center">
        <h1 className="text-6xl pb-4">Crossfit Stats</h1>
        <SearchInput />
        <div class="mt-8 text-center">
          <button class="mr-3 bg-gray-200 border border-gray-300 py-3 px-4 rounded hover:bg-gray-400 hover:border-gray-500">
            Search Crossfiter
          </button>
        </div>
      </div>
    </Layout>
  );
}
