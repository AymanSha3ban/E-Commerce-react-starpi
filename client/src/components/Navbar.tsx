import {
  Flex,
  HStack,
  Link,
  Button,
  Input,
  IconButton,
  Stack,
  Drawer,
  InputGroup,
} from "@chakra-ui/react";

import { useColorMode } from "./ui/color-mode";

import {
  LuSearch,
  LuSun,
  LuMoon,
  LuMenu,
} from "react-icons/lu";

import { useState } from "react";

import {
  Link as RouterLink,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";

export default function Navbar() {
  const { colorMode, toggleColorMode } = useColorMode();

  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  const location = useLocation();

  const [searchParams] = useSearchParams();

  const category = searchParams.get("category");

  const search = searchParams.get("search") || "";

  const links = [
    {
      path: "/dashboard",
      name: "Dashboard",
    },
    {
      path: "/products",
      name: "Products",
    },
    {
      path: "/team",
      name: "Team",
    },
  ];

  // =========================
  // Search
  // =========================

  function handleSearch(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const value = e.target.value;

    const params = new URLSearchParams();

    if (category) {
      params.set("category", category);
    }

    if (value) {
      params.set("search", value);
    }

    navigate(
      `/products${params.toString() ? `?${params.toString()}` : ""}`
    );
  }

  // =========================
  // Active Route
  // =========================

  function isActive(path: string) {
    if (path === "/products") {
      return location.pathname.startsWith("/products");
    }

    return location.pathname === path;
  }

  return (
    <Flex
      as="nav"
      px={{ base: 4, md: 6 }}
      py={3}
      justify="space-between"
      align="center"
      gap={4}
      borderBottom="1px solid"
      borderColor="border.subtle"
      position="sticky"
      top={0}
      zIndex={1000}
      bg="bg.panel"
      backdropFilter="blur(10px)"
    >
      {/* ================= Logo ================= */}

      <Link
        asChild
        fontWeight="bold"
        fontSize={{ base: "lg", md: "xl" }}
        color="teal.400"
        textDecoration="none"
        transition="all 0.2s ease"
        _hover={{
          color: "teal.300",
          transform: "scale(1.03)",
          textDecoration: "none",
        }}
      >
        <RouterLink to="/">
          My Logo
        </RouterLink>
      </Link>

      {/* ================= Search ================= */}

      <InputGroup
        startElement={
          <LuSearch color="gray" />
        }
        maxW={{
          base: "150px",
          sm: "220px",
          md: "320px",
        }}
        flex={1}
        mx={{ base: 0, md: 4 }}
      >
        <Input
          type="text"
          value={search}
          placeholder="Search products..."
          borderRadius="full"
          size="sm"
          variant="subtle"
          onChange={handleSearch}
          _focus={{
            borderColor: "teal.400",
            boxShadow: "0 0 0 1px var(--chakra-colors-teal-400)",
          }}
        />
      </InputGroup>

      {/* ================= Desktop Links ================= */}

      <HStack
        gap={6}
        hideBelow="md"
      >
        {links.map((link) => {
          const active = isActive(link.path);

          return (
            <Link
              key={link.path}
              asChild
              position="relative"
              fontWeight={active ? "600" : "500"}
              color={
                active
                  ? "teal.400"
                  : "fg.muted"
              }
              textDecoration="none"
              transition="all 0.25s ease"
              _hover={{
                color: "teal.400",
                transform: "translateY(-2px)",
                textDecoration: "none",

                _after: {
                  width: "100%",
                },
              }}
              _after={{
                content: '""',
                position: "absolute",
                left: 0,
                bottom: "-6px",
                width: active ? "100%" : "0%",
                height: "2px",
                borderRadius: "full",
                bg: "teal.400",
                transition: "width 0.25s ease",
              }}
            >
              <RouterLink to={link.path}>
                {link.name}
              </RouterLink>
            </Link>
          );
        })}
      </HStack>

      {/* ================= Actions ================= */}

      <HStack gap={2}>
        {/* Theme */}

        <IconButton
          aria-label="Toggle Color Mode"
          onClick={toggleColorMode}
          variant="ghost"
          size="sm"
          rounded="full"
          _hover={{
            bg: "teal.500/10",
            color: "teal.400",
            transform: "rotate(15deg)",
          }}
          transition="all 0.2s ease"
        >
          {colorMode === "light" ? (
            <LuMoon />
          ) : (
            <LuSun />
          )}
        </IconButton>

        {/* Login */}

        <Button
          size="sm"
          colorPalette="teal"
          borderRadius="full"
          hideBelow="sm"
          px={5}
          transition="all 0.2s ease"
          _hover={{
            transform: "translateY(-2px)",
            boxShadow: "lg",
          }}
        >
          Login
        </Button>

        {/* Mobile Menu */}

        <IconButton
          hideFrom="md"
          aria-label="Open Menu"
          onClick={() => setOpen(true)}
          variant="ghost"
          size="sm"
          rounded="full"
          _hover={{
            bg: "teal.500/10",
            color: "teal.400",
          }}
        >
          <LuMenu />
        </IconButton>
      </HStack>

      {/* ================= Mobile Drawer ================= */}

      <Drawer.Root
        open={open}
        onOpenChange={(e) =>
          setOpen(e.open)
        }
        placement="end"
      >
        <Drawer.Backdrop />

        <Drawer.Positioner>
          <Drawer.Content>
            <Drawer.CloseTrigger />

            <Drawer.Header
              borderBottomWidth="1px"
              fontWeight="bold"
            >
              Menu
            </Drawer.Header>

            <Drawer.Body>
              <Stack gap={3} mt={4}>
                {links.map((link) => {
                  const active = isActive(
                    link.path
                  );

                  return (
                    <Link
                      key={link.path}
                      asChild
                      px={4}
                      py={3}
                      borderRadius="lg"
                      fontWeight={
                        active
                          ? "600"
                          : "500"
                      }
                      color={
                        active
                          ? "teal.400"
                          : "fg.muted"
                      }
                      bg={
                        active
                          ? "teal.500/10"
                          : "transparent"
                      }
                      textDecoration="none"
                      transition="all 0.2s ease"
                      _hover={{
                        bg: "teal.500/10",
                        color: "teal.400",
                        transform:
                          "translateX(5px)",
                        textDecoration:
                          "none",
                      }}
                    >
                      <RouterLink
                        to={link.path}
                        onClick={() =>
                          setOpen(false)
                        }
                      >
                        {link.name}
                      </RouterLink>
                    </Link>
                  );
                })}

                {/* Mobile Login */}

                <Button
                  colorPalette="teal"
                  borderRadius="lg"
                  mt={4}
                  onClick={() =>
                    setOpen(false)
                  }
                >
                  Login
                </Button>
              </Stack>
            </Drawer.Body>
          </Drawer.Content>
        </Drawer.Positioner>
      </Drawer.Root>
    </Flex>
  );
}