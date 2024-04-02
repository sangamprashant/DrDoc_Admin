import React from "react";

const PrescriptionCard = ({ image, title, date, description, handleClick,isAccepted }) => {
  return (
    <div className="document-image">
      <div
        className="card-2"
        style={{ background: `url(${image}) center / contain no-repeat` }}
      >
        <div className="card-content2">
          <h3 className="card-title-profile">{title}</h3>
          <p className="card-subtitle-profile">Date: {date}</p>
          <div className="card-description-profile">
            <p>{description}</p>
            <div className="d-flex justify-content-end">
              <button
                className="btn btn-outline-secondary"
                onClick={handleClick}
              >
                View in detail
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrescriptionCard;
