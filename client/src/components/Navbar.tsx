import {
  Flex,
  HStack,
  Link,
  Button,
  Input,
  IconButton,
  Stack,
  Drawer,
} from "@chakra-ui/react";
import { useColorMode } from "./ui/color-mode";
import { InputGroup } from "@chakra-ui/react";
import { LuSearch, LuSun, LuMoon, LuMenu } from "react-icons/lu";
import { useState } from "react";

export default function Navbar() {
  const { colorMode, toggleColorMode } = useColorMode();
  const [open, setOpen] = useState(false);

  return (
    <Flex
      as="nav"
      p="15px 20px"
      justify="space-between"
      align="center"
      borderBottom="1px solid"
      borderColor="border.subtle"
      position="sticky"
      top={0}
      zIndex={1000}
      bg="bg.panel"
    >
      <Link fontWeight="bold" fontSize="xl" href="/" _hover={{ textDecoration: "none" }}>
        My Logo
      </Link>

      <InputGroup startElement={<LuSearch color="gray.400" />} maxW={{ base: "140px", sm: "220px", md: "300px" }} mx={2}>
        <Input
          type="text"
          placeholder="Search..."
          borderRadius="full"
          size="sm"
          variant="subtle"
        />
      </InputGroup>

      <HStack gap={6} hideBelow="md">
        <Link href="/">Home</Link>
        <Link href="/products">Products</Link>
        <Link href="/about">About</Link>
      </HStack>

      <HStack gap={3}>
        <IconButton
          aria-label="Toggle Color Mode"
          onClick={toggleColorMode}
          variant="ghost"
          size="sm"
          rounded="full"
        >
          {colorMode === "light" ? <LuMoon /> : <LuSun />}
        </IconButton>

        <Button size="sm" colorPalette="teal">
          Login
        </Button>

        <IconButton
          hideFrom="md"
          aria-label="Open Menu"
          onClick={() => setOpen(true)}
          variant="ghost"
          size="sm"
        >
          <LuMenu />
        </IconButton>
      </HStack>

      <Drawer.Root open={open} onOpenChange={(e) => setOpen(e.open)} placement="end">
        <Drawer.Backdrop />
        <Drawer.Positioner>
          <Drawer.Content>
            <Drawer.CloseTrigger />
            <Drawer.Header borderBottomWidth="1px">Menu</Drawer.Header>
            <Drawer.Body>
              <Stack gap={4} mt={4}>
                <Link href="/" onClick={() => setOpen(false)}>Home</Link>
                <Link href="/products" onClick={() => setOpen(false)}>Products</Link>
                <Link href="/about" onClick={() => setOpen(false)}>About</Link>
              </Stack>
            </Drawer.Body>
          </Drawer.Content>
        </Drawer.Positioner>
      </Drawer.Root>
    </Flex>
  );
}