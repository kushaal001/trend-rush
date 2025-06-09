import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import React, { Fragment, PropsWithChildren } from "react";

type LoadingProps = PropsWithChildren<{ isLoading: boolean; height?: string }>;

const LoadingWrapper = React.memo(
  ({ children, isLoading, height }: LoadingProps) => {
    if (isLoading) {
      return (
        <div
          className={cn(
            height ?? "h-screen",
            "mx-auto flex w-full items-center justify-center py-12",
          )}
        >
          <Loader2 className="h-8 w-8 animate-spin text-gray-800" />
        </div>
      );
    }
    return <Fragment>{children}</Fragment>;
  },
);

LoadingWrapper.displayName = "Input";

export { LoadingWrapper };
