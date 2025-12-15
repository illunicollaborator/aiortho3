import Link from 'next/link';

const Footer = () => {
  return (
    <div className="bg-[#f3f6fb] min-h-[240px] w-full shrink-0 flex">
      <div className="flex-1 justify-center flex flex-col md:flex-row md:items-center gap-5 md:gap-15 lg:gap-20 mx-8 py-8">
        <div className="space-y-2">
          <h1 className="text-sm font-semibold text-[color:var(--aiortho-gray-500)]">
            고객 문의센터
          </h1>
          <div className="flex flex-col gap-1">
            <p className="text-xs font-normal text-[color:var(--aiortho-gray-500)]">
              전화번호 : 010-2639-8237 (운영시간: 평일 08:00 – 19:00)
            </p>
            <p className="text-xs font-normal text-[color:var(--aiortho-gray-500)]">
              이메일 :{' '}
              <a href="mailto:contact@aibrio.net" className="underline">
                contact@aibrio.net
              </a>{' '}
              (365일 24시간 문의 가능)
            </p>
            {/* <p className="text-xs font-normal text-[color:var(--aiortho-gray-500)]">
              법인명 : 아이브리오㈜, 대표자 : 김재원
            </p> */}
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="text-sm font-semibold text-[color:var(--aiortho-gray-500)]">
            서비스 기본약관
          </h1>
          <div className="flex flex-col gap-1">
            <Link href="/doctor/auth/join-membership/service" target="_blank">
              <p className="text-xs font-normal text-[color:var(--aiortho-gray-500)]">
                서비스 이용약관
              </p>
            </Link>
            <Link href="/doctor/auth/join-membership/agree" target="_blank">
              <p className="text-xs font-normal text-[color:var(--aiortho-gray-500)]">
                개인정보 처리방침
              </p>
            </Link>
          </div>
        </div>
        <div className="space-y-2">
          <h1 className="text-sm font-semibold text-[color:var(--aiortho-gray-500)]">
            (주)아이브리오
          </h1>
          <div className="flex flex-col gap-1">
            <p className="text-xs font-normal text-[color:var(--aiortho-gray-500)]">
              사업자등록번호: 119-88-03920 | 대표 김재원
            </p>
            <p className="text-xs font-normal text-[color:var(--aiortho-gray-500)]">
              주소: 경기도 부천시 원미구 소사로 487, 틔움C-14 (춘의동, 부천R&D종합센터)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
