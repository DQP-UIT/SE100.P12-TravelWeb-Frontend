import React, { useState } from "react";
import { Card, List, Avatar, Rate, Row, Col, Modal } from "antd";

const PlaceInfo = ({ data }) => {
  const { name, description, reviews, information, photos, rating } = data;
  const [visible, setVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

  const handleImageClick = (photo) => {
    setSelectedImage(photo);
    setVisible(true);
  };

  return (
    <Card
      title={<h2 style={{ color: '#2c3e50' }}>{name}</h2>}
      bordered={false}
      style={{
        maxWidth: 800,
        margin: "auto",
        backgroundColor: "#f9f9f9",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        borderRadius: 10,
      }}
    >
    {/* Hiển thị ảnh địa điểm */}
    {photos && photos.length > 0 && (
        <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
          {/* Ảnh lớn bên trái */}
          <div style={{ flex: 2 }}>
            <img
              src={photos[0]}
              alt="main"
              style={{
                width: '100%',
                height: 'auto',
                borderRadius: '10px',
                cursor: 'pointer',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              }}
              onClick={() => handleImageClick(photos[0])}
            />
          </div>
          {/* Các ảnh nhỏ bên phải */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {photos.slice(1, 4).map((photo, index) => (
              <img
                key={index}
                src={photo}
                alt={`thumbnail-${index}`}
                style={{
                  width: '100%',
                  height: 'auto',
                  borderRadius: '10px',
                  cursor: 'pointer',
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                }}
                onClick={() => handleImageClick(photo)}
              />
            ))}
          </div>
        </div>
      )}
      {/* Hiển thị thông tin địa điểm */}
      <p style={{ fontSize: '16px', color: '#555' }}><strong>Mô tả: </strong>{information}</p>
      <p style={{ fontSize: '16px', color: '#555' }}><strong>Địa chỉ: </strong>{description}</p>

      

      {/* Hiển thị đánh giá sao tổng cộng của địa điểm */}
      {rating && (
        <div style={{ marginBottom: '20px' }}>
          <h4>Điểm đánh giá: </h4>
          <Rate disabled value={rating} style={{ fontSize: '18px' }} />
          <p>{rating} / 5 sao</p>
        </div>
      )}

      {/* Hiển thị các review */}
      <List
        itemLayout="horizontal"
        dataSource={reviews}
        renderItem={(review) => (
          <List.Item
            style={{
              padding: '15px',
              borderBottom: '1px solid #ddd',
              borderRadius: 10,
              backgroundColor: '#fff',
              marginBottom: '10px',
            }}
          >
            <List.Item.Meta
              avatar={
                <Avatar
                  src={review.profile_photo_url || 'default-avatar.png'}
                  size={50}
                  style={{ borderRadius: '50%', border: '2px solid #ddd' }}
                />
              }
              title={
                <a
                  href={review.author_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ fontWeight: 'bold', color: '#3498db' }}
                >
                  {review.author_name}
                </a>
              }
              description={
                <>
                  <Rate disabled value={review.rating} style={{ marginBottom: '8px' }} />
                  <p style={{ fontSize: '14px', color: '#666' }}>{review.text}</p>
                  <small style={{ color: '#999' }}>{review.relative_time_description}</small>
                </>
              }
            />
          </List.Item>
        )}
      />

      {/* Modal hiển thị ảnh phóng to */}
      <Modal
        visible={visible}
        footer={null}
        onCancel={() => setVisible(false)}
        centered
      >
        <img
          src={selectedImage}
          alt="selected"
          style={{ width: '100%', height: 'auto', borderRadius: '10px' }}
        />
      </Modal>
    </Card>
  );
};

export default PlaceInfo;
