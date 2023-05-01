import NavBar from "./Navbar";
import Footer from "./Footer";
import Head from "next/head";
import { ReactNode } from 'react';

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Head>
        <title>Wardrop Wizards</title>
      </Head>
      <NavBar />
      {children}
      <Footer />
    </>
  );
};

export default Layout;