import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="flex-1 flex flex-col justify-center items-center px-4 py-8">
      {/* Header */}
      <header className="flex flex-col gap-5 items-center mb-16 w-[356px] max-md:w-full max-md:max-w-[356px]">
        <h1 className="text-[52px] font-bold leading-[24px] text-center text-[var(--aiortho-primary)] max-sm:text-4xl">
          AIOrtho
        </h1>
        <p className="text-[22px] leading-[22px] text-center text-[var(--aiortho-gray-600)] max-md:text-lg max-sm:text-base">
          아이 사경 치료 관리자 페이지
        </p>
      </header>

      {/* Login Actions */}
      <section className="inline-flex gap-5 items-center mb-12 w-[356px] max-md:w-full max-md:max-w-[356px] max-sm:flex-col max-sm:gap-4 max-sm:w-full">
        <Link
          href="/doctor/auth"
          className="flex gap-2.5 justify-center items-center px-5 py-4 h-16 rounded-2xl cursor-pointer w-[168px] max-sm:w-full max-sm:max-w-[280px] transition-colors duration-200 focus:outline-none bg-[var(--aiortho-primary)] hover:bg-sky-800"
          aria-label="의사로 로그인"
        >
          <span className="text-lg font-bold leading-6 text-white">의사로 접속</span>
        </Link>

        <Link
          href="/nurse/auth"
          className="flex gap-2.5 justify-center items-center px-5 py-4 h-16 rounded-2xl cursor-pointer w-[168px] max-sm:w-full max-sm:max-w-[280px] transition-colors duration-200 focus:outline-none bg-[var(--aiortho-gray-800)] hover:bg-gray-800"
          aria-label="간호사로 로그인"
        >
          <span className="text-lg font-bold leading-6 text-white">간호사로 접속</span>
        </Link>
      </section>

      {/* Registration Link */}
      {/* FIXME: 기획 보류 */}
      {/* <div className="flex flex-col  items-center w-[540px] max-md:w-full max-md:max-w-[540px] max-sm:box-border max-sm:px-5 max-sm:w-full">
        <Link
          href="/doctor/auth/pre-register"
          className="text-sm leading-5 text-center underline cursor-pointer decoration-auto decoration-solid text-slate-500 underline-offset-auto w-full hover:text-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 transition-colors duration-200 py-2"
          aria-label="회원가입 페이지로 이동"
        >
          처음 방문하셨나요?
        </Link>
      </div> */}
    </div>
  );
}
