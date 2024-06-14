import Product from "../interfaces/Product";

export default interface ProductCart extends Product{
    key: number;
    units: number;
}