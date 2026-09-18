import { Grid, Spinner, Text, Center } from "@chakra-ui/react";
import ProductCard from "@/components/ProductCard";
import type { IProduct } from "@/interfaces/IProduct";
import { getProducts } from "@/api/products/products";
import { useQuery } from "@tanstack/react-query";
import SkeletonComponent from "@/components/Skeleton";
import type { TbRuler2 } from "react-icons/tb";

export default function Products() {
  const { data: products, isLoading, isError, error } = useQuery<IProduct[]>({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  if (isLoading) {
    return (
      <Grid 
        gap={6}
        p={6}
        m={6} templateColumns="repeat(auto-fill, minmax(250px, 1fr))" 
        margin={30}
      >
        {
          Array.from({length:20} , (_,indx)=><SkeletonComponent key={indx}/>)
        }
      </Grid>
    );
  }

  if (isError) {
    return (
      <Center h="50vh">
        <Text color="red.400">Error :{(error as Error).message}</Text>
      </Center>
    );
  }

  return (
    <Grid
      templateColumns="repeat(auto-fill, minmax(250px, 1fr))"
      gap={6}
      p={6}
      m={6}
    >
      {products?.map((product: IProduct) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </Grid>
  );
}