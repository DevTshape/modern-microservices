import { Flex, Heading, Box, Button, Spacer } from "@chakra-ui/react";
import ThemeToggle from "./ThemeToggle";
import Link from 'next/link'

interface Props {
  isAuthenticated: boolean;
  logout: () => void;
}

const Header = ({
  isAuthenticated, 
  logout
}: Props) => {
  
  return (
    <Flex>
  <Box p="2">
    <Heading size="md"><Link href="/">
      Modern-Microservices
  </Link></Heading>
  </Box>
  <Spacer />
  
  <Link href="/products">
    Products
  </Link> 
  {isAuthenticated ? 
  <>
  <Link href="/orders">
    Orders
  </Link> 
  <Button colorScheme="teal" mr="4"
    onClick={logout}
  >
    Log Out
  </Button>
  </>
  : 
  <>
  <Link href="/register">
    <Button colorScheme="teal" mr="4">
      Register
    </Button>
  </Link>

  <Link href="/login">
    <Button colorScheme="teal" mr="4">Log in</Button>
  </Link>
  </>
  }
  
    <ThemeToggle />
  <Box>
  </Box>
</Flex>
  );
};

export default Header;
