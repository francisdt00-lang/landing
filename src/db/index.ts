import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "../../drizzle/schema";

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error("DATABASE_URL 환경 변수가 설정되지 않았습니다. .env 파일을 확인하세요.");
}

// Disable prefetch as it is not supported for "Transaction" pool mode
const client = postgres(connectionString, { prepare: false });

export const db = drizzle(client, { schema });

// 사용 예 (서버 컴포넌트 / 서버 액션 / 라우트 핸들러에서만):
//   import { db } from "@/db";
//   import { inquiries } from "../../drizzle/schema";
//   await db.insert(inquiries).values({ name, email, phone, message });
