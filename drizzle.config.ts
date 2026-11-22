import { defineConfig } from "drizzle-kit";

// drizzle-kit은 Next.js 밖에서 실행되므로 .env를 직접 읽는다.
try {
  process.loadEnvFile(".env");
} catch {
  // .env가 없으면 셸 환경 변수의 DATABASE_URL을 사용
}

export default defineConfig({
  schema: "./drizzle/schema.ts",
  out: "./drizzle/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
