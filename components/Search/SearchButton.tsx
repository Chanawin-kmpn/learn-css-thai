"use client";
import { Command, Search } from "lucide-react";

import { useSearchModal } from "@/context/SearchModalContext";

const SearchButton = () => {
  const { setOpen } = useSearchModal();

  return (
    <button
      className="border-gradient-outline bg-light100_dark900 w-full"
      onClick={() => setOpen(true)}
    >
      <span className="text-dark700_light400 flex flex-1 items-center">
        <Search className="mr-2 size-4" />
        ค้นหา...
      </span>
      <span className="text-dark700_light400 hidden rounded-md border bg-white p-1 text-xs font-bold dark:border-zinc-700 dark:bg-zinc-700 lg:flex lg:items-center">
        <Command className="size-4" />/ CTRL K
      </span>
    </button>
  );
};

export default SearchButton;
