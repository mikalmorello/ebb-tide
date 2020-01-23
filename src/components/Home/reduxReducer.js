/* Redux Reducer */

// Initial State
const initialState = {
  error: false,
}

// Reducer
export default (prevState = initialState, { type, payload }) => {
	let { 
    error
  } = prevState;
  switch (type) {
    case "setHomeStation":
      return { ...prevState, station: payload }
    case "setStationInput":
      return { ...prevState, stationInput: payload }
    case "error":
      return { ...prevState, error: payload }
    default:
      return { ...prevState }
  }
}
