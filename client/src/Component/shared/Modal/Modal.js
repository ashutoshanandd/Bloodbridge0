import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Select,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Radio,
  RadioGroup,
  Stack,
  useToast,
} from "@chakra-ui/react";
import API from "./../../../Services/API";

const CustomModal = ({ isOpen, onClose }) => {
  const [inventoryType, setInventoryType] = useState("in");
  const [bloodGroup, setBloodGroup] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [email, setEmail] = useState("");
  const { user } = useSelector((state) => state.auth);
  const toast = useToast();

  const handleModalSubmit = async () => {
    try {
      if (!bloodGroup || !quantity || !email) {
        toast({
          title: "Error",
          description: "Please provide all fields",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        return;
      }
      if (quantity <= 0) {
        toast({
          title: "Error",
          description: "Quantity must be a positive number",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        return;
      }

      const { data } = await API.post("/inventory/create-inventory", {
        email,
        organisation: user?._id,
        inventoryType,
        bloodGroup,
        quantity,
      });

      if (data?.success) {
        toast({
          title: "Success",
          description: "New record created",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        onClose(); // Close the modal
        window.location.reload(); // Reload the page to reflect changes
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Error occurred while creating record",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      console.error(error);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Manage Blood Record</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={4}>
            <FormControl>
              <FormLabel>Blood Type</FormLabel>
              <RadioGroup value={inventoryType} onChange={setInventoryType}>
                <Stack direction="row">
                  <Radio value="in">IN</Radio>
                  <Radio value="out">OUT</Radio>
                </Stack>
              </RadioGroup>
            </FormControl>

            <FormControl>
              <FormLabel>Blood Group</FormLabel>
              <Select
                placeholder="Select blood group"
                value={bloodGroup}
                onChange={(e) => setBloodGroup(e.target.value)}
              >
                <option value="O+">O+</option>
                <option value="O-">O-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
              </Select>
            </FormControl>

            <FormControl>
              <FormLabel>Donor Email</FormLabel>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter donor email"
              />
            </FormControl>

            <FormControl>
              <FormLabel>Quantity (ML)</FormLabel>
              <Input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                placeholder="Enter quantity"
              />
            </FormControl>
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleModalSubmit}>
            Submit
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CustomModal;