import type { ImgHTMLAttributes } from 'react';

interface ImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  srcMob?: string;
  srcTab?: string;
  alt: string;
  width: number | string;
  height: number | string;
  className?: string;
}

const Image = ({
  src,
  srcMob,
  srcTab,
  alt,
  width,
  height,
  className,
  loading = 'lazy',
  ...props
}: ImageProps) => {
  return (
    <picture>
      <source
        media='(max-width: 376px)'
        srcSet={srcMob ? srcMob : src}
      />
      <source
        media='(max-width: 769px)'
        srcSet={srcTab ? srcTab : src}
      />
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={className}
        loading={loading}
        {...props}
      />
    </picture>
  )
}

export { Image }
