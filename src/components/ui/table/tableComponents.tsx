
import { cn } from "@/lib/utils";
import { RenderDeleteButtonProps, RenderViewButtonProps } from "@/lib/types/table";
import { Switch } from "@headlessui/react";
import { format } from "date-fns";
import { CircleCheckIcon, Eye, FileTextIcon, PencilIcon, Trash2Icon, XCircleIcon } from "lucide-react";
import Link from "next/link";
import { Fragment } from "react";

export const titleRender = (value: string) => <Fragment>{value}</Fragment>;

export const currencyRender = (value: string) => <Fragment> ₹ {value.toLocaleString()} </Fragment>


export const dateTimeRender = (value: string) => (
  <div className="">
    <div className="flex space-x-3">
      <p className="truncate text-ellipsis">
        <span className=" "> {format(new Date(value), "MMM d, yyyy")}</span>
      </p>
      <p className="truncate text-ellipsis">
        <span className=" "> {format(new Date(value), "h:mm a")}</span>
      </p>
    </div>
  </div>
);


export const dateRender = (value: string) => (
  <Fragment>{value ? format(new Date(value), "dd-MM-yyyy") : "-"}</Fragment>
);


export function renderDownload(value: string) {
  return (
    <Fragment>
      {value !== null ? (
        <Link href={value} className="Capitalize" target='_blank'>
          <FileTextIcon className='h-5 text-blue-500 cursor-pointer' />
        </Link>
      ) : '-'
      }
    </Fragment>
  )
}

export const imageRender = (value: string) => (
  <div className="border-border-color w-max rounded-lg border p-1">
    <img
      alt=""
      src={
        value
          ? value
          : "https://testing.agnicart.com/static/images/image-not-available.jpg"
      }
      title={value}
      className="h-10 w-10 overflow-hidden truncate text-ellipsis rounded-md object-scale-down"
    />
  </div>
);

export const publishedRender = (value: boolean) => (
  <div className="flex">
    {value ? (
      <CircleCheckIcon className="h-5 w-5 text-green-500" />
    ) : (
      <XCircleIcon className="h-5 w-5 text-red-500" />
    )}
  </div>
);

export function RenderViewButton({ href = "#", id }: RenderViewButtonProps) {
  return (
    <Link href={href} id={id} prefetch={false}>
      <div className="p-1">
        <Eye className="size-4 text-black" />
      </div>
    </Link>
  );
}

export function RenderEditButton({ href = "#", id }: RenderViewButtonProps) {
  return (
    <Link href={href} id={id} prefetch={false} className="p-1">
      <PencilIcon className="size-4 text-blue-700" />
    </Link>
  );
}

export function RenderDeleteButton({ onClick, id }: RenderDeleteButtonProps) {
  return (
    <button className="" type="button" onClick={onClick} id={id}>
      <Trash2Icon className="size-4 text-red-500" />
    </button>
  );
};

export function SwitchRender({ value, onChange, id, disabled = false }: { value: boolean, onChange: any, id: string, disabled?: boolean }) {
  return (
    <div className="">
      <Switch
        checked={value}
        onChange={onChange}
        id={id}
        className={cn(
          value ? 'bg-green-500' : 'bg-red-400',
          `relative inline-flex h-5 w-9 items-center border border-element-border-color rounded-full `,
          disabled && 'cursor-not-allowed'
        )}
      >
        <span className="sr-only">Use setting</span>
        <span
          aria-hidden="true"
          className={`${value ? 'translate-x-5' : 'translate-x-1'}
            inline-block h-3.5 w-3.5 transform rounded-full bg-white transition`}
        />
      </Switch>
    </div>
  )
}

//to format date to send to api
//dateString is the output of GenericDatePicker in new Date object
export const formatDateForAPI = (args: { dateString: Date }) => {
  const { dateString } = args;

  const date = new Date(dateString);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is 0-based
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
};

//gives user readable date in local format(india) from utcString
export const dateFormatter = (args: { utcString: string, month?: string, withTime?: boolean }) => {
  const { utcString, month = "2-digit", withTime = false } = args
  const formatter = new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: month === "short" ? "short" : month === "long" ? "long" : "2-digit",
    year: "numeric",
    ...(withTime && {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    }),
    timeZone: "Asia/Kolkata",
  });
  return (utcString ? formatter.format(new Date(utcString)) : "-")
}

//gives formatted value for label column
export const formatLabel = (row: any) => {
  return (
    <div>
      <span className="block w-max">
        {`${row.label.brand?.name} - ${row.label?.code}`}
      </span>
      <span className="block w-max">
        {`${row.label.pack_type?.name} - ${row.label.size?.quantity}ml - ${row.label.size.upc} units per case`}
      </span>
    </div>
  )
}
