import { useEffect, useState } from "react";
import Stepper from "../Components/Stepper";
import { useNavigate } from "react-router-dom";
import { FaPen } from "react-icons/fa";

const steps = ["Personal", "Health", "Yoga", "Goals", "Review"];

const Review = () => {
  const [currentStep, setCurrentStep] = useState(4);
  const [FormData, setFormData] = useState(null);
  const navigate = useNavigate();


  // To get inputs that are stored in local storage and save in FormData array
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("formData")) || {};
    setFormData(data);
  }, []);

  if (!FormData) {
    return <div className="form-content">Loading...</div>;
  }


  // Handle data transformation : to make it like FormData array = [personal: {id,age,...} and like that]
  const transformData = (data) => {
    const transformedData = {};
    data.forEach((item) => {
      transformedData[item.id] = {
        ...item
      };
    });
    return transformedData;
  };
  // Now get data from here.
  const formData = transformData(FormData);


  // Stepper 
  if (currentStep < steps.length - 1) {
    setCurrentStep(currentStep + 1);
  }


  return (
    <>
      <header id="header">
        <h1>Yoga Recommendation Form</h1>
      </header>

      <section id="section">
        <Stepper currentStep={currentStep} steps={steps} />
        <div className="form-section review">
          <h1>Review Your Information</h1>
          <div className="form-content">
            <h2>Personal Information : </h2>
            <p>
              <strong>Name:</strong> {formData.personal?.name}
            </p>
            <p>
              <strong>Age:</strong> {formData.personal?.age}
            </p>
            <p>
              <strong>Gender:</strong> {formData.personal?.gender}
            </p>
            <p>
              <strong>Email:</strong> {formData.personal?.email}
            </p>
          </div>
          <div className="form-content">
            <h2>Health Information : </h2>
            <p>
              <strong>Injury:</strong> {formData.health?.injury}
            </p>
            <p style={{ display: formData.health?.injury === "No" && "none" }}>
              <strong>Injury Details:</strong> {formData.health?.injuryDetails}
            </p>
            <p>
              <strong>Medication:</strong> {formData.health?.medication}
            </p>
            <p
              style={{ display: formData.health?.medication === "No" && "none" }}
            >
              <strong>Medication Details:</strong>{" "}
              {formData.health?.medicationDetails}
            </p>
            <p>
              <strong>Activity Level:</strong> {formData.health?.activity}
            </p>
            <p>
              <strong>Fitness Level:</strong> {formData.health?.fitness}
            </p>
          </div>
          <div className="form-content">
            <h2>Yoga Information : </h2>
            <p>
              <strong>Yoga History:</strong> {formData.yoga?.yogaHistory}
            </p>
            <p>
              <strong>Yoga Practice:</strong> {formData.yoga?.yogaPractice}
            </p>
            <p>
              <strong>Yoga Skill:</strong> {formData.yoga?.yogaSkill}
            </p>
            <p style={{ display: formData.yoga?.hatha ? "block" : "none" }}>
              <strong>Hatha:</strong> {formData.yoga?.hatha && "Yes"}
            </p>
            <p style={{ display: formData.yoga?.vinayasa ? "block" : "none" }}>
              <strong>Vinayasa:</strong> {formData.yoga?.vinayasa && "Yes"}
            </p>
            <p style={{ display: formData.yoga?.ashtanga ? "block" : "none" }}>
              <strong>Ashtanga:</strong> {formData.yoga?.ashtanga && "Yes"}
            </p>
            <p style={{ display: formData.yoga?.yin ? "block" : "none" }}>
              <strong>Yin:</strong> {formData.yoga?.yin && "Yes"}
            </p>
            <p style={{ display: formData.yoga?.iyengar ? "block" : "none" }}>
              <strong>Iyengar:</strong> {formData.yoga?.iyengar && "Yes"}
            </p>
          </div>
          <div className="form-content">
            <h2>Goals : </h2>
            <p
              style={{ display: formData.goals?.flexibility ? "block" : "none" }}
            >
              <strong>Flexibility:</strong>{" "}
              {formData.goals?.flexibility && "Yes"}
            </p>
            <p style={{ display: formData.goals?.strength ? "block" : "none" }}>
              <strong>Strength:</strong> {formData.goals?.strength && "Yes"}
            </p>
            <p style={{ display: formData.goals?.stress ? "block" : "none" }}>
              <strong>Stress Relief:</strong> {formData.goals?.stress && "Yes"}
            </p>
            <p style={{ display: formData.goals?.balance ? "block" : "none" }}>
              <strong>Balance:</strong> {formData.goals?.balance && "Yes"}
            </p>
            <p style={{ display: formData.goals?.spiritual ? "block" : "none" }}>
              <strong>Spiritual:</strong> {formData.goals?.spiritual && "Yes"}
            </p>
            <p
              style={{ display: formData.goals?.weightLoss ? "block" : "none" }}
            >
              <strong>Weight Loss:</strong> {formData.goals?.weightLoss && "Yes"}
            </p>
            <p
              style={{
                display: formData.goals?.rehabilitation ? "block" : "none",
              }}
            >
              <strong>Rehabilitation:</strong>{" "}
              {formData.goals?.rehabilitation && "Yes"}
            </p>
            <p>
              <strong>Time Commitment:</strong> {formData.goals?.time}
            </p>
            <p style={{ display: formData.goals?.moreInfo ? "block" : "none" }}>
              <strong>Additional Information:</strong> {formData.goals?.moreInfo}
            </p>
          </div>
          <div className="buttons">
            <button
              className="previous"
              onClick={(e) => {
                e.preventDefault();
                navigate("/goals");
              }}
            >
              <FaPen style={{ marginRight: "7px", position: "relative" }} />
              Edit your form
            </button>
            <button
              className="next"
              onClick={(e) => {
                e.preventDefault();
                alert("Are you Sure?");
                navigate("/submit");
              }}
            >
              Submit
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Review;
