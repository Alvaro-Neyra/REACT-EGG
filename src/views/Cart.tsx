import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import Hero from "../components/Hero";
import CartCard from "../components/CartCard";
import CartResume from "../components/CartResume";
import { useEffect, useState } from "react";
import Product from "../interfaces/ProductCart";

function Cart() {
  const [productsOnCart, setProductsOnCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
    });

  useEffect(() => {
    const cartData = localStorage.getItem("cart");
    if (cartData) {
      setProductsOnCart(JSON.parse(cartData));
    }
  }, []);

  return (
    <>
      <NavBar />
      <Hero first="mi" second="carrito" />
      <main className={"w-[100%] flex justify-center items-center p-[20px]"}>
        {productsOnCart.map((eachProduct: Product) => (
                <CartCard
                key={eachProduct.id}
                id={eachProduct.id}
                title={eachProduct.title}
                image={eachProduct.images[0]}
                description={eachProduct.description}
                price={eachProduct.price}
                quantity={eachProduct.units}
                color={eachProduct.colors[0]}
              />
        ))};
        <CartResume total="90" />
      </main>
      <Footer />
    </>
  );
}

export default Cart;
