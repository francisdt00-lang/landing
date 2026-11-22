import Image from "next/image";
import ContactForm from "./contact-form";

const NAV = [
  { href: "#philosophy", label: "교육철학" },
  { href: "#programs", label: "프로그램" },
  { href: "#admission", label: "입학안내" },
  { href: "#contact", label: "상담문의" },
];

// BI BS-03 심볼마크 구성
const SYMBOLS = [
  { en: "Crown", ko: "왕관", meaning: "권위와 전통" },
  { en: "Lion", ko: "사자", meaning: "용맹과 기상" },
  { en: "Star", ko: "별", meaning: "희망" },
  { en: "Book", ko: "책", meaning: "학문과 지혜" },
  { en: "Shield", ko: "방패", meaning: "절제와 인내" },
];

const PROGRAMS = [
  {
    title: "정규 영어 유치부",
    en: "Kindergarten",
    age: "5세 – 7세",
    tags: ["Language Art", "Immersion", "Book Club"],
    desc: "하루 종일 영어로 생각하고 표현하는 몰입 환경 속에서 언어 감각과 사고력을 함께 키웁니다.",
    classes: ["5A", "6A", "6AB", "6B", "7B", "7C"],
  },
  {
    title: "오후 영어 유치부",
    en: "Afternoon Class",
    age: "5세 – 7세",
    tags: ["Phonics", "Speaking", "Reading"],
    desc: "유치원 이후 시간에 파닉스부터 말하기·읽기까지 단계별로 영어의 기초를 탄탄하게 다집니다.",
  },
];

function Crest({
  className = "",
  loading,
}: {
  className?: string;
  loading?: "eager" | "lazy";
}) {
  return (
    <Image
      src="/brand/logo-vertical.png"
      alt=""
      width={1063}
      height={898}
      className={className}
      loading={loading}
      aria-hidden
    />
  );
}

