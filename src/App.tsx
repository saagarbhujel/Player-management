import { Route, Routes } from "react-router-dom";
import AuthLayout from "./_auth/AuthLayout.tsx";
import SignInForm from "./_auth/forms/SignInForm.tsx";
import SignUpForm from "./_auth/forms/SignUpForm.tsx";

import RequireAuth from "./components/RequireAuth.tsx";
import PersistLogin from "./components/PersistLogin.tsx";
import { Chats, Games, Home, Profile, UpdateProfile } from "./_root/pages";
import RootLayout from "./_root/RootLayout.tsx";
import Missing from "./components/Missing.tsx";
import AdminSignInForm from "./_auth/forms/AdminSignInForm.tsx";

function App() {
  return (
    <main className={"flex h-screen"}>
      <Routes>
        <Route element={<PersistLogin />}>
          {/*Public Routes*/}
          <Route element={<AuthLayout />}>
            <Route path={"sign-in"} element={<SignInForm />} />
            <Route path={"sign-up"} element={<SignUpForm />} />
            <Route path={'admin'}  element={<AdminSignInForm/>} />
          </Route>

          {/*Private Routes*/}
          <Route element={<RootLayout />}>
            <Route
              element={<RequireAuth roles={["admin", "staff", "player"]} />}
            >
              <Route index element={<Home />} />
              <Route path="/profile/:userId/*" element={<Profile />} />
            </Route>

            <Route element={<RequireAuth roles={["player"]} />}>
              <Route path="/chats" element={<Chats />} />
              <Route path="/games" element={<Games />} />
              <Route
                path="/update-profile/:userId"
                element={<UpdateProfile />}
              />
            </Route>

          </Route>
            {/* Catch for all */}
            <Route path="*" element={<Missing/>} />
        </Route>
      </Routes>
    </main>
  );
}

export default App;
