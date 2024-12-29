import React, { useState, useRef, useEffect } from 'react';

const containerStyle = {
  width: '100%',
  height: '400px',
};

const center = {
  lat: 21.0285, // Default location (Hanoi, Vietnam)
  lng: 105.8542,
};

const LocationPicker = ({ onLocationSelect }) => {
  const [markerPosition, setMarkerPosition] = useState(center);
  const [address, setAddress] = useState('');
  const mapRef = useRef(null);
  const inputRef = useRef(null);

  // Load Google Maps
  useEffect(() => {
    if (window.google) {
      const map = new window.google.maps.Map(mapRef.current, {
        center: markerPosition,
        zoom: 15,
      });

      const marker = new window.google.maps.Marker({
        position: markerPosition,
        map: map,
        draggable: true,
      });

      // Add listener to update marker position on drag
      window.google.maps.event.addListener(marker, 'dragend', (event) => {
        const newPosition = {
          lat: event.latLng.lat(),
          lng: event.latLng.lng(),
        };
        setMarkerPosition(newPosition);
        fetchAddress(newPosition);
      });

      // Set up the search box
      const searchBox = new window.google.maps.places.SearchBox(inputRef.current);
      map.controls[window.google.maps.ControlPosition.TOP_LEFT].push(inputRef.current);

      // Listen for place selection in search box
      searchBox.addListener('places_changed', () => {
        const places = searchBox.getPlaces();
        if (places.length === 0) return;

        const place = places[0];
        if (place.geometry) {
          const { lat, lng } = place.geometry.location;
          const newPosition = { lat: lat(), lng: lng() };
          setMarkerPosition(newPosition);
          setAddress(place.formatted_address);
          map.setCenter(newPosition);

          // Gọi hàm onLocationSelect và truyền tất cả thông tin địa điểm
          if (onLocationSelect) {
            const locationInfo = {
              _id: new window.ObjectId(), // Giả sử _id được tạo ngẫu nhiên
              locationID: "L0001", // Cần lấy ID thực tế nếu có
              locationName: place.formatted_address,
              description: place.place_id, // Đang sử dụng place_id làm mô tả, bạn có thể thay thế
              latitude: lat(),
              longitude: lng(),
            };
            onLocationSelect(locationInfo);
          }
        }
      });

      // Update address when marker is dragged
      const fetchAddress = async (location) => {
        const geocoder = new window.google.maps.Geocoder();
        geocoder.geocode({ location }, (results, status) => {
          if (status === 'OK' && results[0]) {
            setAddress(results[0].formatted_address);
            if (onLocationSelect) {
              const locationInfo = {
                
                locationID: "L0001",
                locationName: results[0].formatted_address,
                description: results[0].place_id,
                latitude: location.lat,
                longitude: location.lng,
              };
              onLocationSelect(locationInfo);
            }
          } else {
            console.error('Geocoder failed due to: ' + status);
          }
        });
      };
    }
  }, [onLocationSelect, markerPosition]);

  return (
    <div>
      <div ref={mapRef} style={containerStyle} />
      <input
        ref={inputRef}
        type="text"
        placeholder="Search for a place"
        style={{
          width: '100%',
          padding: '10px',
          marginTop: '10px',
          boxSizing: 'border-box',
        }}
      />
      <div>
        <h4>Địa điểm chọn:</h4>
        <p>{address}</p>
      </div>
    </div>
  );
};

export default LocationPicker;
