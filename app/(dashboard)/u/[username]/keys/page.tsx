import { Button } from "@/components/ui/button";

export default function KeysPage() {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Keys & URLs</h1>
        <Button variant="primary">
          Generate
        </Button>
      </div>
    </div>
  );
}