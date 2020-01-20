const initialState = {
  station: '',
  tideDate: '',
}

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

