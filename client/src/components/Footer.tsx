import {
  Box,
  Container,
  Stack,
  Text,
  HStack,
  IconButton,
  Link as ChakraLink,
  Separator,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { LuGithub, LuTwitter, LuLinkedin, LuInstagram } from "react-icons/lu";

export default function Footer() {
  return (
    <Box
      as="footer"
      bg="bg.panel"
      color="fg.muted"
      borderTop="1px solid"
      borderColor="border.subtle"
      mt="auto"
    >
      <Container maxW="6xl" py={8}>
        <Stack
          direction={{ base: "column", md: "row" }}
          justify="space-between"
          align={{ base: "center", md: "center" }}
          gap={6}
        >

          <Stack gap={1} textAlign={{ base: "center", md: "left" }}>
            <Text fontWeight="bold" fontSize="xl" color="fg">
              My Logo
            </Text>
            <Text fontSize="sm">
              Providing modern e-commerce solutions with the best quality.
            </Text>
          </Stack>

          <HStack gap={6} flexWrap="wrap" justify="center">
            <ChakraLink asChild fontSize="sm" _hover={{ color: "teal.500" }}>
              <Link to="/">Home</Link>
            </ChakraLink>
            <ChakraLink asChild fontSize="sm" _hover={{ color: "teal.500" }}>
              <Link to="/products">Products</Link>
            </ChakraLink>
            <ChakraLink asChild fontSize="sm" _hover={{ color: "teal.500" }}>
              <Link to="/about">About Us</Link>
            </ChakraLink>
            <ChakraLink asChild fontSize="sm" _hover={{ color: "teal.500" }}>
              <Link to="/contact">Contact</Link>
            </ChakraLink>
          </HStack>

          <HStack gap={2}>
            <IconButton aria-label="GitHub" variant="ghost" size="sm" rounded="full">
              <LuGithub />
            </IconButton>
            <IconButton aria-label="Twitter" variant="ghost" size="sm" rounded="full">
              <LuTwitter />
            </IconButton>
            <IconButton aria-label="LinkedIn" variant="ghost" size="sm" rounded="full">
              <LuLinkedin />
            </IconButton>
            <IconButton aria-label="Instagram" variant="ghost" size="sm" rounded="full">
              <LuInstagram />
            </IconButton>
          </HStack>
        </Stack>

        <Separator my={6} borderColor="border.subtle" />

        <Text fontSize="xs" textAlign="center" color="fg.subtle">
          &copy; {new Date().getFullYear()} My Logo. All rights reserved.
        </Text>
      </Container>
    </Box>
  );
}