export default function Home() {
  return (
    <>
      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-brand/10 bg-cream/90 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:h-20 sm:px-6">
          <a href="#" aria-label="프랜시스파커 동탄 홈">
            <Image
              src="/brand/logo-horizontal.png"
              alt="Francis Parker Dongtan"
              width={1182}
              height={395}
              priority
              className="h-9 w-auto sm:h-11"
            />
          </a>
          <nav className="hidden items-center gap-8 text-[15px] font-bold text-brand md:flex">
            {NAV.map((n) => (
              <a key={n.href} href={n.href} className="transition-colors hover:text-gold">
                {n.label}
              </a>
            ))}
          </nav>
          <a
            href="#contact"
            className="rounded-full bg-brand px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-brand-700 sm:px-5 sm:py-2.5"
          >
            입학 상담
          </a>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden bg-brand text-white">
          <Crest className="pointer-events-none absolute top-1/2 hidden w-[520px] max-w-none -translate-y-1/2 opacity-[0.07] brightness-0 invert sm:-right-24 sm:block lg:right-10 lg:w-[560px]" />
          <div className="relative mx-auto max-w-6xl px-4 py-24 sm:px-6 sm:py-32 lg:py-40">
            <p className="font-serif text-sm tracking-[0.35em] text-beige uppercase">
              Francis Parker Collegiate · Dongtan
            </p>
            <h1 className="mt-6 max-w-2xl font-myeongjo text-4xl leading-tight font-bold sm:text-5xl lg:text-6xl lg:leading-[1.15]">
              어떤 1%는
              <br />
              99%와 다르게 시작합니다.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/80">
              프랜시스파커는 아이들의 창의성과 잠재력을 개발하여
              <br className="hidden sm:block" /> 글로벌 인재로 키워냅니다.
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <a
                href="#admission"
                className="inline-flex h-12 items-center justify-center rounded-full bg-beige px-7 font-bold text-brand transition-colors hover:bg-white"
              >
                2027학년도 입학 안내
              </a>
              <a
                href="#programs"
                className="inline-flex h-12 items-center justify-center rounded-full border border-white/40 px-7 font-bold transition-colors hover:bg-white/10"
              >
                프로그램 보기
              </a>
            </div>
          </div>
          <div className="h-1.5 bg-gradient-to-r from-gold via-beige to-gold" />
        </section>

        {/* Slogan */}
        <section className="border-b border-brand/10 bg-white">
          <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 sm:py-20">
            <p className="font-serif text-2xl leading-snug text-brand italic sm:text-3xl">
              “Children develop their language and critical thinking skills through an
              engaging and exciting process of discovery.”
            </p>
            <p className="mt-5 font-serif text-sm tracking-[0.3em] text-warmgray uppercase">
              — Francis Parker Collegiate
            </p>
          </div>
        </section>

        {/* Philosophy */}
        <section id="philosophy" className="scroll-mt-20 py-20 sm:py-28">
          <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
            <div className="flex justify-center">
              <Crest className="w-64 sm:w-80" loading="eager" />
            </div>
            <div>
              <SectionLabel>Our Philosophy</SectionLabel>
              <h2 className="mt-3 font-myeongjo text-3xl leading-snug font-bold text-brand sm:text-4xl">
                전통, 권위, 지혜를 갖춘
                <br />
                미래 인재를 키웁니다
              </h2>
              <p className="mt-5 leading-relaxed text-warmgray">
                프랜시스파커의 엠블럼에는 아이들이 자라 갖추길 바라는 가치가 담겨 있습니다.
                원칙을 중시하면서도 창조를 향해 열린 마음으로, 아이 한 명 한 명이 스스로
                발견하는 즐거움을 경험하도록 이끕니다.
              </p>
              <ul className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {SYMBOLS.map((s) => (
                  <li
                    key={s.en}
                    className="rounded-xl border border-brand/10 bg-white px-4 py-4"
                  >
                    <p className="font-serif text-xs tracking-[0.2em] text-gold uppercase">
                      {s.en}
                    </p>
                    <p className="mt-1 font-bold text-brand">{s.ko}</p>
                    <p className="text-sm text-warmgray">{s.meaning}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Programs */}
        <section id="programs" className="scroll-mt-20 bg-brand-50 py-20 sm:py-28">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="text-center">
              <SectionLabel>Programs</SectionLabel>
              <h2 className="mt-3 font-myeongjo text-3xl font-bold text-brand sm:text-4xl">
                교육 프로그램
              </h2>
            </div>
            <div className="mt-12 grid gap-6 md:grid-cols-2">
              {PROGRAMS.map((p) => (
                <article
                  key={p.title}
                  className="flex flex-col rounded-2xl border-t-4 border-brand bg-white p-8 shadow-sm"
                >
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="text-2xl font-extrabold text-brand">{p.title}</h3>
                    <span className="shrink-0 rounded-full bg-beige/30 px-3 py-1 text-sm font-bold text-brand">
                      {p.age}
                    </span>
                  </div>
                  <p className="mt-1 font-serif text-lg text-gold italic">{p.en}</p>
                  <p className="mt-4 leading-relaxed text-warmgray">{p.desc}</p>
                  <ul className="mt-6 flex flex-wrap gap-2">
                    {p.tags.map((t) => (
                      <li
                        key={t}
                        className="rounded-md border border-brand/15 px-3 py-1 font-serif text-[15px] text-brand"
                      >
                        {t}
                      </li>
                    ))}
                  </ul>
                  {p.classes && (
                    <p className="mt-auto pt-6 text-sm text-warmgray">
                      운영 반 · {p.classes.join(" · ")}
                    </p>
                  )}
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Admission */}
        <section id="admission" className="scroll-mt-20 py-20 sm:py-28">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="relative overflow-hidden rounded-3xl bg-brand px-6 py-14 text-center text-white sm:px-12 sm:py-20">
              <Crest className="pointer-events-none absolute -bottom-16 -left-16 w-72 opacity-[0.06] brightness-0 invert" />
              <SectionLabel light>Admission</SectionLabel>
              <h2 className="mt-3 font-myeongjo text-3xl font-bold sm:text-4xl">
                2027학년도 정규유치부 신입생 모집
              </h2>
              <p className="mx-auto mt-5 max-w-xl leading-relaxed text-white/80">
                입학설명회 일정과 반 배정, 셔틀버스 운행 등 입학에 관한 자세한 내용은
                상담을 통해 안내해 드립니다.
              </p>
              <a
                href="#contact"
                className="mt-9 inline-flex h-12 items-center justify-center rounded-full bg-beige px-8 font-bold text-brand transition-colors hover:bg-white"
              >
                입학 상담 신청하기
              </a>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="scroll-mt-20 bg-white py-20 sm:py-28">
          <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_1.3fr] lg:gap-20">
            <div>
              <SectionLabel>Contact</SectionLabel>
              <h2 className="mt-3 font-myeongjo text-3xl leading-snug font-bold text-brand sm:text-4xl">
                상담 문의
              </h2>
              <p className="mt-5 leading-relaxed text-warmgray">
                궁금한 점을 남겨주시면 확인 후 담당 선생님이 연락드리겠습니다.
              </p>
            </div>
            <div className="rounded-2xl border border-brand/10 bg-cream p-6 sm:p-8">
              <ContactForm />
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-brand text-white/70">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-12 sm:flex-row sm:items-end sm:justify-between sm:px-6">
          <Image
            src="/brand/logo-horizontal.png"
            alt="Francis Parker Dongtan"
            width={1182}
            height={395}
            className="h-10 w-auto brightness-0 invert"
          />
          <p className="text-sm">
            © 프랜시스파커 동탄. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  );
}

function SectionLabel({
  children,
  light = false,
}: {
  children: React.ReactNode;
  light?: boolean;
}) {
  return (
    <p
      className={`font-serif text-sm tracking-[0.3em] uppercase ${light ? "text-beige" : "text-gold"}`}
    >
      {children}
    </p>
  );
}
