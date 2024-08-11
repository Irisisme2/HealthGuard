import React, { useState, useEffect } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { Icon } from "@chakra-ui/react";
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
} from "@chakra-ui/react";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth } from "firebaseConfig";
import { FcGoogle } from "react-icons/fc";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { RiEyeCloseLine } from "react-icons/ri";

function SignUp() {
  const history = useHistory();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    dateOfBirth: "",
    address: "",
  });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    loadGoogleMapsApi(() => {
      const autocomplete = new window.google.maps.places.Autocomplete(
        document.getElementById('address-input'),
        { types: ['address'] }
      );
      autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace();
        if (place && place.formatted_address) {
          setFormData({ ...formData, address: place.formatted_address });
        }
      });
    });
  }, []);

  const loadGoogleMapsApi = (callback) => {
    const existingScript = document.getElementById('google-maps-api');
    if (!existingScript) {
      const script = document.createElement('script');
      script.id = 'google-maps-api';
      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&libraries=places`;
      script.onload = callback;
      document.body.appendChild(script);
    } else if (callback) {
      callback();
    }
  };

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword(!showConfirmPassword);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleNextStep = () => setStep(step + 1);
  const handlePreviousStep = () => setStep(step - 1);

  const handleSignUp = async (e) => {
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    try {
      await createUserWithEmailAndPassword(auth, formData.email, formData.password);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleGoogleSignUp = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      history.push("/views/auth/signIn/components/Form"); // Redirect to Form component after Google sign-up
    } catch (error) {
      setError(error.message);
    }
  };

  // Chakra color mode
  const textColor = useColorModeValue("navy.700", "white");
  const textColorSecondary = "gray.400";
  const textColorDetails = useColorModeValue("navy.700", "secondaryGray.600");
  const textColorBrand = useColorModeValue("brand.500", "white");
  const brandStars = useColorModeValue("brand.500", "brand.400");
  const googleBg = useColorModeValue("secondaryGray.300", "whiteAlpha.200");
  const googleText = useColorModeValue("navy.700", "white");
  const googleHover = useColorModeValue(
    { bg: "gray.200" },
    { bg: "whiteAlpha.300" }
  );
  const googleActive = useColorModeValue(
    { bg: "secondaryGray.300" },
    { bg: "whiteAlpha.200" }
  );

  return (
    <Flex justify="center" align="center" h="100vh" bg={useColorModeValue("gray.50", "gray.800")}>
      <Card
        w={{ base: "90%", sm: "80%", md: "70%", lg: "50%" }}
        mx="auto"
        h="auto"
        alignItems="center"
        justifyContent="center"
        p={{ base: "20px", md: "40px" }}
        bg={useColorModeValue("white", "gray.700")}
        shadow="md"
      >
        <Box textAlign="center" mb="20px">
          <Heading color={textColor} fontSize="36px" mb="10px">
            Create an Account
          </Heading>
          <Text color={textColorSecondary} fontWeight="400" fontSize="md">
            Enter your details to sign up!
          </Text>
        </Box>

        <Button
          fontSize="sm"
          mb="24px"
          py="15px"
          h="50px"
          borderRadius="16px"
          bg={googleBg}
          color={googleText}
          fontWeight="500"
          _hover={googleHover}
          _active={googleActive}
          _focus={googleActive}
          onClick={handleGoogleSignUp}
          w="full"
        >
          <Icon as={FcGoogle} w="20px" h="20px" me="10px" />
          Sign up with Google
        </Button>
        <Flex align="center" mb="24px">
          <Box flex="1" h="1px" bg="gray.200" />
          <Text color="gray.400" mx="14px">
            or
          </Text>
          <Box flex="1" h="1px" bg="gray.200" />
        </Flex>

        {error && <Text color="red.500" mb="24px" textAlign="center">{error}</Text>}

        <form onSubmit={handleSignUp}>
          {step === 1 && (
            <>
              <FormControl mb="24px">
                <FormLabel fontSize="sm" fontWeight="500" color={textColor}>
                  Email<Text color={brandStars}>*</Text>
                </FormLabel>
                <Input
                  isRequired
                  fontSize="sm"
                  type="email"
                  name="email"
                  placeholder="mail@simmmple.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  size="lg"
                  borderRadius="md"
                />
              </FormControl>
              <FormControl mb="24px">
                <FormLabel fontSize="sm" fontWeight="500" color={textColor}>
                  Password<Text color={brandStars}>*</Text>
                </FormLabel>
                <InputGroup size="md">
                  <Input
                    isRequired
                    fontSize="sm"
                    name="password"
                    placeholder="Min. 8 characters"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleInputChange}
                    size="lg"
                    borderRadius="md"
                  />
                  <InputRightElement display="flex" alignItems="center" mt="4px">
                    <Icon
                      color={textColorSecondary}
                      _hover={{ cursor: "pointer" }}
                      as={showPassword ? RiEyeCloseLine : MdOutlineRemoveRedEye}
                      onClick={handleClickShowPassword}
                    />
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <FormControl mb="24px">
                <FormLabel fontSize="sm" fontWeight="500" color={textColor}>
                  Confirm Password<Text color={brandStars}>*</Text>
                </FormLabel>
                <InputGroup size="md">
                  <Input
                    isRequired
                    fontSize="sm"
                    name="confirmPassword"
                    placeholder="Re-enter your password"
                    type={showConfirmPassword ? "text" : "password"}
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    size="lg"
                    borderRadius="md"
                  />
                  <InputRightElement display="flex" alignItems="center" mt="4px">
                    <Icon
                      color={textColorSecondary}
                      _hover={{ cursor: "pointer" }}
                      as={showConfirmPassword ? RiEyeCloseLine : MdOutlineRemoveRedEye}
                      onClick={handleClickShowConfirmPassword}
                    />
                  </InputRightElement>
                </InputGroup>
              </FormControl>
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

          {step === 2 && (
            <>
              <FormControl mb="24px">
                <FormLabel fontSize="sm" fontWeight="500" color={textColor}>
                  First Name<Text color={brandStars}>*</Text>
                </FormLabel>
                <Input
                  isRequired
                  fontSize="sm"
                  name="firstName"
                  placeholder="John"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  size="lg"
                  borderRadius="md"
                />
              </FormControl>
              <FormControl mb="24px">
                <FormLabel fontSize="sm" fontWeight="500" color={textColor}>
                  Last Name<Text color={brandStars}>*</Text>
                </FormLabel>
                <Input
                  isRequired
                  fontSize="sm"
                  name="lastName"
                  placeholder="Doe"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  size="lg"
                  borderRadius="md"
                />
              </FormControl>
              <Button
                fontSize="sm"
                variant="brand"
                fontWeight="500"
                w="full"
                h="50px"
                mb="24px"
                onClick={handlePreviousStep}
              >
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

          {step === 3 && (
            <>
              <FormControl mb="24px">
                <FormLabel fontSize="sm" fontWeight="500" color={textColor}>
                  Phone Number<Text color={brandStars}>*</Text>
                </FormLabel>
                <Input
                  isRequired
                  fontSize="sm"
                  name="phoneNumber"
                  placeholder="+1 234 567 890"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  size="lg"
                  borderRadius="md"
                />
              </FormControl>
              <FormControl mb="24px">
                <FormLabel fontSize="sm" fontWeight="500" color={textColor}>
                  Date of Birth<Text color={brandStars}>*</Text>
                </FormLabel>
                <Input
                  isRequired
                  fontSize="sm"
                  name="dateOfBirth"
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={handleInputChange}
                  size="lg"
                  borderRadius="md"
                />
              </FormControl>
              <Button
                fontSize="sm"
                variant="brand"
                fontWeight="500"
                w="full"
                h="50px"
                mb="24px"
                onClick={handlePreviousStep}
              >
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
                <FormLabel fontSize="sm" fontWeight="500" color={textColor}>
                  Address<Text color={brandStars}>*</Text>
                </FormLabel>
                <Input
                  isRequired
                  fontSize="sm"
                  id="address-input"
                  name="address"
                  placeholder="123 Main St, Apt 4B"
                  value={formData.address}
                  onChange={handleInputChange}
                  size="lg"
                  borderRadius="md"
                />
              </FormControl>
              <Button
                fontSize="sm"
                variant="brand"
                fontWeight="500"
                w="full"
                h="50px"
                mb="24px"
                onClick={handlePreviousStep}
              >
                Previous
              </Button>
              <Button
                fontSize="sm"
                variant="brand"
                fontWeight="500"
                w="full"
                h="50px"
                mb="24px"
                type="submit"
              >
                Sign Up
              </Button>
            </>
          )}
        </form>

        <Flex flexDirection="column" align="center" mt="10px">
          <Text color={textColorDetails} fontWeight="400" fontSize="14px">
            Already have an account?
            <NavLink to="/auth/sign-in">
              <Text color={textColorBrand} as="span" ms="5px" fontWeight="500">
                Sign In
              </Text>
            </NavLink>
          </Text>
        </Flex>
      </Card>
    </Flex>
  );
}

export default SignUp;
