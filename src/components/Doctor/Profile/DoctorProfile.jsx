import React from "react";
import "./DoctorProfile.css";
import { AppContext } from "../../../AppContext";
import { User } from "../../../assets/images";
import {
  EmailIcon,
  LocalPhoneIcon,
  LocationOnIcon,
  PublicIcon,
} from "../../Icons/Icons";
import { Image } from "antd";

function DoctorProfile() {
  const { user } = React.useContext(AppContext);
  return (
    <>
      {user && (
        <div class="wrapper">
          <div class="profile-card js-profile-card shadow-lg">
            <div class="profile-card__img">
              <img src={user?.personal?.image || User} alt="profile card" />
            </div>

            <div class="profile-card__cnt js-profile-cnt">
              <div class="profile-card__name">{user.name}</div>
              <div class="profile-card__txt">
                Specialization in{" "}
                <strong>{user?.hospital?.specialization}</strong>
              </div>
              <div class="profile-card-loc">
                <span class="profile-card-loc__icon">
                  <LocationOnIcon />
                </span>

                <span class="profile-card-loc__txt">
                  {user?.hospital?.hospitalName}, {user?.hospital?.location}
                </span>
              </div>

              <div class="profile-card-inf">
                <div class="profile-card-inf__item">
                  <div class="profile-card-inf__title">
                    {user?.hospital?.experienceYears}
                  </div>
                  <div class="profile-card-inf__txt">Experience Years</div>
                </div>

                <div class="profile-card-inf__item">
                  <div class="profile-card-inf__title">
                    {user?.hospital?.bedsAvailable}
                  </div>
                  <div class="profile-card-inf__txt">Beds Available</div>
                </div>

                <div class="profile-card-inf__item">
                  <div class="profile-card-inf__title">
                    {user?.hospital?.perConsultantCharge}
                  </div>
                  <div class="profile-card-inf__txt">Per Consultant Charge</div>
                </div>

                <div class="profile-card-inf__item">
                  <div class="profile-card-inf__title">
                    {user?.hospital?.doctorDegree}
                  </div>
                  <div class="profile-card-inf__txt">Degree</div>
                </div>
              </div>

              <div class="profile-card-social">
                <a
                  href={`mailto:${user?.email}`}
                  class="profile-card-social__item facebook"
                  target="_blank"
                >
                  <span class="icon-font">
                    <EmailIcon />
                  </span>
                </a>

                <a
                  href={user?.hospital?.website}
                  class="profile-card-social__item instagram"
                  target="_blank"
                >
                  <span class="icon-font">
                    <PublicIcon />
                  </span>
                </a>
                <a
                  href={user?.personal?.contactNumber}
                  class="profile-card-social__item link"
                  target="_blank"
                >
                  <span class="icon-font">
                    <LocalPhoneIcon />
                  </span>
                </a>
              </div>

              {/* <div class="profile-card-ctr">
                <button class="profile-card__button button--blue js-message-btn">
                  Message
                </button>
                <button class="profile-card__button button--orange">
                  Follow
                </button>
              </div> */}

              {/* other details */}
              <hr />
              <div className=" text-start">
                <details className="mt-3">
                  <summary>Hospital's images</summary>
                  <div className="d-flex flex-wrap gap-2">
                    {user?.hospital?.images?.map((data, index) => (
                      <Image
                        key={index}
                        src={data}
                        alt=""
                        height={100}
                        width={100}
                      />
                    ))}
                  </div>
                </details>
                <details className="mt-3">
                  <summary>Doctor's degree</summary>
                  <div className="d-flex flex-wrap gap-2">
                    <Image
                      src={user?.hospital?.doctorDegreeFile}
                      alt=""
                      height={100}
                      width={100}
                    />
                  </div>
                </details>
                <details className="mt-3">
                  <summary>Address</summary>
                  <p>{user?.address?.address}</p>
                  <p>
                    {user?.address?.city} {user?.address?.state}{" "}
                    {user?.address?.country}
                  </p>
                  <p>
                    {user?.address?.latitude
                      ? `"Latitude:"${user?.address?.latitude}`
                      : ""}
                    {user?.address?.longitude
                      ? `"Longitude:"${user?.address?.longitude}`
                      : ""}
                  </p>
                </details>
              </div>
            </div>

            {/* <div class="">
              <form class="profile-card-form">
                <div class="profile-card-form__container">
                  <textarea placeholder="Say something..."></textarea>
                </div>

                <div class="profile-card-form__bottom">
                  <button class="profile-card__button button--blue js-message-close">
                    Send
                  </button>

                  <button class="profile-card__button button--gray js-message-close">
                    Cancel
                  </button>
                </div>
              </form>
            </div> */}
          </div>
        </div>
      )}
    </>
  );
}

export default DoctorProfile;
