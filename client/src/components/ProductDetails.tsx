import { getProductsByID } from "@/api/products/products";
import { Box, Button, ButtonGroup, Card, Center, HStack, Image,Text } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { ProductDetailsSkeleton } from "./Skeletons";
import { FaArrowLeft } from "react-icons/fa6";


export default function ProductDetails() {
    const navigate = useNavigate();
    const { id } = useParams();
    const { data: product  , isLoading  , isError } = useQuery({
        queryKey: ['product' , id],
        queryFn: ()=>getProductsByID(String(id)),
    });

    if(isLoading){
        return (
           <Box p={6} m={6}>
            <ProductDetailsSkeleton/>
           </Box>
        )
    }
    if(isError){
        return (
            <Center h="50vh">
                <Text color="red.400">Error : Product not found</Text>
            </Center>
        )
    }
    
return (
  <Box>
    <Button
        size="lg"
        bg="blackAlpha.700"
        color="white"
        borderRadius="xl"
        _hover={{
            bg: "purple.500",
            transform: "translateY(-2px)",
            boxShadow: "lg",
        }}
        transition="all 0.2s ease"
        onClick={()=>navigate(-1)}
    >
        <FaArrowLeft size={20} /> Go Back
    </Button>
    
    <Card.Root
        p={{ base: 4, md: 6 }}
        m={{ base: 4, md: 8 }}
        maxW="full"
        mx="auto"
        border="1px solid"
        borderColor="gray.700"
        borderRadius="2xl"
        bg="gray.900"
        boxShadow="0 10px 40px rgba(0, 0, 0, 0.35)"
        overflow="hidden"
    >
        <HStack
        align="stretch"
        gap={{ base: 6, md: 10 }}
        flexDirection={{ base: "column", md: "row" }}
        >
        <Box
            flex="1"
            display="flex"
            alignItems="center"
            justifyContent="center"
            bg="gray.800"
            borderRadius="xl"
            p={{ base: 4, md: 8 }}
            minH={{ base: "300px", md: "450px" }}
        >
        <Image
            src={
                product?.thumbnail?.url
                ? `${import.meta.env.VITE_SERVER_URL}${product.thumbnail.url}`
                : "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1770&q=80"
            }
            alt={product?.title || "Product Image"}
            maxH="420px"
            w="100%"
            objectFit="contain"
            borderRadius="xl"
            onError={(event) => {
                const target = event.currentTarget as HTMLImageElement;
                target.src = "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1770&q=80";
            }}
        />
        </Box>
        <Card.Body
            flex="1"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            gap={5}
            p={{ base: 2, md: 5 }}
        >
            <Box>
            <Text
                fontSize="sm"
                color="purple.400"
                fontWeight="bold"
                textTransform="uppercase"
                letterSpacing="wide"
                mb={2}
            >
                Product Details
            </Text>

            <Card.Title
                fontSize={{ base: "2xl", md: "4xl" }}
                fontWeight="bold"
                color="white"
            >
                {product?.title}
            </Card.Title>
            </Box>

            <Card.Description
            fontSize={{ base: "md", md: "lg" }}
            lineHeight="1.8"
            color="gray.400"
            >
            {product?.description}
            </Card.Description>

            <Text
            fontSize={{ base: "2xl", md: "4xl" }}
            fontWeight="bold"
            color="purple.400"
            >
            ${product?.price?.toFixed(2)}
            </Text>

            <Box
            h="1px"
            bg="gray.700"
            w="100%"
            />

            <HStack
            justify="space-between"
            align="center"
            w="full"
            >
            <Box>
                <Text
                fontSize="sm"
                color="gray.500"
                mb={1}
                >
                Availability
                </Text>

                <Text
                fontSize="lg"
                fontWeight="semibold"
                color={product?.stock ? "green.400" : "red.400"}
                >
                {product?.stock
                    ? `${product.stock} items in stock`
                    : "Out of stock"}
                </Text>
            </Box>
            </HStack>

            <Button
                size="lg"
                w="full"
                bg="purple.600"
                color="white"
                borderRadius="xl"
                _hover={{
                    bg: "purple.500",
                    transform: "translateY(-2px)",
                    boxShadow: "lg",
                }}
                transition="all 0.2s ease"
                textTransform="uppercase"
            >
            Add to Cart
            </Button>
        </Card.Body>
        </HStack>
    </Card.Root>
  </Box>
);
}