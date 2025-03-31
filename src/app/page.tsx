"use client";
import { Button } from "@/components/ui/button"
import { IKImage, ImageKitProvider, IKUpload } from "imagekitio-next";
import {
  IKUploadResponse,
  UploadError,
} from "imagekitio-next/dist/types/components/IKUpload/props";
import { useRef, useState } from "react";
export default function Home() {
  const urlEndpoint = process.env.NEXT_PUBLIC_URL_ENDPOINT;
  const publicKey = process.env.NEXT_PUBLIC_PUBLIC_KEY;
  const authenticator = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/auth");

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Request failed with status ${response.status}: ${errorText}`
        );
      }

      const data = await response.json();
      const { signature, expire, token } = data;
      return { signature, expire, token };
    } catch (error) {
      throw new Error(`Authentication request failed: ${error}`);
    }
  };
  const onError = (err: UploadError) => {
    console.log("Error", err);
  };
  const [url, setUrl] = useState<string[]>([]);
  const onSuccess = (res: IKUploadResponse) => {
    setUrl((prevUrl) => [...prevUrl, res?.filePath]);
    console.log("Success", res);
  };
  const onUploadProgress = (progress) => {
    console.log("Progress", progress);
  };

  const onUploadStart = (evt) => {
    console.log("Start", evt);
  };
  const ikUploadRefTest = useRef(null);

  return (
    <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            <ImageKitProvider
        publicKey={publicKey}
        urlEndpoint={urlEndpoint}
        authenticator={authenticator}
      >
        <div>
          <h2 className="text-3xl font-bold underline">File upload</h2>
          <p>Upload an image with advanced options</p>
          <IKUpload
            fileName="test-upload.jpg"
            tags={["sample-tag1", "sample-tag2"]}
            customCoordinates={"10,10,10,10"}
            isPrivateFile={false}
            useUniqueFileName={true}
            responseFields={["tags"]}
            validateFile={(file) => file.size < 2000000}
            folder={"/sample-folder"}
            webhookUrl="https://www.example.com/imagekit-webhook" // replace with your webhookUrl
            overwriteFile={true}
            overwriteAITags={true}
            overwriteTags={true}
            overwriteCustomMetadata={true}
            onError={onError}
            onSuccess={onSuccess}
            onUploadProgress={onUploadProgress}
            onUploadStart={onUploadStart}
            transformation={{
              pre: "l-text,i-Imagekit,fs-50,l-end",
              post: [
                {
                  type: "transformation",
                  value: "w-100",
                },
              ],
            }}
            style={{ display: "none" }} // hide the default input and use the custom upload button
            ref={ikUploadRefTest}
          />
          <p>Custom Upload Button</p>
          {ikUploadRefTest && (
            <Button onClick={() => ikUploadRefTest.current.click()}>
              Upload
            </Button>
          )}
          <p>Abort upload request</p>
          {ikUploadRefTest && (
            <Button onClick={() => ikUploadRefTest.current.abort()}>
              Abort request
            </Button>
          )}
        </div>
        {url.map((urls: string, key: number) => (
          <IKImage
            key={key}
            urlEndpoint={urlEndpoint}
            path={urls}
            width={400}
            height={400}
            alt="Alt text"
          />
        ))}
      </ImageKitProvider>
            </div>
          </div>
        </div>
      
  );
}
