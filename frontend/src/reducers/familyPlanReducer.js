import familyPlanService from '../services/familyPlanService';
import { dateFormatter, capitalizeString } from '../functions/helperFunctions';

const familyPlanReducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT':
      let familyPlans = action.user.familyPlans;
      familyPlans.forEach((plan) => {
        if (plan.lenght) {
          plan.forEach((exp) => {
            exp.date = dateFormatter(exp.date);
            exp.type = capitalizeString(exp.type);
          });
        }
      });
      return familyPlans;
    case 'CREATE_PLAN':
      console.log(action.data);
      return state.concat(action.data);
    // case 'CLEAR':
    //   return action.data;
    // case 'ADD':
    //   return state.concat(action.data);
    // case 'REMOVE':
    //   const newState = state.filter((obj) => obj.id !== action.data);
    //   return newState;
    // case 'MODIFIED':
    //   const modifiedArr = state.map((obj) =>
    //     obj.id === action.data.id ? action.data : obj
    //   );
    //   return modifiedArr;
    default:
      return state;
  }
};

export const initialFamilyPlans = (user) => {
  return {
    type: 'INIT',
    user,
  };
};

export const createFamilyPlan = (planName, userId) => {
  return async (dispatch) => {
    const { data } = await familyPlanService.createPlan(planName, userId);
    dispatch({
      type: 'CREATE_PLAN',
      data,
    });
  };
};

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

export default familyPlanReducer;
