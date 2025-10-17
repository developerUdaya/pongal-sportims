import { useState, useEffect, FormEvent } from 'react';
import { Sun, Sparkles, Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin, Shield, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';

interface FormData {
  fullName: string;
  email: string;
  phone: string;
}

declare global {
  interface Window {
    CashfreeUI: any;
  }
}

interface ExtraUser {
  name: string;
  age: string;
  personType: string;
  error?: string;
}

function App() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [extraUsers, setExtraUsers] = useState<ExtraUser[]>([]);
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleExtraInputChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setExtraUsers((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [name]: value };

      const ageNum = parseInt(updated[index].age);
      const type = updated[index].personType;
      if (updated[index].age && updated[index].personType) {
        if (ageNum <= 15 && type === "Adult") {
          updated[index].error = "Age is 15 or below, so only Children can be selected.";
        } else if (ageNum > 15 && type === "Children") {
          updated[index].error = "Age is above 15, so only Adult can be selected.";
        } else {
          updated[index].error = "";
        }
      }
      return updated;
    });
  };

  const handleAddUser = () => {
    setExtraUsers((prev) => [...prev, { name: "", age: "", personType: "", error: "" }]);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!formData.fullName || !formData.email || !formData.phone) {
      alert("Please fill your Name, Email, and Phone number before proceeding.");
      return;
    }

    if (extraUsers.length === 0) {
      alert("Please add at least one member before payment.");
      return;
    }

    const hasError = extraUsers.some((u) => u.error);
    if (hasError) {
      alert("Please fix errors in extra user fields before submitting.");
      return;
    }

    const payload = {
      name: formData.fullName,
      mobile_number: formData.phone,
      email: formData.email,
      created_by: "admin",
      members: extraUsers.map((u) => ({
        name: u.name,
        member_type: u.personType.toLowerCase(),
        age: parseInt(u.age),
        created_by: "admin",
      })),
    };

    try {
      const res = await fetch("https://sportims-other-api.justvy.com/paynow/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      console.log("Backend Response:", data);

      const sessionId = data?.cashfree_response?.cashfree_response?.payment_session_id;

      if (!sessionId) {
        alert("Something went wrong! Payment session not found.");
        console.log(data);
        return;
      }

      await new Promise<void>((resolve, reject) => {
        const maxWait = 2000;
        let waited = 0;

        const interval = setInterval(() => {
          if ((window as any).CashfreeUI) {
            clearInterval(interval);
            resolve();
          } else {
            waited += 100;
            if (waited >= maxWait) {
              clearInterval(interval);
              reject(new Error("Cashfree SDK v3 not loaded"));
            }
          }
        }, 100);
      });

      window.CashfreeUI.init({
        sessionId,
        mode: "sandbox",
      });

      window.CashfreeUI.open({
        onSuccess: (result: any) => {
          alert("✅ Payment Successful!");
          console.log("Payment Success:", result);
          setIsSubmitted(true);
        },
        onFailure: (error: any) => {
          alert("❌ Payment Failed. Please try again.");
          console.error("Payment Failure:", error);
        },
        onDismiss: () => {
          console.log("Payment popup closed by user.");
        },
      });
    } catch (err: any) {
      alert(err.message || "Server error. Please try again later.");
      console.error("Error:", err);
    }
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
            <h1 className="text-4xl sm:text-5xl font-bold text-orange-600 bg-clip-text bg-gradient-to-r from-green-600 via-orange-600 to-green-700">
              Pongal Celebration
            </h1>
            <Sun className="w-10 h-10 text-orange-500 animate-pulse" />
          </div>
          <p className="text-lg text-green-800 font-medium">
            Join us for a day filled with sugarcane, joy, and traditional Pongal festivities!
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
            {/* Base Inputs */}
            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-2">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="fullName"
                required
                value={formData.fullName}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border-2 border-orange-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-2">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border-2 border-orange-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                placeholder="Enter your email address"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-2">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                name="phone"
                pattern="[0-9]{10}"
                maxLength={10}
                required
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border-2 border-orange-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                placeholder="Enter 10-digit phone number"
              />
            </div>

            {/* Dynamically Added Users */}
            {extraUsers.map((user, index) => (
              <div key={index} className="border-t md:border-none border-black pt-4 md:pt-0">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-2">
                      Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={user.name}
                      onChange={(e) => handleExtraInputChange(index, e)}
                      className="w-full px-4 py-3 border-2 border-orange-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                      placeholder="Enter name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-2">
                      Age <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      name="age"
                      required
                      value={user.age}
                      onChange={(e) => handleExtraInputChange(index, e)}
                      className="w-full px-4 py-3 border-2 border-orange-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                      placeholder="Enter age"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-2">
                      Type <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="personType"
                      value={user.personType}
                      required
                      onChange={(e) => handleExtraInputChange(index, e)}
                      className="w-full px-4 py-3 border-2 border-orange-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                    >
                      <option value="" disabled>
                        Select an option
                      </option>
                      <option value="adult">Adult</option>
                      <option value="child">Child</option>
                    </select>
                    {user.error && <p className="text-red-500 text-sm mt-3 mx-auto md:mt-1">{user.error}</p>}
                  </div>
                </div>
              </div>
            ))}

            {/* Add User Button */}
            <button
              type="button"
              onClick={handleAddUser}
              className="w-full bg-gradient-to-r from-green-600 via-orange-500 to-green-600 text-white font-bold py-4 px-6 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
            >
              Add User
            </button>

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
                Celebrate Pongal with us! Enjoy the harvest festival with traditional rituals, colorful decorations, sweet treats, and lively cultural performances.
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <a 
                    href="https://maps.app.goo.gl/3fs9hoQFCgvi9NBn8" 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    Chennai, Tamil Nadu
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  <a href="tel:+917338907101">+91 73389 07101</a>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                 <a href="mailto:sportims22@gmail.com">sportims22@gmail.com</a>
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
                  href="https://www.facebook.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/20 hover:bg-white/30 p-3 rounded-full transition-all transform hover:scale-110"
                  aria-label="Facebook"
                >
                  <Facebook className="w-5 h-5" />
                </a>
                <a
                  href="https://x.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/20 hover:bg-white/30 p-3 rounded-full transition-all transform hover:scale-110"
                  aria-label="Twitter"
                >
                  <Twitter className="w-5 h-5" />
                </a>
                <a
                  href="https://instagram.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/20 hover:bg-white/30 p-3 rounded-full transition-all transform hover:scale-110"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href="https://www.linkedin.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/20 hover:bg-white/30 p-3 rounded-full transition-all transform hover:scale-110"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-white/20 my-6"></div>

          {/* Bottom Footer */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
            <p className="text-green-50">
              © Copyright S4 Technologies. All rights reserved.
            </p>
            <div className="flex flex-wrap gap-4 items-center">
              <Link to="/privacy-policy" className="flex items-center gap-1 hover:text-orange-200 transition-colors">
                <Shield className="w-4 h-4" />
                Privacy Policy
              </Link>
              <span className="text-white/40">|</span>
              <Link to="/terms-and-conditions" className="flex items-center gap-1 hover:text-orange-200 transition-colors">
                <FileText className="w-4 h-4" />
                Terms & Conditions
              </Link>
              <span className="text-white/40">|</span>
              <Link to="/refund-policy" className="hover:text-orange-200 transition-colors">
                Refund Policy
              </Link>
              <span className="text-white/40">|</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
