// import React from "react";
// import { BiDonateBlood, BiUserCircle } from "react-icons/bi";
// import { replace, useNavigate } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
// import { Box, Flex, HStack, Text, Button, Icon, Badge } from "@chakra-ui/react";
// import { FaDroplet, FaHandHoldingDroplet } from "react-icons/fa6";
// import { logout } from "../../../Redux/features/auth/authSlice";

// const Header = () => {
//   const { user } = useSelector((state) => state.auth);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   // Logout handler
//   const handleLogout = () => {
//     dispatch(logout());
//     localStorage.clear();
//     alert("Logged out successfully!");
//     navigate("/");
//   };

//   return (
//     <Box
//       as="nav"
//       className="bg-[#cf0808]"
//       px={4}
//       h={"100%"}
//       display={"flex"}
//       alignItems={"center"}
//       shadow="md"
//       position="sticky"
//       top={0}
//       zIndex={1}
//     >
//       <Flex
//         minW="100%"
//         justify="space-between"
//         align="center"
//         maxW="container.lg"
//         color="white"
//       >
        
       
//           <HStack
//             spacing={2}
//             cursor="pointer"
//             onClick={() => navigate("/", { replace: true })}
//           >
//             <FaHandHoldingDroplet className="text-4xl" />
//             <Text fontSize="4xl" fontWeight="bold">
//               Blood Bridge
//             </Text>

//           </HStack>
//           {user !== null ? (
//               <HStack spacing={3}>
//                 <Icon as={BiUserCircle} boxSize={6} />
//                 <Text fontSize="md">
//                   Welcome,{" "}
//                   <Text as="span" fontWeight="bold">
//                     {user?.name || user?.hospitalName || user?.organisationName}
//                   </Text>
//                 </Text>
//                 <Badge
//                   ml={2}
//                   rounded={"md"}
//                   p={1}
//                   colorScheme="red"
//                   fontSize="sm"
//                 >
//                   {user?.role}
//                 </Badge>
//                 <Button
//                   size="sm"
//                   colorScheme="whiteAlpha"
//                   variant="solid"
//                   color="red.600"
//                   bg="white"
//                   _hover={{ bg: "gray.200" }}
//                   onClick={handleLogout}
//                 >
//                   Logout
//                 </Button>
//               </HStack>
//             ) : (
//               <Button
//                 size="sm"
//                 colorScheme="whiteAlpha"
//                 variant="solid"
//                 color="red.600"
//                 bg="white"
//                 _hover={{ bg: "gray.200" }}
//                 onClick={() => navigate("/login")}
//               >
//                 Login
//               </Button>
//             )}
      
//         {/* Brand Section */}
//       </Flex>
//     </Box>
//   );
// };

// export default Header;
import React from "react";
import { BiDonateBlood, BiUserCircle } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Box, Flex, HStack, Text, Button, Icon, Badge, Avatar, useColorModeValue } from "@chakra-ui/react";
import { FaHandHoldingDroplet } from "react-icons/fa6";
import { logout } from "../../../Redux/features/auth/authSlice";

const Header = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // Color values
  const bgColor = useColorModeValue("red.600", "red.700");
  const buttonBg = useColorModeValue("white", "gray.100");
  const buttonHoverBg = useColorModeValue("gray.100", "gray.200");
  const buttonColor = useColorModeValue("red.600", "red.700");

  // Logout handler
  const handleLogout = () => {
    dispatch(logout());
    localStorage.clear();
    alert("Logged out successfully!");
    navigate("/");
  };

  return (
    <Box
      as="nav"
      bg={bgColor}
px={4}
      py={3}
      height={"10vh"}
      shadow="md"
      position="sticky"
      top={0}
      zIndex="sticky"
    >
      <Flex
        w="100%"
        justify="space-between"
        align="center"
      
        mx="auto"
        color="white"
      >
        {/* Brand Section */}
        <HStack
          spacing={3}
          cursor="pointer"
          onClick={() => navigate("/")}
          _hover={{ transform: "scale(1.02)" }}
          transition="transform 0.2s"
        >
          <Icon as={FaHandHoldingDroplet} boxSize={8} />
          <Text fontSize={{ base: "2xl", md: "3xl" }} fontWeight="extrabold" letterSpacing="wide">
            Blood Bridge
          </Text>
        </HStack>

        {/* User Section */}
        {user ? (
          <HStack spacing={4}>
            <HStack spacing={2}>
              <Avatar 
                size="sm" 
                icon={<BiUserCircle />} 
                bg="whiteAlpha.800"
                color="red.600"
              />
              <Box textAlign="left">
                <Text fontSize="sm" fontWeight="medium">
                  {user?.name || user?.hospitalName || user?.organisationName}
                </Text>
                <Badge 
                  colorScheme="whiteAlpha" 
                  color="white"
                  variant="subtle"
                  fontSize="xs"
                >
                  {user?.role.toUpperCase()}
                </Badge>
              </Box>
            </HStack>
            <Button
              size="sm"
              color={buttonColor}
              bg={buttonBg}
              _hover={{ bg: buttonHoverBg }}
              onClick={handleLogout}
              fontWeight="semibold"
              borderRadius="md"
            >
              Logout
            </Button>
          </HStack>
        ) : (
          <Button
            size="sm"
            color={buttonColor}
            bg={buttonBg}
            _hover={{ bg: buttonHoverBg }}
            onClick={() => navigate("/login")}
            fontWeight="semibold"
            borderRadius="md"
          >
            Login 
          </Button>
        )}
      </Flex>
    </Box>
  );
};

export default Header;