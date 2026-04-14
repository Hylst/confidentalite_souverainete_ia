import * as React from "react"
import { cn } from "@/src/lib/utils"
import { AlertCircle, Info, Lightbulb, ShieldAlert } from "lucide-react"

interface CalloutProps extends React.HTMLAttributes<HTMLDivElement> {
  type?: "info" | "warning" | "danger" | "tip" | "success";
  title?: string;
  className?: string;
  children?: React.ReactNode;
}

export function Callout({ className, type = "info", title, children, ...props }: CalloutProps) {
  const styles = {
    info: "bg-blue-50 text-blue-900 border-blue-200 dark:bg-blue-950/50 dark:text-blue-200 dark:border-blue-900",
    warning: "bg-amber-50 text-amber-900 border-amber-200 dark:bg-amber-950/50 dark:text-amber-200 dark:border-amber-900",
    danger: "bg-red-50 text-red-900 border-red-200 dark:bg-red-950/50 dark:text-red-200 dark:border-red-900",
    tip: "bg-emerald-50 text-emerald-900 border-emerald-200 dark:bg-emerald-950/50 dark:text-emerald-200 dark:border-emerald-900",
    success: "bg-green-50 text-green-900 border-green-200 dark:bg-green-950/50 dark:text-green-200 dark:border-green-900",
  };

  const icons = {
    info: <Info className="h-5 w-5 text-blue-600 dark:text-blue-400" />,
    warning: <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-400" />,
    danger: <ShieldAlert className="h-5 w-5 text-red-600 dark:text-red-400" />,
    tip: <Lightbulb className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />,
    success: <Info className="h-5 w-5 text-green-600 dark:text-green-400" />,
  };

  return (
    <div className={cn("rounded-lg border p-4 my-6 flex gap-4 items-start", styles[type], className)} {...props}>
      <div className="mt-0.5 shrink-0">{icons[type]}</div>
      <div className="flex-1">
        {title && <h5 className="mb-1 font-semibold tracking-tight">{title}</h5>}
        <div className="text-sm leading-relaxed opacity-90">{children}</div>
      </div>
    </div>
  )
}
