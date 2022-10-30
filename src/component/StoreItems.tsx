import { Button, Card } from "react-bootstrap";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { FormatCurrency } from "../utils/formatCurrency";

type StoreItemProps = {
  id: number;
  name: string;
  price: number;
  imgUrl: string;
};
export function StoreItems({ id, name, price, imgUrl }: StoreItemProps) {
    const {getItemQuantity, increaseCartQuantity, decreaseQuantity, removeFromCart} = useShoppingCart()
  const quantity = 0;
  return (
    <Card className="h-100">
      <Card.Img
        variant="top"
        src={imgUrl}
        height="200px"
        style={{ objectFit: "cover" }}
      />
      <Card.Body className="d-flex flex-column">
        <Card.Title className="d-flex justify-content-between align-items-baseline mb-4">
          <span className="fs-2">{name}</span>
          <span className="ms-2 text-muted">{FormatCurrency(price)}</span>
        </Card.Title>
        <div className="mt-auto">
          {quantity === 0 ? (
            <Button className="w-100">+ Add to Card</Button>
          ) : (
            <div
              className="d-flex align-items-center flex-column"
              style={{ gap: ".5rem" }}
            >
              {" "}
              <div
                className="d-flex align-item-center justify-content-center"
                style={{ gap: ".rem" }}
              >
                <Button>-</Button>
                <div>
                  <span className="fs-3">{quantity}</span>In cart
                </div>
                <Button>+</Button>
                </div>    
                <Button variant="danger" size="sm">
                  Remove
                </Button>
              </div>
          )}
        </div>
      </Card.Body>
    </Card>
  );
}
