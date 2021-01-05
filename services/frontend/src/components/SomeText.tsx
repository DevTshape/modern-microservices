import { Box, Heading, Text, useColorMode } from "@chakra-ui/react";

import HelperImage from "./HelperImage";

const SomeText = () => {
  const { colorMode } = useColorMode();

  return (
      <Box
        backgroundColor={colorMode === "light" ? "gray.200" : "gray.500"}
        padding={4}
        borderRadius={4}
        
      >
        <Text>
          Buy our products today!
        </Text>
      </Box>
  );
};

export default SomeText;
