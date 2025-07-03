import React from 'react';
import { motion } from 'framer-motion';
import Sidebar from './components/Sidebar';
import Hero from './components/Hero';
import MissionVision from './components/sections/MissionVision';
import HybeDNA from './components/sections/HybeDNA';
import HybeMembers from './components/sections/HybeMembers';
import CodeOfConduct from './components/sections/CodeOfConduct';
import AboutHybe from './components/sections/AboutHybe';
import HealthyWorkplace from './components/sections/HealthyWorkplace';
import ContractsPayments from './components/sections/ContractsPayments';
import TravelPolicy from './components/sections/TravelPolicy';
import VacationPTORequest from './components/sections/VacationPTORequest';
import HolidayCalendar2025 from './components/sections/HolidayCalendar2025';
import BusinessTravelNotification from './components/sections/BusinessTravelNotification';
import CommunicationGuidelines from './components/sections/CommunicationGuidelines';
import OfficeLocations from './components/sections/OfficeLocations';
import DirectoryHBLTeam from './components/sections/DirectoryHBLTeam';
import ITEquipmentRequest from './components/sections/ITEquipmentRequest';
import MexicoOnboarding1 from './components/sections/MexicoOnboarding1';
import MexicoOnboardingDay1 from './components/sections/MexicoOnboardingDay1';
import MexicoEarthquakeProtocol from './components/sections/MexicoEarthquakeProtocol';
import PlaceholderSection from './components/sections/PlaceholderSection';
import { useActiveSection } from './hooks/useActiveSection';
import { 
  Mail
} from 'lucide-react';

function App() {
  const sections = [
    'mission-vision',
    'hybe-dna',
    'hybe-members',
    'code-of-conduct',
    'respect-at-work',
    'etiquette',
    'diversity',
    'prohibited-bullying',
    'prohibited-harassment',
    'reading-conf',
    'about-hybe',
    'healthy-workplace',
    'hybenet',
    'newsletter',
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
    'mx-earthquake-protocol'
  ];

  const activeSection = useActiveSection(sections);

  return (
    <div className="min-h-screen bg-white font-manrope">
      <Sidebar activeSection={activeSection} />
      
      {/* Main Content */}
      <div className="md:ml-72">
        <Hero />
        
        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <MissionVision />
          <HybeDNA />
          <HybeMembers />
          <CodeOfConduct />
          <AboutHybe />
          <HealthyWorkplace />
          <ContractsPayments />
          <TravelPolicy />
          <VacationPTORequest />
          <HolidayCalendar2025 />
          <BusinessTravelNotification />
          <CommunicationGuidelines />
          <OfficeLocations />
          <DirectoryHBLTeam />
          <ITEquipmentRequest />
          <MexicoOnboarding1 />
          <MexicoOnboardingDay1 />
          <MexicoEarthquakeProtocol />
          
          <PlaceholderSection
            id="newsletter"
            title="Newsletter – JUNE"
            subtitle="Stay updated with our latest news"
            icon={<Mail className="w-12 h-12" />}
          />
        </motion.main>
      </div>
    </div>
  );
}

export default App;