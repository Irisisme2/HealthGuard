import React, { useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { Icon, Card } from "@chakra-ui/react";
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
} from "@chakra-ui/react";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth } from "firebaseConfig";
import { FcGoogle } from "react-icons/fc";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { RiEyeCloseLine } from "react-icons/ri";

function SignIn() {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      history.push("/dashboard");
    } catch (error) {
      setError(error.message);
    }
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const userData = {
        name: user.displayName,
        email: user.email,
        profilePic: user.photoURL,
      };
      // Store user data in local storage or global state
      localStorage.setItem("user", JSON.stringify(userData));
      history.push("/dashboard");
    } catch (error) {
      setError(error.message);
    }
  };

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
    <Flex
      justify="center"
      align="center"
      h="100vh"
    >
      <Card
        w="550px"
        mx="auto"
        h="800px"
        alignItems="center"
        justifyContent="center"
        mt="-40px"
        px="25px"
        py="40px"
        flexDirection="column"
      >
        <Box mb="20px" textAlign="center">
          <Heading color={textColor} fontSize="36px" mb="10px">
            Sign In
          </Heading>
          <Text
            color={textColorSecondary}
            fontWeight="400"
            fontSize="md"
          >
            Enter your details to sign in!
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
          onClick={handleGoogleSignIn}
          w="full"
        >
          <Icon as={FcGoogle} w="20px" h="20px" me="10px" />
          Sign in with Google
        </Button>
        <Flex align="center" mb="24px">
          <Box flex="1" h="1px" bg="gray.200" />
          <Text color="gray.400" mx="14px">
            or
          </Text>
          <Box flex="1" h="1px" bg="gray.200" />
        </Flex>
        {error && (
          <Text color="red.500" mb="24px" textAlign="center">
            {error}
          </Text>
        )}
        <form onSubmit={handleSignIn}>
          <FormControl mb="24px">
            <FormLabel
              display="flex"
              fontSize="sm"
              fontWeight="500"
              color={textColor}
              mb="8px"
            >
              Email<Text color={brandStars}>*</Text>
            </FormLabel>
            <Input
              isRequired
              fontSize="sm"
              type="email"
              placeholder="mail@simmmple.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>
          <FormControl mb="24px">
            <FormLabel
              fontSize="sm"
              fontWeight="500"
              color={textColor}
              display="flex"
            >
              Password<Text color={brandStars}>*</Text>
            </FormLabel>
            <InputGroup>
              <Input
                isRequired
                fontSize="sm"
                placeholder="Enter your password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <InputRightElement display="flex" alignItems="center">
                <Icon
                  color={textColorSecondary}
                  _hover={{ cursor: "pointer" }}
                  as={showPassword ? RiEyeCloseLine : MdOutlineRemoveRedEye}
                  onClick={handleClickShowPassword}
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
            type="submit"
          >
            Sign In
          </Button>
        </form>
        <Flex
          flexDirection="column"
          align="center"
          mt="10px"
        >
          <Text color={textColorDetails} fontWeight="400" fontSize="14px">
            Don't have an account?
            <NavLink to="/auth/sign-up">
              <Text
                color={textColorBrand}
                as="span"
                ms="5px"
                fontWeight="500"
              >
                Sign Up
              </Text>
            </NavLink>
          </Text>
        </Flex>
      </Card>
    </Flex>
  );
}

export default SignIn;
