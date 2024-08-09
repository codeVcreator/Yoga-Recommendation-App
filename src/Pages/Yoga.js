import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Stepper from "../Components/Stepper";

const steps = ["Personal", "Health", "Yoga", "Goals", "Review"];

const Yoga = () => {
  const [currentStep, setCurrentStep] = useState(2);
  const [yogaHistory, setYogaHistory] = useState("No");
  const [yogaPractice, setYogaPractice] = useState("just-started");
  const [yogaSkill, setYogaSkill] = useState("beginner");
  const [hatha, setHatha] = useState(false);
  const [vinayasa, setVinayasa] = useState(false);
  const [ashtanga, setAshtanga] = useState(false);
  const [yin, setYin] = useState(false);
  const [iyengar, setIyengar] = useState(false);
  const navigate = useNavigate();


  // To show inputs as data stored in local storage
  useEffect(() => {
    const storedData = localStorage.getItem("formData");
    const formData = storedData ? JSON.parse(storedData) : [];
    const yogaData = formData.find((section) => section.id === "yoga");
    if (yogaData) {
      setYogaHistory(yogaData.yogaHistory);
      setYogaPractice(yogaData.yogaPractice);
      setYogaSkill(yogaData.yogaSkill);
      setHatha(yogaData.hatha);
      setAshtanga(yogaData.ashtanga);
      setIyengar(yogaData.iyengar);
      setVinayasa(yogaData.vinayasa);
      setYin(yogaData.yin);
    }
  }, []);


  // Going previous
  const GotoPrevious = (e) => {
    e.preventDefault();

    navigate("/health");
  };


  // Submitting form
  const submitForm = (e) => {
    e.preventDefault();

    const formData = {
      // while submitting form, if yogaHistory is "No" then all set to default
      id: "yoga",
      yogaHistory,
      yogaPractice : yogaHistory === "Yes" ? yogaPractice : "just-started",
      yogaSkill,
      hatha : yogaHistory === "Yes" ? hatha : false,
      vinayasa : yogaHistory === "Yes" ? vinayasa : false,
      ashtanga : yogaHistory === "Yes" ? ashtanga : false,
      yin : yogaHistory === "Yes" ? yin : false,
      iyengar : yogaHistory === "Yes" ? iyengar : false,
    };

    // Update or Post data in local storage
    const storedData = localStorage.getItem("formData");
    const data = storedData ? JSON.parse(storedData) : [];

    const updatedData = data.map((section) =>
      section.id === "yoga" ? { ...section, ...formData } : section
    );

    if (!updatedData.some((section) => section.id === "yoga")) {
      updatedData.push(formData);
    }

    localStorage.setItem("formData", JSON.stringify(updatedData));

    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
    navigate("/goals");
  };


  return (
    <>
      <header id="header">
        <h1>Yoga Recommendation Form</h1>
      </header>

      <section id="section">
        <Stepper currentStep={currentStep} steps={steps} />
        <form className="form-section" onSubmit={submitForm}>
          <h1>Yoga History</h1>
          {/* <!-- Yoga Experience --> */}
          <div className="form-content">
            <label htmlFor="yoga-history">
              Have you practiced yoga before? <span>*</span>
            </label>
            <select
              id="yoga-history"
              required
              value={yogaHistory}
              onChange={(e) => setYogaHistory(e.target.value)}
            >
              <option value="No">No</option>
              <option value="Yes">Yes</option>
            </select>
          </div>
          {/* <!-- If they select yes they do Yoga then show below ones --> */}
          <div className="form-content" style={{display: yogaHistory === "No" ? "none" : "block"}}>
            <label htmlFor="yoga-practice">
              If yes, how long have you been practicing yoga? <span>*</span>
            </label>
            <select
              id="yoga-practice"
              required
              value={yogaPractice}
              onChange={(e) => setYogaPractice(e.target.value)}
            >
              <option value="just-started">Just started</option>
              <option value="less-than-6-months">less than 6 months</option>
              <option value="less-than-a-year">less than a year</option>
              <option value="more-than-a-year">more than a year</option>
            </select>
          </div>
          <div className="form-content" style={{display: yogaHistory === "No" ? "none" : "block"}}>
            <label htmlFor="yoga-types">
              What type(s) of yoga have you practiced before?
            </label>
            <div className="checkbox">
              <input
                type="checkbox"
                id="Hatha"
                checked={hatha}
                onChange={() => setHatha(!hatha)}
              />
              <label htmlFor="Hatha">Hatha</label>
            </div>
            <div className="checkbox">
              <input
                type="checkbox"
                id="Vinyasa"
                checked={vinayasa}
                onChange={() => setVinayasa(!vinayasa)}
              />
              <label htmlFor="Vinyasa">Vinyasa</label>
            </div>
            <div className="checkbox">
              <input
                type="checkbox"
                id="Ashtanga"
                checked={ashtanga}
                onChange={() => setAshtanga(!ashtanga)}
              />
              <label htmlFor="Ashtanga">Ashtanga</label>
            </div>
            <div className="checkbox">
              <input
                type="checkbox"
                id="Yin"
                checked={yin}
                onChange={() => setYin(!yin)}
              />
              <label htmlFor="Yin">Yin</label>
            </div>
            <div className="checkbox">
              <input
                type="checkbox"
                id="Iyengar"
                checked={iyengar}
                onChange={() => setIyengar(!iyengar)}
              />
              <label htmlFor="Iyengar">Iyengar</label>
            </div>
          </div>
          <div className="form-content">
            <label htmlFor="yoga-skill">
              How would you rate your current skill level in yoga?{" "}
              <span>*</span>
            </label>
            <select
              id="yoga-skill"
              required
              value={yogaSkill}
              onChange={(e) => setYogaSkill(e.target.value)}
            >
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>

          {/* <!-- Submit --> */}
          <div className="form-content">
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
          </div>
        </form>
      </section>
    </>
  );
};

export default Yoga;
