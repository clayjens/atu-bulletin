import { ImageResponse } from "next/og";

export async function GET() {
  return new ImageResponse(
    (
      <div tw="flex flex-col w-full h-full items-center justify-center bg-white">
        <div tw="bg-gray-50 flex items-center justify-center w-full">
          <div tw="flex flex-col md:flex-row w-full py-12 px-4 md:items-center justify-between p-8">
            <h2 tw="flex flex-col text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 text-left">
              <span tw="text-red-600 ml-10">
                <span tw="absolute top-[50%] -left-10">📌</span> The Placeholder
              </span>
              <span tw="ml-11 text-xl tracking-tight text-gray-600">
                Find events near you.
              </span>
            </h2>
          </div>
        </div>
      </div>
    ),
    {
      width: 400,
      height: 200,
    }
  );
}
