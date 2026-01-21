'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { isAdminLoggedIn } from '@/lib/adminConfig';

export function ProtectedRoute({ children }) {
  const router = useRouter();

  useEffect(() => {
    if (!isAdminLoggedIn()) {
      router.push('/admin/login');
    }
  }, [router]);

  if (!isAdminLoggedIn()) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="spinner" />
      </div>
    );
  }

  return <>{children}</>;
}