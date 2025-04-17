import { BrowserRouter as Router, Routes, Route } from "react-router";
import PublicRoutes from "./utils/PublicRoutes";
import PrivateRoutes from "./utils/PrivateRoutes";
import SignIn from "../pages/AuthPages/SignIn";
import { ScrollToTop } from "../components/common/ScrollToTop";
import AppLayout from "../layout/AppLayout";
import Home from "../pages/Dashboard/Home";
import UserManagement from "../pages/UserManagementPages/UserManagements";
import RoleManagement from "../pages/UserManagementPages/RoleManagements";
import EditRole from "../pages/UserManagementPages/RoleEdit";
import EditUser from "../pages/UserManagementPages/UserEdit";
import CreateRole from "../pages/UserManagementPages/RoleCreate";
import CreateUser from "../pages/UserManagementPages/UserCreate";
import NotFound from "../pages/OtherPage/NotFound";
import CategoryManagement from "../pages/ArtikelManagementPages/CategoryManagements";
import CreateCategory from "../pages/ArtikelManagementPages/CategoryCreate";
import EditCategory from "../pages/ArtikelManagementPages/CategoryEdit";
import ArticleManagement from "../pages/ArtikelManagementPages/ArticleManagements";
import CreateArticle from "../pages/ArtikelManagementPages/ArticleCreate";
import FormElements from "../pages/Forms/FormElements";
import EditArticle from "../pages/ArtikelManagementPages/ArticleEdit";
import TourPageIndex from "../pages/ArtikelManagementPages/Tour";
import TourPageCreate from "../pages/ArtikelManagementPages/Tour/Create";
import InfografisManagementIndex from "../pages/ArtikelManagementPages/infografis";
import InfografisEdit from "../pages/ArtikelManagementPages/infografis/edit";
import InfografisCreate from "../pages/ArtikelManagementPages/infografis/create";
import TourPageUpdate from "../pages/ArtikelManagementPages/Tour/Update";

const Routers = () => {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route element={<PublicRoutes />}>
          <Route path="/" element={<SignIn />} />
        </Route>
        <Route element={<PrivateRoutes />}> 
          <Route element={<AppLayout />}>
            <Route path="/dashboard" element={<Home />} />
            <Route path="/role-management" element={<RoleManagement />} />
            <Route path="/role-management/:id" element={<EditRole />} />
            <Route path="/role-management/create" element={<CreateRole />} />
            <Route path="/user-management" element={<UserManagement />} />
            <Route path="/user-management/create" element={<CreateUser />} />
            <Route path="/user-management/:id" element={<EditUser />} />
            <Route path="/category-management" element={<CategoryManagement />} />
            <Route path="/category-management/create" element={<CreateCategory />} />
            <Route path="/category-management/:id" element={<EditCategory />} />
            <Route path="/article-management" element={<ArticleManagement />} />
            <Route path="/article-management/create" element={<CreateArticle />} />
            <Route path="/article-management/:id" element={<EditArticle />} />
            <Route path="/form-elements" element={<FormElements />} />
            <Route path="/tour" element={<TourPageIndex />} />
            <Route path="/tour/create" element={<TourPageCreate />} />
            <Route path="/tour/edit/:id" element={<TourPageUpdate />} />
            {/* Info Grafis */}
            <Route path="/infografis-management" element={< InfografisManagementIndex />}/>
            <Route path="/infografis-management/:id" element={<InfografisEdit />} />
            <Route path="/infografis-management/create" element={<InfografisCreate />} />
          </Route>
        </Route>
        <Route path="*" element={<NotFound />} />

        {/* <Route path="*" element={<NotFound/>} />
        <Route path="/not-found" element={<NotFound/>} />
        <Route path="/split-bill/detail/shared/:id" element={<SplitBillDetailShared/>} /> */}
      </Routes>
    </Router>
  );
};

export default Routers;
