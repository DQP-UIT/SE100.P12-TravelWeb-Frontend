import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Input, Table, Button, Select, Image, Form, InputNumber, Modal, notification, Upload, Checkbox, message, Row, Card, Col, Rate } from 'antd';
import { ContainerFilled, DeleteOutlined, EditOutlined, LeftOutlined, PlusOutlined, RightOutlined } from '@ant-design/icons';
// import { filtersData } from '../../../models/fake-data';
// import { product, productData } from '../../../models/fake-data';
// import DecriptionEnterZone from '../DecriptionEnterZone/DecriptionEnterZone';
import { ImageBlock, ImageWrapper, ThumbnailList, ThumbnailWrapper, Thumbnail, NavButton, Wrapper, Container, LeftSection, RightSection, Title, StyledInput, TableWrapper } from './style';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getHotelDetails } from '../../../viewModel/hotelAction';
import { set } from "lodash";
import TextArea from 'antd/es/input/TextArea';
import LocationPicker from '../locationPicker/LocationPicker';
import { uploadFile } from '../../../model/uploadSlice';
import { clearErrors } from '../../../viewModel/userActions';
import { getHotelType } from '../../../viewModel/hotelTypeAction';
import { getFacilityTypeByType } from '../../../viewModel/FacilityTypeAction';
import { getFacilitiesByType } from '../../../viewModel/facilitiesAction';
import { getSuitabilities } from '../../../viewModel/suitabilitiesAction';
import { updateService } from '../../../viewModel/serviceActions';
import { createRoom } from '../../../viewModel/roomActions';
//import { uploadFile } from '../../../redux/Slicer/uploadSlice';
// import { fetchAttributesByType } from '../../../redux/Slicer/attributeSlice';
// import { updateProduct } from '../../../redux/Slicer/productSlice';

const { Option } = Select;

