import React from 'react'

const Footer = () => {
  return (
    <div className="bg-[#f3f6fb] h-[240px] w-full shrink-0 flex">
      <div className="w-[95%] md:w-[70%] mx-auto flex items-center gap-5 md:gap-20">
        <div className="space-y-2">
          <h1 className='text-sm font-semibold text-[color:var(--aiortho-gray-500)]'>Copyright © AIOrtho. All Rights Reserved.</h1>
          <div className='flex flex-col gap-1'>
            <p className='text-xs font-normal text-[color:var(--aiortho-gray-500)]'>사업자등록번호 120-00-00000 | 대표 홍길동</p>
            <p className='text-xs font-normal text-[color:var(--aiortho-gray-500)]'>서울시 서초구 효령로 30</p>
          </div>
        </div>

          <div className="space-y-2">
          <h1 className='text-sm font-semibold text-[color:var(--aiortho-gray-500)]'>서비스 기본약관</h1>
          <div className='flex flex-col gap-1'>
            <p className='text-xs font-normal text-[color:var(--aiortho-gray-500)]'>서비스 이용약관</p>
            <p className='text-xs font-normal text-[color:var(--aiortho-gray-500)]'>개인정보 처리방침</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer