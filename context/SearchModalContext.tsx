// contexts/SearchModalContext.tsx
"use client";

import React, { createContext, useContext, useState } from "react";

interface SearchModalContextType {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const SearchModalContext = createContext<SearchModalContextType | undefined>(
  undefined,
);

export const SearchModalProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [open, setOpen] = useState(false);

  return (
    <SearchModalContext.Provider value={{ open, setOpen }}>
      {children}
    </SearchModalContext.Provider>
  );
};

export const useSearchModal = () => {
  const context = useContext(SearchModalContext);
  if (context === undefined) {
    throw new Error("useSearchModal must be used within a SearchModalProvider");
  }
  return context;
};