const Service = (selectedRow) => {
  const [errorMessage, setErrorMessage] = useState('');
  const [errorMessage2, setErrorMessage2] = useState('');
  const [errorMessage3, setErrorMessage3] = useState('');
  const dispatch = useDispatch();

  const ReviewList = ({ reviews }) => {
    return (
      <div className="review-list">
        {reviews?.map((review) => (
          <Card
            key={review._id.$oid}
            className="review-card"
            bordered
            style={{ marginBottom: "16px", borderRadius: "8px" }}
          >
            <Row justify="space-between" align="middle" className="review-header">
              <Col>
                <p className="font-bold" style={{ marginBottom: 4 }}>
                  Khách hàng: <span style={{ fontWeight: "normal" }}>{review.userID.fullName}</span>
                </p>
                <p style={{ color: "gray", fontSize: "12px", marginBottom: 0 }}>
                  Ngày: {review.date.slice(0, 10)}
                </p>
              </Col>
              <Col>
                <Rate disabled defaultValue={review.stars} style={{ color: "#faad14" }} />
              </Col>
            </Row>
  
            <div className="review-body" style={{ marginTop: "12px" }}>
              <p style={{ color: "green", marginBottom: 0 }}>
                <strong></strong> {review.positiveComment || "No positive comments"}
              </p>
            </div>
          </Card>
        ))}
      </div>
    );
  };
  

   const { id } = useParams();
      
  const [addSer, setAddSer] = useState(false);
  
 
  
      // Lấy thông tin chi tiết từ state
      const { hotelDetails, loading, error } = useSelector((state) => state.hotel);
    
      useEffect(() => {
        dispatch(getHotelDetails(id));
      }, [dispatch, id,addSer]);
  
      
    
  const [service, setService] = useState(hotelDetails);

  useEffect(() => {
    setService(hotelDetails);
  }, [hotelDetails]);
  console.log("HELLL)",service );

  //const { attributes } = useSelector((state) => state.attributes);
 // console.log("PRODUCT",selectedRow)
//   useEffect(() => {
   
//     if (selectedRow.type) {
//       console.log("HELLLLLO")
//       dispatch(fetchAttributesByType(selectedRow.type)); // Fetch attributes when the 'type' changes
//     }
//   }, [dispatch, selectedRow.type]); // Re-fetch when 'type' changes
//       // Add more products as needed

//       console.log("ATTRRI",attributes)
      

//       const generateObjectId = () => {
//         const timestamp = Math.floor(Date.now() / 1000).toString(16).padStart(8, '0'); // 4 byte timestamp
//         const randomHex = () => Math.random().toString(16).substr(2, 8); // 8 hex chars
//         return (timestamp + randomHex() + randomHex()).substr(0, 24); // Đảm bảo đúng 24 ký tự
//       };
      

//     const newSelectedRow = {
//       ...selectedRow,
//       selectedRow: {
//         ...selectedRow.selectedRow,
//         colors: selectedRow.selectedRow.colors?.map(color => {
          

//           const updatedInventory = [...color?.inventory]

//           const result = attributes.find(obj => obj.name === "Size");


//           result?.values.forEach(val => {
//         if (!updatedInventory.some(inv => inv?.attribute === val?._id)) {
//         updatedInventory.push({
//           _id: generateObjectId() ,// Hoặc giá trị mặc định phù hợp nếu cần,
//           attribute: val._id,
//           number: 0,
         
//         });
//         }
//         });
//         console.log("NEW",updatedInventory)

//           return {...color,inventory:updatedInventory};
//         })
//       }
//     };

  

  //const [productState, setProductState] = useState(newSelectedRow.selectedRow);
  
  //const [productDataState, setProductData] = useState(attributes || []);
  const [formColorEdit] = Form.useForm();
  const [formStockEdit] = Form.useForm();
  const [formAddStock] = Form.useForm();
  const [formAddColor] = Form.useForm();
  const [formAttribute] = Form.useForm();

  const [startIndex, setStartIndex] = useState(0);
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [isColorModalVisible, setIsColorModalVisible] = useState(false);
  const [isStockModalVisible, setIsStockModalVisible] = useState(false);
  const [isAttributesModalVisible, setIsAttributesModalVisible] = useState(false);
  const [editingColor, setEditingColor] = useState();
  const [editingStock, setEditingStock] = useState(null);
  const [editingAttributes, setEditingAttributes] = useState(null);

  const handleCancelColorModal = () => setIsColorModalVisible(false);
  const handleCancelStockModal = () => setIsStockModalVisible(false);
  const handleCancelAttributesModal = () => setIsAttributesModalVisible(false);

  

  
  

  const handleOkAttributesModal = async () => {
    try {
      const selectedItems = form.getFieldValue('selectedItems'); // Get the selected values from the form
  
      // Perform a deep copy of the service object to avoid mutating the original state
      let updatedService2 = JSON.parse(JSON.stringify(service));
  
      console.log("MÁ M",updatedService2)
      // Update the correct array based on the 'editingAttributes.name'
      if (editingAttributes?.name === 'Phù hợp') {
        updatedService2.hotel.serviceID.suitability = selectedItems.map((idd) => ({ _id: idd }));
      } else if (editingAttributes?.name === 'Tiện nghi') {
        updatedService2.hotel.serviceID.facilities = selectedItems.map((idd) => ({ _id: idd }));
      } else if (editingAttributes?.name === 'Loại giá') {
        updatedService2.hotel.serviceID.priceCategories = selectedItems.map((idd) => ({ _id: idd }));
      }
  
      // Update the service state with the deep copy
      setService(updatedService2);
      setIsAttributesModalVisible(false);
    } catch (error) {
      console.error("Error updating service:", error);
    }
  };
  
  

//   const handleOkColorModal = async () => {
//     try {
//       const values = await formColorEdit.validateFields();
      
//       console.log("SOSANH",values.basePrice < values.discountPrice,values.basePrice + "<"+ values.discountPrice)
//       if(values.basePrice < values.discountPrice){
//         setErrorMessage2("Giá giảm phải bé hơn giá gốc")
//         console.log("LOHEE")
//         return;
//       }
//       if( editingColor.images.length === 0){
//         setErrorMessage2("Bạn phải up ảnh lên")
//         return;
//       }
//       const updatedColorOptions = productState.colors.map((color) =>
//         color.id === editingColor.colorId
//           ? {
//               ...color,
//               price: values.basePrice,
//               discountPrice: values.discountPrice,
//             }
//           : color
//       );
//       productState.colors = updatedColorOptions;
//       console.log(updatedColorOptions)
//       setProductState(productState);
//       setIsColorModalVisible(false);
//       formColorEdit.setFieldsValue({
//         basePrice: values.basePrice,
//         discountPrice: values.discountPrice,
//       });
//       setEditingColor(null);

//       message.success('Sửa màu sắc thành công!');
//     } catch {}
//   };


//   const handleOkAddColorModal = async () => {
//     try {


//       const result = attributes.find(obj => obj.name === "Size");

// let updatedInventory = []
//       result?.values.forEach(val => {
   
//     updatedInventory.push({
//       _id: generateObjectId() ,// Hoặc giá trị mặc định phù hợp nếu cần,
//       attribute: val._id,
//       number: 0,
     
//     });
    
//     });


//       const values = await formAddColor.validateFields();


//       if(values.colorName.length <= 2){
//         setErrorMessage2("Tên màu phải lớn hơn 2 kí tự")
//         return;
//       }
//       if(values.colorName.length > 100){
//         setErrorMessage2("Tên màu không được lớn hơn 100 kí tự")
//         return;
//       }
//       if(values.basePriceNew< values.discountPriceNew){
//         setErrorMessage2("Giá giảm phải bé hơn giá gốc")
//         return;
//       }
//       if(tempImages.length === 0){
//         setErrorMessage2("Bạn phải up ảnh lên")
//         return;
//       }
//       const newColor = {
//         id: Date.now(),
//         colorName: values.colorName,
//         price: values.basePriceNew,
//         discountPrice: values.discountPriceNew,
//         images: tempImages,
//         inventory: updatedInventory,
//         _id: generateObjectId()
//       };
//       setProductState((prevProductState) => ({
//         ...prevProductState,
//         colors: [...prevProductState.colors, newColor],
//       }));
//       setIsAddColorModalVisible(false);
//       setTempImages([]);
//       formAddColor.resetFields();
//       message.success('Thêm màu mới thành công!');
//     } catch (error) {
//       console.error("Error adding color:", error);
//     }
//   };


//   const handleOkStockModal = async () => { 
//     try {
//       var id = 0;
//       if (editingColor !== null) {
//         id = editingColor.colorId;
//       }
//       const values = await formStockEdit.validateFields();
//       console.log("IDD", id);
  
//       // Tạo bản sao sâu của productState
//       let newProduct = JSON.parse(JSON.stringify(productState));
  
//       // Cập nhật tồn kho
//       updateInventoryNumber(newProduct, id, editingStock._id, values.stock);
//       setProductState(newProduct);  // Cập nhật lại state
  
//       setIsStockModalVisible(false);
//       formStockEdit.resetFields();
//       setEditingStock(null);
//       message.success('Sửa tồn kho thành công!');
//     } catch (error) {
//       console.log("Error updating stock:", error);
//     }
//   };
  
//   function updateInventoryNumber(productData, colorId, attributeId, newNumber) {
//     // Tìm màu có id tương ứng
//     let selectedColor = productData.colors.find((color) => color.id === colorId);
  
//     if (!selectedColor) {
//       console.log("Không tìm thấy màu với ID:", colorId);
//       return;
//     }
  
//     // Tìm inventory có attribute tương ứng
//     let selectedInventory = selectedColor.inventory.find(
//       (item) => item.attribute === attributeId
//     );
  
//     if (!selectedInventory) {
//       console.log("Không tìm thấy attribute với ID:", attributeId);
//       return;
//     }
  
//     // Cập nhật giá trị `number`
//     selectedInventory.number = newNumber;
//   }
  

//   const handleColorEdit = (stock) => {
//     const result = productDataState.find(obj => obj.name === "Size");

    
//     console.log(stock)
//     setEditingColor(stock);
//     setIsColorModalVisible(true);
//     formColorEdit.setFieldsValue({
//       basePrice: stock.basePrice,
//       discountPrice: stock.discountPrice
//     });
//   };

//   const handleStockEdit = (stock) => {
//     const result = productDataState.find(obj => obj.name === "Size");
//     if(result){
//     setEditingStock(stock);
//     setIsStockModalVisible(true);
//     formStockEdit.setFieldsValue({
//       stock: stock.number
//     });
//   }
//   };

  const handleAttributesEdit = (attributes) => {
    setEditingAttributes(attributes);
    //const selectedValues = productState.attributeValues;
      // .find(filter => filter.label.localeCompare(attributes.attributeName, undefined, { sensitivity: 'base' }) === 0)
      // ?.items.filter(item => attributes.value.includes(item)) || [];


    // formAttribute.setFieldsValue({
    //   selectedItems: selectedValues,
    // });
   // console.log("SELECT", selectedValues)
    setIsAttributesModalVisible(true);
  };

  

 
  
//   const color = productState?.colors[selectedColorIndex]|| null;
 
   const visibleThumbnails =service?.hotel?.serviceID?.images?.slice(startIndex, startIndex + 5);
  
   
  
   const [selectedImage, setSelectedImage] = useState( visibleThumbnails?  visibleThumbnails[0] : {});
  
   const handlePrev = () => setStartIndex((prev) => Math.max(prev - 1, 0));
   const handleNext = () => setStartIndex((prev) => Math.min(prev + 1, service?.hotel?.serviceID?.images?.length - 5));



   useEffect(() => {

    setSelectedImage(visibleThumbnails?  visibleThumbnails[0] : {});
  }, [hotelDetails]);
//   const handleColorSelect = (record, index) => {

//     const result = productDataState.find(obj => obj.name === "Size");
//     if(result){
//     setSelectedColorIndex(index);
//     setEditingColor(record);
//     formAttribute.setFieldsValue({
//       basePrice: record.basePrice,
//       discountPrice: record.discountPrice,
//     });
//     setSelectedImage(productState?.colors[index]?.images[0]);
//   }
//   };

//   // const attributesData = productDataState.specifications.map((spec, index) => ({
//   //   key: index + 1,
//   //   attributeName: spec.label,
//   //   value: spec.value.join(", "),
//   // }));

//   const colorsData = productState.colors.map((color, index) => ({
//     colorId: color.id,
//     colorName: color.colorName,
//     images: color?.images,
//     basePrice: color.price,
//     discountPrice: color.discountPrice,
//     status: color.stock > 0 ? 'active' : 'inactive', 
//   }));
const attributesColumns = [
  { title: 'ID', dataIndex: 'id', key: 'id' },
  { title: 'Tên thuộc tính', dataIndex: 'name', key: 'name' },
  { 
    title: 'Giá trị', 
    dataIndex: 'values', 
    key: 'values',
    render: (values) => values ? values.join(' - ') : ''  // Nối các giá trị mảng với dấu phẩy
  },
  {
    title: 'Hành động',
    key: 'action',
    render: (record) => (
      <Button 
        icon={<EditOutlined />} 
        style={{ backgroundColor: '#52c41a' }}  
        onClick={() => handleAttributesEdit(record)} 
        data-testid={`${record.id}`}
      />
    ),
  },
];


  const colorsColumns = [
    { title: 'ID', dataIndex: 'colorId', key: 'colorId' },
    { title: 'Tên màu', dataIndex: 'colorName', key: 'colorName' },
    {
      title: 'Hình ảnh',
      dataIndex: 'images',
      key: 'images',
      render: (images) => (
        <div>
          {images.map((img, idx) => (
            <Image key={idx} src={img} alt={`Color ${idx + 1}`} width={50} />
          ))}
        </div>
      ),
    },
    { title: 'Giá gốc', dataIndex: 'basePrice', key: 'basePrice' },
    { title: 'Giá giảm', dataIndex: 'discountPrice', key: 'discountPrice' },
    {
      title: 'Hành động',
      key: 'action',
    //   render: (record) => (
    //     <Button icon={<EditOutlined />} style={{ backgroundColor: '#52c41a' }} onClick={() => handleColorEdit(record)} data-testid={`${record.colorId}`}  />
    //   ),
    },
  ];



  const stockColumns = [
    { title: 'Size', dataIndex: 'value', key: 'value' },
    { title: 'Số lượng', dataIndex: 'number', key: 'number' },
    {
      title: 'Hành động',
      key: 'action',
    //   render: (record) => (
    //     <Button data-testid={`${record.value}`} icon={<EditOutlined />} style={{ backgroundColor: '#52c41a' }} onClick={() => handleStockEdit(record)}  />
    //   ),
    },
  ];

//    const benefitsData = productState.endows.map((endows, index) => ({
//      key: index + 1,
//      benefitId: endows.id,
//      description: endows.description,
//      active: endows.active ? "Hoạt động" :"Không hoạt động",
//    }));
  
  const benefitsColumns = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Mô tả ưu đãi", dataIndex: "description", key: "description" },
    {
      title: "Trạng thái",
      dataIndex: "active",
      key: "active",
      render: (active) => (active ? "Hoạt động" : "Không hoạt động"),
    },
    {
      title: "Hành động",
      key: "action",
      render: (record) => (
        <Button icon={<EditOutlined />} style={{ backgroundColor: "#52c41a" }} onClick={() => handleEditBenefit(record)}  data-testid={`${record.id}`}  />
      ),
    },
  ];

