import Link from 'next/link';
import { Heart, Mail, Globe, Zap } from 'lucide-react';

export function Footer() {
  const quickLinks = [
    { href: '/chapters', label: 'Chapters' },
    { href: '/calculator', label: 'Calculators' },
    { href: '/mock-test', label: 'Mock Tests' },
    { href: '/safety', label: 'Safety' },
  ];

  const legalLinks = [
    { href: '/privacy', label: 'Privacy Policy' },
    { href: '/about', label: 'About Us' },
    { href: '/iti-links', label: 'ITI Links' },
  ];

  return (
    <footer className="mt-20 border-t border-white/10">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold">ITI Electrician Pro</h3>
                <p className="text-xs text-white/50">Learn. Practice. Excel.</p>
              </div>
            </div>
            <p className="text-sm text-white/70">
              Complete learning platform for ITI Electrician students with chapters, tests, calculators & more.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 hover:text-accent transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 hover:text-accent transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm text-white/70">
                <Mail className="w-4 h-4" />
                support@itielectrician.com
              </li>
              <li className="flex items-center gap-2 text-sm text-white/70">
                <Globe className="w-4 h-4" />
                www.itielectrician.com
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-white/50">
              © 2024 ITI Electrician Pro. All rights reserved.
            </p>

            {/* Made by Shashank */}
            <div className="flex items-center gap-2 text-sm">
              <span className="text-white/50">Made with</span>
              <Heart className="w-4 h-4 text-red-500 animate-pulse" />
              <span className="text-white/50">by</span>
              <span className="font-bold gradient-text text-base">Shashank</span>
            </div>

            <p className="text-xs text-white/50">Version 1.0.0</p>
          </div>
        </div>
      </div>
    </footer>
  );
}