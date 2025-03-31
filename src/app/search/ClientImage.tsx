'use client';

import { IKImage } from "imagekitio-next";

interface ClientImageProps {
  urlEndpoint: string;
  path: string;
  width: number;
  height: number;
  alt: string;
}

export default function ClientImage({ urlEndpoint, path, width, height, alt }: ClientImageProps) {
  return (
    <div className="w-full h-full overflow-hidden">
      <IKImage
        urlEndpoint={urlEndpoint}
        path={path}
        width={width}
        height={height}
        alt={alt}
        className="w-full h-auto object-cover"

      />
    </div>
  );
} 