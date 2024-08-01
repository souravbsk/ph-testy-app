import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../Pages/Home/Home";
import Recipes from "../Pages/Recipes/Recipes";
import PrivateRoute from "./PrivateRoute";
import RecipeDetails from "../Shared/RecipeDetails/RecipeDetails";
import AddRecipe from "../Pages/AddRecipe/AddRecipe";
import ParchesCoin from "../Pages/ParchesCoin/ParchesCoin";
import MyRecipe from "../Pages/MyRecipe/MyRecipe";
import NotFoundPage from "../Shared/NotFoundPage/NotFoundPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        index: true,
        element: <Home></Home>,
      },
      {
        path: "/recipes",
        element: <Recipes></Recipes>,
      },
      {
        path: "/recipe/:id",
        element: (
          <PrivateRoute>
            <RecipeDetails></RecipeDetails>
          </PrivateRoute>
        ),
      },
      {
        path: "/add-recipe",
        element: (
          <PrivateRoute>
            <AddRecipe></AddRecipe>
          </PrivateRoute>
        ),
      },
      {
        path: "/parches-coin",
        element: (
          <PrivateRoute>
            <ParchesCoin></ParchesCoin>
          </PrivateRoute>
        ),
      },
      {
        path: "/my-recipes",
        element: (
          <PrivateRoute>
            {" "}
            <MyRecipe></MyRecipe>
          </PrivateRoute>
        ),
      },
      {
        path: "*",
        element: <NotFoundPage></NotFoundPage>,
      }
    ],
  },
]);

export default router;
