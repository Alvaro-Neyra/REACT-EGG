import { useRef } from "react";
import CartProductProps from "../interfaces/CartCard";

const CartCard: React.FC<CartProductProps> = ({ id, title, image, description, price, quantity, color }: CartProductProps) => {
    const units = useRef<HTMLInputElement>(null);
    const manageUnits = () => {
      const productsOnCart = JSON.parse(localStorage.getItem("cart") ?? "[]");
      const one = productsOnCart.find((each: CartProductProps) => each.id === id);
      if (one && units.current) {
        one.units = Number(units.current.value);
        localStorage.setItem("cart", JSON.stringify(productsOnCart));
        } else {
        console.error(
        "Producto no encontrado o referencia de unidades no válida"
        );
      }
      };

    return (
    <article className={"w-[680px] items-center"}>
        <img
          className={"w-[100px] h-[100px] rounded-[5px]"}
          src= {image}
          alt= {title}
        />
        <div className={"flex flex-col justify-between gap-[2px] w-[340px] h-[100px]"}>
          <strong className={"text-[20px] font-bold leading-[25px] block break-words"}>{title}</strong>
          <span className={"whitespace-nowrap overflow-hidden text-elipsis"}>- {color}</span>
          <p className={"whitespace-nowrap overflow-hidden text-elipsis"}>
            {description}
          </p>
          <input
            className={"w-[70px] h-[40px] rounded-[10px] border-solid border-[1px] border-lightgray p-[5px]"}
            type="number"
            name="quantity"
            defaultValue={quantity}
            ref={units}
            onChange = {manageUnits}
            min="1"
            id= {id}
          />
        </div>
        <strong className={"w-full text-center"}>AR$ ${price}</strong>
      </article>
    );
}

export default CartCard;