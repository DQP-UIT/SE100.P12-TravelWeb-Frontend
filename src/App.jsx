import { RouterProvider } from "react-router-dom";
import { router } from "./routes/Routes";
import { Provider } from "react-redux";
import { store, persistor } from "./model/store";
import { PersistGate } from "redux-persist/integration/react";

const App = () => {

  const currentScript = document.getElementById("tawk-script");
      if (currentScript) {
        document.body.removeChild(currentScript);
        console.log("DITTTTME")
      }
  return (
    <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
    <div>
      <RouterProvider router={router}/>
    </div>
    </PersistGate>
    </Provider>
  );
};

export default App;