//   const handleRemoveImage = (imageUrl) => {
    
//     const updatedImages = editingColor?.images.filter((img) => img !== imageUrl);
//     const updatedColorOptions = productState.colors.map((color) =>
//       color.id === editingColor.colorId
//         ? {
//             ...color,
//             images: updatedImages,
//           }
//         : color
//     );
//     setProductState({ ...productState, colors: updatedColorOptions });
//     setEditingColor((prevColor) => ({
//       ...prevColor,
//       images: updatedImages,
//     }));
//   };

  

//   const [isAddStockModalVisible, setIsAddStockModalVisible] = useState(false);

//   const handleAddStock = () => {
//     setIsAddStockModalVisible(true);
//   };

//   const handleOkAddStockModal = async () => {
//     try {
//       const values = await formAddStock.validateFields(['sizeNew', 'stockNew']);
//       if (!values.sizeNew || values.stockNew === undefined) {
//         console.warn("Vui lòng nhập cả size và số lượng");
//         return;
//       }
//       const newStock = { size: values.sizeNew, stock: values.stockNew };
//       const updatedColorOptions = productState.colorOptions.map((color, index) =>
//         index === selectedColorIndex
//           ? { ...color, stock: [...color.stock, newStock] }
//           : color
//       );
//       setProductState({ ...productState, colorOptions: updatedColorOptions });
//       setIsAddStockModalVisible(false);
//       formAddStock.resetFields();
//     } catch (error) {
//       console.error("Error adding stock:", error);
//     }
//   };

//   const initialColor = productState.colors[0];

//   const [isAddColorModalVisible, setIsAddColorModalVisible] = useState(false);
//   const [tempImages, setTempImages] = useState([]);
//   const [tempImages2, setTempImages2] = useState([]);
//   const handleAddColor = () => {
//     setIsAddColorModalVisible(true);
//   };

 






















    
//   //   const newImageUrl = URL.createObjectURL(file);
//   //   setTempImages([...tempImages, newImageUrl]);
//   //   onSuccess();
//   // };


//   const handleImageUploadAddColor = async (options) => {
//     const { file, onSuccess, onError } = options; // Lấy các tham số từ options
    
//     try {
//       // Dispatch action upload file từ Redux slice
//       const response = await dispatch(uploadFile(file)); // Đợi kết quả trả về từ slice
  
//       // Lấy URL từ dữ liệu trả về
//       const uploadedFileUrl = response.payload.data.path; // Điều chỉnh theo dữ liệu trả về từ slice
//       console.log('URL ảnh đã upload:', uploadedFileUrl); // Log URL ra console
  
//       // Hiển thị thông báo thành công
//       notification.success({
//         message: 'Upload thành công!',
//         description: 'Ảnh đã được tải lên Cloudinary.',
//       });


      
//       const updatecolor = [...tempImages, uploadedFileUrl]

      
  
//         setTempImages([...tempImages, uploadedFileUrl]);

