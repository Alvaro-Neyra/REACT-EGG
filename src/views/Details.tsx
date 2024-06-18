import { useParams } from "react-router-dom";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import Hero from "../components/Hero";
import ProductCard from "../components/ProductCard";
import Thumbs from "../components/Thumbs";
import Description from "../components/Description";
import Checkout from "../components/Checkout";
import Product from "../interfaces/Product";
import axios from "axios";
import {useEffect, useState} from "react";



function Details() {
  const { id } = useParams();

  const [product, setProduct] = useState<Product>({
    id: "",
    title: "",
    description: "",
    price: 0,
    quantity: 0,
    images: [],
    colors: [],
    onsale: false
  });

  const [onsale, setOnsale] = useState<Product[]>([]);

  useEffect(() => {
    axios.get("/products.json")
    .then((res) => {
      const products: Product[] = res.data;
      const detailProduct: Product | undefined = products.find((each) => each.id === id);

      detailProduct && setProduct(detailProduct);
      const filterProducts: Array<Product> = products.filter((each) => each.onsale);
      filterProducts.length > 0 && setOnsale(filterProducts);
    })
    .catch((err) => console.log(err));
  },[id]);

  return (
    <>
    <NavBar />
      {!product && <Hero first="NOT" second="found" />}
      <main className="w-full flex justify-center items-center p-[20px]">
        <div className="w-full flex flex-wrap justify-between">
          {product && (
            <div id="details" className="w-full flex justify-center flex-wrap">
              <Thumbs product={product} />
              <Description product={product} />
              <Checkout product={product} />
            </div>
          )}
          <div className="w-full flex flex-col justify-center items-center">
            <h2 className="text-[40px]">Week Sale</h2>
            <div id="product-container" className="flex flex-col md:flex-row flex-wrap items-center justify-between w-full lg:w-[1024px]">
              {onsale.map((each) => (
                <ProductCard
                  key={each.id}
                  id={each.id}
                  title={each.title}
                  price={each.price}
                  color={each.colors[0]}
                  image={each.images[0]}
                />
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default Details;
