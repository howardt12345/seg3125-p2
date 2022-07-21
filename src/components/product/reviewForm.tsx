import { useTranslation } from "next-i18next";
import { SetStateAction, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import StarRatingComponent from "react-star-rating-component";
import { faStar as FaStarSolid } from "@fortawesome/free-solid-svg-icons";
import { faStar as FaStarEmpty } from "@fortawesome/free-regular-svg-icons";
import { faStarHalfStroke } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const ReviewForm = () => {
  const { t } = useTranslation(["common", "product"]);

  const [validated, setValidated] = useState(false);
  const [rating, setRating] = useState(3);
  const [show, setShow] = useState(false);

  const submit = (event: any) => {
    event.preventDefault();

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      setValidated(true);
      handleOpen();
    }
    setValidated(true);
  };

  const handleOpen = () => setShow(true);

  const handleClose = () => setShow(false);

  return (
    <div>
      <h3 className="mt-2 pb-2 fw-normal border-bottom">
        {t("product:submit_review")}
      </h3>
      <Form
        noValidate
        validated={validated}
        onSubmit={submit}
        className="text-center mt-3"
      >
        <Form.Group controlId="form" className="mb-3">
          <Form.Control
            aria-label={t("product:review_name")}
            placeholder={t("product:review_name")}
            required
            type="text"
            name="name"
          />
          <Form.Control.Feedback type="invalid">
            {t("review_name_required")}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="form" className="mb-2">
          <Form.Control
            aria-label={t("product:review_email")}
            placeholder={t("product:review_email")}
            required
            type="email"
            name="email"
          />
          <Form.Control.Feedback type="invalid">
            {t("product:review_email_required")}
          </Form.Control.Feedback>
        </Form.Group>
        <StarRatingComponent
          name="app6"
          starColor="#ffb400"
          emptyStarColor="#ffb400"
          value={rating}
          onStarClick={(rating: SetStateAction<number>) => setRating(rating)}
          renderStarIcon={(index: number, value: number) => {
            return (
              <span>
                <FontAwesomeIcon
                  icon={index <= value ? FaStarSolid : FaStarEmpty}
                />
              </span>
            );
          }}
          renderStarIconHalf={() => {
            return (
              <span>
                <span style={{ position: "absolute" }}>
                  <FontAwesomeIcon icon={FaStarEmpty} />
                </span>
                <span>
                  <FontAwesomeIcon icon={faStarHalfStroke} />
                </span>
              </span>
            );
          }}
        />
        <Form.Group controlId="form" className="mb-3 mt-2">
          <Form.Control
            aria-label={t("product:review_message")}
            placeholder={t("product:review_message")}
            required
            as="textarea"
            rows={5}
            name="message"
          />
          <Form.Control.Feedback type="invalid">
            {t("product:review_message_required")}
          </Form.Control.Feedback>
        </Form.Group>
        <Button variant="outline-primary" type="submit">
          {t("product:review_submit")}
        </Button>
      </Form>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{t("product:thank_you_for_review")}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{t("product:review_notice")}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-primary" onClick={handleClose}>
            {t("close")}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
