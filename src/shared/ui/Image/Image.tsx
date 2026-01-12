import type { ImgHTMLAttributes } from 'react';

interface ImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  width: number | string;
  height: number | string;
  className?: string;
}

const Image = ({
  src,
  alt,
  width,
  height,
  className,
  loading = 'lazy',
  ...props
}: ImageProps) => {
  return (
    <picture>
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
  );
}

export { Image }
