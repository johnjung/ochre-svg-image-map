import Footer from "@/components/footer";
import Header from "@/components/header";
import { getContent } from "@/lib/utils";
import type { OchreTreeResponse } from "@/types";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: { uuid: string };
}): Promise<Metadata> {
  console.log(params.uuid);
  /*
  const response = await fetch(
    `https://ochre.lib.uchicago.edu/ochre?uuid=${encodeURIComponent(params.uuid)}&format=json`,
  );
  const data = (await response.json()) as OchreTreeResponse;

  const title = getContent(data.ochre?.tree?.identification?.label?.content);
  if (!title) {
    notFound();
  }
  */
  const title = 'jej';

  return {
    title: title,
  };
}

export default function UuidLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="grid w-full grid-rows-[auto_1fr_auto] items-start">
      <Header />
      <div className="col-start-1 col-end-2 row-start-2 row-end-3 grid w-[100dvw] justify-items-center">
        {children}
      </div>
      <Footer />
    </div>
  );
}
