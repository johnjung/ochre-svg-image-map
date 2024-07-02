"use client";

import { handleUuidRoute } from "@/actions";
import { ArrowRightIcon } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { useRef } from "react";
import { useFormStatus } from "react-dom";
import { toast } from "sonner";
import { useEventListener } from "usehooks-ts";
import LoadingSpinner from "../loading/spinner";

function FormButton() {
  const { pending } = useFormStatus();

  return (
    <button className="grid h-9 w-9 items-center justify-center rounded-r-sm bg-gradient-to-b from-accent-500 to-accent-600 text-accent-950 shadow-sm hover-sm active-sm hover:rounded-r-sm active:scale-100 active:rounded-r-sm">
      {pending ?
        <div className="grid items-center justify-center">
          <LoadingSpinner className="h-5 w-auto text-accent-200" />
        </div>
      : <ArrowRightIcon className="h-5 w-auto" strokeWidth={3} />}
    </button>
  );
}

export default function Input() {
  const { execute } = useAction(handleUuidRoute, {
    onSuccess: () => {
      toast.dismiss();
    },
    onError: ({ error }) => {
      toast.dismiss();

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
    <form
      action={execute}
      className="hidden grid-flow-col items-center md:grid"
    >
      <input
        ref={inputRef}
        name="uuid"
        type="text"
        enterKeyHint="enter"
        autoCapitalize="false"
        autoCorrect="false"
        className="h-9 w-[350px] rounded-l-sm bg-gradient-to-b from-white to-neutral-100 px-2 shadow-sm transition-all placeholder:text-neutral-400 focus:z-10 focus:rounded-sm focus:from-white focus:to-white focus:outline-none focus:ring-2 focus:ring-accent-400 dark:from-neutral-800 dark:to-neutral-900 dark:placeholder:text-neutral-400/70"
        placeholder="Enter an OCHRE UUID..."
      />
      <FormButton />
    </form>
  );
}
