import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Submit = () => {
  const [formData, setFormData] = useState([]);
  const [time, setTime] = useState("");
  const [type, setType] = useState("");
  const [level, setLevel] = useState("");
  const navigate = useNavigate();


  // Restarting the form and resetting the local storage
  const handleRestart = () => {
    // Clear local storage
    localStorage.clear();
    // Navigate back to the starting page
    navigate("/");
  };

  
   // Fetching and saving data in an object
   useEffect(() => {
    const data = JSON.parse(localStorage.getItem("formData")) || [];

    // Transform the data into an object where keys are the ids
    const transformedData = {};
    data.forEach((item) => {
      transformedData[item.id] = item;
    });

    setFormData(transformedData);
  }, []);


  // Applying all conditions and manipulating data
  useEffect(() => {

    // GetValue function to get the input
    const getValue = (data, sectionId, key) => {
        const section = data[sectionId];
        return section ? section[key] : null;
    };

    // Set conditions
    const age = getValue(formData, "personal", "age");
    const injury = getValue(formData, "health", "injury");
    // const medication = getValue(formData, "health", "medication");
    const activityLevel = getValue(formData, "health", "activity");
    const fitnessLevel = getValue(formData, "health", "fitness");
    const yogaPractice = getValue(formData, "yoga", "yogaPractice");
    const yogaSkill = getValue(formData, "yoga", "yogaSkill");
    const ashtanga = getValue(formData, "yoga", "ashtanga");
    const timeCommitment = getValue(formData, "goals", "time");
    const flexibility = getValue(formData, "goals", "flexibility");
    const strength = getValue(formData, "goals", "strength");
    const stress = getValue(formData, "goals", "stress");
    const balance = getValue(formData, "goals", "balance");
    const spiritual = getValue(formData, "goals", "spiritual");
    const weightLoss = getValue(formData, "goals", "weightLoss");
    const rehabilitation = getValue(formData, "goals", "rehabilitation");

    // Time set to their choice
    setTime(timeCommitment);

    // Early return to avoid checking other conditions
    // If injury then only Iyengar
    if (injury === "Yes" || rehabilitation === true) {
      setLevel("Basic");
      setType("Iyengar");
      return;
    }
    // If Children then only Basic Hatha
    if (age < 12) {
      setLevel("Basic");
      setType("Hatha");
      return;
    }

    // Teenagers + Adults
    if (age >= 12 && age <= 40) {
      setLevel("Basic");
      setType("Hatha or Vinayasa or Yin");

      // Set Level
      if (
        activityLevel === "moderately-active" &&
        fitnessLevel === "intermediate" &&
        yogaSkill === "intermediate"
      ) {
        setLevel("Intermediate");
      }
      if (
        activityLevel === "very-active" &&
        fitnessLevel === "advanced" &&
        yogaSkill === "advanced" &&
        (yogaPractice === "less-than-a-year" ||
          yogaPractice === "more-than-a-year")
      ) {
        setLevel("Advanced");
      }

      // Set Type
      // if weight-loss is one of the goals then only ashtanga.
      if (weightLoss) {
        setType("Ashtanga");
        setLevel("Basic");
        if (
          activityLevel === "very-active" &&
          fitnessLevel === "advanced" &&
          yogaSkill === "advanced" &&
          (yogaPractice === "less-than-a-year" ||
            yogaPractice === "more-than-a-year")
        ) {
          setLevel("Intermediate");
          if (ashtanga) {
            setLevel("Advanced");
          }
        }
        return;
      }

      // else based on other goals
      // goals: flexibility or strength or balance only
      if ((flexibility || strength || balance) && (!stress && !spiritual)) {
        setType("Hatha");
        return;
      }
      // goals: only stress
      if (stress && !flexibility && !strength && !balance && !spiritual) {
        setType("Vinayasa");
        return;
      }
      // goals: only spiritual
      if (spiritual && !stress && !flexibility && !strength && !balance) {
        setType("Vinayasa or Yin");
        return;
      }
      // goals: stress + (flexibility or strength or balance) + no spiritual
      if (stress && !spiritual && (flexibility || strength || balance)) {
        setType("Hatha or Vinayasa");
        return;
      }
      // goals: stress + spiritual only
      if (stress && spiritual && (!flexibility || !strength || !balance)) {
        setType("Vinayasa or Yin");
        return;
      }
      // else all other combinations: default set at starting.
    }

    // Seniors
    if (age > 40) {
        setLevel("Basic");
        setType("Hatha or Vinayasa or Yin");
  
        // Set Level
        if (
          activityLevel === "moderately-active" &&
          fitnessLevel === "intermediate" &&
          yogaSkill === "intermediate"
        ) {
          setLevel("Basic");
        }
        if (
          activityLevel === "very-active" &&
          fitnessLevel === "advanced" &&
          yogaSkill === "advanced" &&
          (yogaPractice === "less-than-a-year" ||
            yogaPractice === "more-than-a-year")
        ) {
          setLevel("Intermediate");
        }
  
        // Set Type
        // if weight-loss is one of the goals then only ashtanga.
        if (weightLoss) {
          setType("Ashtanga");
          setLevel("Basic");
          if (
            activityLevel === "very-active" &&
            fitnessLevel === "advanced" &&
            yogaSkill === "advanced" &&
            (yogaPractice === "less-than-a-year" ||
              yogaPractice === "more-than-a-year")
          ) {
            setLevel("Basic");
            if (ashtanga) {
              setLevel("Intermediate");
            }
          }
          return;
        }
  
        // else based on other goals
        // goals: flexibility or strength or balance only
        if ((flexibility || strength || balance) && (!stress && !spiritual)) {
          setType("Hatha");
          return;
        }
        // goals: only stress
        if (stress && !flexibility && !strength && !balance && !spiritual) {
          setType("Vinayasa");
          return;
        }
        // goals: only spiritual
        if (spiritual && !stress && !flexibility && !strength && !balance) {
          setType("Vinayasa or Yin");
          return;
        }
        // goals: stress + (flexibility or strength or balance) + no spiritual
        if (stress && !spiritual && (flexibility || strength || balance)) {
          setType("Hatha or Vinayasa");
          return;
        }
        // goals: stress + spiritual only
        if (stress && spiritual && (!flexibility || !strength || !balance)) {
          setType("Vinayasa or Yin");
          return;
        }
        // else all other combinations: default set at starting.
      }

    // // Seniors
    // if (age > 40) {
    //   setLevel("Basic");
    //   setType("Hatha or Iyengar or Yin");
    //   return;
    // }

  }, [formData]);


  return (
    <>
      <header id="header">
        <h1>Thank You for choosing, <span>Shvasa!</span></h1>
      </header>

      <section id="section">
        <div className="form-section submit">
          <h1>
            Based on given information, the best Yoga Practice for you will be..
          </h1>
          <div className="form-content">
            <h2 style={{ display: "block" }}>Level: </h2>
            <strong>{level}</strong>
          </div>
          <div className="form-content">
            <h2 style={{ display: "block" }}>Type: </h2>
            <strong>{type}</strong>
          </div>
          <div className="form-content">
            <h2 style={{ display: "block" }}>Time duration: </h2>
            <strong>{time}</strong>
          </div>

          {/* <!-- Submit --> */}
          <div className="form-content">
            <div className="buttons">
              <button className="next" type="button" onClick={handleRestart}>
                ReEvaluate
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Submit;