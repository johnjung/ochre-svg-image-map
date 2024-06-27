
import type { OchreString } from "@/types";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

const urlRegex = /https?:\/\/\S+|www\.\S+/g;
const emailRegex = /\b[\w.%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g;
export const linkRegex = new RegExp(
  `(${urlRegex.source})|(${emailRegex.source})`,
  "g",
);

export function cn(...inputs: Array<ClassValue>) {
  return twMerge(clsx(inputs));
}

export function getContent(
  content: string | number | OchreString | Array<OchreString>,
  language?: string,
): string {
  if (typeof content === "undefined") {
    return "";
  } else if (typeof content === "string" || typeof content === "number") {
    return content.toString().replace(/&#39;/g, "'");
  } else if (Array.isArray(content)) {
    return content
      .filter((item) =>
        typeof item === "object" && language ? item.lang === language : true,
      )
      .map((item) =>
        (
          typeof item === "object" &&
          item.string &&
          (typeof item.string === "string" || typeof item.string === "number")
        ) ?
          item.string.toString().replace(/&#39;/g, "'")
        : "",
      )
      .join(" ");
  } else if (content.content && typeof content.content === "object") {
    return getContent(content.content);
  } else if (content.string && typeof content.string === "object") {
    return getContent(content.string);
  } else if (
    content.string &&
    (typeof content.string === "string" || typeof content.string === "number")
  ) {
    return content.string.toString().replace(/&#39;/g, "'");
  } else if (
    content.content &&
    (typeof content.content === "string" || typeof content.content === "number")
  ) {
    return content.content.toString().replace(/&#39;/g, "'");
  } else {
    return "";
  }
}

export function changeColorShade(hexColor: string, percent: number) {
  // percent: -100 to 100, negative values darken the color, positive values lighten the color
  if (!hexColor || !percent) {
    return;
  }

  let R = parseInt(hexColor.substring(1, 3), 16);
  let G = parseInt(hexColor.substring(3, 5), 16);
  let B = parseInt(hexColor.substring(5, 7), 16);

  R = (R * (100 + percent)) / 100;
  G = (G * (100 + percent)) / 100;
  B = (B * (100 + percent)) / 100;

  R = R < 255 ? R : 255;
  G = G < 255 ? G : 255;
  B = B < 255 ? B : 255;

  R = Math.round(R);
  G = Math.round(G);
  B = Math.round(B);

  const RR = R.toString(16).length == 1 ? "0" + R.toString(16) : R.toString(16);
  const GG = G.toString(16).length == 1 ? "0" + G.toString(16) : G.toString(16);
  const BB = B.toString(16).length == 1 ? "0" + B.toString(16) : B.toString(16);

  return "#" + RR + GG + BB;
}

