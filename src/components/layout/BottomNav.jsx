'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, BookOpen, Calculator, FileText, Shield } from 'lucide-react';
import { cn } from '@/lib/utils';

export function BottomNav() {
  const pathname = usePathname();

  const navItems = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/chapters', label: 'Chapters', icon: BookOpen },
    { href: '/calculator', label: 'Calc', icon: Calculator },
    { href: '/mock-test', label: 'Test', icon: FileText },
    { href: '/safety', label: 'Safety', icon: Shield },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 glass-card border-t border-white/10">
      <div className="flex items-center justify-around h-16">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex flex-col items-center justify-center flex-1 h-full transition-all',
                isActive
                  ? 'text-accent'
                  : 'text-white/50 hover:text-white/80'
              )}
            >
              <Icon className={cn('w-6 h-6 transition-transform duration-300', isActive && 'scale-110')} />
              <span className="text-xs mt-1 font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}