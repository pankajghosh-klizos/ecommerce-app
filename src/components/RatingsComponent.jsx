import { Icons } from "../constants/icons";
import RatingBar from "./RatingBar";

const RatingsComponent = () => {
  const ratingsData = [
    { label: "Excellent", percentage: 100, value: 100 },
    { label: "Good", percentage: 88, value: 11 },
    { label: "Average", percentage: 24, value: 3 },
    { label: "Below Average", percentage: 16, value: 8 },
    { label: "Poor", percentage: 8, value: 1 },
  ];

  return (
    <div className="d-lg-flex align-items-center mb-5">
      {/* Overall Rating */}
      <div className="px-4 me-lg-5 mb-5 mb-lg-0">
        <h2 className="mb-1 display-3 fw-semibold text-center">4.8</h2>
        <p className="text-black-50 mb-2 text-center">of 125 reviews</p>
        <div className="d-flex gap-1 justify-content-center">
          <img src={Icons.starSolid} alt="star" />
          <img src={Icons.starSolid} alt="star" />
          <img src={Icons.starSolid} alt="star" />
          <img src={Icons.starSolid} alt="star" />
          <img src={Icons.starHalf} alt="star" />
        </div>
      </div>

      {/* Detailed Ratings */}
      <div className="w-100">
        {ratingsData.map((item, index) => (
          <RatingBar
            key={index}
            label={item.label}
            percentage={item.percentage}
            value={item.value}
          />
        ))}
      </div>
    </div>
  );
};

export default RatingsComponent;
