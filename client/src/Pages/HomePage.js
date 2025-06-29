// import React, { useState, useEffect } from "react";
import {
  Box,
  Heading,
  Text,
  Button,
  Flex,
  Grid,
  Icon,
  useBreakpointValue,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Badge,
  Stack,
  Progress,
  AspectRatio,
  SimpleGrid,
  useColorModeValue,
  IconButton,
  Avatar,
  Container,
} from "@chakra-ui/react";
import {
  FaHeartbeat,
  FaSyringe,
  FaUsers,
  FaArrowRight,
  FaArrowLeft,
} from "react-icons/fa";
import { GiBlood, GiDrop } from "react-icons/gi";
import { MdHealthAndSafety, MdEvent, MdLocationOn } from "react-icons/md";
import { IoMdTime } from "react-icons/io";
import HomeLayout from "../Component/shared/Layout/HomeLayout";
import { useNavigate } from "react-router-dom";
import Carousel from "./Admin/Carousel";
import moment from "moment";
import { motion } from "framer-motion";
import { useState,useEffect } from "react";

const MotionBox = motion(Box);
const MotionFlex = motion(Flex);

const HomePage = () => {
  const buttonSize = useBreakpointValue({ base: "md", md: "lg" });
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [activeSlide, setActiveSlide] = useState(0);
  const [bloodDemand, setBloodDemand] = useState([]);
  const bgColor = useColorModeValue("gray.50", "gray.800");
  const cardBg = useColorModeValue("white", "gray.700");

  // Fetch blood demand data
  useEffect(() => {
    const fetchBloodDemand = async () => {
      const data = [
        { type: "O+", demand: 78, supply: 45 },
        { type: "A+", demand: 65, supply: 38 },
        { type: "B+", demand: 42, supply: 28 },
        { type: "AB+", demand: 15, supply: 8 },
        { type: "O-", demand: 22, supply: 12 },
        { type: "A-", demand: 18, supply: 10 },
        { type: "B-", demand: 12, supply: 7 },
        { type: "AB-", demand: 5, supply: 3 },
      ];
      setBloodDemand(data);
    };

    fetchBloodDemand();
  }, []);

  const imageUrls = [
    "./assets/images/download (1).jpeg",
    "./assets/images/WhatsApp Image 2024-12-05 at 14.44.56_8f69cc54.jpg",
    "./assets/images/WhatsApp Image 2024-12-05 at 14.46.26_3b2bb634.jpg",
    "./assets/images/download (3).jpeg",
    "./assets/images/download.jpeg",
    "./assets/images/images (1).jpeg",
    "./assets/images/images.jpeg",
  ];

  const upcomingEvents = [
    {
      title: "Community Blood Drive",
      date: "2023-06-15",
      location: "City Center",
      time: "10:00 AM - 4:00 PM",
    },
    {
      title: "Emergency Blood Donation",
      date: "2023-06-20",
      location: "Main Hospital",
      time: "9:00 AM - 5:00 PM",
    },
    {
      title: "Blood Donation Camp",
      date: "2023-06-25",
      location: "University Campus",
      time: "11:00 AM - 3:00 PM",
    },
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Regular Donor",
      content:
        "Donating blood is the easiest way to save lives. I've been donating for 5 years and it's become a rewarding habit.",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
      name: "Michael Chen",
      role: "Blood Recipient",
      content:
        "Thanks to generous donors, I received the blood I needed after my accident. You're all heroes!",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      name: "Dr. Lisa Rodriguez",
      role: "Hematologist",
      content:
        "Every donation makes a difference in our ability to treat patients. We're grateful for each donor.",
      avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    },
  ];

  return (
    <HomeLayout>
      {/* Hero Section */}
      <Box
        position="relative"
        minH={{ base: "80vh", md: "90vh" }}
        display="flex"
        alignItems="center"
        justifyContent="center"
        bgGradient="linear(to-r, red.600, red.700)"
        overflow="hidden"
      >
        {/* Animated blood drops */}
        <Box position="absolute" inset={0} overflow="hidden">
          {[...Array(15)].map((_, i) => (
            <MotionBox
              key={i}
              position="absolute"
              w={{ base: "30px", md: "50px" }}
              h={{ base: "30px", md: "50px" }}
              borderRadius="50%"
              bg="whiteAlpha.200"
              initial={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                scale: `${0.5 + Math.random()}`,
              }}
              animate={{
                y: "-100vh",
                rotate: 360,
                opacity: 0,
              }}
              transition={{
                duration: 10 + Math.random() * 20,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          ))}
        </Box>

        <Box position="absolute" inset={0} bg="blackAlpha.400" zIndex={0} />
        <Container maxW="container.xl" zIndex={1}>
          <MotionFlex
            direction="column"
            align="center"
            textAlign="center"
            color="white"
            px={4}
            py={16}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Badge
              variant="solid"
              colorScheme="whiteAlpha"
              px={4}
              py={1}
              borderRadius="full"
              mb={6}
              fontSize="md"
              fontWeight="medium"
            >
              Join the Lifesaving Community
            </Badge>
            <Heading
              as="h1"
              size={{ base: "2xl", md: "3xl" }}
              mb={6}
              lineHeight="1.2"
              textShadow="0 2px 4px rgba(0,0,0,0.2)"
            >
              <Box as="span" display="inline-flex" alignItems="center">
                <Icon as={GiBlood} mr={3} />
                Every Drop Creates
                <Text as="span" color="red.100" ml={2}>
                  Ripples of Hope
                </Text>
              </Box>
            </Heading>
            <Text
              fontSize={{ base: "lg", md: "xl" }}
              mb={8}
              maxW="2xl"
              opacity={0.9}
            >
              Your single donation can save up to three lives. Join thousands of
              heroes who make a difference every day.
            </Text>
            <Flex gap={4} wrap="wrap" justify="center">
              <MotionBox
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  colorScheme="whiteAlpha"
                  size={buttonSize}
                  rightIcon={<FaHeartbeat />}
                  onClick={() => navigate("/register")}
                  px={8}
                  py={6}
                  fontSize="lg"
                  fontWeight="semibold"
                  boxShadow="lg"
                >
                  Become a Donor
                </Button>
              </MotionBox>
              <MotionBox
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  colorScheme="white"
                  color="red.600"
                  size={buttonSize}
                  rightIcon={<MdHealthAndSafety />}
                  onClick={onOpen}
                  px={8}
                  py={6}
                  fontSize="lg"
                  fontWeight="semibold"
                  boxShadow="lg"
                >
                  View Blood Needs
                </Button>
              </MotionBox>
            </Flex>
          </MotionFlex>
        </Container>
      </Box>

      {/* Blood Demand Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="xl" isCentered>
        <ModalOverlay backdropFilter="blur(5px)" />
        <ModalContent borderRadius="2xl" overflow="hidden" boxShadow="2xl">
          <ModalHeader bg="red.600" color="white" py={6}>
            <Flex align="center">
              <Icon as={GiBlood} mr={3} boxSize={6} />
              <Heading size="lg">Current Blood Needs</Heading>
            </Flex>
          </ModalHeader>
          <ModalCloseButton color="white" size="lg" />
          <ModalBody p={6}>
            <Stack spacing={6}>
              {bloodDemand.map((bloodType) => (
                <Box key={bloodType.type}>
                  <Flex justify="space-between" mb={2} align="center">
                    <Text fontWeight="bold" fontSize="lg">
                      {bloodType.type}
                    </Text>
                    <Badge
                      colorScheme={
                        bloodType.supply >= bloodType.demand ? "green" : "red"
                      }
                      px={3}
                      py={1}
                      borderRadius="full"
                      fontSize="sm"
                    >
                      {Math.round((bloodType.supply / bloodType.demand) * 100)}%
                      Met
                    </Badge>
                  </Flex>
                  <Progress
                    value={(bloodType.supply / bloodType.demand) * 100}
                    colorScheme={
                      bloodType.supply >= bloodType.demand ? "green" : "red"
                    }
                    size="lg"
                    borderRadius="full"
                    height="10px"
                  />
                  <Flex justify="space-between" mt={2}>
                    <Text fontSize="sm" color="gray.600">
                      Needed: {bloodType.demand} units
                    </Text>
                    <Text fontSize="sm" color="gray.600">
                      Available: {bloodType.supply} units
                    </Text>
                  </Flex>
                </Box>
              ))}
            </Stack>
            <Button
              colorScheme="red"
              mt={8}
              w="full"
              size="lg"
              py={6}
              fontSize="lg"
              onClick={() => {
                onClose();
                navigate("/register");
              }}
              rightIcon={<FaHeartbeat />}
              boxShadow="md"
            >
              Register to Help
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>

      {/* Impact Section */}
      <Box py={20} bg={bgColor}>
        <Container maxW="container.xl">
          <MotionFlex
            direction="column"
            align="center"
            textAlign="center"
            mb={16}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Badge
              colorScheme="red"
              px={4}
              py={2}
              borderRadius="full"
              mb={4}
              fontSize="md"
              fontWeight="medium"
              variant="subtle"
            >
              Our Impact
            </Badge>
            <Heading size="xl" mb={4}>
              Together We're <Text as="span" color="red.500">Saving Lives</Text>
            </Heading>
            <Text maxW="2xl" fontSize="lg" color="gray.600">
              Join our growing community of lifesavers making a real difference
            </Text>
          </MotionFlex>

          <Grid
            templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }}
            gap={8}
            w="full"
          >
            {[
              {
                number: "10,000+",
                label: "Lives Saved",
                icon: FaHeartbeat,
                color: "red.500",
              },
              {
                number: "5,000+",
                label: "Active Donors",
                icon: FaUsers,
                color: "red.400",
              },
              {
                number: "200+",
                label: "Monthly Donations",
                icon: FaSyringe,
                color: "red.600",
              },
            ].map((stat, index) => (
              <MotionBox
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Flex
                  direction="column"
                  align="center"
                  p={8}
                  bg={cardBg}
                  borderRadius="2xl"
                  boxShadow="sm"
                  height="100%"
                  transition="all 0.3s"
                  _hover={{
                    transform: "translateY(-5px)",
                    boxShadow: "lg",
                  }}
                >
                  <Flex
                    w="70px"
                    h="70px"
                    bg={`${stat.color}20`}
                    color={stat.color}
                    borderRadius="full"
                    align="center"
                    justify="center"
                    mb={6}
                  >
                    <Icon as={stat.icon} boxSize={8} />
                  </Flex>
                  <Text
                    fontSize="4xl"
                    fontWeight="bold"
                    color={stat.color}
                    mb={2}
                  >
                    {stat.number}
                  </Text>
                  <Text fontSize="lg" color="gray.700" fontWeight="medium">
                    {stat.label}
                  </Text>
                </Flex>
              </MotionBox>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* How It Works Section */}
      <Box py={20} bg="white">
        <Container maxW="container.xl">
          <MotionFlex
            direction="column"
            align="center"
            textAlign="center"
            mb={16}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Badge
              colorScheme="red"
              px={4}
              py={2}
              borderRadius="full"
              mb={4}
              fontSize="md"
              fontWeight="medium"
              variant="subtle"
            >
              Simple Process
            </Badge>
            <Heading size="xl" mb={4}>
              How <Text as="span" color="red.500">Blood Donation</Text> Works
            </Heading>
            <Text maxW="2xl" fontSize="lg" color="gray.600">
              The simple process that makes a huge difference in people's lives
            </Text>
          </MotionFlex>

          <Grid
            templateColumns={{ base: "1fr", md: "repeat(4, 1fr)" }}
            gap={6}
            position="relative"
          >
            <Box
              position="absolute"
              top="50%"
              left="0"
              right="0"
              height="2px"
              bg="red.100"
              display={{ base: "none", md: "block" }}
              transform="translateY(-50%)"
            />
            {[
              {
                step: "1",
                title: "Register",
                description: "Complete our quick registration form",
                icon: "📝",
                color: "red.400",
              },
              {
                step: "2",
                title: "Screen",
                description: "Complete a health screening",
                icon: "🩺",
                color: "red.500",
              },
              {
                step: "3",
                title: "Donate",
                description: "The quick donation process (10-15 mins)",
                icon: "💉",
                color: "red.600",
              },
              {
                step: "4",
                title: "Refresh",
                description: "Enjoy snacks while you recover",
                icon: "🍪",
                color: "red.700",
              },
            ].map((step, index) => (
              <MotionBox
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Flex
                  direction="column"
                  align="center"
                  textAlign="center"
                  p={8}
                  bg={cardBg}
                  borderRadius="2xl"
                  boxShadow="sm"
                  position="relative"
                  zIndex={1}
                  transition="all 0.3s"
                  _hover={{
                    transform: "translateY(-5px)",
                    boxShadow: "lg",
                  }}
                >
                  <Flex
                    w="70px"
                    h="70px"
                    bg={`${step.color}10`}
                    color={step.color}
                    borderRadius="full"
                    align="center"
                    justify="center"
                    mb={6}
                    fontSize="2xl"
                    fontWeight="bold"
                    borderWidth="2px"
                    borderColor={`${step.color}30`}
                  >
                    {step.icon}
                  </Flex>
                  <Text
                    fontSize="lg"
                    fontWeight="bold"
                    mb={2}
                    color="gray.800"
                  >
                    {step.title}
                  </Text>
                  <Text color="gray.600">{step.description}</Text>
                </Flex>
              </MotionBox>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Blood Type Information */}
      <Box py={20} bg={bgColor}>
        <Container maxW="container.xl">
          <MotionFlex
            direction="column"
            align="center"
            textAlign="center"
            mb={16}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Badge
              colorScheme="red"
              px={4}
              py={2}
              borderRadius="full"
              mb={4}
              fontSize="md"
              fontWeight="medium"
              variant="subtle"
            >
              Blood Compatibility
            </Badge>
            <Heading size="xl" mb={4}>
              Blood Type <Text as="span" color="red.500">Compatibility</Text>
            </Heading>
            <Text maxW="2xl" fontSize="lg" color="gray.600">
              Know which blood types can help which patients
            </Text>
          </MotionFlex>

          <SimpleGrid columns={[1, 2, 4]} spacing={6}>
            {[
              { type: "O-", donateTo: "All types", receiveFrom: "O-" },
              {
                type: "O+",
                donateTo: "O+, A+, B+, AB+",
                receiveFrom: "O+, O-",
              },
              {
                type: "A-",
                donateTo: "A+, A-, AB+, AB-",
                receiveFrom: "A-, O-",
              },
              {
                type: "A+",
                donateTo: "A+, AB+",
                receiveFrom: "A+, A-, O+, O-",
              },
              {
                type: "B-",
                donateTo: "B+, B-, AB+, AB-",
                receiveFrom: "B-, O-",
              },
              {
                type: "B+",
                donateTo: "B+, AB+",
                receiveFrom: "B+, B-, O+, O-",
              },
              {
                type: "AB-",
                donateTo: "AB+, AB-",
                receiveFrom: "A-, B-, AB-, O-",
              },
              { type: "AB+", donateTo: "AB+", receiveFrom: "All types" },
            ].map((blood, index) => (
              <MotionBox
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: (index % 4) * 0.1 }}
              >
                <Box
                  p={6}
                  borderWidth="1px"
                  borderRadius="2xl"
                  bg={cardBg}
                  boxShadow="sm"
                  transition="all 0.3s ease"
                  _hover={{
                    transform: "translateY(-5px)",
                    boxShadow: "lg",
                  }}
                  height="100%"
                >
                  <Flex align="center" mb={4}>
                    <Box
                      w="40px"
                      h="40px"
                      bg="red.100"
                      color="red.600"
                      borderRadius="full"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      mr={3}
                      fontSize="lg"
                      fontWeight="bold"
                    >
                      {blood.type}
                    </Box>
                    <Heading size="md" color="red.500">
                      Type {blood.type}
                    </Heading>
                  </Flex>
                  <Box
                    p={4}
                    bg="red.50"
                    borderRadius="lg"
                    mb={3}
                    borderLeftWidth="4px"
                    borderColor="red.400"
                  >
                    <Text fontWeight="bold" color="gray.700" mb={1}>
                      Can Donate To:
                    </Text>
                    <Text color="gray.600">{blood.donateTo}</Text>
                  </Box>
                  <Box
                    p={4}
                    bg="red.50"
                    borderRadius="lg"
                    borderLeftWidth="4px"
                    borderColor="red.400"
                  >
                    <Text fontWeight="bold" color="gray.700" mb={1}>
                      Can Receive From:
                    </Text>
                    <Text color="gray.600">{blood.receiveFrom}</Text>
                  </Box>
                </Box>
              </MotionBox>
            ))}
          </SimpleGrid>
        </Container>
      </Box>

      {/* Upcoming Events */}
      <Box py={20} bg="white">
        <Container maxW="container.xl">
          <MotionFlex
            direction="column"
            align="center"
            textAlign="center"
            mb={16}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Badge
              colorScheme="red"
              px={4}
              py={2}
              borderRadius="full"
              mb={4}
              fontSize="md"
              fontWeight="medium"
              variant="subtle"
            >
              Events
            </Badge>
            <Heading size="xl" mb={4}>
              Upcoming <Text as="span" color="red.500">Blood Drives</Text>
            </Heading>
            <Text maxW="2xl" fontSize="lg" color="gray.600">
              Join us at these upcoming donation events
            </Text>
          </MotionFlex>

          <SimpleGrid columns={[1, 2, 3]} spacing={6}>
            {upcomingEvents.map((event, index) => (
              <MotionBox
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Box
                  p={6}
                  borderWidth="1px"
                  borderRadius="2xl"
                  bg={cardBg}
                  boxShadow="sm"
                  transition="all 0.3s ease"
                  _hover={{
                    transform: "translateY(-5px)",
                    boxShadow: "lg",
                  }}
                  height="100%"
                >
                  <Flex align="center" mb={4}>
                    <Box
                      w="50px"
                      h="50px"
                      bg="red.100"
                      color="red.600"
                      borderRadius="xl"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      mr={4}
                      fontSize="xl"
                    >
                      <Icon as={MdEvent} />
                    </Box>
                    <Box>
                      <Text
                        fontSize="sm"
                        color="red.600"
                        fontWeight="bold"
                        mb={1}
                      >
                        {moment(event.date).format("MMMM D, YYYY")}
                      </Text>
                      <Heading size="md">{event.title}</Heading>
                    </Box>
                  </Flex>
                  <Stack spacing={3} mt={4}>
                    <Flex align="center">
                      <Icon as={MdLocationOn} color="red.500" mr={3} />
                      <Text color="gray.600">{event.location}</Text>
                    </Flex>
                    <Flex align="center">
                      <Icon as={IoMdTime} color="red.500" mr={3} />
                      <Text color="gray.600">{event.time}</Text>
                    </Flex>
                  </Stack>
                  <Button
                    colorScheme="red"
                    variant="outline"
                    mt={6}
                    w="full"
                    rightIcon={<FaArrowRight />}
                  >
                    More Details
                  </Button>
                </Box>
              </MotionBox>
            ))}
          </SimpleGrid>
        </Container>
      </Box>

      {/* Testimonials */}
      <Box py={20} bg={bgColor}>
        <Container maxW="container.xl">
          <MotionFlex
            direction="column"
            align="center"
            textAlign="center"
            mb={16}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Badge
              colorScheme="red"
              px={4}
              py={2}
              borderRadius="full"
              mb={4}
              fontSize="md"
              fontWeight="medium"
              variant="subtle"
            >
              Stories
            </Badge>
            <Heading size="xl" mb={4}>
              Donor & Recipient <Text as="span" color="red.500">Stories</Text>
            </Heading>
            <Text maxW="2xl" fontSize="lg" color="gray.600">
              Hear from those whose lives have been touched by blood donation
            </Text>
          </MotionFlex>

          <SimpleGrid columns={[1, 2, 3]} spacing={6}>
            {testimonials.map((testimonial, index) => (
              <MotionBox
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Box
                  p={8}
                  borderWidth="1px"
                  borderRadius="2xl"
                  bg={cardBg}
                  boxShadow="sm"
                  transition="all 0.3s ease"
                  _hover={{
                    transform: "translateY(-5px)",
                    boxShadow: "lg",
                  }}
                  height="100%"
                >
                  <Flex direction="column" align="center" textAlign="center">
                    <Avatar
                      size="xl"
                      src={testimonial.avatar}
                      mb={6}
                      borderWidth="3px"
                      borderColor="red.200"
                    />
                    <Text
                      fontSize="lg"
                      fontStyle="italic"
                      color="gray.700"
                      mb={6}
                    >
                      "{testimonial.content}"
                    </Text>
                    <Box>
                      <Text fontWeight="bold" color="gray.800">
                        {testimonial.name}
                      </Text>
                      <Text fontSize="sm" color="red.500">
                        {testimonial.role}
                      </Text>
                    </Box>
                  </Flex>
                </Box>
              </MotionBox>
            ))}
          </SimpleGrid>
        </Container>
      </Box>

      {/* Gallery Carousel */}
      {/* <Box py={16} bg="white">
        <Container maxW="container.xl">
          <Carousel
            images={imageUrls}
            activeSlide={activeSlide}
            setActiveSlide={setActiveSlide}
          />
        </Container>
      </Box> */}

      {/* Final CTA */}
      <Box py={20} bgGradient="linear(to-r, red.600, red.700)" color="white">
        <Container maxW="container.md">
          <MotionFlex
            direction="column"
            align="center"
            textAlign="center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Badge
              variant="solid"
              colorScheme="whiteAlpha"
              px={4}
              py={2}
              borderRadius="full"
              mb={6}
              fontSize="md"
              fontWeight="medium"
            >
              Ready to Make a Difference?
            </Badge>
            <Heading size="xl" mb={6}>
              Join Our Community of <Text as="span" color="red.100">Lifesavers</Text>
            </Heading>
            <Text fontSize="xl" mb={8} maxW="2xl">
              Your donation could be the reason someone gets to celebrate another
              birthday, anniversary, or just another ordinary day.
            </Text>
            <MotionBox
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                colorScheme="red"
                color="white"
                size="lg"
                onClick={() => navigate("/register")}
                rightIcon={<FaHeartbeat />}
                px={10}
                py={7}
                fontSize="xl"
                fontWeight="bold"
                boxShadow="xl"
              >
                Register as a Donor
              </Button>
            </MotionBox>
          </MotionFlex>
        </Container>
      </Box>
    </HomeLayout>
  );
};

export default HomePage;