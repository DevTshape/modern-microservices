import { Flex, Box, Heading, Button, FormControl, FormLabel, Input } from "@chakra-ui/react";
import React, { useState } from "react";

interface Props {
  loginUser: (email: string, password: string) => void;
}

export default function LoginForm({loginUser}: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleSubmit = event => {
    event.preventDefault();
    loginUser(email, password)
  };
    return (
      <Flex width="full" align="center" justifyContent="center">
      <Box p={2}>
        <Box textAlign="center">
          <Heading>Login</Heading>
        </Box>
        <Box my={4} textAlign="left">
        <form onSubmit={handleSubmit}>
  <FormControl isRequired>
    <FormLabel>Email</FormLabel>
    <Input
      type="email"
      placeholder="test@test.com"
      size="lg"
      onChange={event => setEmail(event.currentTarget.value)}
    />
  </FormControl>
  <FormControl isRequired mt={6}>
    <FormLabel>Password</FormLabel>
    <Input
      type="password"
      placeholder="*******"
      size="lg"
      onChange={event => setPassword(event.currentTarget.value)}
    />
  </FormControl>
  <Button
    colorScheme="teal"
    type="submit"
    width="full"
    mt={4}
  >
    Sign In
  </Button>
</form>
        </Box>
      </Box>
    </Flex>
    );
  }