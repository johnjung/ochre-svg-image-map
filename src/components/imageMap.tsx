"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import LoadingSpinner from "./loading/spinner";

export default async function ImageMap(params: { uuid: string }) {
  const { uuid } = params;

  const [isLoading, setIsLoading] = useState(true);

  const response = await fetch(
    `https://ochre.lib.uchicago.edu/ochre?uuid=${uuid}&format=json`,
  );

  const data = await response.json();

  const href = `https://ochre.lib.uchicago.edu/ochre?uuid=${uuid}&load`;

  interface Area {
    shape: string;
    title: string;
    type: string;
    publicationDate?: string;
    uuid: string;
    coords: string;
  }

  function ClickableRect(area: Area, index: number) {
    const coords = area.coords.split(",").map((c) => Number(c));
    const x = coords[0];
    const y = coords[1];
    const width = coords[2] - coords[0];
    const height = coords[3] - coords[1];
    const href = `https://ochre.lib.uchicago.edu/ochre?uuid=${area.uuid}`;
    const publicationDate = area.publicationDate;
    const currentDate = new Date().toJSON().slice(0, 10);
    const published = publicationDate && (publicationDate <= currentDate);
    const stroke = published ? "red" : "pink";
    const rect = (
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        stroke={stroke}
        strokeWidth="2px"
        fill="transparent"
        vectorEffect="non-scaling-stroke"
      >
        <title>{area.title}</title>
      </rect>);

    const key = `area-${index}`;
    if (published) {
      return (
        <g key={key}><a href={href} target="_blank">{ rect }</a></g>
      );
    } else {
      return (
        <g key={key}>{ rect }</g>
      );
    }
  }

  return (
    <>
      {/*
      <AnimatePresence>
        {isLoading ?
          <motion.div
            key={`loading-spinner-${uuid}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
            className="pointer-events-none z-10 col-start-1 col-end-2 row-start-1 row-end-2 grid select-none items-center justify-center"
          >
            <LoadingSpinner />
          </motion.div>
        : null}
      </AnimatePresence>
      */}
      <svg
        version="1.1"
        width="100%"
        viewBox={`0 0 ${data.ochre.resource.imagemap.width} ${data.ochre.resource.imagemap.height}`}
        xmlns="http://www.w3.org/2000/svg"
      >
        <image href={href} onLoad={() => { console.log('here'); setIsLoading(false)}} />
        {data.ochre.resource.imagemap.area.map((area: Area, index: number) =>
          ClickableRect(area, index),
        )}
      </svg>
    </>
  );
}
