import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronDown, Menu, X, Music, Users, FileText, Info, Heart, Globe, Mail, Briefcase, MapPin, Flag, Shield, AlertTriangle, ExternalLink, FileCheck, Calendar, Building, BookOpen, Target, UserCheck, Plane, MessageCircle, MapIcon, Clock, Handshake, Settings, Wrench } from 'lucide-react';

interface SidebarProps {
  activeSection: string;
}

interface MenuItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  subItems?: MenuItem[];
  isExternal?: boolean;
  href?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ activeSection }) => {
  const [isCollapsed, setIsCollapsed] = useState(true); // Start collapsed on mobile
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const menuItems: MenuItem[] = [
    {
      id: 'hbl',
      label: '1. HBL',
      icon: <Building className="w-5 h-5" />,
      subItems: [
        {
          id: 'hybe-corp-website',
          label: 'HYBE Corp Website',
          icon: <ExternalLink className="w-4 h-4" />,
          isExternal: true,
          href: 'https://hybecorp.com'
        },
        {
          id: 'mission-vision',
          label: 'Mission & Vision',
          icon: <Music className="w-4 h-4" />
        },
        {
          id: 'hybe-dna',
          label: 'HYBE DNA (core values)',
          icon: <Users className="w-4 h-4" />
        },
        {
          id: 'hybe-members',
          label: 'HYBE Members',
          icon: <Users className="w-4 h-4" />
        },
        {
          id: 'code-of-conduct',
          label: 'Code of conduct',
          icon: <FileText className="w-4 h-4" />,
          subItems: [
            { id: 'respect-at-work', label: 'Respect@Work', icon: <Heart className="w-3 h-3" /> },
            { id: 'etiquette', label: '1. Business etiquette', icon: <Briefcase className="w-3 h-3" /> },
            { id: 'diversity', label: '2. Respect for Diversity', icon: <Users className="w-3 h-3" /> },
            { id: 'prohibited-bullying', label: '3. Respect: Prohibition of Workplace Bullying', icon: <Shield className="w-3 h-3" /> },
            { id: 'prohibited-harassment', label: '4. Respect: Prohibition of Sexual Harassment', icon: <AlertTriangle className="w-3 h-3" /> }
          ]
        },
        {
          id: 'about-hybe',
          label: 'About HYBE',
          icon: <Info className="w-4 h-4" />
        },
        {
          id: 'healthy-workplace',
          label: 'Creating a Healthy Workplace Environment',
          icon: <Heart className="w-4 h-4" />
        },
        {
          id: 'hybenet',
          label: 'HYBENET',
          icon: <Globe className="w-4 h-4" />,
          isExternal: true,
          href: 'https://hybenet2.hybecorp.com/ekp/main/home/homGwMain'
        },
        {
          id: 'newsletter',
          label: 'Newsletter – JUNE',
          icon: <Mail className="w-4 h-4" />
        }
      ]
    },
    {
      id: 'hr',
      label: '2. HR',
      icon: <Users className="w-5 h-5" />,
      subItems: [
        {
          id: 'policies-guidelines',
          label: 'Policies & Guidelines',
          icon: <BookOpen className="w-4 h-4" />,
          subItems: [
            { id: 'contracts-payments', label: 'Contracts, Payments, LAMS, HYBENET, Docusign', icon: <Handshake className="w-3 h-3" /> },
            { id: 'travel-policy', label: 'Travel Policy', icon: <Plane className="w-3 h-3" /> },
            { id: 'communication-guidelines', label: 'Communication Guidelines', icon: <MessageCircle className="w-3 h-3" /> }
          ]
        },
        {
          id: 'vacation-pto-request',
          label: 'Vacation & PTO Request',
          icon: <Calendar className="w-4 h-4" />
        },
        {
          id: 'holiday-calendar',
          label: 'Holiday Calendar 2025',
          icon: <Clock className="w-4 h-4" />
        },
        {
          id: 'business-travel-notification',
          label: 'Business Travel Notification',
          icon: <Plane className="w-4 h-4" />
        },
        {
          id: 'office-locations',
          label: 'Office Locations',
          icon: <MapIcon className="w-4 h-4" />
        },
        {
          id: 'directory-hbl-team',
          label: 'Directory HBL Team',
          icon: <UserCheck className="w-4 h-4" />
        },
        {
          id: 'meet-the-team',
          label: 'Meet the Team',
          icon: <Users className="w-4 h-4" />,
          subItems: [
            { id: 'team-miami', label: 'MIAMI', icon: <MapPin className="w-3 h-3" /> },
            { id: 'team-la', label: 'LOS ANGELES – under construction', icon: <MapPin className="w-3 h-3" /> },
            { id: 'team-mexico', label: 'MEXICO – under construction', icon: <MapPin className="w-3 h-3" /> },
            { id: 'team-colombia', label: 'COLOMBIA', icon: <MapPin className="w-3 h-3" /> }
          ]
        }
      ]
    },
    {
      id: 'mexico',
      label: '🇲🇽 MEXICO',
      icon: <MapPin className="w-5 h-5" />,
      subItems: [
        { id: 'mx-onboarding1', label: 'On Boarding Mexico 1', icon: <FileCheck className="w-4 h-4" /> },
        { id: 'mx-onboarding-day1', label: 'On Boarding – DIA 1', icon: <Calendar className="w-4 h-4" /> },
        { id: 'mx-earthquake-protocol', label: 'Evacuation Protocol in case of an Earthquake', icon: <Building className="w-4 h-4" /> }
      ]
    },
    {
      id: 'usa',
      label: 'USA',
      icon: <Flag className="w-5 h-5" />,
      subItems: []
    },
    {
      id: 'it',
      label: 'IT',
      icon: <Settings className="w-5 h-5" />,
      subItems: [
        {
          id: 'it-forms',
          label: 'Forms',
          icon: <FileText className="w-4 h-4" />,
          subItems: [
            { id: 'it-equipment-request', label: 'Request Equipment', icon: <Wrench className="w-3 h-3" /> }
          ]
        }
      ]
    }
  ];

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      element.setAttribute('tabIndex', '-1');
      element.focus();
    }
    
    // Auto-close sidebar on mobile after navigation
    if (isMobile) {
      setIsCollapsed(true);
    }
  };

  const handleExternalLink = () => {
    // Auto-close sidebar on mobile when clicking external links
    if (isMobile) {
      setIsCollapsed(true);
    }
  };

  const handleMenuToggle = () => {
    setIsCollapsed(!isCollapsed);
  };

  const isItemActive = (itemId: string) => {
    return activeSection === itemId || activeSection.startsWith(itemId);
  };

  const isParentActive = (item: MenuItem): boolean => {
    if (isItemActive(item.id)) return true;
    if (item.subItems) {
      return item.subItems.some(subItem => isParentActive(subItem));
    }
    return false;
  };

  const renderMenuItem = (item: MenuItem, level: number = 0) => {
    const hasSubItems = item.subItems && item.subItems.length > 0;
    const isExpanded = expandedSections[item.id];
    const isActive = isItemActive(item.id);
    const isParentOfActive = isParentActive(item);

    // Handle external links
    if (item.isExternal && item.href) {
      return (
        <div key={item.id}>
          <motion.a
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Open ${item.label}`}
            className={`group relative flex items-center px-6 py-3 cursor-pointer transition-all duration-200 text-gray-300 hover:text-white hover:translate-x-1 ${
              level === 0 ? '' : level === 1 ? 'pl-12' : level === 2 ? 'pl-16' : 'pl-20'
            }`}
            whileHover={{ x: level === 0 ? 4 : 2 }}
            transition={{ duration: 0.2 }}
            onClick={handleExternalLink}
          >
            <div className="flex items-center flex-1">
              <span className="mr-3">
                {item.icon}
              </span>
              <span className="text-sm font-medium tracking-tight">
                {item.label}
              </span>
              <ExternalLink className="w-3 h-3 ml-2 opacity-60" />
            </div>
          </motion.a>
        </div>
      );
    }

    // Handle placeholder items (coming soon, under construction, etc.)
    const isPlaceholder = item.label.includes('under construction') || 
                         item.id === 'team-miami' ||
                         item.id === 'team-la' ||
                         item.id === 'team-mexico' ||
                         item.id === 'team-colombia';

    if (isPlaceholder) {
      return (
        <div key={item.id}>
          <motion.div
            className={`group relative flex items-center px-6 py-3 cursor-default transition-all duration-200 text-gray-500 ${
              level === 0 ? '' : level === 1 ? 'pl-12' : level === 2 ? 'pl-16' : 'pl-20'
            }`}
          >
            <div className="flex items-center flex-1">
              <span className="mr-3">
                {item.icon}
              </span>
              <span className="text-sm font-medium tracking-tight">
                {item.label}
              </span>
            </div>
          </motion.div>
        </div>
      );
    }

    return (
      <div key={item.id}>
        <motion.div
          className={`group relative flex items-center px-6 py-3 cursor-pointer transition-all duration-200 ${
            isActive 
              ? 'text-accent bg-accent-light border-l-2 border-accent' 
              : isParentOfActive
              ? 'text-white'
              : 'text-gray-300 hover:text-white hover:translate-x-1'
          } ${level === 0 ? '' : level === 1 ? 'pl-12' : level === 2 ? 'pl-16' : 'pl-20'}`}
          onClick={() => {
            if (hasSubItems) {
              toggleSection(item.id);
            } else {
              scrollToSection(item.id);
            }
          }}
          whileHover={{ x: level === 0 ? 4 : 2 }}
          transition={{ duration: 0.2 }}
          role={hasSubItems ? "button" : "link"}
          aria-expanded={hasSubItems ? isExpanded : undefined}
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              if (hasSubItems) {
                toggleSection(item.id);
              } else {
                scrollToSection(item.id);
              }
            }
          }}
        >
          <div className="flex items-center flex-1">
            <span className={`mr-3 ${isActive ? 'text-accent' : isParentOfActive ? 'text-white' : ''}`}>
              {item.icon}
            </span>
            <span className={`text-sm font-medium tracking-tight ${isActive ? 'text-accent' : isParentOfActive ? 'text-white' : ''}`}>
              {item.label}
            </span>
          </div>
          {hasSubItems && (
            <motion.div
              animate={{ rotate: isExpanded ? 90 : 0 }}
              transition={{ duration: 0.2 }}
              className={isActive ? 'text-accent' : isParentOfActive ? 'text-white' : ''}
            >
              <ChevronDown className="w-4 h-4" />
            </motion.div>
          )}
        </motion.div>

        <AnimatePresence>
          {hasSubItems && isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              {item.subItems?.map(subItem => renderMenuItem(subItem, level + 1))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  return (
    <>
      {/* Mobile Menu Toggle */}
      <motion.button
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-sidebar-bg text-white rounded-lg shadow-lg"
        onClick={handleMenuToggle}
        whileTap={{ scale: 0.95 }}
        aria-label={isCollapsed ? "Open menu" : "Close menu"}
      >
        {isCollapsed ? <Menu className="w-6 h-6" /> : <X className="w-6 h-6" />}
      </motion.button>

      {/* Sidebar */}
      <AnimatePresence>
        <motion.div
          initial={{ x: -300 }}
          animate={{ x: 0 }}
          className={`fixed left-0 top-0 h-full w-72 bg-sidebar-bg z-40 shadow-2xl
            ${isCollapsed && isMobile ? '-translate-x-full' : 'translate-x-0'}
            md:translate-x-0 transition-transform duration-300`}
          style={{
            boxShadow: 'inset 0 0 12px rgba(255,255,255,0.05)'
          }}
        >
          <div className="flex flex-col h-full">
            {/* Logo/Header */}
            <div className="p-6 border-b border-gray-800">
              <motion.h1 
                className="text-2xl font-bold text-white tracking-tight"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                HYBE
              </motion.h1>
              <motion.p 
                className="text-sm text-gray-400 mt-1"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                Latin America
              </motion.p>
            </div>

            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto py-4 sidebar-scroll" role="navigation" aria-label="Main navigation">
              {menuItems.map(item => renderMenuItem(item))}
            </nav>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Overlay for mobile */}
      {!isCollapsed && isMobile && (
        <div 
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setIsCollapsed(true)}
        />
      )}
    </>
  );
};

export default Sidebar;