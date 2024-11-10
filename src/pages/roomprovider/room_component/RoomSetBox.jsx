import React from "react";

const RoomSetBox = () => {
  return (
    <div className="w-full max-w-7xl mx-auto p-4 bg-white shadow-md rounded-lg">
      {/* Header */}
      <div className="bg-blue-500 p-4 rounded-t-lg text-white text-center text-xl font-bold">
        <div className="flex justify-between">
          <span>404404</span>
          <span>Person: 2</span>
          <span>Photos: 0</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 bg-zinc-300/50 shadow rounded-b-lg">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Thông tin cơ bản */}
          <div className="flex flex-col space-y-4">
            <h3 className="text-lg font-bold text-black">Thông tin cơ bản</h3>
            <div className="flex flex-col">
              <label className="text-black">
                Tên phòng <span className="text-red-600">*</span>:
              </label>
              <input
                type="text"
                className="p-2 bg-zinc-100 rounded border border-black/60"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-black">
                Tên phòng nội bộ (không hiển thị với khách):
              </label>
              <input
                type="text"
                className="p-2 bg-zinc-100 rounded border border-black/60"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-black">Mã liên kết:</label>
              <input
                type="text"
                className="p-2 bg-zinc-100 rounded border border-black/60"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-black">
                Số lượng phòng <span className="text-red-600">*</span>:
              </label>
              <input
                type="number"
                className="p-2 bg-zinc-100 rounded border border-black/60"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-black">
                Giá tối thiểu <span className="text-red-600">*</span>:
              </label>
              <div className="flex items-center">
                <input
                  type="number"
                  className="p-2 bg-zinc-100 rounded border border-black/60 flex-grow"
                />
                <span className="ml-2 text-black">VND</span>
              </div>
            </div>
          </div>

          {/* Cài đặt số lượng khách */}
          <div className="flex flex-col space-y-4">
            <h3 className="text-lg font-bold text-black">
              Cài đặt số lượng khách
            </h3>
            <div className="flex flex-col">
              <label className="text-black">Room occupancy:</label>
              <input
                type="number"
                className="p-2 bg-zinc-100 rounded border border-black/60"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-black">Giường:</label>
              <input
                type="number"
                className="p-2 bg-zinc-100 rounded border border-black/60"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-black">Allow kids:</label>
              <select className="p-2 bg-zinc-100 rounded border border-black/60">
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>
            <div className="flex flex-col">
              <label className="text-black">
                Free for kids (up to 12 years old):
              </label>
              <input
                type="number"
                className="p-2 bg-zinc-100 rounded border border-black/60"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-black">
                Tổng số khách được phép ở trong phòng:
              </span>
              <span className="ml-2">2 x 👤 + 1 x 🛏️ + 0 x 👶 = 2</span>
            </div>
          </div>

          {/* Nội dung */}
          <div className="flex flex-col space-y-4">
            <h3 className="text-lg font-bold text-black">Nội dung</h3>
            <div className="flex flex-col">
              <label className="text-black">Tổng số ảnh:</label>
              <button className="p-2 bg-blue-500 text-white rounded">
                Tải ảnh
              </button>
            </div>
            <div className="flex flex-col">
              <label className="text-black">Diện tích phòng (m2):</label>
              <input
                type="number"
                min={5}
                placeholder="Ít nhất 5(m2)"
                className="p-2 bg-zinc-100 rounded border border-black/60"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-black">Hướng:</label>
              <select className="p-2 bg-zinc-100 rounded border border-black/60">
                <option>Vui lòng chọn</option>
                <option>Đông</option>
                <option>Tây</option>
                <option>Nam</option>
                <option>Bắc</option>
              </select>
            </div>
            <div className="flex flex-col">
              <label className="text-black">Tiện nghi:</label>
              <select className="p-2 bg-zinc-100 rounded border border-black/60">
                <option>Vui lòng chọn</option>
                <option>Có</option>
                <option>Không</option>
              </select>
            </div>
            <div className="flex flex-col">
              <label className="text-black">Giường:</label>
              <select className="p-2 bg-zinc-100 rounded border border-black/60">
                <option>Vui lòng chọn</option>
                <option>Có</option>
                <option>Không</option>
              </select>
            </div>
            <div className="flex flex-col">
              <label className="text-black">Số phòng tắm:</label>
              <input
                type="number"
                className="p-2 bg-zinc-100 rounded border border-black/60"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomSetBox;
