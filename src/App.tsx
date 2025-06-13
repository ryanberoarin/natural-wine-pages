import { Box, Container, Heading, Image, SimpleGrid, Text, VStack, Select, HStack, useBreakpointValue } from '@chakra-ui/react'
import { useState } from 'react'
import type { GalleryData } from './types'
import { gallery25_01 } from './data/gallery25_01'
import { gallery25_02 } from './data/gallery25_02'
import { gallery25_03 } from './data/gallery25_03'
import { gallery25_04 } from './data/gallery25_04'
import { gallery25_05 } from './data/gallery25_05'
import { gallery25_06 } from './data/gallery25_06'

function Gallery({ gallery }: { gallery: GalleryData }) {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  
  const selectedImageData = gallery.images.find(img => img.id === selectedImage)

  const handleImageClick = (id: number) => {
    setSelectedImage(id)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  const handleModalClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (!selectedImage) return

    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const isLeftClick = x < rect.width / 2

    if (isLeftClick) {
      // 이전 이미지로 이동
      const currentIndex = gallery.images.findIndex(img => img.id === selectedImage)
      const prevIndex = currentIndex > 0 ? currentIndex - 1 : gallery.images.length - 1
      setSelectedImage(gallery.images[prevIndex].id)
    } else {
      // 다음 이미지로 이동
      const currentIndex = gallery.images.findIndex(img => img.id === selectedImage)
      const nextIndex = currentIndex < gallery.images.length - 1 ? currentIndex + 1 : 0
      setSelectedImage(gallery.images[nextIndex].id)
    }
  }

  return (
    <>
      <VStack spacing={4} align="stretch" mb={8}>
        <Heading size="xl">{gallery.title}</Heading>
        {gallery.subtitle && (
          <Text fontSize="lg" color="gray.600">{gallery.subtitle}</Text>
        )}
      </VStack>

      <SimpleGrid
        columns={{ base: 1, sm: 2, md: 3, lg: 4 }}
        gap={{ base: 4, md: 6, lg: 8 }}
      >
        {gallery.images.map((image) => (
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
            cursor="pointer"
            onClick={handleModalClick}
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
            <Box
              position="absolute"
              top="50%"
              left={0}
              right={0}
              transform="translateY(-50%)"
              display="flex"
              justifyContent="space-between"
              px={4}
              pointerEvents="none"
            >
              <Text color="white" fontSize="xl" opacity={0.7}>←</Text>
              <Text color="white" fontSize="xl" opacity={0.7}>→</Text>
            </Box>
          </Box>
        </Box>
      )}
    </>
  )
}

function App() {
  const months = [
    { id: '01', label: '2025.01', data: gallery25_01 },
    { id: '02', label: '2025.02', data: gallery25_02 },
    { id: '03', label: '2025.03', data: gallery25_03 },
    { id: '04', label: '2025.04', data: gallery25_04 },
    { id: '05', label: '2025.05', data: gallery25_05 },
    { id: '06', label: '2025.06', data: gallery25_06 }
  ]

  const [selectedMonth, setSelectedMonth] = useState(months[months.length - 1].id)
  const selectWidth = useBreakpointValue({ base: '100%', md: '200px' })

  const selectedGallery = months.find(m => m.id === selectedMonth)?.data || gallery25_01

  return (
    <Container maxW="container.xl" py={8}>
      <VStack gap={8}>
        <Heading as="h1" size="2xl">자연스러운 와인 모임</Heading>
        <HStack spacing={4} width="100%" justify="center">
          <Select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            width={selectWidth}
            size="lg"
            variant="filled"
            bg="white"
            borderColor="gray.200"
            _hover={{ borderColor: 'blue.300' }}
            _focus={{ borderColor: 'blue.500', boxShadow: '0 0 0 1px var(--chakra-colors-blue-500)' }}
          >
            {months.map((month) => (
              <option key={month.id} value={month.id}>
                {month.label}
              </option>
            ))}
          </Select>
        </HStack>

        <Box width="100%">
          <Gallery gallery={selectedGallery} />
        </Box>
      </VStack>
    </Container>
  )
}

export default App
