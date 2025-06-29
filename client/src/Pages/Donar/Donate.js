// import React, { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";
// import Layout from "../../Component/shared/Layout/Layout";
// import API from "../../Services/API";
// import { Droplet } from "lucide-react";

// const Donate = () => {
//   const { user } = useSelector((state) => state.auth);
//   const navigate = useNavigate();

//   const [bloodGroup, setBloodGroup] = useState("");
//   const [quantity, setQuantity] = useState("");
//   const [email, setEmail] = useState("");
//   const [organisations, setOrganisation] = useState([]);
//   const [selectedOrg, setSelectedOrg] = useState("");

//   useEffect(() => {
//     // Fetch organizations only once user data is available
//     if (user) {
//       setBloodGroup(user?.bloodGroup || "");
//     }

//     const fetchOrganisations = async () => {
//       try {
//         const { data } = await API.get("/donor/organization-list");
//         if (data?.success) setOrganisation(data?.orgData);
//       } catch (error) {
//         toast.error("Failed to fetch hospitals. Please try again.");
//       }
//     };

//     fetchOrganisations();
//   }, [user]); // Depend on user to ensure that the effect runs when user is updated

//   const handleDonateSubmit = async (e) => {
//     e.preventDefault();
//     if (!bloodGroup || !quantity || !email || !selectedOrg) {
//       toast.error("Please provide all fields");
//       return;
//     }
//     if (quantity <= 0) {
//       toast.error("Quantity must be a positive number");
//       return;
//     }
//     try {
//       const { data } = await API.post("/donor/create-inventory", {
//         email,
//         inventoryType: "in",
//         bloodGroup,
//         quantity,
//         organisation: selectedOrg,
//       });

//       if (data?.success) {
//         toast.success(
//           "Your donation request is processed. You will be notified by email when the donation is confirmed by the organization"
//         );
//         navigate("/donor/donation");
//       }
//     } catch (error) {
//       toast.error(
//         error.response?.data?.message || "Error creating donation record"
//       );
//     }
//   };

//   if (!user) {
//     return <div>Loading...</div>; // Or a better loading indicator
//   }

//   return (
//     <Layout>
//       {/* Custom Fade In Animation */}
//       <style>
//         {`
//           @keyframes fadeInUp {
//             0% {
//               opacity: 0;
//               transform: translateY(20px);
//             }
//             100% {
//               opacity: 1;
//               transform: translateY(0);
//             }
//           }
//           .fade-in-up {
//             animation: fadeInUp 0.7s ease forwards;
//           }
//         `}
//       </style>

//       {/* Donation Form */}
//       <div className="container px-4 mx-auto mt-10 fade-in-up">
//         <div className="max-w-md p-6 mx-auto bg-white rounded-lg shadow-xl transition-transform duration-500 hover:scale-[1.02]">
//           <h2 className="flex items-center justify-center gap-2 mb-6 text-xl font-bold text-center text-red-700">
//             <Droplet className="w-6 h-6 text-red-700 animate-pulse" /> Donate
//             Blood
//           </h2>
//           <form onSubmit={handleDonateSubmit} className="space-y-4">
//             {/* Blood Group (Already Selected) */}
//             <div>
//               <label className="block mb-1 text-sm font-medium text-gray-700">
//                 Blood Group
//               </label>
//               <input
//                 type="text"
//                 className="w-full p-2 transition border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
//                 value={bloodGroup}
//                 disabled
//               />
//             </div>

//             {/* Quantity Field with Placeholder */}
//             <div>
//               <label className="block mb-1 text-sm font-medium text-gray-700">
//                 Quantity (ML)
//               </label>
//               <input
//                 type="number"
//                 className="w-full p-2 transition border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
//                 value={quantity}
//                 onChange={(e) => setQuantity(e.target.value)}
//                 placeholder="Enter Quantity"
//               />
//             </div>

//             {/* Email Field */}
//             <div>
//               <label className="block mb-1 text-sm font-medium text-gray-700">
//                 Email
//               </label>
//               <input
//                 type="email"
//                 className="w-full p-2 transition border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//               />
//             </div>

