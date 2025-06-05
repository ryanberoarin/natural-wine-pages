import { Box, Container, Heading, Image, SimpleGrid, Text, VStack, Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import { useState } from 'react'
import type { ImageData } from './types'

// 25-04 갤러리 이미지 데이터
const gallery25_04: ImageData[] = [
  {
    id: 1,
    url: 'images/25-04/250401.png',
    title: 'April 2025 - Image 1',
    description: 'First image from April 2025'
  },
  {
    id: 2,
    url: 'images/25-04/250402.png',
    title: 'April 2025 - Image 2',
    description: 'Second image from April 2025'
  },
  {
    id: 3,
    url: 'images/25-04/250403.png',
    title: 'April 2025 - Image 3',
    description: 'Third image from April 2025'
  },
  {
    id: 4,
    url: 'images/25-04/250404.png',
    title: 'April 2025 - Image 4',
    description: 'Fourth image from April 2025'
  },
  {
    id: 5,
    url: 'images/25-04/250405.png',
    title: 'April 2025 - Image 5',
    description: 'Fifth image from April 2025'
  },
  {
    id: 6,
    url: 'images/25-04/250406.png',
    title: 'April 2025 - Image 6',
    description: 'Sixth image from April 2025'
  },
  {
    id: 7,
    url: 'images/25-04/250407.png',
    title: 'April 2025 - Image 7',
    description: 'Seventh image from April 2025'
  },
  {
    id: 8,
    url: 'images/25-04/250408.png',
    title: 'April 2025 - Image 8',
    description: 'Eighth image from April 2025'
  },
  {
    id: 9,
    url: 'images/25-04/250409.png',
    title: 'April 2025 - Image 9',
    description: 'Ninth image from April 2025'
  },
  {
    id: 10,
    url: 'images/25-04/250410.png',
    title: 'April 2025 - Image 10',
    description: 'Tenth image from April 2025'
  },
  {
    id: 11,
    url: 'images/25-04/250411.png',
    title: 'April 2025 - Image 11',
    description: 'Eleventh image from April 2025'
  },
  {
    id: 12,
    url: 'images/25-04/250412.png',
    title: 'April 2025 - Image 12',
    description: 'Twelfth image from April 2025'
  },
  {
    id: 13,
    url: 'images/25-04/250413.png',
    title: 'April 2025 - Image 13',
    description: 'Thirteenth image from April 2025'
  }
]

// 25-05 갤러리 이미지 데이터
const gallery25_05: ImageData[] = [
  {
    id: 1,
    url: 'images/25-05/250501.png',
    title: 'May 2025 - Image 1',
    description: 'First image from May 2025'
  },
  {
    id: 2,
    url: 'images/25-05/250502.png',
    title: 'May 2025 - Image 2',
    description: 'Second image from May 2025'
  },
  {
    id: 3,
    url: 'images/25-05/250503.png',
    title: 'May 2025 - Image 3',
    description: 'Third image from May 2025'
  },
  {
    id: 4,
    url: 'images/25-05/250504.png',
    title: 'May 2025 - Image 4',
    description: 'Fourth image from May 2025'
  },
  {
    id: 5,
    url: 'images/25-05/250505.png',
    title: 'May 2025 - Image 5',
    description: 'Fifth image from May 2025'
  },
  {
    id: 6,
    url: 'images/25-05/250506.png',
    title: 'May 2025 - Image 6',
    description: 'Sixth image from May 2025'
  },
  {
    id: 7,
    url: 'images/25-05/250507.png',
    title: 'May 2025 - Image 7',
    description: 'Seventh image from May 2025'
  }
]

function Gallery({ images }: { images: ImageData[] }) {
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
    <>
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
    </>
  )
}

function App() {
  return (
    <Container maxW="container.xl" py={8}>
      <VStack gap={8}>
        <Heading as="h1" size="2xl">My Photo Gallery</Heading>
        <Text fontSize="xl" color="gray.600">A collection of beautiful moments</Text>
        
        <Tabs isFitted variant="enclosed" width="100%">
          <TabList mb="1em">
            <Tab>April 2025</Tab>
            <Tab>May 2025</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <Gallery images={gallery25_04} />
            </TabPanel>
            <TabPanel>
              <Gallery images={gallery25_05} />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </VStack>
    </Container>
  )
}

export default App
