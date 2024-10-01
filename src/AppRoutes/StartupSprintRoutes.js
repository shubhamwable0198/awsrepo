import React from 'react'
import { Route, Routes } from 'react-router-dom'
import HomePage from '../components/HomePage'
import { AdminDashboard, AdminHomePage } from '../components/adminComponents'
import { AccountDashBoard } from '../components/ahComponents'
import { CustomerDashBoard, CustomerHomePage } from '../components/customerComponents'
import Enquiryform from '../Enquiry/Enquiryform'
import EnquiryStatus from '../Enquiry/EnquiryStatus'
import ApplicationForm from '../components/LoanApplication/ApplicationForm'
import LoginForm from '../components/LoanApplication/LoginForm'
import EditApplication from '../components/LoanApplication/EditApplication'
import ApplicationStatusForm from '../components/LoanApplication/ApplicationStatusForm'
import BankForm from '../components/Bank/BankForm'
import FamilyForm from '../components/family/FamilyForm'
import ThankYou from '../components/LoanApplication/ThankYou'
import UserBankInfo from '../components/customerDetails/UserBankInfo'
import UserFamilyInfo from '../components/customerDetails/UserFamilyInfo'


function StartupSprintRoutes() {
  return (
    <Routes>
        <Route path = '/' element={<HomePage/>}></Route>
        <Route path= '/admin' element={<AdminDashboard/>}>
                <Route path='' element={<AdminHomePage/>}/>
        </Route>
       
        <Route path= '/account' element={<AccountDashBoard/>}></Route>
        <Route path= '/customer' element={<CustomerDashBoard/>}></Route>
        <Route path='/clogin' element={<CustomerHomePage/>}></Route>
        <Route path='/create_enquiry' element={<Enquiryform />}></Route>
        <Route path='/show_enquiry' element={<EnquiryStatus/>}></Route>
        <Route path='/login' element={<LoginForm/>}></Route>
        <Route path='/application' element={<ApplicationForm/>}></Route>
        <Route path='/thankyou/' element={<ThankYou/>}></Route>
        <Route path='/application/status' element={<ApplicationStatusForm/>}></Route>
        <Route path='/bank' element={<BankForm/>}></Route>
        <Route path='/family' element={<FamilyForm/>}></Route>
        <Route path='/bankdetails' element={<UserBankInfo/>}></Route>
        <Route path='/familydetails' element={<UserFamilyInfo/>}></Route>
        
        <Route path='/edit/:ApplicationID/' element={<EditApplication/>}></Route>
       
    </Routes>
  )
}

export default StartupSprintRoutes