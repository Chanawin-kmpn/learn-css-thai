// components/SearchModal.tsx
"use client";
import { DialogTitle } from "@radix-ui/react-dialog";
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
import { useSearchModal } from "@/context/SearchModalContext";

import VisuallyHidden from "../VisuallyHidden/VisuallyHidden";

const SearchModal = () => {
  const router = useRouter();
  const { open, setOpen } = useSearchModal();

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        if (!open) {
          setOpen(true);
        }
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [open, setOpen]);

  const handleSelect = (path: string) => {
    setOpen(false);
    router.push(path);
  };

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <VisuallyHidden>
        <DialogTitle>Search Module</DialogTitle>
      </VisuallyHidden>
      <CommandInput placeholder="Search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        {ROUTES.map((head) => (
          <CommandGroup key={head.label} heading={head.label}>
            {head.children?.map((child) => (
              <CommandItem
                className="cursor-pointer"
                key={child.label}
                onSelect={() =>
                  handleSelect(
                    child.label === "Flexbox" ||
                      child.label === "CSS Grid" ||
                      child.label === "Selectors"
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
  );
};

export default SearchModal;
