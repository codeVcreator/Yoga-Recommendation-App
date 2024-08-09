import { Route, Routes, BrowserRouter as Router} from "react-router-dom"
import MainLayout from "./Layouts/MainLayout"
import Personal from "./Pages/Personal"
import Health from "./Pages/Health"
import Yoga from "./Pages/Yoga"
import Goals from "./Pages/Goals"
import Review from "./Pages/Review"
import Submit from "./Pages/Submit"
import ScrollToTop from "./ScrollToTop"


const App = () => {

  return (
    <Router>
      <ScrollToTop />   {/* To goto top of page when we route to another page */}
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Personal />} />
          <Route path="/health" element={<Health />} />
          <Route path="/yoga" element={<Yoga />} />
          <Route path="/goals" element={<Goals />} />
          <Route path="/review" element={<Review />} />
          <Route path="/submit" element={<Submit />} />
        </Route >
      </Routes>
    </Router>
  )
}

export default App