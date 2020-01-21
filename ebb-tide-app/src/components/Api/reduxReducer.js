const initialState = {
  isLoading: true
}

export default (prevState = initialState, { type, payload }) => {
  let { 
    isLoading 
  } = prevState;
  switch (type) {
    case "setTideData":
      return { ...prevState, tideData: payload }
    case "setStartDate":
      return { ...prevState, startDate: payload }
    case "setEndDate":
      return { ...prevState, endDate: payload }
    case "setNextTide":
      return { ...prevState, nextTide: payload }
    case "setPreviousTide":
      return { ...prevState, previousTide: payload }
    case "setStationData":
      return { ...prevState, stationData: payload }
    case "setStationName":
      return { ...prevState, stationName: payload }
    case "setTideDirection":
      return { ...prevState, tideDirection: payload }
    case "setCurrentTime":
      return { ...prevState, currentTime: payload }
    case "setIsLoading":
      return { ...prevState, isLoading: payload }
    default:
      return { ...prevState }
  }
}

