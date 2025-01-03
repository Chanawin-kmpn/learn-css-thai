"use client";
import { Search } from "lucide-react"; // เพิ่มไอคอน Search
import { useRouter } from "next/navigation";
import React from "react";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import ROUTES from "@/constants/router";

const SearchModal = () => {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const handleSelect = (path: string) => {
    setOpen(false);
    router.push(path);
  };

  return (
    <>
      {/* เพิ่มปุ่มสำหรับเปิด Command Dialog */}
      <button
        className="border-gradient-outline bg-light100_dark900 w-full"
        onClick={() => setOpen(true)}
      >
        <span className="text-dark700_light400 flex flex-1 items-center">
          <Search className="mr-2 size-4" />
          ค้นหา...
        </span>
      </button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="ค้นหา..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          {ROUTES.map((head) => (
            <CommandGroup key={head.label} heading={head.label}>
              {head.children?.map((child) => (
                <CommandItem
                  key={child.label}
                  onSelect={() =>
                    handleSelect(
                      child.label === "Flexbox" || child.label === "CSS Grid"
                        ? child.children![0].path
                        : child.path,
                    )
                  }
                >
                  {child.label}
                </CommandItem>
              ))}
            </CommandGroup>
          ))}
        </CommandList>
      </CommandDialog>
    </>
  );
};

export default SearchModal;
