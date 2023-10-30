import LoadingSpinner from "@/components/LoadingSpinner"

function loading() {
  return (
    <div className="flex items-center p-10 justify-center">
        <LoadingSpinner/>
    </div>
  );
};

export default loading