"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { IKUpload } from "imagekitio-next";
import {
  IKUploadResponse,
  UploadError,
} from "imagekitio-next/dist/types/components/IKUpload/props";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { Loader2 } from "lucide-react";

export default function UploadMeme() {
  const router = useRouter();
  const ikUploadRefTest = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const onError = (err: UploadError) => {
    console.log("Error", err);
    setIsLoading(false);
  };
  const onSuccess = (res: IKUploadResponse) => {
    router.push(`/customize/${res.fileId}`);
    console.log("Success", res);
    setIsLoading(false);
  };
  const onUploadProgress = (progress) => {
    console.log("Progress", progress);
  };

  const onUploadStart = (evt) => {
    console.log("Start", evt);
    setIsLoading(true);
  };
  const [InputName,setInputName] = useState("")
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Upload Meme</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload your Meme template</DialogTitle>
          {/* <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription> */}
          <br></br>
          <form
            className="space-y-6"
            onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.target as HTMLFormElement);
              const InputName = formData.get("InputName") as string;
            }}
          >
            <div className="space-y-2">
              <Label htmlFor="InputName">Name</Label>
              <Input
                id="InputName"
                name="InputName"
                placeholder="Enter Name"
                required
                value={InputName}
                onChange={(e)=>setInputName(e.target.value)}
              />
              <IKUpload
              fileName={InputName}
                tags={["sample-tag1", "sample-tag2"]}
                customCoordinates={"10,10,10,10"}
                customMetadata={{InputName}}
                isPrivateFile={false}
                useUniqueFileName={true}
                responseFields={["tags"]}
                validateFile={(file) => file.size < 2000000}
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
            </div>
            <DialogFooter className="flex justify-end w-full">
              <DialogClose asChild>
                <Button type="button" className="flex-1" variant="secondary">
                  Close
                </Button>
              </DialogClose>
              <Button
                type="button"
                className="flex-1"
                onClick={() => ikUploadRefTest.current?.click()}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Uploading...
                  </>
                ) : (
                  "Select Image & Upload"
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
