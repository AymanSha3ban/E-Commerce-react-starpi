import { getProductsByID } from "@/api/products/products";
import {
  Box,
  Button,
  Card,
  Center,
  HStack,
  Image,
  Text,
  Badge,
  IconButton,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { ProductDetailsSkeleton } from "./Skeletons";
import { LuArrowLeft, LuMinus, LuPlus, LuShoppingCart } from "react-icons/lu";
import { useState } from "react";

export default function ProductDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);

  const {
    data: product,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["product", id],
    queryFn: () => getProductsByID(String(id)),
  });

  if (isLoading) {
    return (
      <Box p={6} maxW="7xl" mx="auto">
        <ProductDetailsSkeleton />
      </Box>
    );
  }

  if (isError || !product) {
    return (
      <Center h="60vh">
        <Text color="red.500" fontSize="lg" fontWeight="semibold">
          Error: Product not found
        </Text>
      </Center>
    );
  }

  const imageUrl = product?.thumbnail?.url
    ? `${import.meta.env.VITE_SERVER_URL}${product.thumbnail.url}`
    : "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1770&q=80";

  return (
    <Box maxW="6xl" mx="auto" p={{ base: 4, md: 8 }}>
      <Button
        variant="subtle"
        size="md"
        mb={6}
        borderRadius="lg"
        onClick={() => navigate(-1)}
      >
        <LuArrowLeft /> Go Back
      </Button>

      <Card.Root
        p={{ base: 4, md: 8 }}
        border="1px solid"
        borderColor="border.subtle"
        borderRadius="2xl"
        bg="bg.panel"
        boxShadow="md"
        overflow="hidden"
      >
        <HStack
          align="stretch"
          gap={{ base: 6, md: 10 }}
          flexDirection={{ base: "column", md: "row" }}
        >
          {/* قسم الصورة */}
          <Box
            flex="1"
            display="flex"
            alignItems="center"
            justifyContent="center"
            bg="bg.muted"
            borderRadius="xl"
            p={{ base: 4, md: 8 }}
            minH={{ base: "280px", md: "400px" }}
          >
            <Image
              src={imageUrl}
              alt={product?.title || "Product Image"}
              maxH="400px"
              w="100%"
              objectFit="contain"
              borderRadius="xl"
              transition="transform 0.3s ease"
              _hover={{ transform: "scale(1.03)" }}
              onError={(event) => {
                const target = event.currentTarget as HTMLImageElement;
                target.src =
                  "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1770&q=80";
              }}
            />
          </Box>

          {/* قسم التفاصيل */}
          <Card.Body
            flex="1"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            gap={5}
            p={0}
          >
            <Box>
              <Badge colorPalette="teal" size="sm" mb={2} variant="subtle">
                Product Details
              </Badge>

              <Card.Title
                fontSize={{ base: "2xl", md: "3xl" }}
                fontWeight="bold"
              >
                {product?.title}
              </Card.Title>
            </Box>

            <Card.Description
              fontSize="md"
              lineHeight="relaxed"
              color="fg.muted"
            >
              {product?.description ||
                "No description available for this product."}
            </Card.Description>

            <Text
              fontSize={{ base: "2xl", md: "3xl" }}
              fontWeight="bold"
              color="teal.600"
              _dark={{ color: "teal.300" }}
            >
              ${product?.price ? product.price.toFixed(2) : "0.00"}
            </Text>

            <Box h="1px" bg="border.subtle" w="100%" />

            {/* المخزون والتحكم بالكمية */}
            <HStack justify="space-between" align="center" w="full" wrap="wrap" gap={4}>
              <Box>
                <Text fontSize="xs" color="fg.muted" mb={1}>
                  Availability
                </Text>
                <Text
                  fontSize="md"
                  fontWeight="semibold"
                  color={product?.stock ? "green.500" : "red.500"}
                >
                  {product?.stock
                    ? `${product.stock} items in stock`
                    : "Out of stock"}
                </Text>
              </Box>

              {/* أزرار زيادة ونقصان الكمية */}
              <HStack gap={2} bg="bg.muted" p={1} borderRadius="lg">
                <IconButton
                  aria-label="Decrease quantity"
                  size="xs"
                  variant="ghost"
                  onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                  disabled={quantity <= 1}
                >
                  <LuMinus />
                </IconButton>
                <Text fontWeight="semibold" px={2} fontSize="sm">
                  {quantity}
                </Text>
                <IconButton
                  aria-label="Increase quantity"
                  size="xs"
                  variant="ghost"
                  onClick={() => setQuantity((prev) => prev + 1)}
                  disabled={Boolean(product?.stock && quantity >= product.stock)}
                >
                  <LuPlus />
                </IconButton>
              </HStack>
            </HStack>

            {/* زر الإضافة للسلة */}
            <Button
              size="lg"
              w="full"
              colorPalette="teal"
              variant="solid"
              borderRadius="xl"
              disabled={!product?.stock}
              transition="all 0.2s ease"
            >
              <LuShoppingCart /> Add to Cart
            </Button>
          </Card.Body>
        </HStack>
      </Card.Root>
    </Box>
  );
}