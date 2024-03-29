import { NavbarComponent } from "@components/Navbar";
import type { NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const Home: NextPage = () => {
  return (
    <>
      <NavbarComponent />
      <p>home</p>
    </>
  );
};

export default Home;

export const getStaticProps = async ({ locale }: { locale: string }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}
