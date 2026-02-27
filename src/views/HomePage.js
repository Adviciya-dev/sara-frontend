'use client';

import {
  HeroSection,
  TrustedBySection,
  ServicesPlatformSection,
  FeaturedServicesSection,
  DiscoverSolutionSection,
  ContactCTASection,
  HowWeWorkSection,
  SuccessStoriesPreview,
  FinalCTASection,
  FAQSection,
} from '../components/home';
import QuickAssessmentQuiz from '../components/QuickAssessmentQuiz';
import WizardSection from '../components/WizardSection';
import WhatsAppButton from '../components/WhatsAppButton';
import FloatingLeadForm from '../components/FloatingLeadForm';

const HomePage = () => {
  return (
    <div className="min-h-screen" data-testid="home-page">
      {/* Hero with main H1 */}
      <HeroSection />
      
      {/* Trusted Partners & Stats */}
      <TrustedBySection />
      
      {/* Six Pillars Overview */}
      <ServicesPlatformSection />
      
      {/* Featured Services by Category */}
      <FeaturedServicesSection />
      
      {/* Discover Solution CTAs */}
      <DiscoverSolutionSection />
      
      {/* Quick Assessment Quiz */}
      <div id="quiz-section">
        <QuickAssessmentQuiz />
      </div>
      
      {/* Find My Solution Wizard */}
      <div id="wizard-section">
        <WizardSection />
      </div>
      
      {/* Let's Help You Succeed CTA */}
      <ContactCTASection />
      
      {/* Success Stories Preview */}
      <SuccessStoriesPreview />
      
      {/* How We Work Process */}
      <HowWeWorkSection />
      
      {/* Final CTA */}
      <FinalCTASection />
      
      {/* FAQ Section */}
      <FAQSection />
      
      {/* Floating Elements */}
      <WhatsAppButton />
      <FloatingLeadForm />
    </div>
  );
};

export default HomePage;
