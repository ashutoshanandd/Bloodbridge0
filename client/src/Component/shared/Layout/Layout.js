import React from "react";
import { Box, Flex } from "@chakra-ui/react";
import Header from "./Header";
import Sidebar from "./Sidebar";

const Layout = ({ children }) => {
  return (
    <Flex direction="column" h="100vh">
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

      {/* Main Content Area */}
      <Flex flex="1" overflow="hidden">
        {/* Fixed Sidebar */}
        <Box
          as="aside"
          position="fixed"
          top="10vh"
          left={0}
          bottom={0}
          w="250px"
          borderRight="1px solid"
          borderColor="gray.100"
          bg="white"
        >
          <Sidebar />
        </Box>

        {/* Scrollable Content */}
        <Box
          as="main"
          flex="1"
          ml="250px"
          pt={4}
          px={4}
          pb={8}
          minH="90vh"
          overflowY="auto"
        >
          {children}
        </Box>
      </Flex>
    </Flex>
  );
};

export default Layout;