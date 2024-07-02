import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Posts from "./pages/Posts";
import Root from "./pages/Root";
import Form1 from "./components/Form1";
import Form2 from "./components/Form2";
import Form3 from "./components/Form3";
import Form from "./pages/Form";
import { Provider } from "react-redux";
import store from './Redux/store'


const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/posts", element: <Posts /> },
      {path:"/form",element:<Form/>},
      {path:"/form1",element:<Form1/>},
      {path:"/form2",element:<Form2/>},
      {path:"/form3",element:<Form3/>}

    ],
  },
]);

const Router = () =>
  (
    <Provider store={store}>
    <RouterProvider router={router} />;
    </Provider>
  ) 

export default Router;
