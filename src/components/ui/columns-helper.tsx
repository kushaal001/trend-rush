import { ColumnDef, Row } from "@tanstack/react-table";
import { CircleCheckIcon, CircleXIcon, PencilIcon, Trash2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AdditionalButtonConfig } from "@/lib/types/helpers";


export function getColumnsWithActions<T,>(
  setSelected: (value: T) => void,
  setShowDeleteModal: (value: boolean) => void,
  handleEdit: (id: number, row: Row<T>) => void,
  columns: ColumnDef<T>[],
  options?: {
    showEditButton?: boolean | ((row: Row<T>) => boolean);
    showDeleteButton?: boolean | ((row: Row<T>) => boolean);
    editButtonClassName?: string;
    deleteButtonClassName?: string;
    additionalButtons?: AdditionalButtonConfig<T>[];
  },
): ColumnDef<T>[] {
  const {
    showEditButton = true,
    showDeleteButton = true,
    editButtonClassName = "text-indigo-600",
    deleteButtonClassName = "text-red-600",
    additionalButtons = [],
  } = options || {};

  return [
    ...columns,
    {
      accessorKey: "id",
      header: "Actions",
      cell: ({ row }) => {
        // Determine visibility of standard buttons
        const shouldShowEdit = typeof showEditButton === 'function'
          ? showEditButton(row)
          : showEditButton;

        const shouldShowDelete = typeof showDeleteButton === 'function'
          ? showDeleteButton(row)
          : showDeleteButton;

        return (
          <div className="flex items-center space-x-1">
            {/* Render additional buttons */}
            {additionalButtons.map((button, index) => {
              // Determine if button should be shown
              const shouldShow = typeof button.show === 'function'
                ? button.show(row)
                : button.show !== false;

              if (!shouldShow) return null;

              // Determine size based on content
              const buttonSize = button.size || (button.text && !button.icon ? "sm" : "icon");

              return (
                <Button
                  key={index}
                  variant={button.variant || "ghost"}
                  size={buttonSize}
                  onClick={() => button.onClick(row)}
                  className={button.className}
                  title={button.tooltip}
                >
                  {button.icon}
                  {button.text && <span className={button.icon ? "ml-1" : ""}>{button.text}</span>}
                </Button>
              );
            })}

            {/* Edit button */}
            {shouldShowEdit && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleEdit(row.getValue("id"), row)}
                className={editButtonClassName}
                title="Edit"
              >
                <PencilIcon className="size-4" />
              </Button>
            )}

            {/* Delete button */}
            {shouldShowDelete && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  setSelected(row.original);
                  setShowDeleteModal(true);
                }}
                className={deleteButtonClassName}
                title="Delete"
              >
                <Trash2Icon className="size-4" />
              </Button>
            )}
          </div>
        );
      },
      minSize: 100,
      size: 150,
    },
  ]
}

export function getStatus(input: string) {
  switch (input) {
    // 🟡 Neutral Pending / Draft States
    case 'PENDING':
    case 'CREATED':
      return { status: 'Pending', color: 'bg-yellow-100 text-yellow-800' };
    case 'DRAFT':
      return { status: 'Draft', color: 'bg-amber-100 text-amber-800' };
    case 'AWAITING_PRODUCTION':
      return { status: 'Awaiting Production', color: 'bg-yellow-100 text-yellow-800' };
    case 'AWAITING_LABEL_REVIEW':
      return { status: 'Awaiting Label Review', color: 'bg-gray-100 text-gray-800' };

    // ⚙️ In Progress / Workflow Stages
    case 'CHECKLIST':
      return { status: 'Checklist', color: 'bg-gray-100 text-gray-800' };
    case 'GATE_PASS':
      return { status: 'Gate Pass', color: 'bg-sky-100 text-sky-800' };
    case 'REACHED':
      return { status: 'Reached', color: 'bg-orange-100 text-orange-800' };
    case 'VERIFIED':
      return { status: 'Verified', color: 'bg-indigo-100 text-indigo-800' };
    case 'IN_TRANSIT':
      return { status: 'In Transit', color: 'bg-blue-100 text-blue-800' };
    case 'REVIEWED':
      return { status: 'Reviewed', color: 'bg-cyan-100 text-cyan-800' };
    case 'IN_PROGRESS':
      return { status: 'In Progress', color: 'bg-purple-100 text-purple-800' };
    case 'IN_PRODUCTION':
      return { status: 'In Production', color: 'bg-indigo-100 text-indigo-800' };

    // ✅ Success / Completion States
    case 'APPROVED':
    case 'TESTED':
    case 'DELIVERED':
      return { status: 'Approved', color: 'bg-emerald-100 text-emerald-800' };
        case 'ISSUED':
          return { status: 'Issued', color: 'bg-emerald-100 text-emerald-800' };
    case 'READY_FOR_DISPATCH':
      return { status: 'Ready for Dispatch', color: 'bg-emerald-100 text-emerald-800' };
    case 'ACTIVE':
      return { status: 'Active', color: 'bg-green-100 text-green-800' };
    case 'INACTIVE':
      return { status: 'Inactive', color: 'bg-red-100 text-red-800' };
    case 'RECEIVED':
      return { status: 'Received', color: 'bg-lime-100 text-lime-800' };
    case 'COMPLETED':
    case 'Active':
      return { status: 'Completed', color: 'bg-green-100 text-green-800' };
    case 'VALIDATED':
    case 'Inuse':
      return { status: 'In Use', color: 'bg-teal-100 text-teal-800' };

    // ⚠️ Attention / Warnings
    case 'DELAYED':
      return { status: 'Delayed', color: 'bg-orange-100 text-orange-800' };
    case 'DISPATCHED':
      return { status: 'Dispatched', color: 'bg-amber-200 text-amber-800' };

    // ❌ Failure / Errors
    case 'REJECTED':
    case 'REJECTED_BY_LABEL_REVIEW':
      return { status: 'Rejected by Label Review', color: 'bg-red-100 text-red-800' };
    case 'DAMAGED':
      return { status: 'Damaged', color: 'bg-rose-100 text-rose-800' };

    // ⚙️ Maintenance or Non-Operational
    case 'MAINTENANCE':

    // 🔵 Defaults & Fallbacks
    case 'EMPTY':
      return { status: 'Empty', color: 'bg-gray-100 text-gray-500' };
            case "FAIL":
      return { status: 'Fail', color: 'bg-red-100 text-red-800' };
      case "PASS":
      return { status: 'Pass', color: 'bg-emerald-100 text-emerald-800' };
    default:
      return { status: 'Unknown', color: 'bg-gray-200 text-gray-800' };
  }
}

