export interface ImageData {
  id: number
  url: string
  title: string
  description: string
}

export interface GalleryData {
  title: string
  subtitle?: string
  images: ImageData[]
} 