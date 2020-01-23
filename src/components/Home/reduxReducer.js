/* Redux Reducer */

// Reducer
export default (prevState, { type, payload }) => {
  switch (type) {
    case "setHomeStation":
      return { ...prevState, station: payload }
    case "setStationInput":
      return { ...prevState, stationInput: payload }
    default:
      return { ...prevState }
  }
}
