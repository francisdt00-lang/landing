// 상담 문의 폼 검증 규칙 — 브라우저(contact-form.tsx)와 서버(actions.ts)가 함께 쓴다.
// DB 제약조건(drizzle/schema.ts)과 같은 기준을 유지할 것.

export type InquiryField = "name" | "email" | "phone" | "message";
export type InquiryValues = Record<InquiryField, string>;
export type InquiryErrors = Partial<Record<InquiryField, string>>;

export const MESSAGE_MIN = 10;
export const MESSAGE_MAX = 1000;
const NAME_MAX = 100;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^0\d{1,2}-?\d{3,4}-?\d{4}$/;

export function normalizeInquiry(data: InquiryValues): InquiryValues {
  return {
    name: data.name.trim(),
    email: data.email.trim(),
    phone: data.phone.trim(),
    message: data.message.trim(),
  };
}

export function validateInquiry(raw: InquiryValues): InquiryErrors {
  const data = normalizeInquiry(raw);
  const errors: InquiryErrors = {};

  if (!data.name) errors.name = "이름을 입력해 주세요.";
  else if (data.name.length > NAME_MAX) errors.name = `이름은 ${NAME_MAX}자 이하로 입력해 주세요.`;

  if (!data.email) errors.email = "이메일을 입력해 주세요.";
  else if (data.email.length > 320 || !EMAIL_RE.test(data.email))
    errors.email = "올바른 이메일 형식이 아닙니다.";

  if (!data.phone) errors.phone = "전화번호를 입력해 주세요.";
  else if (!PHONE_RE.test(data.phone)) errors.phone = "예: 010-1234-5678";

  if (!data.message) errors.message = "문의 내용을 입력해 주세요.";
  else if (data.message.length < MESSAGE_MIN)
    errors.message = `문의 내용은 ${MESSAGE_MIN}자 이상 입력해 주세요.`;
  else if (data.message.length > MESSAGE_MAX)
    errors.message = `문의 내용은 ${MESSAGE_MAX}자 이하로 입력해 주세요.`;

  return errors;
}
