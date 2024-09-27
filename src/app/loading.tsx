import { CircularProgress } from "@nextui-org/react";

export default function Loading() {
  return (
    <div className="flex h-full items-center justify-center">
      <CircularProgress
        aria-label="Loading"
        classNames={{
          svg: "w-36 h-36 drop-shadow-md",
        }}
      />
    </div>
  );
}
