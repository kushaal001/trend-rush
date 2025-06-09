import { Loader2 } from 'lucide-react';

export function GenericLoader() {
  return (
    <div className="mx-auto flex min-h-screen w-full items-center justify-center py-12">
      <Loader2 className="h-8 w-8 animate-spin text-gray-800" />
    </div>
  );
}

export function Loader() {
  return (
    <div className="mx-auto flex size-full items-center justify-center py-12">
      <Loader2 className="h-8 w-8 animate-spin text-gray-800" />
    </div>
  );
}
