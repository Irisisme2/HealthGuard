import React, { useState, useEffect } from "react";
import {
  Box,
  Flex,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useColorModeValue,
  Card,
  Select,
  RadioGroup,
  Radio,
  Stack,
} from "@chakra-ui/react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useElements, useStripe } from "@stripe/react-stripe-js";

// Load your Stripe public key from environment variables
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

const InsuranceForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    gender: "",
    pronouns: "",
    address: "",
    paymentMethod: "",
    insurance: "",
  });
  const [error, setError] = useState("");
  const [showCardDetails, setShowCardDetails] = useState(false);

  // Stripe hooks
  const stripe = useStripe();
  const elements = useElements();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleNextStep = () => setStep(step + 1);
  const handlePreviousStep = () => setStep(step - 1);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (step === 4) {
      // Handle final submission and insurance
      try {
        // Example: handle form submission to your server
        // const response = await submitFormData(formData);
        console.log("Form data:", formData);
        setStep(step + 1); // Move to confirmation step or show a success message
      } catch (error) {
        setError(error.message);
      }
    }
  };

  return (
    <Flex justify="center" align="center" h="100vh" bg={useColorModeValue("gray.50", "gray.800")}>
      <Card
        w={{ base: "90%", sm: "80%", md: "70%", lg: "50%" }}
        mx="auto"
        p="40px"
        bg={useColorModeValue("white", "gray.700")}
        shadow="md"
        borderRadius="md"
        overflow="hidden"
        height="100vh"
      >
        <Box textAlign="center" mb="20px">
          <Heading color={useColorModeValue("navy.700", "white")} fontSize="36px" mb="10px">
            Health Insurance Form
          </Heading>
          <Text color="gray.400" fontWeight="400" fontSize="md">
            Step {step} of 4
          </Text>
        </Box>

        {error && <Text color="red.500" mb="24px" textAlign="center">{error}</Text>}

        <form onSubmit={handleSubmit}>
          {step === 1 && (
            <>
              <FormControl mb="24px">
                <FormLabel fontSize="sm" fontWeight="500" color={useColorModeValue("navy.700", "white")}>
                  First Name
                </FormLabel>
                <Input
                  isRequired
                  fontSize="sm"
                  name="firstName"
                  placeholder="John"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  size="lg"
                />
              </FormControl>
              <FormControl mb="24px">
                <FormLabel fontSize="sm" fontWeight="500" color={useColorModeValue("navy.700", "white")}>
                  Last Name
                </FormLabel>
                <Input
                  isRequired
                  fontSize="sm"
                  name="lastName"
                  placeholder="Doe"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  size="lg"
                />
              </FormControl>
              <FormControl mb="24px">
                <FormLabel fontSize="sm" fontWeight="500" color={useColorModeValue("navy.700", "white")}>
                  Date of Birth
                </FormLabel>
                <Input
                  isRequired
                  fontSize="sm"
                  name="dateOfBirth"
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={handleInputChange}
                  size="lg"
                />
              </FormControl>
              <FormControl mb="24px">
                <FormLabel fontSize="sm" fontWeight="500" color={useColorModeValue("navy.700", "white")}>
                  Gender
                </FormLabel>
                <Select
                  isRequired
                  fontSize="sm"
                  name="gender"
                  placeholder="Select gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  size="lg"
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="non-binary">Non-binary</option>
                  <option value="prefer-not-to-say">Prefer not to say</option>
                </Select>
              </FormControl>
              <FormControl mb="24px">
                <FormLabel fontSize="sm" fontWeight="500" color={useColorModeValue("navy.700", "white")}>
                  Pronouns
                </FormLabel>
                <Input
                  fontSize="sm"
                  name="pronouns"
                  placeholder="e.g., He/Him, She/Her, They/Them"
                  value={formData.pronouns}
                  onChange={handleInputChange}
                  size="lg"
                />
              </FormControl>
              <Button fontSize="sm" variant="brand" fontWeight="500" w="full" h="50px" mb="24px" onClick={handleNextStep}>
                Next
              </Button>
            </>
          )}

          {step === 2 && (
            <>
              <FormControl mb="24px">
                <FormLabel fontSize="sm" fontWeight="500" color={useColorModeValue("navy.700", "white")}>
                  Address
                </FormLabel>
                <Input
                  isRequired
                  fontSize="sm"
                  name="address"
                  placeholder="123 Main St, Apt 4B"
                  value={formData.address}
                  onChange={handleInputChange}
                  size="lg"
                />
              </FormControl>
              <Button fontSize="sm" variant="brand" fontWeight="500" w="full" h="50px" mb="24px" onClick={handlePreviousStep}>
                Previous
              </Button>
              <Button fontSize="sm" variant="brand" fontWeight="500" w="full" h="50px" mb="24px" onClick={handleNextStep}>
                Next
              </Button>
            </>
          )}

          {step === 3 && (
            <>
              <FormControl mb="24px">
                <FormLabel fontSize="sm" fontWeight="500" color={useColorModeValue("navy.700", "white")}>
                  Payment Method
                </FormLabel>
                <CardElement options={{ hidePostalCode: true }} />
                <Button
                  fontSize="sm"
                  variant="brand"
                  fontWeight="500"
                  w="full"
                  h="50px"
                  mb="24px"
                  mt="24px"
                  isLoading={!stripe}
                >
                  Pay
                </Button>
              </FormControl>
              <Button fontSize="sm" variant="brand" fontWeight="500" w="full" h="50px" mb="24px" onClick={handlePreviousStep}>
                Previous
              </Button>
              <Button
                fontSize="sm"
                variant="brand"
                fontWeight="500"
                w="full"
                h="50px"
                mb="24px"
                onClick={handleNextStep}
              >
                Next
              </Button>
            </>
          )}

          {step === 4 && (
            <>
              <FormControl mb="24px">
                <FormLabel fontSize="sm" fontWeight="500" color={useColorModeValue("navy.700", "white")}>
                  Insurance
                </FormLabel>
                <Stack spacing={4}>
                  <RadioGroup name="insurance" value={formData.insurance} onChange={handleInputChange}>
                    <Stack spacing={4} direction="column">
                      <Radio value="basic">Basic Coverage</Radio>
                      <Radio value="premium">Premium Coverage</Radio>
                      <Radio value="deluxe">Deluxe Coverage</Radio>
                    </Stack>
                  </RadioGroup>
                </Stack>
              </FormControl>
              <Button fontSize="sm" variant="brand" fontWeight="500" w="full" h="50px" mb="24px" onClick={handlePreviousStep}>
                Previous
              </Button>
              <Button fontSize="sm" variant="brand" fontWeight="500" w="full" h="50px" mb="24px" type="submit">
                Submit
              </Button>
            </>
          )}
        </form>
      </Card>
    </Flex>
  );
};

export default function StripeWrapper() {
  return (
    <Elements stripe={stripePromise}>
      <InsuranceForm />
    </Elements>
  );
}

