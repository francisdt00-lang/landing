"use client";

import { useState, type FormEvent } from "react";

type Field = "name" | "email" | "phone" | "message";
type Errors = Partial<Record<Field, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^0\d{1,2}-?\d{3,4}-?\d{4}$/;

function validate(data: Record<Field, string>): Errors {
  const errors: Errors = {};
  if (!data.name.trim()) errors.name = "이름을 입력해 주세요.";
  if (!data.email.trim()) errors.email = "이메일을 입력해 주세요.";
  else if (!EMAIL_RE.test(data.email.trim()))
    errors.email = "올바른 이메일 형식이 아닙니다.";
  if (!data.phone.trim()) errors.phone = "전화번호를 입력해 주세요.";
  else if (!PHONE_RE.test(data.phone.trim()))
    errors.phone = "예: 010-1234-5678";
  if (!data.message.trim()) errors.message = "문의 내용을 입력해 주세요.";
  else if (data.message.trim().length < 10)
    errors.message = "문의 내용은 10자 이상 입력해 주세요.";
  return errors;
}

// 숫자만 남기고 010-1234-5678 형태로 하이픈을 넣는다.
function formatPhone(value: string) {
  const d = value.replace(/\D/g, "").slice(0, 11);
  if (d.startsWith("02")) {
    if (d.length <= 2) return d;
    if (d.length <= 5) return `${d.slice(0, 2)}-${d.slice(2)}`;
    if (d.length <= 9) return `${d.slice(0, 2)}-${d.slice(2, 5)}-${d.slice(5)}`;
    return `${d.slice(0, 2)}-${d.slice(2, 6)}-${d.slice(6, 10)}`;
  }
  if (d.length <= 3) return d;
  if (d.length <= 6) return `${d.slice(0, 3)}-${d.slice(3)}`;
  if (d.length <= 10) return `${d.slice(0, 3)}-${d.slice(3, 6)}-${d.slice(6)}`;
  return `${d.slice(0, 3)}-${d.slice(3, 7)}-${d.slice(7)}`;
}

const MAX_MESSAGE = 1000;

export default function ContactForm() {
  const [values, setValues] = useState<Record<Field, string>>({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);

  function update(field: Field, value: string) {
    const next = { ...values, [field]: field === "phone" ? formatPhone(value) : value };
    setValues(next);
    if (errors[field]) setErrors((e) => ({ ...e, [field]: validate(next)[field] }));
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    const first = Object.keys(found)[0];
    if (first) {
      document.getElementById(first)?.focus();
      return;
    }
    // 백엔드 미구현: 실제 전송 없이 완료 화면만 표시한다.
    setSubmitted(true);
  }

  function reset() {
    setValues({ name: "", email: "", phone: "", message: "" });
    setErrors({});
    setSubmitted(false);
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center gap-4 py-12 text-center" role="status">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-50 text-brand">
          <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth={2.5} aria-hidden>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-xl font-bold text-brand">문의가 접수되었습니다</h2>
        <p className="text-warmgray">
          {values.name}님, 남겨주신 연락처로 빠르게 답변드리겠습니다.
        </p>
        <button
          type="button"
          onClick={reset}
          className="mt-2 rounded-lg border border-brand/30 px-4 py-2 text-sm font-bold text-brand transition-colors hover:bg-brand-50"
        >
          새 문의 작성
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <TextField
          id="name"
          label="이름"
          autoComplete="name"
          placeholder="홍길동"
          value={values.name}
          error={errors.name}
          onChange={(v) => update("name", v)}
        />
        <TextField
          id="phone"
          label="전화번호"
          type="tel"
          inputMode="numeric"
          autoComplete="tel"
          placeholder="010-1234-5678"
          value={values.phone}
          error={errors.phone}
          onChange={(v) => update("phone", v)}
        />
      </div>
      <TextField
        id="email"
        label="이메일"
        type="email"
        autoComplete="email"
        placeholder="you@example.com"
        value={values.email}
        error={errors.email}
        onChange={(v) => update("email", v)}
      />

      <div className="flex flex-col gap-1.5">
        <label htmlFor="message" className="text-sm font-bold text-brand">
          문의내용 <span className="text-gold">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={6}
          maxLength={MAX_MESSAGE}
          placeholder="문의하실 내용을 자유롭게 작성해 주세요."
          value={values.message}
          onChange={(e) => update("message", e.target.value)}
          aria-invalid={!!errors.message}
          aria-describedby="message-hint"
          className={inputClass(!!errors.message) + " resize-y"}
        />
        <div id="message-hint" className="flex justify-between text-xs">
          <span className="text-red-600">{errors.message}</span>
          <span className="text-warmgray">
            {values.message.length} / {MAX_MESSAGE}
          </span>
        </div>
      </div>

      <button
        type="submit"
        className="mt-1 h-12 rounded-full bg-brand font-bold text-white transition-colors hover:bg-brand-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
      >
        문의하기
      </button>
    </form>
  );
}

function inputClass(invalid: boolean) {
  return [
    "w-full rounded-lg border bg-white px-3.5 py-2.5 text-base outline-none transition-colors placeholder:text-silver",
    "focus:ring-2",
    invalid
      ? "border-red-500 focus:ring-red-500/30"
      : "border-silver focus:border-brand focus:ring-brand/15",
  ].join(" ");
}

function TextField({
  id,
  label,
  value,
  error,
  onChange,
  ...rest
}: {
  id: Field;
  label: string;
  value: string;
  error?: string;
  onChange: (v: string) => void;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "id" | "value" | "onChange">) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-bold text-brand">
        {label} <span className="text-gold">*</span>
      </label>
      <input
        id={id}
        name={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        className={inputClass(!!error)}
        {...rest}
      />
      {error && (
        <p id={`${id}-error`} className="text-xs text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}