//         console.log("TEMPt",updatecolor)


       
//     onSuccess();





      
//     } catch (error) {
//       // Hiển thị thông báo lỗi
//       notification.error({
//         message: 'Upload thất bại!',
//         description: error.message,
//       });
  


//       // Gọi hàm onError để thông báo lỗi
//       onError(error);

//       console.log(error)
//     }
//   };

const handleRemoveImageFromService = (imageUrl) => {
    // Update the service object by removing the specific image URL
    const updatedService = {
      ...service,
      hotel: {
        ...service.hotel,
        serviceID: {
          ...service.hotel.serviceID,
          images: service.hotel.serviceID.images.filter((image) => image !== imageUrl),
        },
      },
    };


  
    // Update the state with the modified service object
    setService(updatedService);
  
    console.log(`Image removed: ${imageUrl}`);
    console.log("Updated service:", updatedService);
  };

  

//   const [isEditBenefitModalVisible, setIsEditBenefitModalVisible] = useState(false);
//   const [isAddBenefitModalVisible, setIsAddBenefitModalVisible] = useState(false);
//   const [editingBenefit, setEditingBenefit] = useState(null);
//   const [formEditBenefit] = Form.useForm();
//   const [formAddBenefit] = Form.useForm();

//   const handleOkEditBenefitModal = async () => {
//     try {
//       const values = await formEditBenefit.validateFields();
//       if(values.description.length<=2){
//         setErrorMessage2("Ưu đã phải lớn hơn 2 kí tự")
//         return;
//       }
//       if(values.description.length >100 ){
//         setErrorMessage2("Ưu đã phải lớn hơn 100 kí tự")
//         return;
//       }
      

//       const updatedBenefits = productState.endows.map((benefit) =>
//         benefit.id === editingBenefit.id
//           ? { 
//               ...benefit, 
//               description: values.description,
//               active: values.active
//             }
//           : benefit
//       );
//       setProductState((prevState) => ({
//         ...prevState,
//         endows: updatedBenefits,
//       }));
//       formEditBenefit.resetFields();
//       setIsEditBenefitModalVisible(false);
//       setEditingBenefit(null);
//       message.success('Chỉnh sửa ưu đãi thành công!');
//     } catch (error) {
//       console.error("Error updating benefit:", error);
//     }
//   };

//   const handleOkAddBenefitModal = async () => {
    
//     try {
//       const values = await formAddBenefit.validateFields();
//       if(values.description.length<=2){
//         setErrorMessage2("Ưu đã phải lớn hơn 2 kí tự")
//         return;
//       }
//       if(values.description.length >100 ){
//         setErrorMessage2("Ưu đã phải lớn hơn 100 kí tự")
//         return;
//       }
      
//       const newBenefit = {
//         _id:generateObjectId(),
//         id: Date.now(),
//         description: values.description,
//         active: true,
//       };
//       setProductState((prevState) => ({
//         ...prevState,
//         endows: [...prevState.endows, newBenefit],
//       }));
//       formAddBenefit.resetFields();
//       setIsAddBenefitModalVisible(false);
//       message.success('Thêm ưu đãi thành công!');
//     } catch (error) {
//       console.error("Error adding benefit:", error);
//     }
//   };

//   const handleEditBenefit = (benefit) => {
//     //console.log(benefit)
//     setEditingBenefit(benefit);
//     formEditBenefit.setFieldsValue({
//       description: benefit.description,
//       active: benefit.active ? "Hoạt động" : "Không hoạt động",
//     });
//     setIsEditBenefitModalVisible(true);
//   };

//   const handleAddBenefit = () => {
//     formAddBenefit.resetFields();
//     setIsAddBenefitModalVisible(true);
    
//   };

//   console.log("EDITT",editingBenefit)
  
//   const { status, error, file } = useSelector((state) => state.upload); // Lấy thông tin từ Redux

//   // Hàm xử lý upload ảnh
const handleImageUpload = async (options) => {
    const { file, onSuccess, onError } = options; // Lấy các tham số từ options
  
    try {
      // Dispatch action upload file từ Redux slice
      const response = await dispatch(uploadFile(file)); // Đợi kết quả trả về từ slice
  
      // Lấy URL từ dữ liệu trả về
      const uploadedFileUrl = response.payload.data.path; // Điều chỉnh theo dữ liệu trả về từ slice
      console.log('URL ảnh đã upload:', uploadedFileUrl); // Log URL ra console
  
      // Hiển thị thông báo thành công
      notification.success({
        message: 'Upload thành công!',
        description: 'Ảnh đã được tải lên Cloudinary.',
      });
  
      // Tạo đối tượng service mới với URL ảnh được thêm vào mảng images
      const updatedService = {
        ...service,
        hotel: {
          ...service.hotel,
          serviceID: {
            ...service.hotel.serviceID,
            images: [...service.hotel.serviceID.images, uploadedFileUrl], // Thêm ảnh mới vào mảng
          },
        },
      };
  
      // Cập nhật state với service đã chỉnh sửa
      setService(updatedService);

  
      console.log(`Image added: ${uploadedFileUrl}`);
      console.log('Updated service:', updatedService);
  
      // Gọi hàm onSuccess để thông báo thành công
      onSuccess();
    } catch (error) {
      // Hiển thị thông báo lỗi
      notification.error({
        message: 'Upload thất bại!',
        description: error.message,
      });
  
      // Gọi hàm onError để thông báo lỗi
      onError(error);
    }
  };
  

  
  





 
// const handleSave =  async ( ) => {
//   // Your save logic here\
//   if(productState.name.length <= 2){
//     setErrorMessage("Tên phải nhiều hơn 2 kí tự")
//     return;
//   }

//   if(productState.name.length >= 100){
//     setErrorMessage("Tên không được vượt quá 100 kí tự")
//     return;
//   }

//   if(productState.description.length <= 10){
//     setErrorMessage3("Mô tả phải nhiều hơn 10 kí tự")
//     return;
//   }

//   if(productState.description.length >= 1000){
//     setErrorMessage3("Mô tả không được vượt quá 1000 kí tự")
//     return;
//   }
//   setErrorMessage("");
//   setErrorMessage3("");


//   try {



//     function transformProduct(obj) {
//       return {
//         id: obj.id,
//         name: obj.name,
//         description: obj.description,
//         type: obj.type,
//         brand: obj.brand,
//         attributeValues: obj.attributeValues,
//         colors: obj.colors.map(color => ({
//           id: color.id,
//           colorName: color.colorName,
//           images: color?.images,
//           price: color.price,
//           discountPrice: color.discountPrice,
//           inventory: color.inventory.map(item => ({
//             attribute: item.attribute,
//             number: item.number
//           }))
//         })),
//         endows: obj.endows.map(endow => ({
//           id: endow.id,
//           description: endow.description,
//           active: endow.active
//         })),
//         sold: obj.sold,
//         active: obj.active
//       };
//     }


