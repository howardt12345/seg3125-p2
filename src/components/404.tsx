import { useTranslation } from "next-i18next";
import Link from "next/link";
import { Container } from "react-bootstrap";
import { NavbarComponent } from "./Navbar";


export default function Custom404 ()  {
  const { t } = useTranslation("common");

  return (
    <div>
      <NavbarComponent />
      <Container fluid="lg">
        <h1 className="display-3 mt-5 pb-3">{t("404")}</h1>
        <Link href="/shop">
          <a className="btn btn-outline-primary">{t("to_shop")}</a>
        </Link>
      </Container>
    </div>
  );
}