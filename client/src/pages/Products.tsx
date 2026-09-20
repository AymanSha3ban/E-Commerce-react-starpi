import { Grid,Text, Center } from "@chakra-ui/react";
import ProductCard from "@/components/ProductCard";
import type { IProduct } from "@/interfaces/IProduct";
import { getProducts } from "@/api/products/products";
import { useQuery } from "@tanstack/react-query";
import {ProductsSkeleton} from "@/components/Skeletons";
import Categories from "@/components/Categories";
import { useSearchParams } from "react-router-dom";


export default function Products() {
  const [searchParams] = useSearchParams();

  const categoryId = searchParams.get("category");
  const search = searchParams.get("search");

  const { data: products, isLoading, isError, error } = useQuery<IProduct[]>({
    queryKey: ["products" , categoryId , search ],
    queryFn: ()=>getProducts(categoryId ?? undefined , search ?? undefined),
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
          Array.from({length:20} , (_,indx)=><ProductsSkeleton key={indx}/>)
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
  if (products?.length === 0) {
  return (
    <Center h="50vh">
      <Text fontSize="xl">
        No products found
      </Text>
    </Center>
  );
}

  return (
    <>
      <Categories/>
      <Grid
        templateColumns="repeat(auto-fill, minmax(250px, 1fr))"
        gap={6}
        p={6}
        m={6}
      >
        {products?.map((product: IProduct) => (
          <ProductCard key={product.documentId} product={product} />
        ))}
      </Grid>
    </>
  );
}