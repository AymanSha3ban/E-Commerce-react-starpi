import { getCategories } from "@/api/categories/category";
import { CategoriesSkeleton } from "@/components/Skeletons";
import type { ICategory } from "@/interfaces/ICategory";

import {
  Center,
  Flex,
  Grid,
  Link,
  Text,
} from "@chakra-ui/react";

import { useQuery } from "@tanstack/react-query";

import {
  Link as RouterLink,
  useSearchParams,
} from "react-router-dom";

export default function Categories() {
  const {
    data: categories,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  const [searchParams] = useSearchParams();

  const activeCategory = searchParams.get("category");

  if (isLoading) {
    return (
      <Grid
        gap={6}
        p={6}
        m={6}
        templateColumns="repeat(auto-fill, minmax(250px, 1fr))"
        margin={30}
      >
        {Array.from(
          { length: 20 },
          (_, indx) => (
            <CategoriesSkeleton key={indx} />
          )
        )}
      </Grid>
    );
  }

  if (isError) {
    return (
      <Center h="50vh">
        <Text color="red.400">
          Error: {(error as Error).message}
        </Text>
      </Center>
    );
  }

  return (
    <Flex
      justify="center"
      align="center"
      gap={3}
      wrap="wrap"
      px={{ base: 3, md: 6 }}
      py={5}
      mb={6}
      borderBottom="1px solid"
      borderColor="gray.700"
    >
      {/* ALL */}
      <Link
        asChild
        px={{ base: 4, md: 6 }}
        py={2.5}
        borderRadius="full"
        fontWeight="600"
        fontSize={{ base: "sm", md: "md" }}
        textDecoration="none"
        bg={!activeCategory ? "teal.500" : "transparent"}
        color={!activeCategory ? "white" : "gray.300"}
        border="1px solid"
        borderColor={
          !activeCategory
            ? "teal.500"
            : "gray.600"
        }
        transition="all 0.25s ease"
        _hover={{
          bg: "teal.500",
          color: "white",
          borderColor: "teal.500",
          transform: "translateY(-2px)",
          boxShadow: "0 6px 18px rgba(20, 184, 166, 0.25)",
          textDecoration: "none",
        }}
      >
        <RouterLink to="/products">
          ALL
        </RouterLink>
      </Link>

      {/* Categories */}
      {categories?.map((category: ICategory) => {
        const isActive =
          activeCategory === String(category.id);

        return (
          <Link
            key={category.id}
            asChild
            px={{ base: 4, md: 6 }}
            py={2.5}
            borderRadius="full"
            fontWeight="600"
            fontSize={{ base: "sm", md: "md" }}
            letterSpacing="0.3px"
            textDecoration="none"
            bg={isActive ? "teal.500" : "transparent"}
            color={isActive ? "white" : "gray.300"}
            border="1px solid"
            borderColor={
              isActive
                ? "teal.500"
                : "gray.600"
            }
            transition="all 0.25s ease"
            _hover={{
              bg: "teal.500",
              color: "white",
              borderColor: "teal.500",
              transform: "translateY(-2px)",
              boxShadow:
                "0 6px 18px rgba(20, 184, 166, 0.25)",
              textDecoration: "none",
            }}
          >
            <RouterLink
              to={`/products?category=${category.id}`}
            >
              {category.title.toUpperCase()}
            </RouterLink>
          </Link>
        );
      })}
    </Flex>
  );
}