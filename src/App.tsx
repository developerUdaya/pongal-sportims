import { useState, FormEvent } from 'react';
import { Sun, Sparkles, Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin, Shield, FileText } from 'lucide-react';

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  numberOfGuests: string;
  foodPreference: string;
  activities: string[];
  specialRequests: string;
  consent: boolean;
}

function App() {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    numberOfGuests: '',
    foodPreference: '',
    activities: [],
    specialRequests: '',
    consent: false,
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (activity: string) => {
    setFormData((prev) => ({
      ...prev,
      activities: prev.activities.includes(activity)
        ? prev.activities.filter((a) => a !== activity)
        : [...prev.activities, activity],
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-orange-50 to-green-100 py-8 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-10 left-10 opacity-10">
        <svg className="w-32 h-32 text-orange-500 transform -rotate-45" viewBox="0 0 100 100" fill="currentColor">
          <polygon points="50,10 90,50 50,90 10,50" />
          <line x1="50" y1="90" x2="50" y2="110" stroke="currentColor" strokeWidth="2" />
        </svg>
      </div>
      <div className="absolute top-20 right-20 opacity-10">
        <svg className="w-40 h-40 text-green-600 transform rotate-12" viewBox="0 0 100 100" fill="currentColor">
          <polygon points="50,10 90,50 50,90 10,50" />
          <line x1="50" y1="90" x2="50" y2="110" stroke="currentColor" strokeWidth="2" />
        </svg>
      </div>
      <div className="absolute bottom-20 left-1/4 opacity-10">
        <Sun className="w-36 h-36 text-orange-500" />
      </div>
      <div className="absolute bottom-10 right-10 opacity-10">
        <svg className="w-28 h-28 text-green-600 transform rotate-45" viewBox="0 0 100 100" fill="currentColor">
          <polygon points="50,10 90,50 50,90 10,50" />
          <line x1="50" y1="90" x2="50" y2="110" stroke="currentColor" strokeWidth="2" />
        </svg>
      </div>

      <div className="max-w-3xl mx-auto relative z-10">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <svg className="w-10 h-10 text-orange-600 animate-bounce" viewBox="0 0 100 100" fill="currentColor">
              <polygon points="50,10 90,50 50,90 10,50" />
            </svg>
            <h1 className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-600 via-orange-600 to-green-700">
              Makar Sankranti Celebration
            </h1>
            <Sun className="w-10 h-10 text-orange-500 animate-pulse" />
          </div>
          <p className="text-lg text-green-800 font-medium">
            Join us for a day filled with kites, joy, and traditional festivities!
          </p>
          <p className="text-sm text-green-700 mt-2">
            Reserve your spot and be part of the celebration
          </p>
        </div>

        {/* Decorative Divider */}
        <div className="relative mb-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t-2 border-orange-300"></div>
          </div>
          <div className="relative flex justify-center">
            <span className="bg-gradient-to-br from-green-50 via-orange-50 to-green-100 px-4">
              <Sparkles className="w-6 h-6 text-orange-500" />
            </span>
          </div>
        </div>

        {/* Form Section */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-6 sm:p-10 border-4 border-orange-400">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Full Name */}
            <div>
              <label htmlFor="fullName" className="block text-sm font-semibold text-gray-800 mb-2">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                required
                value={formData.fullName}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border-2 border-orange-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all"
                placeholder="Enter your full name"
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-800 mb-2">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border-2 border-orange-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all"
                placeholder="your.email@example.com"
              />
            </div>

            {/* Phone Number */}
            <div>
              <label htmlFor="phone" className="block text-sm font-semibold text-gray-800 mb-2">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                required
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border-2 border-orange-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all"
                placeholder="+91 XXXXXXXXXX"
              />
            </div>

            {/* Address */}
            <div>
              <label htmlFor="address" className="block text-sm font-semibold text-gray-800 mb-2">
                Full Address
              </label>
              <textarea
                id="address"
                name="address"
                rows={3}
                value={formData.address}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border-2 border-orange-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all resize-none"
                placeholder="Enter your complete address"
              />
            </div>

            {/* Number of Guests */}
            <div>
              <label htmlFor="numberOfGuests" className="block text-sm font-semibold text-gray-800 mb-2">
                Number of Guests <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                id="numberOfGuests"
                name="numberOfGuests"
                required
                min="1"
                value={formData.numberOfGuests}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border-2 border-orange-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all"
                placeholder="How many people?"
              />
            </div>

            {/* Food Preference */}
            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-3">
                Food Preference <span className="text-red-500">*</span>
              </label>
              <div className="space-y-3">
                {['Vegetarian', 'Non-Vegetarian', 'Vegan'].map((preference) => (
                  <label key={preference} className="flex items-center gap-3 cursor-pointer group">
                    <input
                      type="radio"
                      name="foodPreference"
                      value={preference}
                      checked={formData.foodPreference === preference}
                      onChange={handleInputChange}
                      required
                      className="w-5 h-5 text-orange-500 focus:ring-orange-500 border-orange-300 cursor-pointer"
                    />
                    <span className="text-gray-700 group-hover:text-orange-600 transition-colors">
                      {preference}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Preferred Activities */}
            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-3">
                Preferred Event Activities
              </label>
              <div className="space-y-3">
                {[
                  'Kite Flying',
                  'Traditional Games',
                  'Cultural Performances',
                  'Rangoli Contest',
                  'Food Fest',
                ].map((activity) => (
                  <label key={activity} className="flex items-center gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={formData.activities.includes(activity)}
                      onChange={() => handleCheckboxChange(activity)}
                      className="w-5 h-5 text-orange-500 focus:ring-orange-500 border-orange-300 rounded cursor-pointer"
                    />
                    <span className="text-gray-700 group-hover:text-orange-600 transition-colors">
                      {activity}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Special Requests */}
            <div>
              <label htmlFor="specialRequests" className="block text-sm font-semibold text-gray-800 mb-2">
                Special Requests / Comments
              </label>
              <textarea
                id="specialRequests"
                name="specialRequests"
                rows={4}
                value={formData.specialRequests}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border-2 border-orange-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all resize-none"
                placeholder="Any dietary restrictions, accessibility needs, or special requests?"
              />
            </div>

            {/* Consent */}
            <div>
              <label className="flex items-start gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  name="consent"
                  checked={formData.consent}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, consent: e.target.checked }))
                  }
                  required
                  className="w-5 h-5 text-orange-500 focus:ring-orange-500 border-orange-300 rounded cursor-pointer mt-0.5"
                />
                <span className="text-sm text-gray-700 group-hover:text-orange-600 transition-colors">
                  I agree to receive event updates and notifications <span className="text-red-500">*</span>
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-green-600 via-orange-500 to-green-600 text-white font-bold py-4 px-6 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2"
            >
              <Sparkles className="w-5 h-5" />
              Register for Celebration
              <Sparkles className="w-5 h-5" />
            </button>

            {/* Success Message */}
            {isSubmitted && (
              <div className="mt-4 p-4 bg-green-100 border-2 border-green-500 rounded-lg text-center">
                <p className="text-green-800 font-semibold">
                  🎉 Registration Successful! See you at the celebration!
                </p>
              </div>
            )}
          </form>
        </div>

      </div>

      {/* Comprehensive Footer */}
      <footer className="mt-16 bg-gradient-to-r from-green-700 via-orange-600 to-green-700 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {/* About Section */}
            <div>
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Sun className="w-6 h-6" />
                About the Event
              </h3>
              <p className="text-green-50 text-sm leading-relaxed mb-4">
                Join us for an unforgettable Makar Sankranti celebration filled with traditional festivities, cultural performances, and joyous moments.
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>Mumbai, Maharashtra</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  <span>+91 98765 43210</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  <span>info@sankrantievent.com</span>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-xl font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="flex items-center gap-2 hover:text-orange-200 transition-colors">
                    <FileText className="w-4 h-4" />
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center gap-2 hover:text-orange-200 transition-colors">
                    <FileText className="w-4 h-4" />
                    Event Schedule
                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center gap-2 hover:text-orange-200 transition-colors">
                    <FileText className="w-4 h-4" />
                    Gallery
                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center gap-2 hover:text-orange-200 transition-colors">
                    <FileText className="w-4 h-4" />
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center gap-2 hover:text-orange-200 transition-colors">
                    <FileText className="w-4 h-4" />
                    FAQ
                  </a>
                </li>
              </ul>
            </div>

            {/* Social Media */}
            <div>
              <h3 className="text-xl font-bold mb-4">Connect With Us</h3>
              <p className="text-green-50 text-sm mb-4">
                Stay updated with the latest event news and announcements on our social media channels.
              </p>
              <div className="flex gap-4">
                <a
                  href="#"
                  className="bg-white/20 hover:bg-white/30 p-3 rounded-full transition-all transform hover:scale-110"
                  aria-label="Facebook"
                >
                  <Facebook className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="bg-white/20 hover:bg-white/30 p-3 rounded-full transition-all transform hover:scale-110"
                  aria-label="Twitter"
                >
                  <Twitter className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="bg-white/20 hover:bg-white/30 p-3 rounded-full transition-all transform hover:scale-110"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="bg-white/20 hover:bg-white/30 p-3 rounded-full transition-all transform hover:scale-110"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
              <div className="mt-6">
                <p className="text-sm text-green-50 mb-2">Subscribe to our newsletter:</p>
                <div className="flex gap-2">
                  <input
                    type="email"
                    placeholder="Your email"
                    className="flex-1 px-3 py-2 rounded-lg text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300"
                  />
                  <button className="bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded-lg text-sm font-semibold transition-colors">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-white/20 my-6"></div>

          {/* Bottom Footer */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
            <p className="text-green-50">
              © 2025 Makar Sankranti Celebration. All rights reserved.
            </p>
            <div className="flex flex-wrap gap-4 items-center">
              <a href="#" className="flex items-center gap-1 hover:text-orange-200 transition-colors">
                <Shield className="w-4 h-4" />
                Privacy Policy
              </a>
              <span className="text-white/40">|</span>
              <a href="#" className="flex items-center gap-1 hover:text-orange-200 transition-colors">
                <FileText className="w-4 h-4" />
                Terms & Conditions
              </a>
              <span className="text-white/40">|</span>
              <a href="#" className="hover:text-orange-200 transition-colors">
                Cookie Policy
              </a>
              <span className="text-white/40">|</span>
              <a href="#" className="hover:text-orange-200 transition-colors">
                Refund Policy
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
