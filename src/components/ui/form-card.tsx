import { PropsWithChildren } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./card";

import { Button } from "./button";
import { ArrowLeft, Loader2 } from "lucide-react";


export default function FormCardWrapper({
  children,
  title,
  description,
  handleBack,
  additionalButtons = [],
}: PropsWithChildren<any>) {

  return (
    <Card className="bg-white">
      <CardHeader className="flex flex-wrap justify-between my-auto items-center">
        <div>
          <CardTitle className="text-lg">{title}</CardTitle>
          {description && <CardDescription>{description}</CardDescription>}
        </div>
        <div className="flex space-x-2 flex-wrap space-y-1">
          {additionalButtons.map((button:any, index:any) => {
            const shouldShow = button.show !== false;

            if (!shouldShow) return null;

            const buttonSize = button.size || (button.text && !button.icon ? "sm" : "icon");

            return (
              <Button
                key={index}
                variant={button.variant || "ghost"}
                size={buttonSize}
                onClick={() => button.onClick()}
                className={button.className}
                title={button.tooltip}
                disabled={button.disabled || button.loading}
              >
                {button.loading ? <Loader2 className="size-5 animate-spin" /> : button.icon}
                {button.text && <span className={button.icon ? "ml-1" : ""}>{button.text}</span>}
              </Button>
            );
          })}
        <Button variant="outline" onClick={handleBack}>
          <ArrowLeft className="size-4 mr-1" />
          <span>Back</span>
        </Button>
        </div>
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
    </Card>
  );
}