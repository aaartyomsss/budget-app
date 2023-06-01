import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { login } from './reducers/userReducer'
import 'antd/dist/antd.css'
import Homepage from './components/pages/Homepage'
import { Route, Switch, Redirect } from 'react-router-dom'
import Login from './components/pages/Login'
import SingUp from './components/pages/SignUp'
import NavBar from './components/shared/NavBar'
import Success from './components/pages/Success'
import { initialPersonalPlan } from './reducers/personalReducer'
import { initialFamilyPlans } from './reducers/familyPlanReducer'
import {
  setSentRequests,
  setReceivedRequests,
} from './reducers/invitationReducer'
import PersonalExpensesContainer from './components/pages/PersonalExpensesContainer'
import FamilyExpensesContainer from './components/pages/FamilyExpensesContainer'
import SpendingForm from './components/pages/SpendingForm'
import MyProfile from './components/pages/MyProfile'
import Overview from './components/pages/Overview'
import FamilyPlanHome from './components/pages/FamilyPlanHome/FamilyPlanHome'
import { Store } from './store'
import axios from 'axios'

axios.defaults.baseURL = import.meta.env.VITE_BACKEND_BASE_URL
const user = window.localStorage.getItem('loggedInUser')

axios.defaults.headers.common['Authorization'] = user
  ? `bearer ${JSON.parse(user).token}`
  : undefined

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector((state: Store) => state.user)

  useEffect(() => {
    // TODO ? Save only token and make request to server ?
    const fetch = async () => {
      const userJSON = window.localStorage.getItem('loggedInUser')
      const parsedUser = JSON.parse(userJSON!)
      dispatch(setSentRequests(parsedUser.id))
      dispatch(setReceivedRequests(parsedUser.id))
      dispatch(initialPersonalPlan())
      dispatch(initialFamilyPlans(parsedUser))
      dispatch(login(parsedUser))
    }
    fetch()
  }, []) // eslint-disable-line

  return (
    <div className="App">
      <NavBar user={user} />
      <Switch>
        <Route path="/personal-plan">
          <PersonalExpensesContainer />
        </Route>

        <Route path="/my-profile">
          <MyProfile user={user} />
        </Route>

        <Route path="/login">
          <Login />
        </Route>

        <Route path="/sign-up">
          <SingUp />
        </Route>

        <Route path="/activated">
          <Success button={true} />
        </Route>

        <Route path="/personal-overview">
          <Overview />
        </Route>

        <Route path="/successful-registration">
          <Success button={false} />
        </Route>

        <Route path="/family-plan/:id">
          <FamilyExpensesContainer />
        </Route>

        <Route path="/family-plans">
          <FamilyPlanHome />
        </Route>

        <Route path="/spending-form">
          <SpendingForm />
        </Route>

        <Route path="/">
          {user === null ? <Homepage /> : <Redirect to="/personal-plan" />}
        </Route>
      </Switch>
    </div>
  )
}

export default App
