import React from 'react';
import HorizontalTagBar, { TagItem } from './HorizontalTagBar';
import { Service } from '@/lib/data';

interface ServiceTagBarProps {
  services: Service[];
  currentServiceSlug?: string;
  citySlug: string;
}

const ServiceTagBar: React.FC<ServiceTagBarProps> = ({ services, currentServiceSlug, citySlug }) => {
  const tagItems: TagItem[] = services.map(service => ({
    name: service.name,
    href: `/${service.slug}/${citySlug}`,
    isActive: currentServiceSlug === service.slug
  }));

  return (
    <HorizontalTagBar
      title="שירותים נוספים באזור:"
      items={tagItems}
    />
  );
};

export default ServiceTagBar;