import CredentialPage from "../pages/CredentialPage"
import QrCodeScannerPage from "../pages/QrCodeScannerPage"
import IssuancePage from "../pages/IssuancePage"
import PresentationPage from "../pages/PresentationPage"
import { Route, Routes, BrowserRouter } from "react-router-dom"
import LoginPage from "../pages/LoginPage"


const MyRouter = () => {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LoginPage />}/>
                <Route path="/home" element={<CredentialPage />}/>
                <Route path="/scan" element={<QrCodeScannerPage />}/>
                <Route path="/issuance" element={<IssuancePage />}/>
                <Route path="/presentation" element={<PresentationPage />}/>
            </Routes>
        </BrowserRouter>

    )
}

export default MyRouter