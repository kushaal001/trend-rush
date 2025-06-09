import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import Link from 'next/link';

export default function GenericToolTip(props: any) {
  const { btnName, path, title } = props;
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          {path ? <Link href={path}>{btnName}</Link> : btnName}
        </TooltipTrigger>
        <TooltipContent>
          <p>{title}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
