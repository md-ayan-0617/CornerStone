import React from 'react';
import DigitalExperiencesPage from './DigitalExperiencesPage';

/**
 * WorkPage maintains full backward compatibility for the legacy /work route,
 * seamlessly delegating to the redesigned DigitalExperiencesPage.
 */
export const WorkPage = ({ onNavigate }) => {
  return <DigitalExperiencesPage onNavigate={onNavigate} />;
};

export default WorkPage;
