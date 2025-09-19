import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { useGetDivisionsQuery } from "@/redux/features/division/division.api";
import { useState } from "react";
import { useNavigate } from "react-router";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { SearchIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

const SearchSection = () => {
  const [open, setOpen] = useState(false);
  const { data: divisionData } = useGetDivisionsQuery(undefined);
  const navigate = useNavigate();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const divisionOptions = divisionData?.data?.map((division: any) => ({
    id: division._id,
    name: division.name,
  }));
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger>
        <Button className="cursor-pointer" variant={"outline"}>
          <SearchIcon />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="p-0 w-80">
        <Command>
          <CommandInput placeholder="Find Tours By Division..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Divisions">
              {divisionOptions?.map((option: { id: string; name: string }) => (
                <CommandItem
                  className="cursor-pointer"
                  key={option.id}
                  onSelect={() => {
                    navigate(`/tours?division=${option.id}`);
                    setOpen(false); // close dropdown
                  }}
                >
                  {option.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default SearchSection;
