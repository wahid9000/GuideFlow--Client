import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetDivisionsQuery } from "@/redux/features/division/division.api";
import { useGetTourTypesQuery } from "@/redux/features/tour/tour.api";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "react-router";

const TourFilter = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const selectedDivision = searchParams.get("division") || undefined;
  const selectedTourType = searchParams.get("tourType") || undefined;

  const { data: divisionData, isLoading: divisionLoading } =
    useGetDivisionsQuery(undefined);
  const { data: tourTypeData, isLoading: tourTypeLoading } =
    useGetTourTypesQuery(undefined);

  const divisionOptions =
    divisionData?.data?.map((division: { _id: string; name: string }) => ({
      id: division._id,
      name: division.name,
    })) || [];

  const tourTypeOptions =
    tourTypeData?.map((type: { _id: string; name: string }) => ({
      id: type._id,
      name: type.name,
    })) || [];

  const handleDivisionChange = (value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("division", value);
    setSearchParams(params);
  };

  const handleTourTypeChange = (value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("tourType", value);
    setSearchParams(params);
  };

  const handleClearFilter = () => {
    const params = new URLSearchParams(searchParams);
    params.delete("division");
    params.delete("tourType");
    setSearchParams(params);
  };

  return (
    <div className="lg:col-span-1 border p-4 rounded-lg shadow-lg hover:shadow-xl space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-2xl font-bold">Filters</h3>
        <Button
          onClick={handleClearFilter}
          size={"sm"}
          variant={"outline"}
          className="font-semibold cursor-pointer"
        >
          Clear Filter
        </Button>
      </div>
      <Separator />
      <div>
        <label className="block text-sm font-semibold mb-2">
          Filter by Division
        </label>

        <Select
          onValueChange={(value) => handleDivisionChange(value)}
          disabled={divisionLoading}
          value={selectedDivision ? selectedDivision : ""}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a Division" />
          </SelectTrigger>

          <SelectContent>
            <SelectGroup>
              <SelectLabel>Divisions</SelectLabel>
              {divisionOptions.map((option: { id: string; name: string }) => (
                <SelectItem key={option.id} value={option.id}>
                  {option.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div>
        <label className="block text-sm font-semibold mb-2">
          Filter by Tour Type
        </label>
        <Select
          onValueChange={(value) => handleTourTypeChange(value)}
          disabled={tourTypeLoading}
          value={selectedTourType ? selectedTourType : ""}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a Tour Type" />
          </SelectTrigger>

          <SelectContent>
            <SelectGroup>
              <SelectLabel>Tour Types</SelectLabel>
              {tourTypeOptions.map((option: { id: string; name: string }) => (
                <SelectItem key={option.id} value={option.id}>
                  {option.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default TourFilter;
