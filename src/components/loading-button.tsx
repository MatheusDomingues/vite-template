import { Loader2 } from "lucide-react";

import { Button, ButtonProps } from "@/components/ui/button";

type LoadingButton = ButtonProps & {
  isLoading?: boolean;
};

export function LoadingButton({
  isLoading,
  children,
  disabled,
  variant,
  ...rest
}: LoadingButton) {
  return (
    <Button disabled={isLoading || disabled} variant={variant} {...rest}>
      {children}
      {isLoading && <Loader2 className="ml-2 h-4 w-4 animate-spin" />}
    </Button>
  );
}
