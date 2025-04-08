import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import React from "react";
import SearchBar from "./SearchBar";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";

export default function FilterSideBar({ categories = [], form }) {
  const { setValue, watch } = form;

  return (
    <SheetContent>
      <SheetHeader>
        <SheetTitle>Filter Products</SheetTitle>
        <SheetDescription>
          Find products by name, category, or price range.
        </SheetDescription>
      </SheetHeader>
      <div className="grid gap-4 py-4 px-4">
        <SearchBar form={form} />

        <h3 className="text-right">Categories</h3>

        <RadioGroup defaultValue="comfortable">
          {categories.map((category, idx) => (
            <div className="flex items-center space-x-2" key={idx}>
              <RadioGroupItem value={category.name} id={category.name} />
              <Label htmlFor={category.name}>{category.name}</Label>
            </div>
          ))}
        </RadioGroup>

        <h3 className="text-right">Price Range</h3>
        <Slider defaultValue={[50]} max={100} step={1} />
      </div>
      <SheetFooter>
        <SheetClose asChild>
          <Button>Reset Filter</Button>
        </SheetClose>
      </SheetFooter>
    </SheetContent>
  );
}
