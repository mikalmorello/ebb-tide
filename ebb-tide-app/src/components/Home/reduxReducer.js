const initialState = {
  initialStation: ""
}

// initial station 8447505

export default (prevState = initialState, { type, payload }) => {
  let { 
    initialStation 
      } = prevState;
  switch (type) {
    case "setStation":
      return { ...prevState, station: payload }
    case "setStationInput":
      return { ...prevState, stationInput: payload }
    default:
      return { ...prevState }
  }
}
