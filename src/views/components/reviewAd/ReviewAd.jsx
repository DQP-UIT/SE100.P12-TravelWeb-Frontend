import React from 'react';
import { Table, Tag, Typography } from 'antd';

const CommentStatistics = () => {
  const columns = [
    {
      title: 'Tên dịch vụ',
      dataIndex: 'serviceName',
      key: 'serviceName',
    },
    {
      title: 'Phòng',
      dataIndex: 'room',
      key: 'room',
    },
    {
      title: 'Địa chỉ',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Đánh giá',
      dataIndex: 'comment',
      key: 'comment',
    },
    {
      title: 'Số sao',
      dataIndex: 'stars',
      key: 'stars',
    },
  ];
  const { Title } = Typography;
  const data = [
    {
      key: '1',
      serviceName: 'Dịch vụ A',
      room: 'Phòng 101',
      address: '123 Đường ABC, Quận 1, TP.HCM',
      comment: 'Dịch vụ rất tốt, nhân viên nhiệt tình.',
      ratingText: 'Tốt',
      stars: 5,
    },
    {
      key: '2',
      serviceName: 'Dịch vụ B',
      room: 'Phòng 202',
      address: '456 Đường XYZ, Quận 2, TP.HCM',
      comment: 'Phòng sạch sẽ nhưng hơi nhỏ.',
      ratingText: 'Trung bình',
      stars: 3,
    },
    {
      key: '3',
      serviceName: 'Dịch vụ C',
      room: 'Không áp dụng',
      address: '789 Đường DEF, Quận 3, TP.HCM',
      comment: 'Thức ăn ngon nhưng phục vụ hơi chậm.',
      ratingText: 'Khá',
      stars: 4,
    },
  ];
  
  return (
    <div>
    <Title level={3}>Thống kê đánh giá</Title>
    <Table columns={columns} dataSource={data} pagination={{ pageSize: 5 }} />;
    </div>
  ) 
};

export default CommentStatistics;
