import type { Metadata } from "next";
import { Crimson_Pro, Nanum_Gothic, Nanum_Myeongjo } from "next/font/google";
import "./globals.css";

// 영문 지정서체 Athelas의 웹 대체 서체
const crimson = Crimson_Pro({
  variable: "--font-crimson",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  style: ["normal", "italic"],
});

// 국문 지정서체 나눔스퀘어 / 보조 윤명조의 웹 대체 서체
const nanumGothic = Nanum_Gothic({
  variable: "--font-nanum-gothic",
  weight: ["400", "700", "800"],
  preload: false,
});

const nanumMyeongjo = Nanum_Myeongjo({
  variable: "--font-nanum-myeongjo",
  weight: ["400", "700"],
  preload: false,
});

export const metadata: Metadata = {
  title: "프랜시스파커 동탄 | Francis Parker Dongtan",
  description:
    "어떤 1%는 99%와 다르게 시작합니다. 프랜시스파커 동탄은 아이들의 창의성과 잠재력을 개발하여 글로벌 인재로 키워냅니다.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ko"
      className={`${crimson.variable} ${nanumGothic.variable} ${nanumMyeongjo.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
