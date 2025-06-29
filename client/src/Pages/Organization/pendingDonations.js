import React, { useEffect, useState } from "react";
import moment from "moment";
import Layout from "../../Component/shared/Layout/Layout";
import API from "../../Services/API";
import { useSelector } from "react-redux";
import {
  FiUsers,
  FiDroplet,
  FiCalendar,
  FiMail,
  FiUser,
  FiClock,
} from "react-icons/fi";
import { FaSearch } from "react-icons/fa";
import toast from "react-hot-toast";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TimePicker from "react-time-picker";
import "react-time-picker/dist/TimePicker.css";

const PendingDonations = () => {
  const { user } = useSelector((state) => state.auth);
  const [data, setData] = useState([]);
  const [orgName, setOrgName] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [showCollectionModal, setShowCollectionModal] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [collectionDate, setCollectionDate] = useState(new Date());
  const [collectionTime, setCollectionTime] = useState("10:00");

  const getDonars = async () => {
    try {
      setIsLoading(true);
      if (user) {
        const res = await API.post("/organisation/get-pending-donations", {
          id: user._id,
        });
        if (res.data.success) {
          setData(res.data.data);
          setOrgName(res.data.organisationName || "");
        }
      }
    } catch (error) {
      console.log("Error fetching donors:", error);
      toast.error("Failed to fetch donor records");
    } finally {
      setIsLoading(false);
    }
  };

  const openCollectionModal = (record) => {
    setSelectedRecord(record);
    setCollectionDate(new Date());
    setCollectionTime("10:00");
    setShowCollectionModal(true);
  };

  const handleBloodCollection = async () => {
    try {
      setIsLoading(true);

      // Combine date and time
      const dateStr = moment(collectionDate).format("YYYY-MM-DD");
      const collectionDateTime = moment(
        `${dateStr} ${collectionTime}`,
        "YYYY-MM-DD HH:mm"
      ).toISOString();

      const { data } = await API.post("/organisation/collect-blood", {
        orgInventoryId: selectedRecord.orgInventoryId,
        userInventoryId: selectedRecord.userInventoryId,
        collectionDateTime,
      });

      if (data.success) {
        toast.success(
          "Blood collection scheduled successfully! Donor notified."
        );
        setShowCollectionModal(false);
        getDonars();
      } else {
        toast.error(data.message || "Failed to schedule collection");
      }
    } catch (error) {
      console.error("Error scheduling collection:", error);
      toast.error("An error occurred while scheduling collection");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getDonars();
  }, [user]);

  const filteredData = data.filter(
    (donor) =>
      donor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      donor.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      donor.bloodGroup.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getBloodGroupColor = (bloodGroup) => {
    const colors = {
      "O+": "bg-red-100 text-red-800",
      "O-": "bg-red-200 text-red-900",
      "A+": "bg-blue-100 text-blue-800",
      "A-": "bg-blue-200 text-blue-900",
      "B+": "bg-green-100 text-green-800",
      "B-": "bg-green-200 text-green-900",
      "AB+": "bg-purple-100 text-purple-800",
      "AB-": "bg-purple-200 text-purple-900",
    };
    return colors[bloodGroup] || "bg-gray-100 text-gray-800";
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
              <FiUsers className="inline mr-2" />
              Pending Donations for{" "}
              <span className="text-blue-600">
                {orgName || "your organization"}
              </span>
            </h1>
            <p className="text-gray-600 mt-2">
              Manage and schedule blood collection from donors
            </p>
          </div>
          <div className="relative mt-4 md:mt-0 w-full md:w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Search donors..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            <span className="ml-4">Loading donor records...</span>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <div className="flex items-center">
                        <FiUser className="mr-2" /> Donor
                      </div>
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <div className="flex items-center">
                        <FiDroplet className="mr-2" /> Blood Group
                      </div>
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Quantity (ml)
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <div className="flex items-center">
                        <FiMail className="mr-2" /> Contact
                      </div>
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <div className="flex items-center">
                        <FiCalendar className="mr-2" /> Donation Date
                      </div>
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredData.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="px-6 py-4 text-center">
                        <div className="flex flex-col items-center justify-center py-12">
                          <FiUsers className="text-4xl text-gray-400 mb-4" />
                          <p className="text-gray-500 text-lg">
                            {searchTerm
                              ? "No matching donors found"
                              : "No pending donations available"}
                          </p>
                          {searchTerm && (
                            <button
                              onClick={() => setSearchTerm("")}
                              className="mt-2 text-blue-600 hover:text-blue-800 text-sm"
                            >
                              Clear search
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ) : (
                    filteredData.map((record, index) => (
                      <tr
                        key={index}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-medium">
                              {record.name.charAt(0).toUpperCase()}
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {record.name}
                              </div>
                              <div className="text-xs text-gray-500">
                                {record.email}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getBloodGroupColor(
                              record.bloodGroup
                            )}`}
                          >
                            {record.bloodGroup}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <span className="font-medium">
                            {record.quantity} ml
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <div>
                            <div>{record.phone}</div>
                            <div className="text-xs text-gray-400">
                              {record.address || "Address not provided"}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {moment(record.donatedAt).format(
                            "MMM D, YYYY h:mm A"
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <button
                            onClick={() => openCollectionModal(record)}
                            className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md text-sm font-medium transition-colors flex items-center"
                            disabled={isLoading}
                          >
                            <FiClock className="mr-1" />
                            Schedule Collection
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {filteredData.length > 0 && (
              <div className="bg-gray-50 px-6 py-3 flex items-center justify-between border-t border-gray-200">
                <div className="text-sm text-gray-500">
                  Showing{" "}
                  <span className="font-medium">{filteredData.length}</span> of{" "}
                  <span className="font-medium">{data.length}</span> records
                </div>
              </div>
            )}
          </div>
        )}

        {/* Collection Schedule Modal */}
        {/* {showCollectionModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
              <div className="px-6 py-4 border-b border-gray-200 bg-blue-600 text-white rounded-t-lg">
                <h3 className="text-lg font-medium">Schedule Blood Collection</h3>
              </div>
              
              <div className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Donor Name
                    </label>
                    <div className="bg-gray-50 p-2 rounded-lg border border-gray-200">
                      <p className="font-medium">{selectedRecord?.name}</p>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Blood Group
                    </label>
                    <div className="bg-gray-50 p-2 rounded-lg border border-gray-200">
                      <p className="font-medium">{selectedRecord?.bloodGroup}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Collection Date
                  </label>
                  <DatePicker
                    selected={collectionDate}
                    onChange={(date) => setCollectionDate(date)}
                    minDate={new Date()}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    dateFormat="MMMM d, yyyy"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Collection Time
                  </label>
                  <div className="flex items-center">
                    <TimePicker
                      onChange={setCollectionTime}
                      value={collectionTime}
                      disableClock={true}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                    <FiClock className="ml-2 text-gray-500" />
                  </div>
                </div>

                <div className="pt-2">
                  <p className="text-sm text-gray-600">
                    An email notification with these details will be sent to the donor.
                  </p>
                </div>
              </div>
              
              <div className="px-6 py-4 border-t border-gray-200 flex justify-end space-x-3">
                <button
                  onClick={() => setShowCollectionModal(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleBloodCollection}
                  disabled={isLoading}
                  className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 disabled:opacity-50 transition-colors flex items-center"
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Scheduling...
                    </>
                  ) : (
                    <>
                      <FiClock className="mr-1" />
                      Confirm Schedule
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )} */}
        {showCollectionModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
              {/* Modal Header */}
              <div className="px-6 py-4 bg-gradient-to-r from-blue-600 to-blue-500 text-white">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold flex items-center">
                    <FiClock className="mr-2" />
                    Schedule Collection
                  </h3>
                  <button
                    onClick={() => setShowCollectionModal(false)}
                    className="text-white hover:text-blue-100 transition-colors"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Donor Info Section */}
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0 h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-medium text-xl">
                    {selectedRecord?.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h4 className="text-lg font-medium text-gray-900">
                      {selectedRecord?.name}
                    </h4>
                    <div className="flex items-center space-x-2 mt-1">
                      <span
                        className={`px-2 py-1 text-xs font-semibold rounded-full ${getBloodGroupColor(
                          selectedRecord?.bloodGroup
                        )}`}
                      >
                        {selectedRecord?.bloodGroup}
                      </span>
                      <span className="text-sm text-gray-500">
                        {selectedRecord?.quantity} ml
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Scheduling Section */}
              <div className="p-6 space-y-6">
                {/* Date Picker */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700 flex items-center">
                    <FiCalendar className="mr-2 text-blue-500" />
                    Collection Date
                  </label>
                  <div className="relative">
                    <DatePicker
                      selected={collectionDate}
                      onChange={(date) => setCollectionDate(date)}
                      minDate={new Date()}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                      dateFormat="MMMM d, yyyy"
                      popperPlacement="bottom-start"
                      popperModifiers={{
                        offset: {
                          enabled: true,
                          offset: "5px, 10px",
                        },
                        preventOverflow: {
                          enabled: true,
                          escapeWithReference: false,
                          boundariesElement: "viewport",
                        },
                      }}
                    />
                    <div className="absolute left-3 top-2.5 text-gray-400">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Time Picker */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700 flex items-center">
                    <FiClock className="mr-2 text-blue-500" />
                    Collection Time
                  </label>
                  <div className="relative">
                    <div className="flex items-center border border-gray-300 rounded-lg shadow-sm focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 bg-white h-10">
                      <select
                        value={collectionTime}
                        onChange={(e) => setCollectionTime(e.target.value)}
                        className="w-full h-full pl-3 pr-6 appearance-none bg-transparent border-0 focus:ring-0 focus:outline-none text-sm"
                      >
                        {Array.from({ length: 24 }, (_, hour) =>
                          ["00"].map((min) => {
                            const time = `${hour
                              .toString()
                              .padStart(2, "0")}:${min}`;
                            return (
                              <option key={time} value={time}>
                                {time}
                              </option>
                            );
                          })
                        )}
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                        <svg
                          className="h-4 w-4 text-gray-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </div>
                      
                    </div>
                  </div>
                </div>

                {/* Notification Preview */}
                <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-blue-400"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <h4 className="text-sm font-medium text-blue-800">
                        Donor Notification
                      </h4>
                      <p className="text-sm text-blue-700 mt-1">
                        {selectedRecord?.name} will receive an email with the
                        scheduled collection details.
                      </p>
                      <p className="text-xs text-blue-600 mt-2">
                        Scheduled for:{" "}
                        {moment(collectionDate).format("MMMM D, YYYY")} at{" "}
                        {collectionTime}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="px-6 py-4 bg-gray-50 flex justify-between rounded-b-2xl">
                <button
                  onClick={() => setShowCollectionModal(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleBloodCollection}
                  disabled={isLoading}
                  className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-green-500 to-green-600 rounded-lg shadow-sm hover:from-green-600 hover:to-green-700 disabled:opacity-70 transition-colors flex items-center"
                >
                  {isLoading ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Scheduling...
                    </>
                  ) : (
                    <>
                      <FiClock className="-ml-1 mr-2" />
                      Confirm Schedule
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default PendingDonations;
