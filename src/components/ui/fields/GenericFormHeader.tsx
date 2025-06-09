import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import clsx from "clsx";
import { AlertTriangle, ChevronLeftIcon, Loader2 } from "lucide-react";
import { FormProvider } from "react-hook-form";
import { Button } from "../button";
import { GenericLoader } from "./GenericLoader";
import { Fragment } from "react";

export function GenericFormHeader({
  title,
  id,
  handleBack,
  handleCancel,
  SubmitVariant,
  CancelVariant,
  shouldHide,
  onSubmitClick,
  children,
  form,
  customTitle,
  modal,
  hideBackButton = false,
  isLoading,
  isSubmitLoading = false,
  isNextButton = false,
  setOpenFormModal,
  openFormModal,
  hideCancel,
  submitBtnText = "Submit",
  hideSubmitButton,
  renderButtons,
  contentHeight,
  className,
  disabled = false,
  action,
  errors,
  tabs,
}: any) {

  function renderFormDetails() {
    if (isLoading) return <GenericLoader />;
    return (
      <Fragment>
        <CardContent>
          {children}
          {errors?.nonFieldErrors && (
            <div className="bg-red-100 text-red-600 px-4 py-2 mb-4 rounded flex items-center my-4">
              <AlertTriangle size={18} className="mr-2" />
              <span>{errors.nonFieldErrors.message}</span>
            </div>
          )}
        </CardContent>
        <CardFooter
          className={`flex justify-end p-4 gap-3  mt-4 ${modal ? "z-[99]" : ""
            }`}
        >
          {!hideCancel && (
            <Button
              type="button"
              id="form-Cancel"
              variant={"outline"}
              onClick={handleCancel ? handleCancel : handleBack}
              disabled={isSubmitLoading}
            >
              Cancel
            </Button>
          )}
          {!hideSubmitButton && (
            <Button disabled={disabled} type="submit" variant={SubmitVariant}>
              {isSubmitLoading && (
                <div className=" flex h-full w-full items-center justify-center mr-2">
                  <Loader2 className="h-8 w-8 animate-spin text-white" />
                </div>
              )}
              <span>{submitBtnText}</span>
            </Button>
          )}
          {renderButtons && renderButtons()}
        </CardFooter>
      </Fragment>
    )
  }

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmitClick)}
        className={`w-full  h-full  flex flex-col ${tabs ? " " : " "} `}
      >
        <Card
        style={{
          boxShadow: `
          inset 0px -1.5px 0px 0px rgba(0, 0, 0, 0.25),
          inset 1px 0px 0px 0px rgba(255, 255, 255, 0.20),
          inset -1px 0px 0px 0px rgba(255, 255, 255, 0.20),
          inset 0px 1px 0px 0px rgba(255, 255, 255, 0.48)
        `
        }}
          className={clsx(
            className,
            " flex flex-col justify-between border rounded-3xl space-y-0 bg-white  "
          )}
        >
          <CardHeader className="border-b flex flex-row justify-between items-center  space-y-0">
            <CardTitle className="text-[20px] font-semibold text-primary_text_color">
              {customTitle
                ? customTitle
                : `${id ? "Edit" : "Add"}  ${title}`}
            </CardTitle>
            {!hideBackButton && (
              <Button
                variant="outline"
                id={`back-Button`}
                className="px-4 py-2 text-center"
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
          </CardHeader>
          {renderFormDetails()}
        </Card>
      </form>
    </FormProvider>
  );
}
