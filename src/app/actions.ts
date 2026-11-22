"use server";

import { db } from "@/db";
import { inquiries } from "../../drizzle/schema";
import {
  normalizeInquiry,
  validateInquiry,
  type InquiryErrors,
  type InquiryValues,
} from "@/lib/inquiry";

export type SubmitInquiryResult =
  | { ok: true }
  | { ok: false; errors?: InquiryErrors; message?: string };

function asString(v: unknown) {
  return typeof v === "string" ? v : "";
}

// 누구나 호출할 수 있는 공개 엔드포인트이므로 입력을 신뢰하지 않고 다시 검증한다.
export async function submitInquiry(input: unknown): Promise<SubmitInquiryResult> {
  const obj = (input && typeof input === "object" ? input : {}) as Record<string, unknown>;

  // 허니팟: 사람에게는 보이지 않는 필드. 값이 있으면 봇으로 보고 저장하지 않는다.
  if (asString(obj.website)) return { ok: true };

  const raw: InquiryValues = {
    name: asString(obj.name),
    email: asString(obj.email),
    phone: asString(obj.phone),
    message: asString(obj.message),
  };

  const errors = validateInquiry(raw);
  if (Object.keys(errors).length > 0) return { ok: false, errors };

  try {
    await db.insert(inquiries).values(normalizeInquiry(raw));
    return { ok: true };
  } catch (err) {
    console.error("[submitInquiry] 문의 저장 실패", err);
    return {
      ok: false,
      message: "문의를 접수하지 못했습니다. 잠시 후 다시 시도해 주세요.",
    };
  }
}
