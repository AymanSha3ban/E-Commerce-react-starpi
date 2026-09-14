import ProductCard from "@/components/ProductCard";
import { Grid } from "@chakra-ui/react";


export default function Products() {
  return (
    <Grid 
        templateColumns="repeat(auto-fill,minmax(250px,1fr))" 
        gap={6} 
        style={{
            padding: "20px",
            margin: "20px",
        }}
    >
        <ProductCard/>
        <ProductCard/>
        <ProductCard/>
        <ProductCard/>
        <ProductCard/>
        <ProductCard/>
        <ProductCard/>
        <ProductCard/>
        <ProductCard/>
        <ProductCard/>
    </Grid>
  )
}
