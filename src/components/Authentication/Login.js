import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { BASE_API } from "../../config";
import { AppContext } from "../../AppContext";
import { SensorOccupiedIcon } from "../Icons/Icons";
import Modal from "../Modal";
import html2canvas from "html2canvas";

function Login() {
  const { setIsLogged, setToken, setModal2Open,setModelType,setModelMessgae } = React.useContext(AppContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = React.useState(false);
  // login with face
  const videoRef = React.useRef(null);
  const [capturedImage, setCapturedImage] = React.useState();

  const handelLoginWithEmailPassword = async (e) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      return toast.info("Please Enter all the fields.");
    }
    setLoading(true);
    const reqBody = {
      email: email.trim(),
      password: password.trim(),
    };
    try {
      const response = await axios.post(`${BASE_API}/common/login`, reqBody);
      if (response.data.success) {
        toast.success(response.data.message);
        setToken(response.data.token);
        sessionStorage.setItem("token", response.data.token);
        setIsLogged(true);
      } else {
        toast.error(response.data.error);
      }
    } catch (error) {
      toast.error(error.response.data.error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    if (modalOpen) {
      startWebcam();
    }
  }, [capturedImage, modalOpen]);

  const startWebcam = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error("Error accessing webcam:", error);
    }
  };

  // for web cam
  const HandleWebCam = () => {
    setModalOpen(true);
    startWebcam();
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject;
        const tracks = stream.getTracks();
        tracks.forEach((track) => track.stop());
      }
    };
  };

  const handleRegister = async (imgeBlob) => {
    setLoading(true);
    setModalOpen(false);
    try {
      const formData = new FormData();
      formData.append("face_photo", imgeBlob, "screenshot.jpg");

      console.log("form send: ", formData);

      const response = await fetch("http://127.0.0.1:8000/api/login", {
        method: "POST",
        body: formData,
      });

      const responseData = await response.json();
      if (responseData.success) {
        setModelType("Success");
        setModelMessgae(responseData.message);
        setModal2Open(true);
        sessionStorage.setItem("token", responseData?.token);
        setToken(responseData?.token);
        setIsLogged(true);
      } else {
        throw new Error(responseData.error || "Something went wrong");
      }
    } catch (error) {
      console.error("Failed to register:", error);
      setModelType("Error");
      setModelMessgae(error.message || "Something went wrong");
      setModal2Open(true);
    } finally {
      setLoading(false);
      setCapturedImage(null);
    }
  };

  const handleScreenshotButtonClick = () => {
    html2canvas(document.getElementById("screenshot-target")).then((canvas) => {
      canvas.toBlob((blob) => {
        if (blob) {
          const capturedImageUrl = URL.createObjectURL(blob);
          setCapturedImage(capturedImageUrl);
          handleRegister(blob);
        } else {
          console.error("Failed to convert canvas to blob");
        }
      }, "image/jpeg"); // Specify MIME type
    });
  };

  return (
    <div class="container col-xl-10 col-xxl-8 px-4 py-5">
      <div class="row align-items-center g-lg-5 py-5">
        <div class="col-lg-7 text-center text-lg-start">
          <h1 class="display-4 fw-bold lh-1 mb-3">Welcome to DrDoc</h1>
          <p class="col-lg-10 fs-4">
            Discover a wide range of pre-made Bootstrap components and code
            snippets at BOOTSTRAPFINDS. Streamline your web development with our
            collection of ready-to-use, responsive design elements.
          </p>
        </div>
        <div class="col-md-10 mx-auto col-lg-5">
          <form
            class="p-4 p-md-5 border rounded-3 bg-light shadow-lg"
            onSubmit={handelLoginWithEmailPassword}
          >
            <h1>Admin & Doctor Login</h1>
            <div className="d-flex justify-content-center mb-3">
              <button
                type="button"
                className="btn btn-primary"
                onClick={HandleWebCam}
              >
                <SensorOccupiedIcon />
              </button>
            </div>
            <details className="mt-3">
              <summary>Continue with email & password</summary>

              <div class="form-floating mb-3">
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  class="form-control"
                  id="floatingInput"
                  placeholder="name@example.com"
                />
                <label for="floatingInput">Email address</label>
              </div>
              <div class="form-floating mb-3">
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  class="form-control"
                  id="floatingPassword"
                  placeholder="Password"
                />
                <label for="floatingPassword">Password</label>
              </div>

              <button
                class="w-100 btn btn-lg btn-primary"
                type="submit"
                disabled={loading}
              >
                {loading ? "Please wait.." : "Sign In"}
              </button>
            </details>
          </form>
        </div>
      </div>
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        <h2>Webcam Scanner</h2>
        <video
          ref={videoRef}
          autoPlay
          playsInline
          id="screenshot-target"
          width={400}
        />
        <div className="d-flex justify-content-around mt-2">
          <button
            key="3"
            className="btn btn-success m-1"
            onClick={handleScreenshotButtonClick}
          >
            ENROLE
          </button>

          <button
            key="4"
            className="btn btn-danger m-1"
            onClick={() => setModalOpen(false)}
          >
            CANCEL
          </button>
        </div>
      </Modal>
    </div>
  );
}

export default Login;
