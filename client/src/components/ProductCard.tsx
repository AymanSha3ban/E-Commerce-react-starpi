import { Button, Card, Image, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import type { IProduct } from "@/interfaces/IProduct";

export default function ProductCard({ product }: { product: IProduct }) {
  const imageUrl = product?.thumbnail?.url
    ? `${import.meta.env.VITE_SERVER_URL}${product.thumbnail.url}`
    : "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80";

  return (
    <Card.Root
      overflow="hidden"
      pt="6"
      bg="bg.panel"
      border="1px solid"
      borderColor="border.subtle"
      borderRadius="xl"
      boxShadow="sm"
      transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
      _hover={{
        transform: "translateY(-6px)",
        boxShadow: "lg",
        borderColor: "teal.500",
        bg: "bg.muted",
      }}
    >
      <Image
        src={imageUrl}
        alt={product?.title || "Product image"}
        boxSize="180px"
        mx="auto"
        rounded="full"
        objectFit="cover"
        transition="transform 0.3s ease"
        _hover={{ transform: "scale(1.05)" }}
      />

      <Card.Body gap="2" p="4">
        <Card.Title
          textAlign="center"
          fontSize="lg"
          fontWeight="semibold"
          lineClamp={1}
        >
          {product?.title || "Product Name"}
        </Card.Title>

        <Card.Description
          fontSize="sm"
          textAlign="center"
          color="fg.muted"
          lineClamp={2}
        >
          {product?.description || "High quality product built for modern needs and everyday comfort."}
        </Card.Description>

        <Text
          textStyle="xl"
          fontWeight="bold"
          mt="2"
          textAlign="center"
          color="teal.600"
          _dark={{ color: "teal.300" }}
        >
          ${product?.price ?? 0}
        </Text>
      </Card.Body>

      <Card.Footer p="4" pt="0">
        <Button
          asChild
          colorPalette="teal"
          variant="solid"
          w="full"
          borderRadius="md"
          transition="all 0.2s ease"
        >
          <Link to={`/products/${product?.documentId || ""}`}>
            View Details
          </Link>
        </Button>
      </Card.Footer>
    </Card.Root>
  );
}