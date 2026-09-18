import { Button, Card, Image, Text } from "@chakra-ui/react"
import {Link} from "react-router-dom"
import type { IProduct } from "@/interfaces/IProduct";

export default function ProductCard({product}:{product:IProduct}) {
  return (
    <Card.Root 
        overflow="hidden" pt='6'
        backdropFilter="blur(12px)"
        border="1px solid"
        borderColor="rgba(255, 255, 255, 0.2)"
        boxShadow="0 8px 32px 0 rgba(109, 92, 92, 0.37)"
        borderRadius="xl"
        transition="all 0.3s ease" 
        _hover={{
            transform: "translateY(-5px)", 
            boxShadow: "xl",
            bg: "gray.800",
            borderColor: "purple.400",
        }}
    >
      <Image
        src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
        alt="Green double couch with wooden legs"
        boxSize="200px"
        mx="auto"
        rounded="full"
        objectFit="cover"
      />
      <Card.Body gap="2">
        <Card.Title 
            textAlign="center"
            borderRadius='sm'
        >
         {product?.title || "Product Name"}  
        </Card.Title>
        <Card.Description 
            fontSize="sm"
            textAlign="center"
        >
          This sofa is perfect for modern tropical spaces, baroque inspired
          spaces.
        </Card.Description>
        <Text textStyle="2xl" fontWeight="medium" letterSpacing="tight" mt="2" textAlign="center">
          {`${product?.price}$` || 0}
        </Text>
      </Card.Body>
      <Card.Footer gap="2">
        <Button 
            asChild
            variant="solid"
            w="full"
            transition="all 0.2s ease"
            _hover={{
                bg: "purple.600",
                transform: "translateY(-2px)",
                boxShadow: "md",
                color: "white",
            }}
        >
           <Link to="/product/1">View Details</Link>
        </Button>
      </Card.Footer>
    </Card.Root>
  )
}
