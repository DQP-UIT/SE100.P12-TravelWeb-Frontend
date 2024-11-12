import React, { useState } from "react";
import { Switch } from "@material-tailwind/react";

// Fake data giả lập từ API
let fakePolicies = [
  {
    id: 117000,
    name: "CancelPolicy",
    roomType: "All Room Type",
    stayDateFrom: "02/06/2024",
    stayDateTo: "11/09/2024",
    by: "Cash",
    fee: "100 USD",
    status: true,
  },
  {
    id: 117001,
    name: "ChangeDayPolicy",
    roomType: "All Room Type",
    stayDateFrom: "02/06/2024",
    stayDateTo: "11/09/2024",
    by: "Card",
    fee: "150 USD",
    status: false,
  },
];

const PolicyBox = () => {
  const [policies, setPolicies] = useState(fakePolicies); // State chứa dữ liệu policy
  const [expandedPolicy, setExpandedPolicy] = useState(null); // Trạng thái để biết chính sách nào đang được mở rộng

  // Hàm để toggle dropdown menu của từng chính sách
  const togglePolicy = (id) => {
    setExpandedPolicy((prev) => (prev === id ? null : id));
  };

  // Hàm xử lý toggle button cho status của policy
  const handleToggleStatus = (id) => {
    setPolicies((prevPolicies) =>
      prevPolicies.map((policy) =>
        policy.id === id ? { ...policy, status: !policy.status } : policy
      )
    );
  };

  // Hàm xử lý thay đổi dữ liệu trong các input
  const handleOnPolicyChange = (id, field, value) => {
    setPolicies((prevPolicies) =>
      prevPolicies.map((policy) =>
        policy.id === id ? { ...policy, [field]: value } : policy
      )
    );
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-4 bg-white shadow-md rounded-lg">
      <div className="w-full h-auto p-4 bg-gray-100">
        {policies.map((policy) => (
          <div key={policy.id} className="mb-4">
            {/* Policy Dropdown Header */}
            <div
              className="flex flex-row items-center justify-between bg-gray-200 p-2 rounded-md cursor-pointer"
              onClick={() => togglePolicy(policy.id)}
            >
              <div className="basis-1/6 flex items-center">
                <span className="text-zinc-500 text-sm font-medium">
                  {policy.id}
                </span>
                <span className="ml-4 max-w-48 text-zinc-500 text-sm break-words">
                  {policy.name}
                </span>
              </div>
              <div className="basis-1/3 flex items-center space-x-4">
                <span className="text-zinc-500 text-sm">{policy.roomType}</span>
                <div className="flex space-x-1">
                  <span className="text-zinc-500 text-sm">Stay Date From:</span>
                  <span className="text-black text-sm">
                    {policy.stayDateFrom}
                  </span>
                  <span className="text-zinc-500 text-sm">To:</span>
                  <span className="text-black text-sm">
                    {policy.stayDateTo}
                  </span>
                </div>
              </div>
              {/* Toggle Button */}
              <div className="basis-1/6 flex items-center">
                <Switch
                  color="blue"
                  checked={policy.status}
                  onChange={() => handleToggleStatus(policy.id)}
                />
              </div>
              <button className="bg-cyan-500 text-white py-1 px-3 rounded-lg">
                Delete
              </button>
            </div>

            {/* Expanded Policy Details */}
            {expandedPolicy === policy.id && (
              <div className="bg-white p-4 mt-2 rounded-md shadow-md">
                {/* Row 1: Name and Room Type */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="flex flex-col">
                    <label className="text-black text-base font-medium mb-1">
                      Name:
                    </label>
                    <input
                      type="text"
                      value={policy.name}
                      className="border border-gray-400 rounded-md px-2 py-1 w-full max-w-md"
                      onChange={(e) =>
                        handleOnPolicyChange(policy.id, "name", e.target.value)
                      }
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-black text-base font-medium mb-1">
                      Room Type:
                    </label>
                    <input
                      type="text"
                      value={policy.roomType}
                      className="border border-gray-400 rounded-md px-2 py-1 w-full max-w-md"
                      readOnly
                    />
                  </div>
                </div>

                {/* Row 2: By and Fee */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="flex flex-col">
                    <label className="text-black text-base font-medium mb-1">
                      By:
                    </label>
                    <input
                      type="text"
                      value={policy.by}
                      className="border border-gray-400 rounded-md px-2 py-1 w-full max-w-md"
                      readOnly
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-black text-base font-medium mb-1">
                      Fee:
                    </label>
                    <input
                      type="text"
                      value={policy.fee}
                      className="border border-gray-400 rounded-md px-2 py-1 w-full max-w-md"
                      onChange={(e) =>
                        handleOnPolicyChange(policy.id, "fee", e.target.value)
                      }
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PolicyBox;
