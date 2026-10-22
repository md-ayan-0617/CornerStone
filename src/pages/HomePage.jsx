import React, { useState, useMemo } from 'react';
import Hero from '../components/Hero';
import HomeServicesOverview from '../components/HomeServicesOverview';
import HomeVideoShowcase from '../components/HomeVideoShowcase';
import HomePhotographyGrid from '../components/HomePhotographyGrid';
import HomeWebsitesShowcase from '../components/HomeWebsitesShowcase';
import FinalCTA from '../components/FinalCTA';
import CampaignLightboxModal from '../components/CampaignLightboxModal';
import { FEATURED_SHORTS, LOCAL_ADS_IMAGES } from '../data/adsProjects';

export const HomePage = ({ onNavigate }) => {
  const [activeModalItem, setActiveModalItem] = useState(null);

  // Combined 13 items (3 Shorts + 10 Stills) for lightbox modal pagination
  const allLightboxItems = useMemo(() => [
    ...FEATURED_SHORTS.map((s) => ({
      id: s.id,
      title: s.title,
      client: "CornerStone Commercial",
      year: "2026",
      category: s.category,
      mediaType: 'video',
      mediaUrl: s.videoUrl,
      thumbnailUrl: s.thumbnailUrl,
      badge: s.badge
    })),
    ...LOCAL_ADS_IMAGES.map((img) => ({
      id: img.id,
      title: img.title,
      client: img.client,
      year: "2026",
      category: img.category,
      mediaType: 'image',
      imageUrl: img.imageUrl,
      thumbnailUrl: img.thumbnailUrl,
      tagline: img.tagline,
      badge: img.badge
    }))
  ], []);

  const handleSelectVideo = (short) => {
    setActiveModalItem({
      id: short.id,
      title: short.title,
      client: "CornerStone Commercial",
      year: "2026",
      category: short.category,
      mediaType: 'video',
      mediaUrl: short.videoUrl,
      thumbnailUrl: short.thumbnailUrl,
      badge: short.badge
    });
  };

  const handleSelectImage = (img) => {
    setActiveModalItem({
      id: img.id,
      title: img.title,
      client: img.client,
      year: "2026",
      category: img.category,
      mediaType: 'image',
      imageUrl: img.imageUrl,
      thumbnailUrl: img.thumbnailUrl,
      tagline: img.tagline,
      badge: img.badge
    });
  };

  return (
    <div style={{ width: '100%', maxWidth: '100vw', overflowX: 'hidden' }}>
      {/* 1. Existing Landing Hero Section */}
      <Hero
        onExploreWork={() => {
          const el = document.getElementById('home-services-overview') || document.getElementById('home-ads-showcase');
          if (el) {
            if (window.__lenis) {
              window.__lenis.scrollTo(el, { offset: -50 });
            } else {
              el.scrollIntoView({ behavior: 'smooth' });
            }
          } else {
            onNavigate('/services');
          }
        }}
        onStartProject={() => onNavigate('/contact')}
        onExploreServices={() => onNavigate('/services')}
      />

      {/* 2. Services Overview — What CornerStone Offers (AI Automation, Websites, Creative Production) */}
      <HomeServicesOverview
        onNavigate={onNavigate}
      />

      {/* 3. Advertisement Video Showcase — Three YouTube Shorts (9:16 Portrait) */}
      <HomeVideoShowcase
        onSelectVideo={handleSelectVideo}
        onNavigate={onNavigate}
      />

      {/* 4. Advertising Photography Gallery — Ten Local Images (Static Editorial Mosaic) */}
      <HomePhotographyGrid
        onSelectImage={handleSelectImage}
        onNavigate={onNavigate}
      />

      {/* 5. Selected Website Demos — Exactly Four Projects (Noise Dept, Paloma, Vale Selvato, Aurenne) */}
      <HomeWebsitesShowcase
        onNavigate={onNavigate}
      />

      {/* 6. Existing Final CTA and Footer */}
      <FinalCTA
        onStartProject={() => onNavigate('/contact')}
      />

      {/* Accessible Fullscreen Lightbox Modal (Videos & Stills) */}
      {activeModalItem && (
        <CampaignLightboxModal
          project={activeModalItem}
          allProjects={allLightboxItems}
          onClose={() => setActiveModalItem(null)}
          onSelectProject={(item) => setActiveModalItem(item)}
          onNavigate={onNavigate}
        />
      )}
    </div>
  );
};

export default HomePage;
