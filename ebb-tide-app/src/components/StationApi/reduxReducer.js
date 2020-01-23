/* Redux Reducer */

// Reducer
export default (prevState, { type, payload }) => {
  switch (type) {
    case "setStationData":
      return { ...prevState, stationData: payload }
    default:
      return { ...prevState }
  }
}

