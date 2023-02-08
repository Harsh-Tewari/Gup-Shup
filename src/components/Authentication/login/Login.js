import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  useToast,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const handleClick = (e) => {
    if (e.target.name === "showpass") {
      setShow(!show);
    }
  };

  const toast = useToast();

  const handleSubmit = async () => {
    if (!email || !password) {
      toast({
        title: "Please Fill all the fields!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top-left",
      });
      setLoading(false);
      return;
    }

    try {
      const { data } = await axios.post(
        "/api/user/login",
        { email, password },
        { headers: { "content-type": "application/json" } }
      );
      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      history.push("/chats");
    } catch (error) {
      toast({
        title: error.response.data.message,
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top-left",
      });
      setLoading(false);
      return;
    }
  };

  return (
    <VStack spacing="5px" color="black">
      <FormControl isRequired>
        <FormLabel>e-mail</FormLabel>
        <Input
          type="email"
          placeholder="Enter Your e-mail"
          value={email}
          name="email"
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>
      <FormControl isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            placeholder="Enter password"
            value={password}
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            type={show ? "text" : "password"}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" name="showpass" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <Button
        colorScheme={"blue"}
        width="100%"
        style={{ marginTop: 15 }}
        onClick={handleSubmit}
      >
        Login
      </Button>
      <Button
        colorScheme="red"
        width="100%"
        style={{ marginTop: 15 }}
        isLoading={loading}
        onClick={() => {
          setEmail("rajesh.kumar123@gmail.com");
          setPassword("Rajesh@123");
        }}
      >
        Guest Credentials
      </Button>
    </VStack>
  );
};

export default Login;
