import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Stepper from "../Components/Stepper";

const steps = ["Personal", "Health", "Yoga", "Goals", "Review"];

const Goals = () => {
  const [currentStep, setCurrentStep] = useState(3);
  const [time, setTime] = useState("less-than-20-mins");
  const [moreInfo, setMoreInfo] = useState("");
  const [consent, setConsent] = useState("Yes");
  const [followUp, setFollowUp] = useState(true);
  const [flexibility, setFlexibility] = useState(false);
  const [strength, setStrength] = useState(false);
  const [stress, setStress] = useState(false);
  const [balance, setBalance] = useState(false);
  const [spiritual, setSpiritual] = useState(false);
  const [weightLoss, setWeightLoss] = useState(false);
  const [rehabilitation, setRehabilitation] = useState(false);
  const navigate = useNavigate();


  // To show inputs as data stored in local storage
  useEffect(() => {
    const storedData = localStorage.getItem("formData");
    const formData = storedData ? JSON.parse(storedData) : [];
    const goalsData = formData.find((section) => section.id === "goals");
    if (goalsData) {
      setTime(goalsData.time);
      setMoreInfo(goalsData.moreInfo);
      setConsent(goalsData.consent);
      setFollowUp(goalsData.followUp);
      setFlexibility(goalsData.flexibility);
      setStrength(goalsData.strength);
      setStress(goalsData.stress);
      setWeightLoss(goalsData.weightLoss);
      setBalance(goalsData.balance);
      setSpiritual(goalsData.spiritual);
      setRehabilitation(goalsData.rehabilitation);
    }
}, []);


  // Going previous
  const GotoPrevious = (e) => {
    e.preventDefault();

    navigate("/yoga");
  };


  // Submitting form
  const submitForm = (e) => {
    e.preventDefault();

    if (
      !flexibility &&
      !strength &&
      !stress &&
      !balance &&
      !spiritual &&
      !weightLoss &&
      !rehabilitation
    ) {
      alert("Please select at least one goal.");
      return;
    }

    const formData = {
      id: "goals",
      time,
      moreInfo,
      consent,
      followUp,
      flexibility,
      strength,
      stress,
      balance,
      spiritual,
      weightLoss,
      rehabilitation,
    };

    
    // Update or Post data in local storage
    const storedData = localStorage.getItem("formData");
    const data = storedData ? JSON.parse(storedData) : [];

    const updatedData = data.map((section) =>
      section.id === "goals" ? { ...section, ...formData } : section
    );

    if (!updatedData.some((section) => section.id === "goals")) {
      updatedData.push(formData);
    }

    localStorage.setItem("formData", JSON.stringify(updatedData));

    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
    navigate("/review");
  };


  return (
    <>
      <header id="header">
        <h1>Yoga Recommendation Form</h1>
      </header>

      <section id="section">
        <Stepper currentStep={currentStep} steps={steps} />
        <form className="form-section" onSubmit={submitForm}>
          <h1>Goals and Preferences</h1>
          {/* <!-- Goals and Preferences --> */}
          <div className="form-content">
            <label htmlFor="goals">
              What are your primary goals for practicing yoga? (Select all that
              apply) <span>*</span>
            </label>
            <div className="checkbox">
              <input
                type="checkbox"
                id="flexibility"
                checked={flexibility}
                onChange={() => setFlexibility(!flexibility)}
              />
              <label htmlFor="flexibility">Increase flexibility</label>
            </div>
            <div className="checkbox">
              <input
                type="checkbox"
                id="strength"
                checked={strength}
                onChange={() => setStrength(!strength)}
              />
              <label htmlFor="strength">Build strength</label>
            </div>
            <div className="checkbox">
              <input
                type="checkbox"
                id="stress"
                checked={stress}
                onChange={() => setStress(!stress)}
              />
              <label htmlFor="stress">Reduce stress</label>
            </div>
            <div className="checkbox">
              <input
                type="checkbox"
                id="balance"
                checked={balance}
                onChange={() => setBalance(!balance)}
              />
              <label htmlFor="balance">Improve Balance</label>
            </div>
            <div className="checkbox">
              <input
                type="checkbox"
                id="spiritual"
                checked={spiritual}
                onChange={() => setSpiritual(!spiritual)}
              />
              <label htmlFor="spiritual">Spiritual growth</label>
            </div>
            <div className="checkbox">
              <input
                type="checkbox"
                id="weight-loss"
                checked={weightLoss}
                onChange={() => setWeightLoss(!weightLoss)}
              />
              <label htmlFor="weight-loss">Weight loss</label>
            </div>
            <div className="checkbox">
              <input
                type="checkbox"
                id="rehab-from-injury"
                checked={rehabilitation}
                onChange={() => setRehabilitation(!rehabilitation)}
              />
              <label htmlFor="rehab-from-injury">
                Rehabilitation from injury
              </label>
            </div>
          </div>
          <div className="form-content">
            <label htmlFor="time-preference">
              Do you have any time commitment for practicing yoga?{" "}
              <span>*</span>
            </label>
            <select
              id="time-preference"
              required
              value={time}
              onChange={(e) => setTime(e.target.value)}
            >
              <option value="less-than-20-mins">less than 20 minutes</option>
              <option value="20-40-mins">20-40 minutes</option>
              <option value="more-than-40-mins">more than 40 minutes</option>
            </select>
          </div>
          {/* <!-- Additional Information --> */}
          <div className="form-content">
            <label htmlFor="other-info">
              Is there anything else we should know to help recommend the best
              yoga practice for you?
            </label>
            <textarea
              name="other-info"
              id="other-info"
              placeholder="If yes, please specify"
              value={moreInfo}
              onChange={(e) => setMoreInfo(e.target.value)}
            ></textarea>
          </div>
          <div className="form-content">
            <label htmlFor="consent">
              Do you consent to sharing this information with certified yoga
              instructors for personalized advice? <span>*</span>
            </label>
            <select
              id="consent"
              required
              value={consent}
              onChange={(e) => setConsent(e.target.value)}
            >
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>
          <div className="form-content">
            <div className="checkbox follow-up">
              <input
                type="checkbox"
                id="follow-up"
                required
                checked={followUp}
                onChange={() => setFollowUp(!followUp)}
              />
              <label htmlFor="follow-up">
                Would you like to receive follow-up emails with personalized
                yoga recommendations and tips? <span>*</span>
              </label>
            </div>
          </div>

          {/* <!-- Submit --> */}
          <div className="form-content">
            <div className="form-content">
              <div className="buttons">
                <button className="previous" onClick={GotoPrevious}>
                  Previous
                </button>
                <button className="next" type="submit">
                  Submit
                </button>
              </div>
            </div>
          </div>
        </form>
      </section>
    </>
  );
};

export default Goals;