//     const NNNNN = transformProduct(productState)
//     dispatch(updateProduct({ id: productState.productID  , data: NNNNN
//  }));

//  message.success('Lưu thành công!');
//   } catch (error) {
    
//   }
  
// };onClick={() => handleSave()}
const [location, setLocation] = useState(null);
const [isModalVisible, setIsModalVisible] = useState(false);



const handleModalOpen = () => {
  setIsModalVisible(true); // Open the modal
};

const handleModalClose = () => {
  setIsModalVisible(false); // Close the modal
};
const [selectedLocation, setSelectedLocation] = useState(null);

  // Hàm mở modal
  const showModal = () => {
    setIsModalVisible(true);
  };

  // Hàm đóng modal
  

  // Hàm xử lý khi chọn vị trí
  const handleLocationSelect = (place) => {
    // const locationInfo = {
    //   address: place.formatted_address,
    //   lat: place.geometry.location.lat(),
    //   lng: place.geometry.location.lng(),
    //   name: place.name, // Tên địa điểm
    //   types: place.types, // Loại địa điểm (restaurant, park, etc.)
    //   photos: place.photos ? place.photos[0].getUrl() : null, // Hình ảnh nếu có
    // };
    setSelectedLocation(place);


  };


  const handleOk = () => {
    
    if (selectedLocation) {
        // Update only necessary fields within the locationID under serviceID
        const updatedService = {
          ...service,
          hotel: {
            ...service.hotel,
            serviceID: {
              ...service.hotel.serviceID,
              locationID: {
                ...service.hotel.serviceID.locationID,
                locationName: selectedLocation.locationName, // Update locationName
                description: selectedLocation.description, // Update description
                latitude: selectedLocation.latitude, // Update latitude
                longitude: selectedLocation.longitude, // Update longitude
                _id: service?.hotel?.serviceID?.locationID?._id // Preserve the existing _id if it exists
              },
            },
            // Optionally, you can update other properties within hotel
            description: service?.hotel?.description, // Preserve or update hotel description
          },
          // Preserve or update other service properties as needed
        };
      
        console.log("UPDATE", updatedService);
      
        // Update state with the modified service object
        setService(updatedService);
      
        // Close modal
        setIsModalVisible(false);
      
        // Optionally, send the updated service data to the server
        console.log("Cập nhật thông tin khách sạn:", updatedService);
      }
      
  };
 
  // Hàm xử lý khi nhấn Cancel (đóng modal mà không làm gì cả)
  const handleCancel = () => {
    setIsModalVisible(false);
  };


  const handleSave = () => {
    notification.success({
            message: 'Lưu thành công!',
          });
    const inputObject = { ...service?.hotel?.serviceID };
    
    // Đảm bảo rằng chúng ta không thay đổi trực tiếp các thuộc tính của inputObject
    const transformedObject = {
      _id: String(inputObject._id),  // Convert _id to string
      serviceID: String(inputObject.serviceID),  // Convert serviceID to string
      providerID: String(inputObject.providerID),  // Convert providerID to string
      locationID: String(inputObject.locationID),  // Convert locationID to string
      serviceName: inputObject.serviceName,
      price: String(inputObject.price),  // Ensure price is a string
      discountPrice: String(inputObject.discountPrice),  // Ensure discountPrice is a string
      description: inputObject.description,
      status: inputObject.status,
      facilities: inputObject.facilities.map(f => String(f._id)),  // Convert each facility's _id to string
      priceCategories: inputObject.priceCategories.map(p => String(p._id)),  // Chuyển mỗi _id của price category thành chuỗi
      suitability: inputObject.suitability.map(s => String(s._id)),  // Convert each suitability's _id to string
      reviews: inputObject.reviews.map(r => String(r._id)),  // Convert each review's _id to string
      images: inputObject.images  // Assume images are already in the desired format
    };
    console.log( )
    // Dispatch action với transformedObject đã được tạo bản sao
    dispatch(updateService(transformedObject._id,transformedObject));
    console.log("DIT", transformedObject);
  };
  
  console.log( service?.hotel?.serviceID?.status === "Active",   service?.hotel?.serviceID?.status)


   const facilityTypes = useSelector((state) => state.facilitiesType);
      const facilities = useSelector((state) => state.facilities);
      const suitabilities = useSelector((state) => state.suitabilities);
  useEffect(() => {
        if (error) {
         
            dispatch(clearErrors());
        }

        dispatch(getHotelType());
        dispatch(getFacilityTypeByType('hotel'));
        dispatch(getFacilitiesByType('Room'));
        dispatch(getSuitabilities());
    }, [dispatch, error]);


    const [form] = Form.useForm();
  
   

  const [productDataState, setProductData] = useState( "");

  useEffect(() => {


    const he = [
      { id: 1, name: "Loại giá", values: [] },
      { id: 2, name: "Phù hợp", values: [] },
      { id: 3, name: "Tiện nghi", values: [] }
  ];
  
  // Chuyển các _id thành tên tương ứng
  const getNameById = (id, array) => {
      const found = array.find(item => item._id === id);
      return found ? found.name : null;
  };
  
  // Thêm giá trị vào các mảng trong he
  he[0].values = service?.hotel?.serviceID?.priceCategories.map(item => getNameById(item._id, priceC)).filter(Boolean); // Loại giá
  he[1].values = service?.hotel?.serviceID?.suitability.map(item => getNameById(item._id, suitabilities?.datas)).filter(Boolean);   // Phù hợp
  he[2].values = service?.hotel?.serviceID?.facilities.map(item => getNameById(item._id,  facilityTypes?.facilitiesType)).filter(Boolean);      // Tiện nghi

setProductData(he)
   
}, [dispatch,service]);

  
   const handleCancel22222 = () => {
    setIsAttributesModalVisible(false); // Ẩn modal
    form.resetFields(); // Reset form về giá trị ban đầu
    
    setErrorMessage2(''); // Xóa thông báo lỗi
  };

  useEffect(() => {
    if (isAttributesModalVisible) {
      form.setFieldsValue({
        selectedItems:
          editingAttributes?.name === 'Phù hợp'
            ? service?.hotel?.serviceID?.suitability?.map((item) => item._id) || []
            : editingAttributes?.name === 'Tiện nghi'
            ? service?.hotel?.serviceID?.facilities?.map((item) => item._id) || []
            : editingAttributes?.name === 'Loại giá'
            ? service?.hotel?.serviceID?.priceCategories?.map((item) => item._id) || []
            : [],
      });
    }
  }, [isAttributesModalVisible, editingAttributes, service, form]);
   console.log("DDU", suitabilities)

   
            const priceC = [
                { name: 'Giá rẻ', _id: '674984adf66ab12aab93f6f8' },
                { name: 'Trung bình', _id: '674984adf66ab12aab93f6f9' },
                { name: 'Sang trọng', _id: '674984adf66ab12aab93f6fa' },
            ]
            console.log("HEE",  productDataState)


            const navigate = useNavigate()

 const valueColumns = [
    { title: "ID", dataIndex: "roomID", key: "roomID" },
    { title: "Loại phòng", dataIndex: "roomType", key: "roomType" },
    {
      title: "Giá gốc",
      dataIndex: "price",
      key: "price",
      render: (value) => `${value.toLocaleString("vi-VN")} đ`,
    },
    {
      title: "Giá giảm",
      dataIndex: "discountPrice",
      key: "discountPrice",
      render: (value) => `${value.toLocaleString("vi-VN")} đ`,
    },
    
    {
      title: "Tình trạng",
      dataIndex: "active",
      key: "active",
      render: (value) => (value ? "Hoạt động" : "Không hoạt động"),
    },
   
    {
      title: "Hành động",
      key: "action",
      render: (text, record) => (
        <Button
          type="primary"
          icon={<EditOutlined />}
          onClick={() => navigate(`/room/${record?._id}`)}
          data-testid={`${record.value}`} 
        />
      ),
    },
  ];
  const calculateNumberRate = (reviews) => {
    const numberRate = [0, 0, 0, 0, 0]; // Mảng lưu số lượng đánh giá từ 1 đến 5 sao
    reviews?.forEach((review) => {
      if (review.stars >= 1 && review.stars <= 5) {
        numberRate[review.stars- 1]++;
      }
      console.log(review)
    });
    return numberRate.map((count, index) => ({
      title: `${index + 1} sao`,
      number: count,
    }));
  };
  

            
  return (
    <Wrapper>
      <Title>Thông tin dịch vụ</Title>
      <Button  type="primary" style={{ width: "10%" }} data-testid = "nutluu"  onClick={handleSave} >
                  Lưu
                </Button>
                <Select
                data-testid = "select"
                value={service?.hotel?.serviceID?.status === "Active" ? "Hoạt động" : "Không hoạt động"}
  style={{ width: 180, marginLeft: "20px" }}
  onChange={(value) => {

                
      const updatedService = {
  ...service,
  hotel: {
    ...service.hotel,
    serviceID: {
      ...service.hotel.serviceID,
      status: value === "Hoạt động" ? "Active" : "Inactive"
          }
  }
};
setService(updatedService)
if(value === "Hoạt động"){
                  message.success(`Đưa ${service?.hotel?.serviceID?.serviceName} hoạt động!`);
                }
                else{
                  message.success(`Vô hiệu hóa ${service?.hotel?.serviceID?.serviceName}!`);
                }


  }}


  
>
  <Option value="Hoạt động" data-testid = "activep">Hoạt động</Option>
  <Option value="Không hoạt động" data-testid = "unactivep">Không hoạt động</Option>
</Select> 
      <Container>
        <LeftSection>
          <ImageBlock>
            <ImageWrapper>
              <Image src={selectedImage} alt="Vợt cầu lông" />
            </ImageWrapper>
            <ThumbnailList>
              {startIndex > 0 && (
                <NavButton onClick={handlePrev}>
                  <LeftOutlined />
                </NavButton>
              )}
               <ThumbnailWrapper>
                {visibleThumbnails?.map((img, index) => (
                  <Thumbnail
                    key={index}
                    src={img}
                    alt={`Thumbnail ${index + 1}`}
                    active={selectedImage === img}
                    onClick={() => setSelectedImage(img)}
                  />
                ))}
              </ThumbnailWrapper>
              {startIndex < service?.hotel?.serviceID?.images?.length - 5 && (
                <NavButton onClick={handleNext}>
                  <RightOutlined />
                </NavButton>
              )}
            </ThumbnailList>
          </ImageBlock>
        </LeftSection>
        <RightSection>
          <Form form={formAttribute} layout="vertical">
          <Form.Item
  label="Tên dịch vụ"
  name="productName" 
  initialValue={service?.hotel?.serviceID?.serviceName   }
  style={{ display: 'inline-block', width: '100%', marginRight: '16px' }}
>
  <StyledInput
    placeholder="Nhập tên dịch vụ"
     value={service?.hotel?.serviceID?.serviceName} 
    onChange={(e) => {
      const updatedName = e.target.value; // Lấy giá trị mới từ input
      const updatedService = {
  ...service,
  hotel: {
    ...service.hotel,
    serviceID: {
      ...service.hotel.serviceID,
      serviceName: updatedName
    }
  }
};

setService(updatedService)
    }}
    data-testid = "tensanpham"
  />
  
     {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
</Form.Item>

         
<Form.Item
      label="Địa chỉ"
      name="productName"
      style={{ display: 'inline-block', width: '100%', marginRight: '16px' }}
    >
      <TextArea
        placeholder="Nhập tên sản phẩm"
        value={service?.hotel?.serviceID?.locationID?.locationName}
        onChange={(e) => {
          const updatedName = e.target.value; 
          // Update service or state logic here
        }}
        rows={2} // Ensures the input field is two rows high
        data-testid="tensanpham"
        style={{  pointerEvents: 'none'}}
      />
      
      {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}

      <Button
        style={{ marginTop: '8px' }}
        onClick={handleModalOpen}
      >
        Chỉnh địa chỉ
      </Button>
    </Form.Item>

          </Form>
          <div  style={{
    border: '1px solid #ccc',
    borderRadius: '10px',
    padding: '12px',
     margin:'10px'}}>
          <Title>Hình ảnh</Title>
          <Upload
             customRequest={handleImageUpload}
              showUploadList={false}
              accept="image/*"
            >
              <Button icon={<PlusOutlined />} data-testid = "inputanh" >Tải ảnh lên</Button>
            </Upload>
          <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', marginTop: '20px' }}>
              {service?.hotel?.serviceID?.images.map((img, idx) => (
                <div key={idx} style={{ position: 'relative' }}>
  <Image src={img} alt={`Image ${idx + 1}`} width={70} />
  <Button
    icon={<DeleteOutlined style={{ fontSize: '16px' }} />}
     onClick={() =>handleRemoveImageFromService(img)}
    style={{
      position: 'absolute',
      top: '-10px',
      right: '-10px',
      backgroundColor: 'red',
      color: 'white',
      border: 'none',
      width: '20px',
      height: '20px', // Adjust the button size as needed
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center', // Center the icon
      padding: '0', // Remove extra padding
    }}
  />
</div>

              ))}
            </div>
            </div>
        </RightSection>
      </Container>


      
      
      <Container style={{ display: 'block' }}>
        <Title>Thuộc tính</Title>
        <Table
          dataSource={productDataState}
          columns={attributesColumns}
          rowKey="id"
          pagination={false}
          style={{ marginBottom: '20px' }}
        />
      </Container>
      <Container style={{ display: 'block' }}>


  <Title>Mô tả</Title>
  <div style={{ width: '100%', marginTop: '15px' }}>
  {errorMessage3 && <div style={{ color: 'red' }}>{errorMessage3}</div>}
    <textarea
    data-testid="des"
      placeholder="Nhập mô tả sản phẩm"
      value={service?.hotel?.serviceID?.description      } // Truyền giá trị từ productState
      onChange={(e) => {
      const updatedName = e.target.value; // Lấy giá trị mới từ input
      const updatedService = {
  ...service,
  hotel: {
    ...service.hotel,
    serviceID: {
      ...service.hotel.serviceID,
      description: updatedName
    }
  }
};
setService(updatedService)
    }}
      
      style={{
        width: '100%',
        height: '600px', // Điều chỉnh chiều cao
        fontSize: '16px',
        padding: '10px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        resize: 'none', // Ngăn người dùng thay đổi kích thước khung
        lineHeight: '1.5', // Tăng khoảng cách giữa các dòng
        overflowY: 'auto', // Thêm scroll nếu vượt quá chiều cao
      }}
    />
  </div>
</Container>
{ service?.hotel?.serviceID?.type === "hotel" && (
<Container>
<div style={{
        width: '100%',
        height: '100%', // Điều chỉnh chiều cao
        fontSize: '16px',
        padding: '10px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        resize: 'none', // Ngăn người dùng thay đổi kích thước khung
        lineHeight: '1.5', // Tăng khoảng cách giữa các dòng
        overflowY: 'auto', // Thêm scroll nếu vượt quá chiều cao
      }}>
    <Row justify="space-between" align="middle" 
    >
      <h3>
        Danh sách phòng
      </h3>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        
       onClick={() => {
                 notification.success({
                         message: "Thêm phòng thành công"
                       
                       });
                 dispatch(createRoom({hotelID: service.hotel._id }))
                 setTimeout(() => {
             setAddSer((prev) => !prev); // Đảo ngược trạng thái sau 3 giây
           }, 0);
           
             }
               }
      >
        Thêm phòng
      </Button>
    </Row>
    <Table
      dataSource={
       service?.rooms?.slice()?.reverse() || []
      }
      columns={valueColumns}
      rowKey="id"
      
    />
  </div>
</Container>
)}
 <Container>
 
  <div className='w-5/6 mx-auto my-3 items-center'>
  <Title>Đánh giá</Title>
  <div style={{ margin: '50px 0' }} className='flex justify-center border border-black rounded-2xl p-2 bg-[#BDFFFC]'>
  <div className='grid grid-cols-5 w-4/5 gap-4'>
    {calculateNumberRate(service?.hotel?.serviceID?.reviews).map((item) => (
      <div
        key={item.title}
        className='flex flex-col items-center gap-1 font-semibold bg-[#90EFEB] justify-center py-2 rounded-lg cursor-pointer'
      >
        <p>{item.title}</p>
        <p>({item.number})</p>
      </div>
    ))}
  </div>
</div>

    
    <ReviewList reviews={service?.hotel?.serviceID?.reviews} />
  </div>
</Container>

<Modal
        title="Chỉnh địa chỉ"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            Hủy
          </Button>,
          <Button key="ok" type="primary" onClick={handleOk}>
            OK
          </Button>,
        ]}
        width={800}
      >
        <LocationPicker onLocationSelect={handleLocationSelect} />
      </Modal>
   
      <Modal
        title="Chỉnh sửa màu sắc"
        visible={isColorModalVisible}
      //  onOk={handleOkColorModal}
        onCancel={() => {setIsColorModalVisible(false) ;   setErrorMessage2("")}}
        okButtonProps={{ "data-testid": "okmau" }}
      >
        <Form form={formColorEdit}>
          <Form.Item name="basePrice" label="Giá" initialValue={editingColor?.basePrice}  rules={[{ required: true, message: 'Vui lòng nhập giá gốc' }]} >
            <InputNumber min={0}  data-testid = "inputgoc" />
          </Form.Item>
          <Form.Item name="discountPrice" label="Giá giảm" initialValue={editingColor?.discountPrice}  rules={[{ required: true, message: 'Vui lòng nhập giá giảm' }]} >
            <InputNumber  min={0} data-testid = "inputgiam" />
          </Form.Item>
          <Form.Item label="Hình ảnh">
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {editingColor?.images?.map((image, index) => (
                <div key={index} style={{ position: 'relative', width: '50px' }}>
                  <Image src={image} alt={`Ảnh ${index + 1}`} width={50} />
                  <Button
                    type="text"
                    icon={<DeleteOutlined />}
              //      onClick={() => handleRemoveImage(image)}
                    style={{ position: 'absolute', top: 0, right: 0, color: 'red' }}
                    
                  />
                </div>
              ))}
            </div>
          </Form.Item>
          <Form.Item label="Upload ảnh mới">
            <Upload
              customRequest={handleImageUpload}
              listType="picture-card"
              showUploadList={false}
            >
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }} data-testid = "inputanh">Upload</div>
              </div>
            </Upload>
          </Form.Item>
          {errorMessage2 && <div style={{ color: 'red' }}>{errorMessage2}</div>}
        </Form>
      </Modal>

  
      <Modal 
        title="Chỉnh sửa thông số kỹ thuật"
        visible={isAttributesModalVisible}
        onOk={handleOkAttributesModal}
     
      
        onCancel={handleCancel22222} 
        okButtonProps={{ "data-testid": "ok" }}
      >
       <Form form={form}
  initialValues={{
    selectedItems:
      editingAttributes?.name === 'Phù hợp'
        ? service?.hotel?.serviceID?.suitability?.map((item) => item._id) || []
        : editingAttributes?.name === 'Tiện nghi'
        ? service?.hotel?.serviceID?.facilities?.map((item) => item._id) || []
        : editingAttributes?.name === 'Loại giá'
        ? service?.hotel?.serviceID?.priceCategories?.map((item) => item._id) || []
        : [],
  }}
