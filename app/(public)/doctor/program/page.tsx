import React from "react";

export default function ProgramPage() {
  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">
          표준 치료 프로그램
        </h1>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <p className="text-gray-600 mb-4">
            환자에게 적용할 표준 치료 프로그램을 관리하고 설정할 수 있습니다.
          </p>
          
          {/* 치료 프로그램 설정 컨텐츠가 여기에 들어갈 예정 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <h3 className="font-semibold text-lg mb-2">기본 교정 프로그램</h3>
              <p className="text-gray-600 text-sm">
                일반적인 치아 교정을 위한 표준 프로그램입니다.
              </p>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <h3 className="font-semibold text-lg mb-2">집중 교정 프로그램</h3>
              <p className="text-gray-600 text-sm">
                빠른 교정이 필요한 환자를 위한 집중 프로그램입니다.
              </p>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <h3 className="font-semibold text-lg mb-2">유지 관리 프로그램</h3>
              <p className="text-gray-600 text-sm">
                교정 완료 후 유지 관리를 위한 프로그램입니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 