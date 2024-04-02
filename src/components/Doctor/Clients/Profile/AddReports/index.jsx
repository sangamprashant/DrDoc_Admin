import { Image } from "antd";
import React, { useState } from "react";
import Modal from "../../../../Modal";
import { AppContext } from "../../../../../AppContext";
import axios from "axios";
import html2canvas from "html2canvas";
import { storage } from "../../../../../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

function AddReports() {
    const { token, setModal2Open, setModelType, setModelMessgae } =
    React.useContext(AppContext)
  // form inputs
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [doctorName, setDoctorName] = useState("");
  const [additionalNotes, setAdditionalNotes] = useState("");
  const [selectedImages, setSelectedImages] = useState([]);
  // Scanner Control and inputs
  const [isScannerOpen, setScannerOpen] = React.useState(false);
  const videoRef = React.useRef(null);
  const [loading, setLoading] = useState(false);
  const [capturedImage, setCapturedImage] = React.useState();
  const [imgeBlob, setImageBlob] = React.useState(null);

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleFileUpload = async (event) => {
    try {
      const files = event.target.files;
      setLoading(true);
      const urls = [];
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const fileRef = ref(storage, `DrDoc_college/${Date.now() + file.name}`);
        const snapshot = await uploadBytes(fileRef, file);
        const url = await getDownloadURL(snapshot.ref);
        urls.push(url);
      }
      setSelectedImages((prev) => [...prev, ...urls]);
      setLoading(false);
    } catch (error) {
      console.error("Error uploading files:", error);
      setLoading(false);
    }
  };

  const handleRetake = () => {
    setCapturedImage(null);
  };

  const handleScreenshotButtonClick = () => {
    html2canvas(document.getElementById("screenshot-target")).then((canvas) => {
      // Convert canvas to blob
      canvas.toBlob((blob) => {
        if (blob) {
          const capturedImageUrl = URL.createObjectURL(blob);
          setCapturedImage(capturedImageUrl);
          setImageBlob(blob);
        } else {
          console.error("Failed to convert canvas to blob");
        }
      }, "image/jpeg"); // Specify MIME type
    });
  };

  const sendImageToServer = async (blob) => {
    try {
      const formData = new FormData();
      formData.append("file", blob, Math.random() + "screenshot.jpg"); // Change key to "file"
      const response = await fetch(
        `${process.env.REACT_APP_PYTHON_SERVER_API}/scan`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();
      console.log(data);
      if (data.success) {
        uploadImageFromURL(
          `${process.env.REACT_APP_PYTHON_SERVER_API}/`,
          data.result_path
        );
      }
    } catch (error) {
      console.log("Failed to scan the document:", error);
      alert("server error");
    }
  };

  // Function to upload image from URL to Firebase Storage
  const uploadImageFromURL = async (base, imageUrl) => {
    try {
      const response = await fetch(base + imageUrl);
      if (!response.ok) {
        throw new Error("Failed to fetch image data");
      }
      const imageBlob = await response.blob();
      const storageRef = ref(storage, "DrDoc_college/" + Date.now() + ".jpg");
      const snapshot = await uploadBytes(storageRef, imageBlob);
      const downloadURL = await getDownloadURL(snapshot.ref);
      setSelectedImages((prevImages) => [...prevImages, downloadURL]);
      deleteImage(base, imageUrl);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const deleteImage = async (base, filename) => {
    try {
      const response = await fetch(`${base}delete-image/${filename}`, {
        method: "DELETE",
      });
      if (response.ok) {
        console.log("Image deleted successfully");
        setCapturedImage(null);
      } else {
        console.error("Failed to delete image:", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting image:", error);
    }
  };

  React.useEffect(() => {
    if (isScannerOpen) {
      startWebcam();
    }
  }, [capturedImage, isScannerOpen]);

  const startWebcam = async () => {
    try {
      // Access the webcam stream
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });
      if (videoRef.current) {
        // Set the stream as the video source
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error("Error accessing webcam:", error);
    }
  };
  // for web cam
  const HandleWebCam = () => {
    setScannerOpen(true);
    startWebcam(); // Start the webcam when the component mounts
    // Cleanup function to stop the webcam when the component unmounts
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject;
        const tracks = stream.getTracks();
        tracks.forEach((track) => track.stop());
      }
    };
  };

  // handle  the image upload to the firebasenget link then save to express server
  const handleSaveToDatabase = async () => {
    if (!title.trim() || !description.trim() || !date || !selectedImages > 0) {
      setModal2Open(true);
      setModelType("Error");
      setModelMessgae("Title, description, images, and date are required");
      return;
    }
    const data = {
      title: title.trim(),
      description: description.trim(),
      date,
      doctorName,
      additionalNotes,
      images: selectedImages,
    };

    try {
      // Send data to the Express server
      const response = await axios.post(
        `${process.env.REACT_APP_DATABASE_API}/user/post/create`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.success) {
        setModal2Open(true);
        setModelType("Success");
        setModelMessgae(response.data.message || "Uploaded prescription");
      } else {
        setModal2Open(true);
        setModelType("Warning");
        setModelMessgae(response.data.message || "Something went wrong");
      }
    } catch (error) {
      console.error("Error saving prescription:", error);
      setModal2Open(true);
      setModelType("Error");
      setModelMessgae(
        error.response.data.message || "Error saving prescription"
      );
    }
  };

  return (
    <div>
      <div className="row">
        <div className="col-md-6">
          <label htmlFor="title">
            Title for the Report
            <sup>
              <code>*</code>
            </sup>
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            placeholder="Title for the Report"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="description">
            Description of the report
            <sup>
              <code>*</code>
            </sup>
          </label>
          <input
            type="text"
            className="form-control"
            id="description"
            placeholder="Description of the report"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="date">
            Date
            <sup>
              <code>*</code>
            </sup>
          </label>
          <input
            type="date"
            className="form-control"
            id="date"
            value={date}
            max={getCurrentDate()}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="doctorName">Doctor's Name </label>
          <input
            type="text"
            className="form-control"
            id="doctorName"
            placeholder="Doctor's Name"
            value={doctorName}
            onChange={(e) => setDoctorName(e.target.value)}
          />
        </div>
        <div className="col-md-12">
          <label htmlFor="additionalNotes">Additional Notes</label>
          <textarea
            className="form-control"
            id="additionalNotes"
            rows="3"
            placeholder="Additional Notes"
            value={additionalNotes}
            onChange={(e) => setAdditionalNotes(e.target.value)}
          ></textarea>
        </div>
        <div className="col-md-12">
          <label htmlFor="images">
            Select the Reports (Images only)
            <sup>
              <code>*</code>
            </sup>
          </label>
          <input
            type="file"
            className="form-control"
            id="images"
            multiple
            accept="image/*"
            onChange={handleFileUpload}
          />
          <h5 className="text-center">OR</h5>
          <input
            type="button"
            className="form-control btn btn-primary"
            value={`SCAN`}
            onClick={HandleWebCam}
          />
        </div>
        <div className="col-md-12">
          <label htmlFor="selectedImages">Selected Reports Preview</label>
          <div className="selected-images-container d-flex flex-wrap gap-2 ">
            {selectedImages.map((imageUrl, index) => (
              <Image
                key={index}
                alt={`selected-image-${index} `}
                width={150}
                height={150}
                className=" object-fit-contain"
                src={imageUrl}
              />
            ))}
          </div>
        </div>
        <div className="d-flex justify-content-end">
          <button
            className="btn btn-primary"
            onClick={handleSaveToDatabase}
            disabled={loading}
          >
             {loading ? "PLEASE WAIT" : "UPLOAD"}
          </button>
        </div>
      </div>
      <Modal isOpen={isScannerOpen}>
        <h1>Document scanner</h1>
        {capturedImage ? (
          <img src={capturedImage} alt="" width={400} />
        ) : (
          <video
            ref={videoRef}
            autoPlay
            playsInline
            id="screenshot-target"
            width={400}
          />
        )}
        <div className="d-flex justify-content-around mt-2">
          <button
            key="1"
            className="btn btn-primary m-1"
            onClick={handleScreenshotButtonClick}
            disabled={!capturedImage ? false : true}
          >
            CAPTURE
          </button>

          <button
            key="2"
            className="btn btn-warning m-1 text-white"
            disabled={capturedImage ? false : true}
            onClick={handleRetake}
          >
            RETAKE
          </button>
          <button
            key="3"
            className="btn btn-success m-1"
            onClick={() => sendImageToServer(imgeBlob)}
            disabled={capturedImage ? false : true}
          >
            SCAN
          </button>
          <button
            key="4"
            className="btn btn-danger m-1"
            onClick={() => {
              setScannerOpen(false);
              setCapturedImage(null);
            }}
          >
            CANCEL
          </button>
        </div>
      </Modal>
    </div>
  );
}

// Get current date in the format yyyy-mm-dd
const getCurrentDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export default AddReports;
