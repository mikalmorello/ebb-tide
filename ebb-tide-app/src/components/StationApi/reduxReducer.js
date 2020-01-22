const initialState = {
}

export default (prevState = initialState, { type, payload }) => {
  let { 
  } = prevState;
  switch (type) {
    case "setStationData":
      return { ...prevState, stationData: payload }
    default:
      return { ...prevState }
  }
}

