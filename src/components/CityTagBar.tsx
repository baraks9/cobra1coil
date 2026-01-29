import React from 'react';
import HorizontalTagBar, { TagItem } from './HorizontalTagBar';

interface City {
  name: string;
  href: string;
}

interface CityTagBarProps {
  cities: City[];
  currentCity?: string;
  serviceName: string;
}

const CityTagBar: React.FC<CityTagBarProps> = ({ cities, currentCity, serviceName }) => {
  const tagItems: TagItem[] = cities.map(city => ({
    name: city.name,
    href: city.href,
    isActive: currentCity === city.name
  }));

  return (
    <HorizontalTagBar
      title={`ערים נוספות באזור שבהן אנו מספקים שירותי ${serviceName}:`}
      items={tagItems}
    />
  );
};

export default CityTagBar;
