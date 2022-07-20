import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Row, Col } from "react-bootstrap";

const Footer = () => {
  return (
    <Row>
      <Col xs={{span: 10, offset: 1}}>
        <footer className="my-4 text-muted border-top text-center">
          <div className="pt-4">
            <a
              href="https://github.com/howardt12345/seg3125-p1"
              target="_blank"
              rel="noopener noreferrer"
              className="text-decoration-none text-muted"
            >
              &copy; {new Date().getFullYear()} Howard Tseng
            </a>
          </div>
        </footer>
      </Col>
    </Row>
  );
};

export default Footer;
