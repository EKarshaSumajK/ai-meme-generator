"use client";

import { FileObject } from "imagekit/dist/libs/interfaces";
import ClientImage from "./ClientImage";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function ResultList({ files }: { files: FileObject }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 md:grid-cols-3 lg:gap-8">
      {files.map((image, index) => (
        <Card key={index} className="h-full">
          <CardHeader>
            <CardTitle className="text-wrap text-base sm:text-lg">{image.customMetadata.InputName ??  image.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <ClientImage
              urlEndpoint={process.env.NEXT_PUBLIC_URL_ENDPOINT || ""}
              path={image?.filePath || ""}
              width={300}
              height={300}
              alt="Alt text"
            />
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full"><Link href={`/customize/${image.fileId}`}>Edit</Link></Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
