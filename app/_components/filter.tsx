"use client";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

export default function Filter() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const activeFilter = searchParams.get("capacity") ?? "all";

  function handleFilter(filter: "all" | "small" | "large" | "medium") {
    const params = new URLSearchParams(searchParams);
    params.set("capacity", filter);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  return (
    <div className="border border-primary-800 flex">
      <button
        className={`px-5 py-2 hover:bg-primary-700 cursor-pointer ${activeFilter == "all" ? "bg-primary-700" : ""}`}
        onClick={() => handleFilter("all")}
      >
        All cabins
      </button>
      <button
        className={`px-5 py-2 hover:bg-primary-700 cursor-pointer ${activeFilter == "small" ? "bg-primary-700" : ""}`}
        onClick={() => handleFilter("small")}
      >
        small cabins
      </button>
      <button
        className={`px-5 py-2 hover:bg-primary-700 cursor-pointer ${activeFilter == "medium" ? "bg-primary-700" : ""}`}
        onClick={() => handleFilter("medium")}
      >
        medium cabins
      </button>
      <button
        className={`px-5 py-2 hover:bg-primary-700 cursor-pointer ${activeFilter == "large" ? "bg-primary-700" : ""}`}
        onClick={() => handleFilter("large")}
      >
        big cabins
      </button>
    </div>
  );
}
