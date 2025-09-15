'use client';

import { Fragment } from 'react';
import { usePathname } from 'next/navigation';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { findRouteByPath, generateDynamicLabel } from '@/constants/routes';
import Link from 'next/link';

const isNotClickablePath = ['/profile', '/prescriptions'];

// 클릭 가능한 링크인지 판단하는 함수
const isClickableLink = (path: string, routeExists: boolean): boolean => {
  if (isNotClickablePath.includes(path)) return false;

  // routes.ts에 정의되지 않은 경로는 클릭 불가
  if (!routeExists) return false;

  // 동적 라우트 매개변수 패턴 확인
  const segments = path.split('/').filter(Boolean);
  const lastSegment = segments[segments.length - 1];

  // 숫자로만 구성된 세그먼트가 있는 경우
  if (lastSegment && /^\d+$/.test(lastSegment)) {
    // routes.ts에 정의된 동적 라우트와 매칭되는지 확인
    const routeInfo = findRouteByPath(path);

    // 동적 라우트 패턴([id], [slug] 등)과 매칭되는 경우에는 클릭 가능
    if (routeInfo && routeInfo.path.includes('[') && routeInfo.path.includes(']')) {
      return true;
    }

    // 그 외의 경우는 클릭 불가
    return false;
  }

  return true;
};

interface Breadcrumb {
  key: string;
  label: string;
  path: string;
  isClickable: boolean;
  routeExists: boolean;
}

// 경로 세그먼트에서 브레드크럼 정보를 생성하는 함수
export const generateBreadcrumbs = (pathname: string): Array<Breadcrumb> => {
  const pathSegments = pathname.split('/').filter(Boolean);
  const breadcrumbs: Array<Breadcrumb> = [];

  for (let i = 0; i < pathSegments.length; i++) {
    const currentPath = '/' + pathSegments.slice(0, i + 1).join('/');
    const routeInfo = findRouteByPath(currentPath);
    const routeExists = routeInfo !== null;

    if (routeInfo) {
      // 동적 라우트인 경우 더 나은 label 생성
      const label = generateDynamicLabel(currentPath);
      breadcrumbs.push({
        ...routeInfo,
        label,
        path: currentPath, // 동적 라우트 패턴 대신 실제 경로 사용
        isClickable: false,
        routeExists,
      });
    } else {
      // ROUTES에 없는 경로는 세그먼트를 그대로 사용
      breadcrumbs.push({
        key: pathSegments[i],
        label: decodeURIComponent(pathSegments[i]),
        path: currentPath,
        isClickable: false,
        routeExists,
      });
    }
  }

  // 클릭 가능 여부 계산
  breadcrumbs.forEach(breadcrumb => {
    breadcrumb.isClickable = isClickableLink(breadcrumb.path, breadcrumb.routeExists);
  });

  return breadcrumbs;
};

const Breadcrumb = () => {
  const pathname = usePathname();
  const breadcrumbs = generateBreadcrumbs(pathname);

  return (
    <nav className="w-full h-12 py-3 mb-13 flex items-center">
      <div className="flex items-center">
        {breadcrumbs.map((breadcrumb, index) => {
          const isLast = index === breadcrumbs.length - 1;

          return (
            <Fragment key={breadcrumb.path}>
              {index > 0 && (
                <ChevronRight className="w-4 h-4 stroke-3 text-[var(--aiortho-gray-400)] mx-2" />
              )}

              {breadcrumb.isClickable ? (
                <Link
                  href={breadcrumb.path}
                  className={cn(
                    'text-[13px] text-[var(--aiortho-gray-400)] hover:text-[var(--aiortho-gray-600)] cursor-pointer transition-colors',
                    isLast && 'text-[var(--aiortho-gray-600)] font-medium'
                  )}
                  onClick={e => {
                    if (isLast) {
                      e.preventDefault();
                      window.location.reload();
                    }
                  }}
                >
                  {breadcrumb.label}
                </Link>
              ) : (
                <span
                  className={cn(
                    'text-[13px] cursor-default',
                    isLast
                      ? 'text-[var(--aiortho-gray-600)] font-medium'
                      : 'text-[var(--aiortho-gray-400)]'
                  )}
                >
                  {breadcrumb.label}
                </span>
              )}
            </Fragment>
          );
        })}
      </div>
    </nav>
  );
};

export default Breadcrumb;
