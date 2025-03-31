import ImageKit from "imagekit";
import { unstable_noStore } from "next/cache";
import { ResultList } from "./resultList";
import { Button } from "@/components/ui/button";
import  UploadMeme  from "./upload-meme";

const imagekit = new ImageKit({
  publicKey: process.env.NEXT_PUBLIC_PUBLIC_KEY!,
  privateKey: process.env.PRIVATE_KEY!,
  urlEndpoint: process.env.NEXT_PUBLIC_URL_ENDPOINT!,
});

export default async function searchPage({
  searchParams,
}: {
  searchParams: { q: string };
}) {
  unstable_noStore();
  const imageList = await imagekit.listFiles({
    searchQuery: `name:${searchParams.q}`,
  });

  return (
    <>
      <div className="container mx-auto px-4 py-1">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-4xl font-bold">
            Search Result for {searchParams.q}
          </h2>
          <UploadMeme/>
        </div>
        <ResultList files={imageList}></ResultList>
      </div>
    </>
  );
}
