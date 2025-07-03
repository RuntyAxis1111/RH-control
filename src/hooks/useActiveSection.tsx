import { useState, useEffect } from 'react';

export const useActiveSection = (sections: string[]) => {
  const [activeSection, setActiveSection] = useState<string>('');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100; // Offset for better UX

      // Check for sub-sections first (more specific)
      const allSections = [
        'respect-at-work',
        'etiquette', 
        'diversity', 
        'prohibited-bullying', 
        'prohibited-harassment', 
        'reading-conf',
        'contracts-payments',
        'travel-policy',
        'vacation-pto-request',
        'holiday-calendar',
        'business-travel-notification',
        'communication-guidelines',
        'office-locations',
        'directory-hbl-team',
        'it-equipment-request',
        'mx-onboarding1',
        'mx-onboarding-day1',
        'mx-earthquake-protocol',
        ...sections
      ];

      for (let i = allSections.length - 1; i >= 0; i--) {
        const element = document.getElementById(allSections[i]);
        if (element && element.offsetTop <= scrollPosition) {
          setActiveSection(allSections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Call once to set initial state

    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections]);

  return activeSection;
};