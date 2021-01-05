import { Box } from "@chakra-ui/react";

import Header from "./Header";
import Footer from "./Footer";
import Meta from "./Meta";

interface Props {
  children: any;
  isAuthenticated: boolean;
}

const Layout = ({ children, isAuthenticated }: Props) => {
  return (
    <Box margin="0 auto" maxWidth={1400} transition="0.5s ease-out">
      <Meta />
      <Box margin="8">
        <Header isAuthenticated={isAuthenticated} />
        <Box as="main" marginY={22}>
          {children}
        </Box>
        <Footer />
      </Box>
    </Box>
  );
};

export default Layout;
