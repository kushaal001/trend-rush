import { PropsWithChildren } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./card";
import { cn } from "@/lib/utils";
import { Button } from "./button";
import { ArrowLeft, Loader2 } from "lucide-react";
import { FieldValues } from "react-hook-form";
import { Form } from "./form";

import FormCardWrapper from "./form-card";

export default function FormWrapper<T extends FieldValues>({
  children,
  title,
  description,
  handleCancel,
  handleBack,
  cancelButtonText = "Cancel",
  submitButtonText = "Submit",
  submitLoader = false,
  form,
  onSubmit,
  formClassName,
  nonFieldErrors,
}: PropsWithChildren<any>) {

  return (
    <FormCardWrapper
      title={title}
      description={description}
      handleBack={handleBack}
    >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <div className={cn(formClassName)}>{children}</div>
            {nonFieldErrors.length > 0 && (
              <p
                id="nonfield-errors"
                className="text-center text-lg font-semibold text-red-700"
                role="alert"
              >
                {nonFieldErrors}
              </p>
            )}
            <div className="flex justify-end space-x-2">
              <Button variant="destructive" type="reset" onClick={handleCancel}>{cancelButtonText}</Button>
              <Button variant="default" type="submit" className={cn(submitLoader && "cursor-not-allowed")} disabled={submitLoader}>
                {submitLoader ? <Loader2 className="animate-spin size-5 mr-1" /> : null}
                <span>{submitButtonText}</span>
              </Button>
            </div>
          </form>
        </Form>
  </FormCardWrapper>
  );
}