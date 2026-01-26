import Link from 'next/link';
import { InternalLinkSection as Section } from '@/lib/internalLinks';

type Props = {
  section: Section;
  className?: string;
};

export default function InternalLinksSection({ section, className }: Props) {
  if (!section.links || section.links.length === 0) return null;

  if (section.variant === 'breadcrumbs') {
    return (
      <nav aria-label={section.title} className={className}>
        <ol className="flex flex-wrap items-center gap-2 text-sm text-gray-500">
          {section.links.map((link, idx) => {
            const isLast = idx === section.links.length - 1;
            return (
              <li key={link.href} className="flex items-center gap-2">
                {isLast ? (
                  <span className="text-gray-800">{link.label}</span>
                ) : (
                  <Link href={link.href} className="hover:text-blue-600">
                    {link.label}
                  </Link>
                )}
                {!isLast && <span className="text-gray-300">/</span>}
              </li>
            );
          })}
        </ol>
      </nav>
    );
  }

  return (
    <section className={className}>
      <h2 className="text-xl font-bold text-blue-900 mb-4">{section.title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {section.links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={[
              'group rounded-xl border bg-white p-4 transition-all',
              link.isPrimary
                ? 'border-blue-300 hover:border-blue-500 hover:bg-blue-50'
                : 'border-gray-100 hover:border-blue-200 hover:bg-blue-50',
            ].join(' ')}
          >
            <div className="font-bold text-gray-900 group-hover:text-blue-700">{link.label}</div>
            {link.description && (
              <div className="mt-1 text-sm text-gray-500 line-clamp-2">{link.description}</div>
            )}
          </Link>
        ))}
      </div>
    </section>
  );
}

