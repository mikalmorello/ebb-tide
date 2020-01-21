const initialState = {
  initialStation: '',
  stationInput: '',
  station: '',
}

// initial station 8447505

export default (prevState = initialState, { type, payload }) => {
  let { 
    initialStation,
    stationInput,
    station
  } = prevState;
  switch (type) {
    case "setHomeStation":
      return { ...prevState, station: payload }
    case "setStationInput":
      return { ...prevState, stationInput: payload }
    default:
      return { ...prevState }
  }
}
