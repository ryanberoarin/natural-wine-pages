import { Box, Container, Heading, Image, SimpleGrid, Text, VStack, Select, HStack, useBreakpointValue } from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import type { GalleryData } from './types'
import { gallery25_01 } from './data/gallery25_01'
import { gallery25_02 } from './data/gallery25_02'
import { gallery25_03 } from './data/gallery25_03'
import { gallery25_04 } from './data/gallery25_04'
import { gallery25_05 } from './data/gallery25_05'
import { gallery25_06 } from './data/gallery25_06'
import { gallery25_07 } from './data/gallery25_07'

function Gallery({ gallery }: { gallery: GalleryData }) {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [touchStartX, setTouchStartX] = useState<number | null>(null)
  
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

  // ESC 키 핸들러 추가
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isModalOpen) {
        handleCloseModal()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isModalOpen])

  // 터치 이벤트 핸들러 추가
  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0]
    setTouchStartX(touch.clientX)
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStartX || !selectedImage) return

    const touch = e.changedTouches[0]
    const touchEndX = touch.clientX
    const diff = touchStartX - touchEndX

    // 최소 스와이프 거리 설정 (50px)
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        // 왼쪽으로 스와이프 - 다음 이미지
        const currentIndex = gallery.images.findIndex(img => img.id === selectedImage)
        const nextIndex = currentIndex < gallery.images.length - 1 ? currentIndex + 1 : 0
        setSelectedImage(gallery.images[nextIndex].id)
      } else {
        // 오른쪽으로 스와이프 - 이전 이미지
        const currentIndex = gallery.images.findIndex(img => img.id === selectedImage)
        const prevIndex = currentIndex > 0 ? currentIndex - 1 : gallery.images.length - 1
        setSelectedImage(gallery.images[prevIndex].id)
      }
    }
    setTouchStartX(null)
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
              <VStack align="start" spacing={1} mt={2}>
                <Text color="gray.600"><b>순서:</b> {image.id}</Text>
                <Text color="gray.600"><b>국가/지역:</b> {image.country} / {image.region}</Text>
                <Text color="gray.600"><b>타입:</b> {image.type}</Text>
                <Text color="gray.600"><b>품종:</b> {image.grape}</Text>
                <Text color="gray.600"><b>스타일:</b> {image.style}</Text>
                <Text color="gray.600"><b>테이스팅 노트:</b> {image.tastingNotes}</Text>
              </VStack>
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
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
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
              <VStack align="start" spacing={1} mt={2}>
                <Text><b>순서:</b> {selectedImageData.id}</Text>
                <Text><b>국가/지역:</b> {selectedImageData.country} / {selectedImageData.region}</Text>
                <Text><b>타입:</b> {selectedImageData.type}</Text>
                <Text><b>품종:</b> {selectedImageData.grape}</Text>
                <Text><b>스타일:</b> {selectedImageData.style}</Text>
                <Text><b>테이스팅 노트:</b> {selectedImageData.tastingNotes}</Text>
              </VStack>
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
    { id: '06', label: '2025.06', data: gallery25_06 },
    { id: '07', label: '2025.07', data: gallery25_07 }
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
