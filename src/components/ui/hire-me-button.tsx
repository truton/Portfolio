"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { Button, type ButtonProps } from "@/components/ui/button";
import { useTranslation } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { useBodyScrollLock } from "@/lib/use-body-scroll-lock";
import { useIsClient } from "@/lib/use-is-client";

const GITHUB_URL = "https://github.com/truton";

interface HireMeButtonProps extends Omit<
  ButtonProps,
  "children" | "className"
> {
  buttonClassName?: string;
  modalClassName?: string;
}

export function HireMeButton({
  buttonClassName,
  modalClassName,
  ...buttonProps
}: HireMeButtonProps) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const isClient = useIsClient();

  useBodyScrollLock(open);

  useEffect(() => {
    if (!open) return;

    const onEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("keydown", onEsc);

    return () => {
      document.removeEventListener("keydown", onEsc);
    };
  }, [open]);

  return (
    <>
      <Button
        {...buttonProps}
        className={cn(buttonClassName)}
        onClick={(event) => {
          buttonProps.onClick?.(event);
          if (!event.defaultPrevented) {
            setOpen(true);
          }
        }}
      >
        {t.hire_modal.button}
      </Button>

      {open && isClient
        ? createPortal(
            <div
              className={cn("fixed inset-0 z-[60] min-h-dvh w-full", modalClassName)}
              role="dialog"
              aria-modal="true"
              aria-labelledby="hire-me-modal-title"
            >
              <div
                className="absolute inset-0 bg-background/70 backdrop-blur-md"
                onClick={() => setOpen(false)}
              />
              <div className="relative flex min-h-dvh items-center justify-center p-4">
                <div
                  className={cn(
                    "w-full max-w-lg rounded-2xl border border-border/70",
                    "bg-card/95 p-6 shadow-2xl shadow-black/25 sm:p-7",
                  )}
                  onClick={(event) => event.stopPropagation()}
                >
                  <div className="mb-5 flex items-start justify-between gap-3">
                    <h3
                      id="hire-me-modal-title"
                      className="text-2xl font-bold tracking-tight text-foreground"
                    >
                      {t.hire_modal.title}
                    </h3>
                    <button
                      type="button"
                      aria-label="Close modal"
                      className={cn(
                        "rounded-md p-1.5 text-muted-foreground transition-colors",
                        "hover:bg-muted hover:text-foreground",
                      )}
                      onClick={() => setOpen(false)}
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>

                  <p className="mb-7 text-sm leading-relaxed text-muted-foreground sm:text-base">
                    {t.hire_modal.description}
                  </p>

                  <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
                    <Button variant="primary" fullWidth>
                      {t.hire_modal.link}
                    </Button>
                  </a>
                </div>
              </div>
            </div>,
            document.body,
          )
        : null}
    </>
  );
}
