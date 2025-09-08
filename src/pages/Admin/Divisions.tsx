import AddDivisionModal from "@/components/modules/Admin/Division/AddDivisionModal";

const Divisions = () => {
  return (
  <div className="w-full max-w-5xl mx-auto">
      <div className="flex justify-between mb-6 items-center">
        <h1 className="text-3xl font-bold">Divisions</h1>
        <AddDivisionModal />
      </div>
      <div className="border border-muted round-md p-4">
      
      </div>
    </div>
  );
};

export default Divisions;
