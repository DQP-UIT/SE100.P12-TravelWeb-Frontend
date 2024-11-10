import React, { useState } from "react";
import { Switch } from "@material-tailwind/react";

// Fake data giả lập từ API
let fakeServices = [
  {
    id: 117000,
    name: "DeluxOnce",
    roomType: "All Room Type",
    stayDateFrom: "02/06/2024",
    stayDateTo: "11/09/2024",
    by: "100 USD",
    offer: "Best Vin",
    cancellationPolicy: "None",
    status: true,
  },
  {
    id: 117001,
    name: "DeluxDouble",
    roomType: "All Room Type",
    stayDateFrom: "02/06/2024",
    stayDateTo: "11/09/2024",
    by: "150 USD",
    offer: "Best Vin and Soda",
    cancellationPolicy: "None",
    status: false,
  },
];

const ServiceBox = () => {
  const [services, setServices] = useState(fakeServices);
  const [expandedService, setExpandedService] = useState(null);

  // Hàm để toggle dropdown menu của từng service
  const toggleService = (id) => {
    setExpandedService((prev) => (prev === id ? null : id));
  };

  // Hàm xử lý toggle button cho status của service
  const handleToggleStatus = (id) => {
    setServices((prevServices) =>
      prevServices.map((service) =>
        service.id === id ? { ...service, status: !service.status } : service
      )
    );
  };

  // Hàm xử lý thay đổi dữ liệu trong các input
  const handleOnServiceChange = (id, field, value) => {
    setServices((prevServices) =>
      prevServices.map((service) =>
        service.id === id ? { ...service, [field]: value } : service
      )
    );
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-4 bg-white shadow-md rounded-lg">
      <div className="flex flex-row">
        <div className="basis-1/3 mt-6">
          <span className="text-xl">Mã dịch vụ:</span>
          <input
            type="text"
            className="ml-2 p-1 bg-zinc-100 rounded border border-black/60"
          />
        </div>
        <div className="flex flex-col">
          <div>
            <span className="text-sm">Loại ưu đãi(</span>
            <span className="text-red-400 text-sm">*</span>
            <span className="text-sm">)</span>
          </div>
          <select
            name="loại ưu đãi"
            id="typesaleoff"
            className="p-2 w-48 bg-zinc-100 rounded border border-black/60"
          >
            <option>Vui lòng chọn</option>
            <option>USD</option>
            <option>Percent</option>
          </select>
        </div>
      </div>
      <div>
        <div className="w-96 h-20 relative mt-6">
          <div className="w-96 h-20 left-0 top-0 absolute bg-white" />
          <div className="w-28 h-9 left-[143px] top-[1px] absolute text-center text-black text-xl font-normal font-['Roboto']">
            From:{" "}
          </div>
          <div className="w-28 h-9 left-[138px] top-[43px] absolute text-center text-black text-xl font-normal font-['Roboto']">
            To:
          </div>
          <input
            type="date"
            className="w-64 h-7 left-[250px] top-[7px] absolute bg-white rounded border border-black p-1"
          />
          <input
            type="date"
            className="w-64 h-7 left-[250px] top-[47px] absolute bg-white rounded border border-black p-1"
          />
          <div className="w-32 h-20 left-[3px] top-0 absolute bg-blue-500" />
          <div className="w-32 h-7 left-[3px] top-[29px] absolute text-center text-white text-xl font-normal font-['Roboto']">
            Stay Date
          </div>
        </div>
      </div>
      {/* Service DropDown */}
      <div className="w-full h-auto p-4 bg-gray-100">
        {services.map((service) => (
          <div key={service.id} className="mb-4">
            {/* Service Dropdown Header */}
            <div
              className="flex flex-row items-center justify-between bg-gray-200 p-2 rounded-md cursor-pointer"
              onClick={() => toggleService(service.id)}
            >
              <div className="basis-1/6 flex items-center">
                <span className="text-zinc-500 text-sm font-medium">
                  {service.id}
                </span>
                <span className="ml-4 max-w-48 text-zinc-500 text-sm break-words">
                  {service.name}
                </span>
              </div>
              <div className="basis-1/3 flex items-center space-x-4">
                <span className="text-zinc-500 text-sm">
                  {service.roomType}
                </span>
                <div className="flex space-x-1">
                  <span className="text-zinc-500 text-sm">Stay Date From:</span>
                  <span className="text-black text-sm">
                    {service.stayDateFrom}
                  </span>
                  <span className="text-zinc-500 text-sm">To:</span>
                  <span className="text-black text-sm">
                    {service.stayDateTo}
                  </span>
                </div>
              </div>
              {/* Toggle Button */}
              <div className="basis-1/6 flex items-center">
                <Switch
                  color="blue"
                  checked={service.status}
                  onChange={() => handleToggleStatus(service.id)}
                />
              </div>
              <button className="bg-cyan-500 text-white py-1 px-3 rounded-lg">
                Delete
              </button>
            </div>

            {/* Expanded Service Details */}
            {expandedService === service.id && (
              <div className="bg-white p-4 mt-2 rounded-md shadow-md">
                {/* Row 1: Name and Room Type */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="flex flex-col">
                    <label className="text-black text-base font-medium mb-1">
                      Name:
                    </label>
                    <input
                      type="text"
                      value={service.name}
                      className="border border-gray-400 rounded-md px-2 py-1 w-full max-w-md"
                      onChange={(e) =>
                        handleOnServiceChange(
                          service.id,
                          "name",
                          e.target.value
                        )
                      }
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-black text-base font-medium mb-1">
                      Room Type:
                    </label>
                    <input
                      type="text"
                      value={service.roomType}
                      className="border border-gray-400 rounded-md px-2 py-1 w-full max-w-md"
                      readOnly
                    />
                  </div>
                </div>

                {/* Row 2: By and Offer */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="flex flex-col">
                    <label className="text-black text-base font-medium mb-1">
                      By:
                    </label>
                    <input
                      type="text"
                      value={service.by}
                      className="border border-gray-400 rounded-md px-2 py-1 w-full max-w-md"
                      onChange={(e) =>
                        handleOnServiceChange(service.id, "by", e.target.value)
                      }
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-black text-base font-medium mb-1">
                      Offer:
                    </label>
                    <input
                      type="text"
                      value={service.offer}
                      className="border border-gray-400 rounded-md px-2 py-1 w-full max-w-md"
                      onChange={(e) =>
                        handleOnServiceChange(
                          service.id,
                          "offer",
                          e.target.value
                        )
                      }
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-black text-base font-medium mb-1">
                      Cancellation Policy:
                    </label>
                    <input
                      type="text"
                      value={service.cancellationPolicy}
                      className="border border-gray-400 rounded-md px-2 py-1 w-full max-w-md"
                      onChange={(e) =>
                        handleOnServiceChange(
                          service.id,
                          "cancellationPolicy",
                          e.target.value
                        )
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

export default ServiceBox;
