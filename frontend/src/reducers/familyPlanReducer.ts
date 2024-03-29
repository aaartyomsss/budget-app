import { capitalizeString, dateFormatter } from '../functions/helperFunctions'
import familyPlanService from '../services/familyPlanService'
import { FamilyPlan } from '../types/expense'

const familyPlanReducer = (state: FamilyPlan[] = [], action) => {
  switch (action.type) {
    case INIT: {
      const _familyPlans = action.plans || state
      const familyPlans = _familyPlans.map((plan) => {
        if (plan.lenght) {
          plan.forEach((exp) => {
            exp.date = dateFormatter(exp.date)
            exp.type = capitalizeString(exp.type)
          })
        }
        return plan
      })
      return familyPlans
    }
    case ADD_PLAN:
      return state.concat(action.data)
    // case 'CLEAR':
    //   return action.data;
    // case 'REMOVE':
    //   const newState = state.filter((obj) => obj.id !== action.data);
    //   return newState;
    // case 'MODIFIED':
    //   const modifiedArr = state.map((obj) =>
    //     obj.id === action.data.id ? action.data : obj
    //   );
    //   return modifiedArr;
    default:
      return state
  }
}

export const initialFamilyPlans = (plans: FamilyPlan[]) => {
  return {
    type: INIT,
    plans,
  }
}

export const createFamilyPlan = (planName, userId) => {
  return async (dispatch) => {
    const { data } = await familyPlanService.createPlan(planName, userId)
    dispatch({
      type: ADD_PLAN,
      data,
    })
  }
}

export const addAcceptedPlan = (plan) => {
  return {
    type: ADD_PLAN,
    data: plan,
  }
}

const INIT = 'INIT_FAMILY'
const ADD_PLAN = 'ADD_PLAN'

// export const logoutClear = () => {
//   return {
//     type: 'CLEAR',
//     data: [],
//   };
// };

// export const addExpense = (values) => {
//   return async (dispatch) => {
//     const expense = await personalService.addExpense(values);
//     dispatch({
//       type: 'ADD',
//       data: expense,
//     });
//   };
// };

// export const removeExpense = (id) => {
//   return async (dispatch) => {
//     const removed = await personalService.removeExpense(id); // eslint-disable-line
//     dispatch({
//       type: 'REMOVE',
//       data: id,
//     });
//   };
// };

// export const modifyExpense = (id, newExpense) => {
//   return async (dispatch) => {
//     const modified = await personalService.modifyExpense(id, newExpense);
//     dispatch({
//       type: 'MODIFIED',
//       data: modified,
//     });
//   };
// };

export default familyPlanReducer
