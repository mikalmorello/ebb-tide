/* Redux Reducer */

// Initial State
const initialState = {
  station: '',
  tideDate: '',
}

// Reducer
export default (prevState = initialState, { type, payload }) => {
  let { 
    station, 
    tideDate 
  } = prevState;
  switch (type) {
    case "setStation":
      return { ...prevState, station: payload }
    case "setTideDate":
      return { ...prevState, tideDate: payload }
    default:
      return { ...prevState }
  }
}

