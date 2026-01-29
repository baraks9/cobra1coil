import Link from 'next/link';
import React from 'react';

export interface TagItem {
  name: string;
  href: string;
  isActive?: boolean;
}

interface HorizontalTagBarProps {
  title: string;
  items: TagItem[];
  className?: string;
  itemClassName?: string;
  activeItemClassName?: string;
  inactiveItemClassName?: string;
}

const HorizontalTagBar: React.FC<HorizontalTagBarProps> = ({
  title,
  items,
  className = '',
  itemClassName = '',
  activeItemClassName = '',
  inactiveItemClassName = ''
}) => {
  const defaultItemClasses = 'flex-shrink-0 whitespace-nowrap px-5 py-2 rounded-full text-sm font-medium transition-all border min-w-fit';
  const defaultActiveClasses = 'bg-blue-600 text-white border-blue-600 shadow-sm';
  const defaultInactiveClasses = 'bg-gray-50 text-gray-700 hover:bg-gray-100 border-gray-200';

  return (
    <section className={`w-full bg-white py-4 border-b border-gray-100 mb-8 rounded-2xl shadow-sm border border-gray-100 ${className}`}>
      <h2 className="px-4 mb-3 text-lg font-bold text-blue-900">{title}</h2>

      {/* Container for horizontal scroll */}
      <div
        className="flex overflow-x-auto gap-3 px-4 no-scrollbar scroll-smooth pb-2"
        style={{
          scrollbarWidth: 'none', // Firefox
          msOverflowStyle: 'none', // IE/Edge
          // Ensure smooth scrolling on touch devices
          WebkitOverflowScrolling: 'touch',
          // Ensure items don't shrink
          display: 'flex',
        }}
      >
        {/* Webkit hide scrollbar and enable smooth scrolling */}
        <style dangerouslySetInnerHTML={{ __html: `
          .no-scrollbar::-webkit-scrollbar {
            display: none;
          }
          .no-scrollbar {
            -webkit-overflow-scrolling: touch;
            overscroll-behavior-x: contain;
          }
        `}} />

        {items.map((item, index) => (
          <Link
            key={index}
            href={item.href}
            className={`
              ${defaultItemClasses}
              ${itemClassName}
              ${item.isActive
                ? `${defaultActiveClasses} ${activeItemClassName}`
                : `${defaultInactiveClasses} ${inactiveItemClassName}`
              }
            `}
          >
            {item.name}
          </Link>
        ))}
      </div>
    </section>
  );
};

export default HorizontalTagBar;