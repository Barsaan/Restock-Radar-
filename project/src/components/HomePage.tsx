import React from 'react';
import { ArrowRight, Bell, ShoppingCart, Zap, Shield, BarChart } from 'lucide-react';

interface HomePageProps {
  onGetStarted: () => void;
}

const HomePage: React.FC<HomePageProps> = ({ onGetStarted }) => {
  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full max-w-4xl text-center py-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          Never Miss a <span className="text-[#00FFFF]">Restock</span> Again
        </h1>
        <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
          Track product availability and price changes across multiple platforms with real-time notifications.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button 
            onClick={onGetStarted}
            className="bg-[#00FFFF] hover:bg-[#33FFFF] text-black font-medium rounded-lg px-6 py-3 flex items-center justify-center transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
          >
            Get Started
            <ArrowRight size={18} className="ml-2" />
          </button>
          <button className="bg-gray-800 hover:bg-gray-700 text-white font-medium rounded-lg px-6 py-3 transition-all duration-300">
            Learn More
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full max-w-5xl py-12">
        <h2 className="text-2xl font-bold mb-8 text-center">Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard 
            icon={<Bell size={24} className="text-[#00FFFF]" />}
            title="Real-time Alerts"
            description="Get instant notifications when your tracked products come back in stock or drop in price."
          />
          <FeatureCard 
            icon={<ShoppingCart size={24} className="text-[#00FFFF]" />}
            title="Multi-platform Support"
            description="Track products across Amazon, Nike, Best Buy, Target, Walmart and more."
          />
          <FeatureCard 
            icon={<Zap size={24} className="text-[#00FFFF]" />}
            title="Fast Checkout"
            description="One-click access to product pages when items become available."
          />
        </div>
      </section>

      {/* How It Works Section */}
      <section className="w-full max-w-5xl py-12 bg-gray-900 rounded-lg my-12 p-8">
        <h2 className="text-2xl font-bold mb-8 text-center">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StepCard 
            number="1"
            title="Add Products"
            description="Paste the URL of any product you want to track."
          />
          <StepCard 
            number="2"
            title="Set Preferences"
            description="Choose your notification channels and alert conditions."
          />
          <StepCard 
            number="3"
            title="Get Notified"
            description="Receive alerts when products are back in stock or prices change."
          />
        </div>
      </section>

      {/* Stats Section */}
      <section className="w-full max-w-5xl py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <StatCard 
            icon={<Shield size={24} className="text-[#00FFFF]" />}
            value="99.9%"
            label="Uptime"
          />
          <StatCard 
            icon={<BarChart size={24} className="text-[#00FFFF]" />}
            value="2M+"
            label="Products Tracked"
          />
          <StatCard 
            icon={<ShoppingCart size={24} className="text-[#00FFFF]" />}
            value="50+"
            label="Supported Retailers"
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full max-w-4xl text-center py-16">
        <h2 className="text-3xl font-bold mb-6">
          Ready to Start Tracking?
        </h2>
        <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
          Join thousands of users who never miss a restock or deal.
        </p>
        <button 
          onClick={onGetStarted}
          className="bg-[#00FFFF] hover:bg-[#33FFFF] text-black font-medium rounded-lg px-8 py-4 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
        >
          Go to Dashboard
        </button>
      </section>
    </div>
  );
};

const FeatureCard: React.FC<{ icon: React.ReactNode; title: string; description: string }> = ({ 
  icon, title, description 
}) => {
  return (
    <div className="bg-gray-900 p-6 rounded-lg hover:shadow-lg transition-all duration-300 transform hover:translate-y-[-2px]">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </div>
  );
};

const StepCard: React.FC<{ number: string; title: string; description: string }> = ({ 
  number, title, description 
}) => {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="w-12 h-12 rounded-full bg-[#00FFFF] text-black flex items-center justify-center text-xl font-bold mb-4">
        {number}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </div>
  );
};

const StatCard: React.FC<{ icon: React.ReactNode; value: string; label: string }> = ({ 
  icon, value, label 
}) => {
  return (
    <div className="bg-gray-900 p-6 rounded-lg">
      <div className="flex justify-center mb-4">{icon}</div>
      <div className="text-3xl font-bold mb-1 text-[#00FFFF]">{value}</div>
      <div className="text-gray-400">{label}</div>
    </div>
  );
};

export default HomePage;