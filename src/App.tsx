import { Box, Container, Heading, Image, SimpleGrid, Text, VStack } from '@chakra-ui/react'
import { useState } from 'react'

// 임시 이미지 데이터
const images = [
  {
    id: 1,
    url: 'https://picsum.photos/400/300?random=1',
    title: 'Beautiful Landscape 1',
    description: 'A stunning view of nature'
  },
  {
    id: 2,
    url: 'https://picsum.photos/400/300?random=2',
    title: 'Beautiful Landscape 2',
    description: 'Another amazing scene'
  },
  {
    id: 3,
    url: 'https://picsum.photos/400/300?random=3',
    title: 'Beautiful Landscape 3',
    description: 'Nature at its finest'
  },
  // 더 많은 이미지를 추가할 수 있습니다
]

function App() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)

  return (
    <Container maxW="container.xl" py={8}>
      <VStack gap={8}>
        <Heading as="h1" size="2xl">My Photo Gallery</Heading>
        <Text fontSize="xl" color="gray.600">A collection of beautiful moments</Text>
        
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={8}>
          {images.map((image) => (
            <Box
              key={image.id}
              borderWidth="1px"
              borderRadius="lg"
              overflow="hidden"
              cursor="pointer"
              onClick={() => setSelectedImage(image.id)}
              transition="transform 0.2s"
              _hover={{ transform: 'scale(1.02)' }}
            >
              <Image src={image.url} alt={image.title} />
              <Box p={4}>
                <Heading size="md">{image.title}</Heading>
                <Text mt={2} color="gray.600">{image.description}</Text>
              </Box>
            </Box>
          ))}
        </SimpleGrid>
      </VStack>
    </Container>
  )
}

export default App
