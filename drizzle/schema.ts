import { sql } from "drizzle-orm";
import { check, integer, pgTable, text, timestamp, varchar } from "drizzle-orm/pg-core";

// 홈페이지 상담 문의 폼 (src/app/contact-form.tsx) 접수 내역
// 폼의 필수 항목: 이름, 이메일, 전화번호, 문의내용(10–1000자)
export const inquiries = pgTable(
  "inquiries",
  {
    id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
    name: text("name").notNull(),
    email: varchar("email", { length: 320 }).notNull(),
    phone: varchar("phone", { length: 20 }).notNull(),
    message: text("message").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [
    check("inquiries_name_not_blank", sql`char_length(btrim(${t.name})) > 0`),
    check("inquiries_message_length", sql`char_length(${t.message}) between 10 and 1000`),
  ],
).enableRLS(); // 공개 API로는 접근 불가, 서버(Drizzle)에서만 읽고 쓴다

export type Inquiry = typeof inquiries.$inferSelect;
export type NewInquiry = typeof inquiries.$inferInsert;
