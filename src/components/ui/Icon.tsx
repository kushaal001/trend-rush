import * as LucideIcons from "lucide-react"; // Import all named exports
import { Suspense } from 'react';
interface IconProps {
  name: keyof typeof LucideIcons;
}

export default function Icon({ name }: IconProps) {
  const IconComponent = LucideIcons[name] as React.ComponentType<{ className?: string }>;
  if (!IconComponent) {
    // Handle invalid or unsupported icon names
    return null;
  }
  return (
    <Suspense fallback={<div>Loading Icon...</div>}>
      <IconComponent className="w-[28px] h-[28px]" />
    </Suspense>
  );
}
