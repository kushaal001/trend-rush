import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronLeftIcon } from "lucide-react";
import { Button } from "../button";

export default function GenericTabs(props: any) {
  const { tab, handleTabChange, data, id, handleBack } = props;
  return (
    <div className=" relative">
      <Tabs
        defaultValue={tab ? tab : data[0]?.value}
        className="w-full overflow-hidden   relative space-y-5"
        value={tab ? tab : data[0]?.value}
      >
        <TabsList className="text-sm bg-transparent p-0  w-full justify-start h-max border-b rounded-none">
          {data?.map((tab: any, index: number) => (
            <TabsTrigger
              key={index}
              disabled={tab.disabled ?? (tab.value === "distillery" ? false : !id)}
              onClick={() => handleTabChange(tab.value)}
              className="data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-t-primary_color  rounded-b-none border-b disabled:cursor-not-allowed"
              value={tab.value}
            >
              {tab.name}
            </TabsTrigger>
          ))}
        </TabsList>
        {data?.map((tab: any, index: number) => (
          <TabsContent key={index} className=" w-full " value={tab.value}>
            {tab.content}
          </TabsContent>
        ))}
      </Tabs>
      {handleBack && (
        <Button
          variant="outline"
          id={`back-Button`}
          className=" absolute top-[3px] right-0 text-center"
          type="button"
          onClick={handleBack}
        >
          <ChevronLeftIcon
            size={18}
            className="flex-shrink-0 text-black"
            aria-hidden="true"
          />{" "}
          Back
        </Button>
      )}
    </div>
  );
}
