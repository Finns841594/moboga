import React, { useState } from "react";

interface ImageWithButtonProps { imageUrl: string; deleteHandler: () => void }

const ImageWithButton = ({ imageUrl, deleteHandler }: ImageWithButtonProps) => {
  const [showButton, setShowButton] = useState(false);

  return (
    <div
      className="image-container"
      onMouseEnter={() => setShowButton(true)}
      onMouseLeave={() => setShowButton(false)}
    >
      <img src={imageUrl} className='img' alt="Your description here" />
      {showButton && (
        <button className="hover-button" onClick={deleteHandler}>
          Delete this media
        </button>
      )}
    </div>
  );
};

export default ImageWithButton;