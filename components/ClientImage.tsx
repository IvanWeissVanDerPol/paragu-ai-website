'use client'

interface Props {
  src: string
  alt: string
  className?: string
}

export default function ClientImage({ src, alt, className }: Props) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      className={className}
      onError={(e) => {
        const img = e.target as HTMLImageElement
        img.src = img.src.replace('.jpg', '.svg')
      }}
    />
  )
}
