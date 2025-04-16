import { BrowserRouter as Router, Routes, Route } from "react-router";
import PublicRoutes from "./utils/PublicRoutes";
import PrivateRoutes from "./utils/PrivateRoutes";
import SignIn from "../pages/AuthPages/SignIn";
import { ScrollToTop } from "../components/common/ScrollToTop";
import AppLayout from "../layout/AppLayout";
import Home from "../pages/Dashboard/Home";
import UserManagement from "../pages/UserManagementPages/user";
import RoleManagement from "../pages/UserManagementPages/role";
import EditRole from "../pages/UserManagementPages/role/edit";
import EditUser from "../pages/UserManagementPages/user/edit";
import CreateRole from "../pages/UserManagementPages/role/create";
import CreateUser from "../pages/UserManagementPages/user/create";
import NotFound from "../pages/OtherPage/NotFound";
import CategoryManagement from "../pages/ArtikelManagementPages/category";
import CreateCategory from "../pages/ArtikelManagementPages/category/create";
import EditCategory from "../pages/ArtikelManagementPages/category/edit";
import ArticleManagement from "../pages/ArtikelManagementPages/article";
import CreateArticle from "../pages/ArtikelManagementPages/article/create";
import FormElements from "../pages/Forms/FormElements";
import EditArticle from "../pages/ArtikelManagementPages/article/edit";
import InfografisManagementIndex from "../pages/ArtikelManagementPages/infografis";
import InfografisEdit from "../pages/ArtikelManagementPages/infografis/edit";
import InfografisCreate from "../pages/ArtikelManagementPages/infografis/create";

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
