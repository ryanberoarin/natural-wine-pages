import { Box, Container, Heading, Image, SimpleGrid, Text, VStack, Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import { useState } from 'react'
import type { ImageData } from './types'
import { gallery25_01 } from './data/gallery25_01'
import { gallery25_02 } from './data/gallery25_02'
import { gallery25_03 } from './data/gallery25_03'
import { gallery25_04 } from './data/gallery25_04'
import { gallery25_05 } from './data/gallery25_05'

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
            <Tab>January 2025</Tab>
            <Tab>February 2025</Tab>
            <Tab>March 2025</Tab>
            <Tab>April 2025</Tab>
            <Tab>May 2025</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <Gallery images={gallery25_01} />
            </TabPanel>
            <TabPanel>
              <Gallery images={gallery25_02} />
            </TabPanel>
            <TabPanel>
              <Gallery images={gallery25_03} />
            </TabPanel>
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
