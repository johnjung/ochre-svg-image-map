"use client";

import { handleUuidRoute } from "@/actions";
import FormButton from "@/components/form-button";
import { SquareArrowOutUpRightIcon } from "lucide-react";
import { useAction } from "next-safe-action/hooks";

import Link from "next/link";
import { useRef } from "react";

import { toast } from "sonner";
import { useEventListener } from "usehooks-ts";

export default function Form({ isMobile }: { isMobile: boolean }) {
  const { execute } = useAction(handleUuidRoute, {
    onSuccess: () => {
      toast.dismiss();
    },
    onError: ({ error }) => {
      const validationErrors = error?.validationErrors?.fieldErrors?.uuid;
      if (Array.isArray(validationErrors) && validationErrors.length > 0) {
        const error = validationErrors
          .map((error) =>
            error === "Required" ? "Please enter a UUID value." : error,
          )
          .join(" ");

        toast(error);
      }
    },
  });

  const inputRef = useRef<HTMLInputElement>(null);

  useEventListener("keydown", (e) => {
    if (!inputRef.current) {
      return;
    }

    if (inputRef.current.contains(document.activeElement)) {
      if (e.key === "Escape") {
        if (inputRef.current.value === "") {
          inputRef.current.blur();
        } else {
          inputRef.current.value = "";
        }
      }

      return;
    }

    if (
      e.key === "Escape" ||
      e.key === "Enter" ||
      (e.metaKey && e.key !== "k" && e.key !== "v") ||
      e.ctrlKey ||
      e.altKey ||
      e.shiftKey ||
      e.key === "ArrowLeft" ||
      e.key === "ArrowRight" ||
      e.key === "ArrowUp" ||
      e.key === "ArrowDown" ||
      e.key === "Tab" ||
      e.key === "PageUp" ||
      e.key === "PageDown" ||
      e.key === "Home" ||
      e.key === "End" ||
      e.key === "Help"
    ) {
      return;
    }

    if (e.metaKey && e.key === "v") {
      e.preventDefault();

      navigator.clipboard
        .readText()
        .then((text) => {
          if (!text || !inputRef.current) {
            return;
          }

          const inputValue = inputRef.current.value;

          inputRef.current.value = `${inputValue.trim()} ${text.trim()}`;

          inputRef.current.focus();
        })
        .catch((err) =>
          console.error("Error reading text from clipboard:", err),
        );

      return;
    }

    inputRef.current.focus();
  });

  return (
    <>
      <form
        action={execute}
        className="grid content-center gap-1.5 self-end sm:gap-2"
      >
        <label className="mb-0.5 text-center font-sans text-base font-semibold leading-6 sm:px-2.5 sm:text-start sm:text-xl sm:font-medium">
          Enter an OCHRE UUID to view as an image map:
        </label>
        <input
          ref={inputRef}
          name="uuid"
          type="text"
          enterKeyHint="enter"
          autoCapitalize="false"
          autoCorrect="false"
          autoFocus={!isMobile}
          className="h-12 w-full rounded-sm bg-gradient-to-b from-white to-neutral-100 px-3 py-2 shadow-md transition-all focus:from-white focus:to-white focus:outline-none focus:ring-2 focus:ring-brand-600 sm:h-14"
          placeholder="Example: 1d1618cf-3d01-4d22-9f26-711b9689c044"
        />
        <FormButton />
        <Link
          href="/1d1618cf-3d01-4d22-9f26-711b9689c044"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-1 grid w-full grid-flow-col gap-2 rounded-sm bg-gradient-to-b from-white to-neutral-200 py-2.5 pl-2.5 pr-2 font-sans font-semibold tracking-[0.3px] text-brand-800 shadow-md hover-xs active-md hover:scale-[1.01] active:scale-[0.99] active:rounded-sm"
        >
          <div className="col-start-1 col-end-2 row-start-1 row-end-2 self-center justify-self-center">
            View example
          </div>
          <SquareArrowOutUpRightIcon
            className="col-start-1 col-end-2 row-start-1 row-end-2 h-[18px] w-auto self-center justify-self-end"
            strokeWidth={2.75}
          />
        </Link>
      </form>
    </>
  );
}
