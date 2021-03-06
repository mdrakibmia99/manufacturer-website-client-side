import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RequireAuth from './components/RequireAuth';
import Blogs from './routes/Blogs/Blogs';
import AddProduct from './routes/Dashboard/Admin/AddProduct';
import MakeAdmin from './routes/Dashboard/Admin/MakeAdmin';
import ManageOrders from './routes/Dashboard/Admin/ManageOrders';
import ManageProducts from './routes/Dashboard/Admin/ManageProducts';
import Dashboard from './routes/Dashboard/Dashboard';
import DashboardIndex from './routes/Dashboard/DashboardIndex';
import AddingReview from './routes/Dashboard/User/AddingReview';
import MyOrders from './routes/Dashboard/User/MyOrders';
import MyProfile from './routes/Dashboard/User/MyProfile';
import Payment from './routes/Dashboard/User/Payment';
import AllReviews from './routes/Home/AllReviews';
import Home from './routes/Home/Home';
import Login from './routes/Login/Login';
import Register from './routes/Login/Register';
import Reset from './routes/Login/Reset';
import PageNotFound from './routes/PageNotFound/PageNotFound';
import AboutMe from './routes/Portfolio/AboutMe';
import Education from './routes/Portfolio/Education';
import Portfolio from './routes/Portfolio/Portfolio';
import PortfolioHome from './routes/Portfolio/PortfolioHome';
import Project from './routes/Portfolio/Project';
import Technology from './routes/Portfolio/Technology';
import Footer from './shared/Footer/Footer';
import Navbar from './shared/Navbar';
import Purchase from './shared/Purchase';


function App() {
  return (
    <div>
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/home" element={<Home></Home>}></Route>
        <Route path='/login' element={<Login></Login>}></Route>
        <Route path='/register' element={<Register></Register>}></Route>
        <Route path='/reset' element={<Reset></Reset>}></Route>
        <Route path='/purchase/:id' element={
          <RequireAuth>
            <Purchase></Purchase>
          </RequireAuth>
        }></Route>
        <Route path='blogs' element={<Blogs></Blogs>}></Route>
        <Route path={"/home/reviews"} element={<AllReviews></AllReviews>}></Route>

        <Route
          path='/dashboard'
          element={<RequireAuth>
            <Dashboard />
          </RequireAuth>
          }>
          {/* user segment */}
          <Route index element={<DashboardIndex></DashboardIndex>}></Route>
          <Route path="myOrder" element={<MyOrders />} />
          <Route path='addingReview' element={<AddingReview />} />

          {/* admin segment */}
          <Route path='addProduct' element={<AddProduct />} />
          <Route path='makeAdmin' element={<MakeAdmin></MakeAdmin>}></Route>
          <Route path='manageOrders' element={<ManageOrders />} />
          <Route path='manageProduct' element={<ManageProducts />} />
          <Route path='payment/:id' element={<Payment />} />
          <Route path='profile' element={<MyProfile></MyProfile>} />
        </Route>


            <Route path='/portfolio' element={<Portfolio />}>
            <Route index element={<PortfolioHome/>}></Route>
              <Route path='aboutMe' element={<AboutMe/>}></Route>
              <Route path='education' element={<Education/>}></Route>
              <Route path='project' element={<Project/>}></Route>
              <Route path='technology' element={<Technology/>}></Route>
            </Route>



        <Route path='*' element={<PageNotFound></PageNotFound>}></Route>

      </Routes>
      <ToastContainer />
      <Footer></Footer>
    </div>
  );
}

export default App;
