import { Button, Flex, Heading, Input, useColorMode, useColorModeValue } from '@chakra-ui/react'
import '../App.css'
import GLoginButton from '../components/GLoginButton';

function Login() {
  const {toggleColorMode} = useColorMode();
  const formBackground = useColorModeValue("gray.100", "gray.700");

  return (
    <Flex height={"100vh"} alignItems={"center"} justifyContent={"center"}>
      <Flex direction={"column"} background={formBackground} p={12} rounded={6}>
        <Heading mb={6}>
          Login
        </Heading>
        <Input placeholder='balebom@gmail.com' variant={"filled"} mb={3} type="email"></Input>
        <Input placeholder='***********' variant={"filled"} mb={6} type="password"/>
        <Button mb={2} colorScheme={"teal"}>Log in</Button>
        <GLoginButton/>
        <Button onClick={toggleColorMode}>Toggle Color Mode</Button>
      </Flex>
    </Flex>
  )
}

export default Login;
