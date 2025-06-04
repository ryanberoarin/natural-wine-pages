import { Box, Container, Heading, Image, SimpleGrid, Text, VStack } from '@chakra-ui/react'
import { useState } from 'react'
import type { ImageData } from './types'

// 임시 이미지 데이터
const images: ImageData[] = [
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
  {
    id: 4,
    url: 'https://picsum.photos/400/300?random=4',
    title: 'Beautiful Landscape 4',
    description: 'Capturing the moment'
  },
  {
    id: 5,
    url: 'https://picsum.photos/400/300?random=5',
    title: 'Beautiful Landscape 5',
    description: 'Nature\'s beauty'
  },
  {
    id: 6,
    url: 'https://picsum.photos/400/300?random=6',
    title: 'Beautiful Landscape 6',
    description: 'A perfect day'
  }
]

function App() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  
  const selectedImageData = images.find(img => img.id === selectedImage)

  const handleImageClick = (id: number) => {
    setSelectedImage(id)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  return (
    <Container maxW="container.xl" py={8}>
      <VStack gap={8}>
        <Heading as="h1" size="2xl">My Photo Gallery</Heading>
        <Text fontSize="xl" color="gray.600">A collection of beautiful moments</Text>
        
        <SimpleGrid
          columns={{ base: 1, sm: 2, md: 3, lg: 4 }}
          gap={{ base: 4, md: 6, lg: 8 }}
        >
          {images.map((image) => (
            <Box
              key={image.id}
              borderWidth="1px"
              borderRadius="lg"
              overflow="hidden"
              cursor="pointer"
              onClick={() => handleImageClick(image.id)}
              transition="transform 0.2s"
              _hover={{ transform: 'scale(1.02)' }}
            >
              <Box position="relative" h="300px">
                <Image
                  src={image.url}
                  alt={image.title}
                  objectFit="cover"
                  w="100%"
                  h="100%"
                  onError={(e) => {
                    e.currentTarget.src = 'https://via.placeholder.com/400x300?text=Image+Not+Found'
                  }}
                />
              </Box>
              <Box p={4}>
                <Heading size="md">{image.title}</Heading>
                <Text mt={2} color="gray.600">{image.description}</Text>
              </Box>
            </Box>
          ))}
        </SimpleGrid>
      </VStack>

      {isModalOpen && selectedImageData && (
        <Box
          position="fixed"
          top={0}
          left={0}
          right={0}
          bottom={0}
          bg="rgba(0, 0, 0, 0.8)"
          zIndex={1000}
          onClick={handleCloseModal}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Box
            position="relative"
            maxW="90vw"
            maxH="90vh"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={selectedImageData.url}
              alt={selectedImageData.title}
              objectFit="contain"
              maxH="90vh"
            />
            <Box
              position="absolute"
              bottom={0}
              left={0}
              right={0}
              bg="rgba(0, 0, 0, 0.7)"
              color="white"
              p={4}
            >
              <Heading size="md">{selectedImageData.title}</Heading>
              <Text mt={2}>{selectedImageData.description}</Text>
            </Box>
          </Box>
        </Box>
      )}
    </Container>
  )
}

export default App
