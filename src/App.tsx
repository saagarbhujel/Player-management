import {Route, Routes} from "react-router-dom";
import AuthLayout from "./_auth/AuthLayout.tsx";
import SignInForm from "./_auth/forms/SignInForm.tsx";
import SignUpForm from "./_auth/forms/SignUpForm.tsx";


function App() {


  return (
   <main className={'flex h-screen'}>
       <Routes>
           {/*Public Routes*/}
           <Route element={<AuthLayout/>}>
               <Route path={'sign-in'} element={<SignInForm/>} />
               <Route path={'sign-up'} element={<SignUpForm/>} />
           </Route>

              {/*Private Routes*/}


       </Routes>

   </main>
  )
}

export default App
