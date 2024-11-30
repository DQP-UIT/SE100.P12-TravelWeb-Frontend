import { RouterProvider } from "react-router-dom";
import { router } from "./routes/Routes";
import { Provider } from "react-redux";
import store from "./model/store";

const App = () => {
  return (
    <Provider store={store}>
    <div>
      <RouterProvider router={router}/>
    </div>
    </Provider>
  );
};

export default App;
