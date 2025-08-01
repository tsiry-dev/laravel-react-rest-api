import { RouterProvider } from "react-router-dom";
import router from "./routes/router";
import { ContextProvider } from "./contexts/ContextProvider";

export default function App() {
  return <ContextProvider>
      <RouterProvider router={router} />
  </ContextProvider>

}
