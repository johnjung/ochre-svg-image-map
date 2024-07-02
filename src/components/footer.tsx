import Link from "next/link";
import ForumIcon from "./icons/forum";
import OchreIcon from "./icons/ochre";

export default function Footer() {
  return (
    <footer className="z-100 col-start-1 col-end-3 grid w-full justify-items-center self-start border-t border-neutral-700 border-opacity-25 bg-gradient-to-b from-white to-neutral-200 dark:border-neutral-600 dark:from-neutral-900 dark:to-neutral-950">
      <div className="grid max-w-2xl grid-rows-1 items-center justify-center gap-6 p-6 sm:grid-flow-col sm:gap-x-5 sm:p-4">
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
          className="grid grid-flow-col items-center justify-center gap-x-1 text-nowrap text-sm font-medium text-brand-900/80 dark:text-[#c1c1c1]"
        >
          <span className="select-none text-[0.8rem]">Powered by OCHRE</span>
          <OchreIcon className="h-10 w-auto" />
        </Link>
      </div>
    </footer>
  );
}
