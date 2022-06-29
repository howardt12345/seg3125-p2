import { CartContext, ICartItem } from "@api/cart";
import { Size } from "@lib/product-consts";
import { useTranslation } from "next-i18next";
import { useContext, useState } from "react";
import { Form, InputGroup, Button } from "react-bootstrap";


export const ProductForm = ({ id }: { id: string }) => {
  const { dispatch } = useContext(CartContext);

  const { t } = useTranslation("product");

  const [size, setSize] = useState<Size>();
  const [quantity, setQuantity] = useState(1);

  const [validated, setValidated] = useState(false);

  const submit = (event: any) => {
    event.preventDefault();

    const form = event.currentTarget;
    if (form.checkValidity() === false || !size) {
      event.stopPropagation();
    } else {
      setValidated(true);
      addToCart();
    }

    setValidated(true);
  };

  const addToCart = () => {
    const item = {
      id: id,
      size: size,
      quantity: quantity,
    } as ICartItem;

    dispatch({ type: "add", payload: item });
  };

  return (
    <div>
      <Form
        noValidate
        validated={validated}
        onSubmit={submit}
        className="text-center mt-2"
      >
        <Form.Group controlId="form">
          <Form.Select
            aria-label={t("select-print-size")}
            value={size}
            onChange={(e) => setSize(Size[e.target.value as keyof typeof Size])}
            required
          >
            <option value="">{t("select-print-size")}</option>
            {Object.keys(Size).map((size) => {
              return (
                <option key={size} value={size}>
                  {t(`sizes.${size}`)}
                </option>
              );
            })}
          </Form.Select>
        </Form.Group>

        <InputGroup className="my-3">
          <Button
            variant="outline-primary"
            onClick={() => setQuantity(quantity - 1)}
          >
            -
          </Button>
          <Form.Control
            className="text-center"
            type="number"
            aria-label={t("quantity")}
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            min={1}
            required
          />
          <Button
            variant="outline-primary"
            onClick={() => setQuantity(quantity + 1)}
          >
            +
          </Button>
        </InputGroup>

        <Button variant="outline-primary" type="submit" className="mb-3">
          + Add to Cart
        </Button>
      </Form>
    </div>
  );
};
