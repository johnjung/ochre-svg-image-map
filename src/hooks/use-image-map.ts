import type { OchreResultImageMapResponse } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { useParams as useNavigationParams } from "next/navigation";
import { useEffect, useState } from "react";
// JEJ remove?
//import { useParams } from "./use-params";

async function fetchGalleryItems(uuid: string, page: number, perPage: number) {
  const response = await fetch(
    `https://ochre.lib.uchicago.edu/ochre?xquery=(for $q in input()/ochre[@uuid='${uuid}'] return <gallery maxLength='{$q/metadata/item/@maxLength}'> {$q/tree/items/resource[position() >= ${(page - 1) * perPage + 1} and position() < ${page * perPage + 1}]} </gallery>)&format=json`,
  );

  if (!response.ok) {
    throw new Error("Error fetching gallery items, please try again.");
  }

  const data = (await response.json()) as OchreResultGalleryResponse;

  return {
    gallery:
      Array.isArray(data.result.gallery.resource) ?
        data.result.gallery.resource
      : [data.result.gallery.resource],
    maxLength: data.result.gallery.maxLength,
  };
}

export function useImageMap() {
  const params = useNavigationParams();
  const uuid = params.uuid as string;

  const { data, isLoading, error } = useQuery({
    queryKey: ["gallery", uuid],
    queryFn: () => fetchGalleryItems(uuid, page, perPage),
  });

  useEffect(() => {
    if (data?.maxLength == null) {
      return;
    }

    if (maxLength === null || data.maxLength !== maxLength) {
      setMaxLength(data.maxLength);
    }
  }, [maxLength, data?.maxLength]);

  return {
    items: data?.gallery ?? [],
    isLoading,
    error,
  };
}
