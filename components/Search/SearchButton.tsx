"use client";
import { Search } from "lucide-react";
import React from "react";

import { Button } from "../ui/button";

const SearchButton = () => {
  return (
    <div>
      <Button className="border-gradient-outline hidden lg:flex">Search</Button>
      <Button className="lg:hidden">
        <Search />
      </Button>
    </div>
  );
};

export default SearchButton;
