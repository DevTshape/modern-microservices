import { Flex, Heading, Box, Button, Spacer } from "@chakra-ui/react";
import ThemeToggle from "./ThemeToggle";
import Link from 'next/link'
import { logout } from "../../api/auth";

interface Props {
  isAuthenticated: boolean;
}

const Header = ({isAuthenticated}: Props) => {
  
  return (
    <Flex>
  <Box p="2">
    <Heading size="md"><Link href="/">
      Modern-Microservices
  </Link></Heading>
  </Box>
  <Spacer />
  <Link href="/register">
    <Button colorScheme="teal" mr="4">
      Register
    </Button>
  </Link>
  {isAuthenticated ? <Button colorScheme="teal" mr="4"
    onClick={() => logout()}
  >Log Out</Button> : <Link href="/login">
    <Button colorScheme="teal" mr="4">Log in</Button>
  </Link>}
  
    <ThemeToggle />
  <Box>
  </Box>
</Flex>
  );
};

export default Header;
