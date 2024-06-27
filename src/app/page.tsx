import Form from "@/components/form";
import ForumIcon from "@/components/icons/forum";
import OchreIcon from "@/components/icons/ochre";
import { headers } from "next/headers";
import Link from "next/link";
import { getSelectorsByUserAgent } from "react-device-detect";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default function Page() {
  const headerStore = headers();
  const userAgent = headerStore.get("user-agent") ?? "";

  const { isMobile } = getSelectorsByUserAgent(userAgent) as {
    isMobile: boolean;
  };

  return (
    <main className="absolute bottom-0 left-0 right-0 top-0 mx-auto max-w-prose p-2">
      <div className="grid h-full w-full gap-20">
        <Form isMobile={isMobile} />
        <div className="-mb-20 grid h-full content-start items-center justify-center gap-4 self-start sm:-mb-20 sm:grid-flow-col">
          <Link
            href="https://digitalculture.uchicago.edu"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="The University of Chicago Forum for Digital Culture"
            className="justify-self-center"
          >
            <ForumIcon className="h-7 w-auto" />
          </Link>
          <div className="hidden h-12 w-[1.5px] rounded-sm bg-neutral-400 sm:block" />
          <Link
            href="https://ochre.uchicago.edu"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="The OCHRE Data Service"
            className="grid grid-flow-col items-center justify-center gap-x-1 text-nowrap pb-4 text-sm font-medium text-brand-900/80 sm:pb-0"
          >
            <span className="text-[0.8rem]">Powered by OCHRE</span>
            <OchreIcon className="h-10 w-auto" />
          </Link>
        </div>
      </div>
    </main>
  );
}
