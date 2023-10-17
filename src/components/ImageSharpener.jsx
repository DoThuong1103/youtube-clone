import React, { useEffect, useRef } from "react";

const ImageProcessingComponent = ({ src }) => {
  const inputImageRef = useRef();
  const outputImageRef = useRef();

  useEffect(() => {
    const inputImage = inputImageRef.current;
    const outputImage = outputImageRef.current;

    const processImage = () => {
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");

      // Đặt kích thước canvas
      const targetWidth = 800; // Kích thước ảnh mới
      const targetHeight = 600;

      canvas.width = targetWidth;
      canvas.height = targetHeight;

      // Vẽ ảnh gốc lên canvas với kích thước mới
      context.drawImage(inputImage, 0, 0, targetWidth, targetHeight);

      // Đặt thuộc tính để làm cho ảnh nét hơn (ví dụ: sharpen)
      // Bạn có thể thử nghiệm với các thuộc tính khác để đạt được kết quả mong muốn

      // Vẽ canvas lên ảnh đầu ra
      outputImage.src = canvas.toDataURL("image/jpeg");
    };

    processImage();
  }, []);

  return (
    <div>
      <img
        ref={inputImageRef}
        src={src}
        alt="Processed Image"
        style={{ display: "none" }}
      />
      <img ref={outputImageRef} alt="Processed Image" />
    </div>
  );
};

export default ImageProcessingComponent;
