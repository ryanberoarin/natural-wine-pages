import { Box, Container, Heading, Image, SimpleGrid, Text, VStack, useBreakpointValue } from '@chakra-ui/react'
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
  const [selectedMonth, setSelectedMonth] = useState('01')
  const gridColumns = useBreakpointValue({ base: 2, md: 3, lg: 5 })

  const months = [
    { id: '01', label: 'January 2025', data: gallery25_01 },
    { id: '02', label: 'February 2025', data: gallery25_02 },
    { id: '03', label: 'March 2025', data: gallery25_03 },
    { id: '04', label: 'April 2025', data: gallery25_04 },
    { id: '05', label: 'May 2025', data: gallery25_05 }
  ]

  const selectedGallery = months.find(m => m.id === selectedMonth)?.data || gallery25_01

  return (
    <Container maxW="container.xl" py={8}>
      <VStack gap={8}>
        <Heading as="h1" size="2xl">My Photo Gallery</Heading>
        <Text fontSize="xl" color="gray.600">A collection of beautiful moments</Text>
        
        <SimpleGrid
          columns={gridColumns}
          spacing={4}
          width="100%"
        >
          {months.map((month) => (
            <Box
              key={month.id}
              p={4}
              borderWidth="1px"
              borderRadius="lg"
              cursor="pointer"
              onClick={() => setSelectedMonth(month.id)}
              bg={selectedMonth === month.id ? 'blue.50' : 'white'}
              borderColor={selectedMonth === month.id ? 'blue.500' : 'gray.200'}
              transition="all 0.2s"
              _hover={{
                transform: 'translateY(-2px)',
                shadow: 'md',
                borderColor: 'blue.300'
              }}
            >
              <Text
                fontSize="lg"
                fontWeight="medium"
                textAlign="center"
                color={selectedMonth === month.id ? 'blue.600' : 'gray.700'}
              >
                {month.label}
              </Text>
            </Box>
          ))}
        </SimpleGrid>

        <Box width="100%">
          <Gallery images={selectedGallery} />
        </Box>
      </VStack>
    </Container>
  )
}

export default App
