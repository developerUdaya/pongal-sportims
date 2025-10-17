import { useState, FormEvent } from "react";
import { Sun, Sparkles } from "lucide-react";

interface FormData {
  fullName: string;
  email: string;
  phone: string;
}

interface ExtraUser {
  name: string;
  age: string;
  personType: string;
  error?: string;
}

function App() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    phone: "",
  });

  const [extraUsers, setExtraUsers] = useState<ExtraUser[]>([]);

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
      const res = await fetch(" http://31.97.63.16:4006/paynow/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      console.log("Backend Response:", data);

      if (data?.cashfree_response?.cashfree_response?.payment_session_id) {
        const sessionId = data.cashfree_response.cashfree_response.payment_session_id;

        if (window.Cashfree) {
          window.Cashfree.checkout({
          sessionId: sessionId,
          onSuccess: function (result: any) {
            alert("✅ Payment Successful!");
            console.log("Payment Success:", result);
          },
          onFailure: function (error: any) {
            alert("❌ Payment Failed. Please try again.");
            console.error("Payment Failure:", error);
          },
        });

        } else {
          alert("Cashfree SDK not loaded. Please check index.html");
        }
      } else {
        alert("Something went wrong! Payment session not found.");
        console.log(data);
      }
    } catch (err) {
      console.error("Error:", err);
      alert("Server error. Please try again later.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-orange-50 to-green-100 py-8 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute bottom-20 left-1/4 opacity-10">
        <Sun className="w-36 h-36 text-orange-500" />
      </div>

      <div className="max-w-3xl mx-auto relative z-10">
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
                      <option value="Adult">Adult</option>
                      <option value="Children">Children</option>
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
    </div>
  );
}

export default App;
