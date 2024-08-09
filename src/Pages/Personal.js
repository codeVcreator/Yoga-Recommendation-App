import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import Stepper from "../Components/Stepper";

const steps = ["Personal", "Health", "Yoga", "Goals", "Review"];

const Personal = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("Male");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const ageInputRef = useRef(null);


  // To prevent changing of age input while scrolling
  useEffect(() => {
    const preventScroll = (e) => e.preventDefault();

    const inputElement = ageInputRef.current;
    if (inputElement) {
      inputElement.addEventListener("wheel", preventScroll);
    }

    return () => {
      if (inputElement) {
        inputElement.removeEventListener("wheel", preventScroll);
      }
    };
  }, []);


  // To show inputs as data stored in local storage
  useEffect(() => {
    const storedData = localStorage.getItem("formData");
    const formData = storedData ? JSON.parse(storedData) : [];
    const personalData = formData.find((section) => section.id === "personal");
    if (personalData) {
      setName(personalData.name);
      setAge(personalData.age);
      setGender(personalData.gender);
      setEmail(personalData.email);
    }
  }, []);


  // Submitting form
  const submitForm = (e) => {
    e.preventDefault();

    const formData = {
      id: "personal",
      name,
      age,
      gender,
      email,
    };

    // Update or Post data in local storage
    const storedData = localStorage.getItem("formData");
    const data = storedData ? JSON.parse(storedData) : [];

    const updatedData = data.map((section) =>
      section.id === "personal" ? { ...section, ...formData } : section
    );

    if (!updatedData.some((section) => section.id === "personal")) {
      updatedData.push(formData);
    }

    localStorage.setItem("formData", JSON.stringify(updatedData));

    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
    navigate("/health");
  };


  return (
    <>
      <header id="header">
        <h1>Yoga Recommendation Form</h1>
      </header>

      <section id="section">
        <Stepper currentStep={currentStep} steps={steps} />
        <form className="form-section" onSubmit={submitForm}>
          <h1>Enter Personal Details</h1>
          {/* <!-- Personal Information --> */}
          <div className="form-content">
            <label htmlFor="name">
              Name <span>*</span>
            </label>
            <input
              id="name"
              type="text"
              placeholder="Enter Full Name"
              autoComplete="off"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-content">
            <label htmlFor="age">
              Age <span>*</span>
            </label>
            <input
              id="age"
              type="number"
              placeholder="Enter your Age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              ref={ageInputRef}
              required
              min={1}
            />
          </div>
          <div className="form-content">
            <label htmlFor="gender">
              Gender <span>*</span>
            </label>
            <select
              id="gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              required
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Others">Others</option>
            </select>
          </div>
          <div className="form-content">
            <label htmlFor="email">
              Email Id <span>*</span>
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email address"
              autoComplete="off"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* <!-- Submit --> */}
          <div className="form-content">
            <div className="buttons">
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

export default Personal;
