const initialState = {
  eq: {}
};

export const home = (state = initialState, action: any) => {
  switch (action.type) {
    case "SET_EQ":
      return { ...state, eq: action.eq };
    default:
      return state;
  }
};