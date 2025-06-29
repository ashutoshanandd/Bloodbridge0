import React from "react";
import { Box, Flex } from "@chakra-ui/react";
import Header from "./Header";

const HomeLayout = ({ children }) => {
  return (
    <Flex direction="column" h="100vh" overflow="hidden">
      {/* Sticky Header */}
      <Box
        as="header"
        position="sticky"
        top={0}
        zIndex="sticky"
        h="10vh"
        flexShrink={0}
        bg="white"
        boxShadow="sm"
      >
        <Header />
      </Box>

      {/* Main Content Area - scrollable but without visible scrollbar */}
      <Flex flex="1" overflow="hidden">
        <Box 
          as="main"
          flex="1"
          p={4}
          minH="90vh"
          overflowY="auto"
          css={{
            '&::-webkit-scrollbar': {
              display: 'none' /* Hide scrollbar for Chrome, Safari, and Opera */
            },
            '-ms-overflow-style': 'none',  /* Hide scrollbar for IE and Edge */
            'scrollbar-width': 'none'  /* Hide scrollbar for Firefox */
          }}
        >
          {children}
        </Box>
      </Flex>
    </Flex>
  );
};

export default HomeLayout;