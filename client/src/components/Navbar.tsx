import { Flex, HStack, Link, Button } from "@chakra-ui/react";

export default function Navbar() {
  return (
    <Flex
      as="nav"
      p='20px'
      justify="space-between"
      align="center"
    >
      <Link fontWeight="bold" href="/">
        My Logo
      </Link>

      <HStack gap={6}>
        <Link href="/">Home</Link>
        <Link href="/products">Products</Link>
        <Link href="/about">About</Link>
        <Button>Login</Button>
      </HStack>
    </Flex>
  );
}