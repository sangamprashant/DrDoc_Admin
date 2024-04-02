import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";
import { BASE_API } from "../../../../config";
import "./Profile.css";
import {
  AddIcon,
  CloseIcon,
  EmailIcon,
  LocalPhoneIcon,
  LocationOnIcon,
  PublicIcon,
} from "../../../Icons/Icons";
import { Image, Modal, Tabs, Tooltip } from "antd";
import ProfileDocCard from "./ProfileDocCard";
import { AppContext } from "../../../../AppContext";
import AddReports from "./AddReports";

const ClientsProfile = () => {
  const { token } = React.useContext(AppContext);
  const { id } = useParams();
  const [client, setClient] = React.useState(null);
  const [prescriptions, setPrescriptions] = React.useState([]);
  const [acceptedPrescriptions, setAcceptedPrescriptions] = React.useState([]);
  const [pendingPrescriptions, setPendingPrescriptions] = React.useState([]);
  // modal
  const [modal2Open, setModal2Open] = React.useState(false);
  const [openPrescription, setOpenPrescription] = React.useState(null);
  const [isAdd, setIsAdd] = React.useState(false);

  React.useLayoutEffect(() => {
    if (id) {
      fetchClientsProfile();
    }
  }, [id]);

  const fetchClientsProfile = async () => {
    try {
      const response = await axios.get(`${BASE_API}/common/profile/${id}`);
      if (response.data.success) {
        setClient(response.data.user);
      }
    } catch (error) {
      console.log("failed to fetch the client's details", error);
    } finally {
    }
  };

  const handleClick = (data) => {
    setOpenPrescription(data);
    setModal2Open(true);
  };

  React.useLayoutEffect(() => {
    if (token && id) {
      fetchPrescription();
    }
  }, []);

  const fetchPrescription = async () => {
    try {
      const response = await axios.get(
        `${BASE_API}/doctor/get-clients/prescriptions/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
      if (response.data.success) {
        setPrescriptions(response.data.prescriptions);
        // Filter prescriptions based on acceptance status
        const accepted = response.data.prescriptions.filter(
          (prescription) => prescription.isAccepted
        );
        const pending = response.data.prescriptions.filter(
          (prescription) => !prescription.isAccepted
        );
        setAcceptedPrescriptions(accepted);
        setPendingPrescriptions(pending);
      } else {
        console.log("Request failed:", response.data.message);
      }
    } catch (error) {
      console.log("Failed to fetch:", error);
    }
  };

  const items = [
    {
      key: "1",
      label: "Documents & Reports",
      children: (
        <div>
          <div className="document-image-container">
            {acceptedPrescriptions.map((data, index) => (
              <ProfileDocCard
                key={index}
                image={data.images[0]}
                title={data.title}
                date={data.date}
                description={data.description}
                isAccepted={data.isAccepted}
                handleClick={() => {
                  handleClick(data);
                }}
              />
            ))}
          </div>
        </div>
      ),
    },
    {
      key: "2",
      label: "Pending Documents & Reports",
      children: (
        <div>
          <div className="document-image-container">
            {pendingPrescriptions.map((data, index) => (
              <ProfileDocCard
                key={index}
                image={data.images[0]}
                title={data.title}
                date={data.date}
                description={data.description}
                isAccepted={data.isAccepted}
                handleClick={() => {
                  handleClick(data);
                }}
              />
            ))}
          </div>
        </div>
      )
    },
  ];

  return (
    <>
      {client && (
        <div class="wrapper" style={{display:"block"}}>
          <div class="profile-card js-profile-card shadow-lg">
            <div class="profile-card__img">
              <img src={client?.personal?.image || client} alt="profile card" />
            </div>

            <div class="profile-card__cnt js-profile-cnt">
              <div class="profile-card__name">{client.name}</div>
              <div class="profile-card__txt">
                My <strong>Client</strong>
              </div>

              <div class="profile-card-social">
                <a
                  href={`mailto:${client?.email}`}
                  class="profile-card-social__item facebook"
                  target="_blank"
                >
                  <span class="icon-font">
                    <EmailIcon />
                  </span>
                </a>

                <a
                  class="profile-card-social__item instagram"
                  target="_blank"
                  onClick={() => setIsAdd(!isAdd)}
                >
                  <span class="icon-font">
                    {isAdd?<CloseIcon/>:<AddIcon />}
                  </span>
                </a>
                {/* <a
                  href={client?.personal?.contactNumber}
                  class="profile-card-social__item link"
                  target="_blank"
                >
                  <span class="icon-font">
                    <LocalPhoneIcon />
                  </span>
                </a> */}
              </div>

              {/* other details */}
              <hr />
              {isAdd ? (
                <AddReports />
              ) : (
                <Tabs centered defaultActiveKey="1" items={items} />
              )}
            </div>
          </div>
        </div>
      )}
      {openPrescription && (
        <Modal
          title=<h5>{openPrescription.title}</h5>
          centered
          open={modal2Open}
          onOk={() => setModal2Open(false)}
          onCancel={() => setModal2Open(false)}
        >
          {openPrescription.description && (
            <>
              <code>Description: {openPrescription.description}</code>
              <br />
            </>
          )}
          {openPrescription.additionalNotes && (
            <>
              <code>Additional notes: {openPrescription.additionalNotes}</code>
              <br />
            </>
          )}
          {openPrescription.date && (
            <>
              <code>Date: {openPrescription.date}</code>
              <br />
            </>
          )}
          {openPrescription.doctorName && (
            <>
              <code>Doctor Name: {openPrescription.doctorName}</code>
              <br />
            </>
          )}
          <div className="d-flex flex-wrap">
            {openPrescription?.images.map((data, index) => (
              <Image
                key={index}
                src={data}
                height={150}
                width={150}
                className=" object-fit-contain"
              />
            ))}
          </div>
        </Modal>
      )}
    </>
  );
};

export default ClientsProfile;
