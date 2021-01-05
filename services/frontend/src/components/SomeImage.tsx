import { Box, Link, Text,
  Link as ChakraLink,
 } from "@chakra-ui/react";
import Image from "next/image";
import React from "react";

const SomeImage = () => {
  return (
      <Box marginY={8} maxWidth={400} marginX="auto">
        <Image src="/main-icon.svg" width={400} height={400} />
        <Text textAlign="center" fontSize="xs">
        <ChakraLink href="https://stories.freepik.com/web" isExternal>
          Illustration by Freepik Stories
        </ChakraLink>
      </Text>
      </Box>
  );
};

export default SomeImage;
