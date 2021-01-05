import {
  Box,
  Button,
  Flex,
  Image,
  Link,
  useMediaQuery,
  Badge,
  Spacer ,
  Text,
  Link as ChakraLink,
} from "@chakra-ui/react";
import { StarIcon } from '@chakra-ui/icons'

const products = [
  {
    imageUrl: "/product-gallery/1.svg",
    imageAlt: "Analytics",
    title: "Analytics Services",
    formattedPrice: "£12.99",
    reviewCount: 504,
    rating: 4.5,
  },
  {
    imageUrl: "/product-gallery/2.svg",
    imageAlt: "SEO",
    title: "SEO Services",
    formattedPrice: "£5.99",
    reviewCount: 314,
    rating: 3.2,
  },
  {
    imageUrl: "/product-gallery/3.svg",
    imageAlt: "Blob",
    title: "Object Storage Service",
    formattedPrice: "£5.99",
    reviewCount: 34,
    rating: 4,
  }
]

const CTASection = () => {

  return (
    <Flex maxWidth="80%" margin="auto" alignItems="center" justifyContent="space-between" >
    {products.map((p, idx) => (
      <Box maxW="xl"  overflow="hidden" key={idx}>
      <Image src={p.imageUrl} alt={p.imageAlt} />
      <Text textAlign="center" fontSize="xs">
        <ChakraLink href="https://stories.freepik.com/web" isExternal>
          Illustration by Freepik Stories
        </ChakraLink>
      </Text>
      <Box p="6">
        <Box
          mt="1"
          fontWeight="semibold"
          as="h4"
          lineHeight="tight"
          isTruncated
        >
          {p.title}
        </Box>

        <Box>
          {p.formattedPrice}
          <Box as="span" color="gray.600" fontSize="sm">
            / month
          </Box>
        </Box>

        <Box d="flex" mt="2" alignItems="center">
          {Array(5)
            .fill("")
            .map((_, i) => (
              <StarIcon
                key={i}
                color={i < p.rating ? "teal.500" : "gray.300"}
              />
            ))}
          <Box as="span" ml="2" color="gray.600" fontSize="sm">
            {p.reviewCount} reviews
          </Box>
        </Box>

        <Box mt="2">
          <Button colorScheme="teal">
            Buy now
          </Button>
        </Box>
      </Box>
      
    </Box>
    ))}
    </Flex>
  )
}

export default CTASection;
