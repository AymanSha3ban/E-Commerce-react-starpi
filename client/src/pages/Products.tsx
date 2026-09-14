import { useEffect, useState } from "react";
import axios from "axios";
import { Grid } from "@chakra-ui/react";
import ProductCard from "@/components/ProductCard";
import type { IProduct } from "@/interfaces/IProduct";

export default function Products() {
  const [products, setProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:1337/api/products")
      .then((response) => {
        console.log("Data fetched:", response.data.data);
        setProducts(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <Grid
      templateColumns="repeat(auto-fill, minmax(250px, 1fr))"
      gap={6}
      p={6}
      m={6}
    >
      {products.map((product: IProduct) => (
        <ProductCard key={product.id} {...product} />
      ))}
    </Grid>
  );
}