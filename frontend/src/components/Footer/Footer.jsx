import React from 'react';
import {
  Box,
  Container,
  IconButton,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { BsGithub } from 'react-icons/bs';

export default function Footer() {
  // Get the current year dynamically
  const currentYear = new Date().getFullYear();
  return (
    <Box
      mt={'4'}
      bg={useColorModeValue('gray.50', 'gray.900')}
      color={useColorModeValue('gray.700', 'gray.200')}
      style={{
        position: 'relative',
        bottom: '0',
        width: '100%',
      }}
    >
      <Container
        as={Stack}
        maxW={'6xl'}
        py={4}
        direction={{ base: 'column', md: 'row' }}
        spacing={4}
        justify={{ base: 'center', md: 'center' }}
        align={{ base: 'center', md: 'center' }}
      >
        <Text>© {currentYear} Currency Converter</Text>
        <Box as="a" href="https://github.com/AlexOsi02">
          <IconButton
            aria-label="github"
            variant="ghost"
            size="lg"
            fontSize="2xl"
            icon={<BsGithub />}
            _hover={{
              bg: 'blue.200',
              color: useColorModeValue('white', 'gray.700'),
            }}
            isRound
          />
        </Box>
      </Container>
    </Box>
  );
}
