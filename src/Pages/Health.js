import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Stepper from "../Components/Stepper";

const steps = ["Personal", "Health", "Yoga", "Goals", "Review"];

const Health = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [injury, setInjury] = useState("No");
  const [injuryDetails, setInjuryDetails] = useState("");
  const [medication, setMedication] = useState("No");
  const [medicationDetails, setMedicationDetails] = useState("");
  const [activity, setActivity] = useState("sedentary");
  const [fitness, setFitness] = useState("beginner");
  const navigate = useNavigate();


  // To show inputs as data stored in local storage
  useEffect(() => {
    const storedData = localStorage.getItem("formData");
    const formData = storedData ? JSON.parse(storedData) : [];
    const healthData = formData.find((section) => section.id === "health");
    if (healthData) {
      setInjury(healthData.injury);
      setInjuryDetails(healthData.injuryDetails);
      setMedication(healthData.medication);
      setMedicationDetails(healthData.medicationDetails);
      setActivity(healthData.activity);
      setFitness(healthData.fitness);
    }
  }, []);

  
  // Going previous
  const GotoPrevious = (e) => {
    e.preventDefault();
    navigate("/");
  };


  // Submitting form
  const submitForm = (e) => {
    e.preventDefault();

    const formData = {
      // while submitting form, if injury is None then details is None, and same with medication
      id: "health",
      injury,
      injuryDetails : injury === "Yes" ? injuryDetails : "",
      medication,
      medicationDetails : medication === "Yes" ? medicationDetails : "",
      activity,
      fitness,
    };

    // Update or Post data in local storage
    const storedData = localStorage.getItem("formData");
    const data = storedData ? JSON.parse(storedData) : [];

    const updatedData = data.map((section) =>
      section.id === "health" ? { ...section, ...formData } : section
    );

    if (!updatedData.some((section) => section.id === "health")) {
      updatedData.push(formData);
    }

    localStorage.setItem("formData", JSON.stringify(updatedData));

    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
    navigate("/yoga");
  };

  
  return (
    <>
      <header id="header">
        <h1>Yoga Recommendation Form</h1>
      </header>

      <section id="section">
        <Stepper currentStep={currentStep} steps={steps} />
        <form className="form-section" onSubmit={submitForm}>
          <h1>Health and Physical Condition</h1>
          {/* <!-- Health and Physical Condition --> */}
          <div className="form-content">
            <label htmlFor="injury-status">
              Do you have any existing health conditions or injuries?{" "}
              <span>*</span>
            </label>
            <select
              id="injury-status"
              required
              value={injury}
              onChange={(e) => setInjury(e.target.value)}
            >
              <option value="No">No</option>
              <option value="Yes">Yes</option>
            </select>
            <textarea
              style={{display: injury === "No" ? "none" : "block"}}
              name="injury"
              id="injury"
              placeholder="If yes, please specify"
              value={injuryDetails}
              onChange={(e) => setInjuryDetails(e.target.value)}
              required={injury === "Yes"} // Conditionally adding required attribute
            ></textarea>
          </div>
          <div className="form-content">
            <label htmlFor="medication-history">
              Are you currently taking any medications? <span>*</span>
            </label>
            <select
              id="medication-history"
              required
              value={medication}
              onChange={(e) => setMedication(e.target.value)}
            >
              <option value="No">No</option>
              <option value="Yes">Yes</option>
            </select>
            <textarea
              style={{display: medication === "No" ? "none" : "block"}}
              name="medication"
              id="medication"
              placeholder="If yes, please specify"
              value={medicationDetails}
              onChange={(e) => setMedicationDetails(e.target.value)}
              required={medication === "Yes"} // Conditionally adding required attribute
            ></textarea>
          </div>
          <div className="form-content">
            <label htmlFor="activity-status">
              What is your current level of physical activity? <span>*</span>
            </label>
            <select
              id="activity-status"
              required
              value={activity}
              onChange={(e) => setActivity(e.target.value)}
            >
              <option value="sedentary">Sedentary</option>
              <option value="lightly-active">Lightly Active</option>
              <option value="moderately-active">Moderately Active</option>
              <option value="very-active">Very Active</option>
            </select>
          </div>
          <div className="form-content">
            <label htmlFor="fitness-level">
              How would you rate your current fitness level? <span>*</span>
            </label>
            <select
              id="fitness-level"
              required
              value={fitness}
              onChange={(e) => setFitness(e.target.value)}
            >
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>

          {/* <!-- Submit --> */}
          <div className="form-content">
            <div className="buttons">
              <button className="previous" onClick={GotoPrevious}>
                Previous
              </button>
              <button className="next" type="submit">
                Next
              </button>
            </div>
          </div>
        </form>
      </section>
    </>
  );
};

export default Health;
