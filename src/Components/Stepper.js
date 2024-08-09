import React from 'react';
import '../index.css';

const Stepper = ({ steps, currentStep }) => {
  return (
    <div className="stepper-container">
      {steps.map((step, index) => (
        <div key={index} className="step">
          <div className={`circle ${index <= currentStep ? 'active' : ''}`}>{index + 1}</div>
          {index < steps.length - 1 && <div className={`line ${index < currentStep ? 'active' : ''}`}></div>}
        </div>
      ))}
    </div>
  );
};

export default Stepper;






// import { useLocation } from "react-router-dom";

// const Stepper = () => {
//   const location = useLocation();
//   const steps = [
//     { path: "/", label: "1" },
//     { path: "/health", label: "2" },
//     { path: "/yoga", label: "3" },
//     { path: "/goals", label: "4" },
//     { path: "/review", label: "5" }
//   ];

//   return (
//     <div className="stepper">
//       {steps.map((step, index) => (
//         <div
//           key={index}
//           className={`step ${location.pathname === step.path ? "active" : ""}`}
//         >
//           {step.label}
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Stepper;
