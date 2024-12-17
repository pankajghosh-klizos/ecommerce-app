import { Icons } from "../constants/icons";
import { Images } from "../constants/images";

const ReviewCard = () => {
  return (
    <div className="d-flex py-4">
      <img
        src={Images.reviewer1}
        alt="User Profile"
        className="rounded-circle me-3"
        style={{ width: "50px", height: "50px" }}
      />

      <div className="w-100">
        <div className="d-flex align-items-center justify-content-between mb-2">
          <h5 className="fw-bold mb-0">Grace Carey</h5>
          <p className="text-black-50 mb-0">24 January 2023</p>
        </div>

        <div className="d-flex gap-1 mb-3">
          <img src={Icons.starSolid} alt="star" />
          <img src={Icons.starSolid} alt="star" />
          <img src={Icons.starSolid} alt="star" />
          <img src={Icons.starSolid} alt="star" />
          <img src={Icons.starOutline} alt="star" />
        </div>

        <p className="card-text">
          I was a bit nervous to be buying a secondhand phone from Amazon, but I
          couldn’t be happier with my purchase!! I have a pre-paid data plan so
          I was worried that this phone wouldn’t connect with my data plan,
          since the new phones don’t have the physical SIM tray anymore, but
          couldn’t have been easier! I bought an Unlocked black iPhone 14 Pro
          Max in excellent condition and everything is PERFECT. It was super
          easy to set up and the phone works and looks great. It truly was in
          excellent condition. Highly recommend!!!🖤
        </p>
      </div>
    </div>
  );
};

export default ReviewCard;
