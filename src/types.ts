export interface ImageData {
  id: number
  url: string
  title: string
  country: string
  region: string
  type: string
  grape: string
  style: string
  tastingNotes: string
}

export interface GalleryData {
  title: string
  subtitle?: string
  images: ImageData[]
} 