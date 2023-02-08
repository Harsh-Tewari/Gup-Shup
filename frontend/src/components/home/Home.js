import {
  Box,
  Container,
  Text,
  Tabs,
  Tab,
  TabList,
  TabPanels,
  TabPanel,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Home.css";
import Login from "../Authentication/login/Login";
import Signup from "../Authentication/signup/Signup";

const Home = () => {
  const [chats, setChats] = useState([]);

  const fetchChats = async () => {
    const { data } = await axios.get("/api/chat");
    setChats(data);
    // console.log(data);
  };

  // useEffect(() => {
  //   fetchChats();
  // }, []);

  return (
    <Container maxW="xl">
      <Box
        display="flex"
        justifyContent="center"
        p={3}
        w="100%"
        m="40px 0 15px 0"
        bg="white"
        borderRadius="lg"
        borderWidth="2px"
        borderColor={"rgb(38, 162, 16)"}
      >
        <Text fontSize={"4xl"} fontFamily="Work Sans">
          Gup-Shup
        </Text>
      </Box>
      <Box
        p={4}
        w="100%"
        bg="white"
        borderRadius="lg"
        borderWidth="2px"
        borderColor={"rgb(38, 162, 16)"}
      >
        <Tabs isFitted variant="soft-rounded">
          <TabList>
            <Tab _hover={{ bg: "rgb(240, 254, 240)" }}>Login</Tab>
            <Tab _hover={{ bg: "rgb(240, 254, 240)" }}>SignUp</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <Login />
            </TabPanel>
            <TabPanel>
              <Signup />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
};

export default Home;