>
  <Form.Item label="Chọn các giá trị" name="selectedItems">
    <Checkbox.Group>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {/* Phù hợp */}
        {editingAttributes?.name === 'Phù hợp' &&
          suitabilities?.datas?.map((filter) => {
            const isChecked = service?.hotel?.serviceID?.suitability?.some(
              (suitability) => suitability._id === filter._id
            );

            return (
              <div
                key={filter._id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <Checkbox
                  value={filter._id}
                  style={{ marginRight: '5px' }}
                  data-testid={filter.name}
                  checkedhecked={isChecked}
                />
                <span>{filter.name}</span>
              </div>
            );
          })}

        {/* Tiện nghi */}
        {editingAttributes?.name === 'Tiện nghi' &&
          facilityTypes?.facilitiesType?.map((filter) => {
            const isChecked = service?.hotel?.serviceID?.facilities?.some(
              (facility) => facility.name === filter.name
            );

            return (
              <div
                key={filter._id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <Checkbox
                  value={filter._id}
                  style={{ marginRight: '5px' }}
                  data-testid={filter.name}
                  checkedhecked={isChecked}
                />
                <span>{filter.name}</span>
              </div>
            );
          })}

        {/* Loại giá */}
        {editingAttributes?.name === 'Loại giá' &&
          priceC?.map((filter) => {
            
            const isChecked = service?.hotel?.serviceID?.priceCategories?.some(

              (price) => {
                console.log("Type of price._id:", typeof price._id, "Value:", price._id);
  console.log("Type of filter._id:", typeof filter._id, "Value:", filter._id);
  console.log("dit:",String(price._id).trim() === String(filter._id).trim());
                return  String(price._id).trim() === String(filter._id).trim()
              }

            );
            console.log("SOSANH ", priceC , service?.hotel?.serviceID?.priceCategories)
            return (
              <div
                key={filter.name}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <Checkbox
                  value={filter._id}
                  style={{ marginRight: '5px' }}
                  data-testid={filter.name}
                  checked ={isChecked}
                />
                <span>{filter.name}</span>
              </div>
            );
          })}
      </div>
    </Checkbox.Group>

    
  </Form.Item>
  
</Form>
   
       


      </Modal> 

      {/* .filter(
                  (filter) =>
                    filter.label.localeCompare(editingAttributes?.attributeName || '', undefined, { sensitivity: 'base' }) === 0
                ) */}
      <Modal
        title="Thêm màu sắc mới"
       // visible={isAddColorModalVisible}
        //onOk={handleOkAddColorModal}
       // onCancel={() => {setIsAddColorModalVisible(false) ;   setErrorMessage2("")}}
        okButtonProps={{ "data-testid": "okmau" }}
      >
        <Form form={formAddColor}>
          <Form.Item name="colorName" label="Chọn màu" >
            

              <Input style={{ width: '100%' }}  data-testid = "inputmau"/>
      
          </Form.Item>
          <Form.Item name="basePriceNew" label="Giá gốc" rules={[{ required: true, message: 'Vui lòng nhập giá gốc' }]}>
            <InputNumber data-testid = "inputgoc" min={0} style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item name="discountPriceNew" label="Giá giảm"  rules={[{ required: true, message: 'Vui lòng nhập giá giảm' }]}>
            <InputNumber data-testid = "inputgiam" min={0} style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item label="Hình ảnh">
            <Upload
          //    customRequest={handleImageUploadAddColor}
              showUploadList={false}
              accept="image/*"
            >
              <Button icon={<PlusOutlined />} data-testid = "inputanh" >Tải ảnh lên</Button>
            </Upload>
            {/* <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '8px' }}>
              {tempImages.map((img, idx) => (
                <div key={idx} style={{ position: 'relative' }}>
                  <Image src={img} alt={`Image ${idx + 1}`} width={50} />
                  <Button
                    icon={<DeleteOutlined />}
                    onClick={() => handleRemoveImageAddColor(img)}
                    style={{
                      position: 'absolute',
                      top: '-10px',
                      right: '-10px',
                      backgroundColor: 'red',
                      color: 'white',
                      border: 'none',
                    }}
                  />
                </div>
              ))}
            </div> */}
          </Form.Item>
          {errorMessage2 && <div style={{ color: 'red' }}>{errorMessage2}</div>}
        </Form>
      </Modal>

   
      <Modal
        // title="Thêm tồn kho mới"
        // visible={isAddStockModalVisible}
        // onOk={handleOkAddStockModal}
        // onCancel={() => setIsAddStockModalVisible(false)}
      >
        <Form form={formAddStock}>
          <Form.Item name="sizeNew" label="Size" rules={[{ required: true, message: 'Vui lòng chọn size' }]}>
            <Select placeholder="Chọn size">
              {/* {productDataState.find((item) => item.name === 'Size')?.values
                .map((size, index) => (
                <Select.Option key={index} value={size._id}>{size.value}</Select.Option>
              ))} */}
            </Select>
          </Form.Item>
          <Form.Item name="stockNew" label="Số lượng" rules={[{ required: true, message: 'Vui lòng nhập số lượng' }]}>
            <InputNumber min={0} style={{ width: '100%' }} placeholder="Nhập số lượng" />
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        // title="Chỉnh sửa ưu đãi"
        // visible={isEditBenefitModalVisible}
        // onOk={handleOkEditBenefitModal}
        // onCancel={() => {setIsEditBenefitModalVisible(false) ;   setErrorMessage2("")}}
        // okButtonProps={{ "data-testid": "okuudai" }}
      >
        {/* <Form form={formEditBenefit} layout="vertical">
          <Form.Item
            name="description"
            label="Mô tả ưu đãi"
            rules={[{ required: true, message: "Vui lòng nhập mô tả ưu đãi" }]}
            initialValue={editingBenefit ? editingBenefit.description : ""}
          >
            <Input placeholder="Nhập mô tả ưu đãi" data-testid = "inputuudai" />
            
          </Form.Item>
          {errorMessage2 && <div style={{ color: 'red' }}>{errorMessage2}</div>}
          <Form.Item
            name="active"
            label="Trạng thái"
            rules={[{ required: true, message: "Vui lòng chọn trạng thái" }]}
            initialValue={editingBenefit ? editingBenefit.status : "Hoạt động"}
          >
            <Select data-testid = "selectuudai">
              <Option value={true} data-testid = "activeuudai">Hoạt động</Option>
              <Option value={false} data-testid = "unactivetuudai" >Không hoạt động</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal> */}
{/* 
      <Modal
        title="Thêm mới ưu đãi"
        visible={isAddBenefitModalVisible}
        onOk={handleOkAddBenefitModal}
        onCancel={() => {setIsAddBenefitModalVisible(false) ;   setErrorMessage2("")}}
        okButtonProps={{ "data-testid": "okuudai" }}
      >
        <Form form={formAddBenefit} layout="vertical">
          <Form.Item
            name="description"
            label="Mô tả ưu đãi"
            rules={[{ required: true, message: "Vui lòng nhập mô tả ưu đãi" }]}
          >
            <Input placeholder="Nhập mô tả ưu đãi" data-testid = "inputuudai" />
           
          </Form.Item>
          {errorMessage2 && <div style={{ color: 'red' }}>{errorMessage2}</div>}
          {/* <Form.Item
            name="active"
            label="Trạng thái"
            rules={[{ required: true, message: "Vui lòng chọn trạng thái" }]}
          >
            <Select>
            <Option value={true}>Hoạt động</Option>
            <Option value={false}>Không hoạt động</Option>
            </Select>
          </Form.Item> */}
        {/* </Form> */}
      </Modal> 
    </Wrapper>
  );
};

export default Service;
