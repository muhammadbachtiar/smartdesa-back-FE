import { AuthProvider } from "./context/AuthContext";
import { UserProvider } from "./context/UserContext";
import SignIn from "./pages/AuthPages/SignIn";
import SignUp from "./pages/AuthPages/SignUp";
import NotFound from "./pages/OtherPage/NotFound";
import UserProfiles from "./pages/UserProfiles";
import Videos from "./pages/UiElements/Videos";
import Images from "./pages/UiElements/Images";
import Alerts from "./pages/UiElements/Alerts";
import Badges from "./pages/UiElements/Badges";
import Avatars from "./pages/UiElements/Avatars";
import Buttons from "./pages/UiElements/Buttons";
import LineChart from "./pages/Charts/LineChart";
import BarChart from "./pages/Charts/BarChart";
import Calendar from "./pages/Calendar";
import BasicTables from "./pages/Tables/BasicTables";
import FormElements from "./pages/Forms/FormElements";
import Blank from "./pages/Blank";
import AppLayout from "./layout/AppLayout";
import Home from "./pages/Dashboard/Home";
import Routers from "./services/routes";
import LoadingComponent from "./components/loadingComponent";
import { useSelector } from "react-redux";
import { StateContext } from "./types/app.type";
import '../src/services/styles/style.css'

export default function App() {
  const isLoading = useSelector((state : StateContext) => state.app.isLoading)
  return (
    <>
    <AuthProvider>
      <UserProvider>
        <LoadingComponent loading={isLoading}/>
        <Routers/>
        {/* <Router>
          <ScrollToTop />
          <Routes>
            <Route element={<AppLayout />}>
              <Route index path="/" element={<Home />} />
              <Route index path="/dashboard" element={<Home />} />

              <Route path="/profile" element={<UserProfiles />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/blank" element={<Blank />} />

              <Route path="/form-elements" element={<FormElements />} />
              <Route path="/basic-tables" element={<BasicTables />} />
              <Route path="/alerts" element={<Alerts />} />
              <Route path="/avatars" element={<Avatars />} />
              <Route path="/badge" element={<Badges />} />
              <Route path="/buttons" element={<Buttons />} />
              <Route path="/images" element={<Images />} />
              <Route path="/videos" element={<Videos />} />
              <Route path="/line-chart" element={<LineChart />} />
              <Route path="/bar-chart" element={<BarChart />} />
            </Route>
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router> */}
      </UserProvider>
    </AuthProvider>
    </>
  );
}