//             {/* Organisation Selection */}
//             <div>
//               <label className="block mb-1 text-sm font-medium text-gray-700">
//                 Select Organisation
//               </label>
//               <select
//                 className="w-full p-2 transition border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
//                 value={selectedOrg}
//                 onChange={(e) => setSelectedOrg(e.target.value)}
//               >
//                 <option value="">Select Organisation</option>
//                 {organisations.map((org) => (
//                   <option key={org._id} value={org._id}>
//                     {org.organisationName}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             <div>
//               <button
//                 type="submit"
//                 className="w-full px-4 py-2 text-white transition-transform transform bg-red-700 rounded-md shadow-md hover:bg-red-600 hover:scale-105"
//               >
//                 Donate
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </Layout>
//   );
// };

// export default Donate;

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Layout from "../../Component/shared/Layout/Layout";
import API from "../../Services/API";
import { Droplet } from "lucide-react";

const Donate = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const [bloodGroup, setBloodGroup] = useState("");
  const [quantity, setQuantity] = useState("");
  const [email, setEmail] = useState("");
  const [organisations, setOrganisation] = useState([]);
  const [selectedOrg, setSelectedOrg] = useState("");
  const [loading, setLoading] = useState(false); // loading state

  useEffect(() => {
    if (user) {
      setBloodGroup(user?.bloodGroup || "");
    }

    const fetchOrganisations = async () => {
      try {
        const { data } = await API.get("/donor/organization-list");
        if (data?.success) setOrganisation(data?.orgData);
      } catch (error) {
        toast.error("Failed to fetch hospitals. Please try again.");
      }
    };

    fetchOrganisations();
  }, [user]);

  const handleDonateSubmit = async (e) => {
    e.preventDefault();
    if (!bloodGroup || !quantity || !email || !selectedOrg) {
      toast.error("Please provide all fields");
      return;
    }

    if (quantity <= 0) {
      toast.error("Quantity must be a positive number");
      return;
    }

    try {
      setLoading(true);
      const loadingToast = toast.loading("Processing your donation...");

      const { data } = await API.post("/donor/create-inventory", {
        email,
        inventoryType: "in",
        bloodGroup,
        quantity,
        organisation: selectedOrg,
      });

      toast.dismiss(loadingToast); // Remove loading toast

      if (data?.success) {
        toast.success(
          "Your donation request is processed. You will be notified by email when the donation is confirmed by the organization"
        );
        navigate("/donor/donation");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Error creating donation record"
      );
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <Layout>
      <style>
        {`
          @keyframes fadeInUp {
            0% {
              opacity: 0;
              transform: translateY(20px);
            }
            100% {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .fade-in-up {
            animation: fadeInUp 0.7s ease forwards;
          }
        `}
      </style>

      <div className="container px-4 mx-auto mt-10 fade-in-up">
        <div className="max-w-md p-6 mx-auto bg-white rounded-lg shadow-xl transition-transform duration-500 hover:scale-[1.02]">
          <h2 className="flex items-center justify-center gap-2 mb-6 text-xl font-bold text-center text-red-700">
            <Droplet className="w-6 h-6 text-red-700 animate-pulse" /> Donate
            Blood
          </h2>
          <form onSubmit={handleDonateSubmit} className="space-y-4">
            {/* Blood Group (Disabled) */}
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Blood Group
              </label>
              <input
                type="text"
                className="w-full p-2 transition border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                value={bloodGroup}
                disabled
              />
            </div>

            {/* Quantity */}
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Quantity (ML)
              </label>
              <input
                type="number"
                className="w-full p-2 transition border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                placeholder="Enter Quantity"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                className="w-full p-2 transition border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Organisation */}
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Select Organisation
              </label>
              <select
                className="w-full p-2 transition border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                value={selectedOrg}
                onChange={(e) => setSelectedOrg(e.target.value)}
              >
                <option value="">Select Organisation</option>
                {organisations.map((org) => (
                  <option key={org._id} value={org._id}>
                    {org.organisationName}
                  </option>
                ))}
              </select>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                disabled={loading}
                className={`w-full px-4 py-2 text-white transition-transform transform bg-red-700 rounded-md shadow-md ${
                  loading
                    ? "opacity-60 cursor-not-allowed"
                    : "hover:bg-red-600 hover:scale-105"
                }`}
              >
                {loading ? "Processing..." : "Donate"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Donate;
