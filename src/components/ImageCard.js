import {
  Box,
  Center,
  useColorModeValue,
  Image,
  Text,
  VStack,
} from '@chakra-ui/react';

import { useNavigate } from 'react-router-dom';

export default function ImageCard(props) {
  const navigate = useNavigate();

  return (
    <Center py={12}>
      <VStack>
        <Text
          mb={"30px"}
          fontSize={17}
          fontWeight={"semibold"}>
            {props.title}
        </Text>
        <Box
          role={'group'}
          p={6}
          maxW={'430px'}
          w={'full'}
          bg={useColorModeValue('white', 'gray.800')}
          boxShadow={'2xl'}
          rounded={'lg'}
          pos={'relative'}
          cursor='pointer'
          zIndex={1}>
          <Box
            rounded={'lg'}
            mt={-12}
            pos={'relative'}
            height={'230px'}
            _after={{
              transition: 'all .3s ease',
              content: '""',
              w: 'full',
              h: 'full',
              pos: 'absolute',
              top: 5,
              left: 0,
              backgroundImage: `url(${props.src})`,
              filter: 'blur(15px)',
              zIndex: -1,
            }}
            _groupHover={{
              _after: {
                filter: 'blur(20px)',
              },
            }}>
            <Image
              rounded={'lg'}
              height={230}
              width={390}
              objectFit={'cover'}
              onClick={props.onClick}
              src={props.src}
            />
          </Box>
        </Box>
      </VStack>
    </Center>
  );
}
