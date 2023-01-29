import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import styles from "./Layout.module.css";
import githubIcon from "../../../public/github.svg";

export const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <header className={styles.header}>
        <Link href="/">Home</Link>
        <Link href="/pizza">Pizza!</Link>
        <a
          href="https://github.com/Gelio/next-intercept-ssr-navigation"
          title="Source code"
          className={styles["github-link"]}
          target="_blank"
          rel="noreferrer"
        >
          <Image src={githubIcon} alt="GitHub logo" />
        </a>
      </header>

      <main className={styles.main}>{children}</main>
    </>
  );
};
