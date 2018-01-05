import setLineFormer from './../helpers/setLineFormer.js'

const resetState = {
  notes: '',
  showEditModal: false,
  allTime: 0,
  lineFormer: [
    { name: 'ValveLine',
      id: 0,
      ShortName: 'GV1',
      changes: [{ startTime: 0, endTime: 0, id: 0, duration: 0 }] },
    { name: 'ValveLine',
      id: 1,
      ShortName: 'GV2',
      changes: [{ startTime: 0, endTime: 0, id: 0, duration: 0 }] },
    { name: 'ValveLine',
      id: 2,
      ShortName: 'GV3',
      changes: [{ startTime: 0, endTime: 0, id: 0, duration: 0 }] },
    { name: 'ValveLine',
      id: 3,
      ShortName: 'GV4',
      changes: [{ startTime: 0, endTime: 0, id: 0, duration: 0 }] },
    { name: 'ValveLine',
      id: 4,
      ShortName: 'GV5',
      changes: [{ startTime: 0, endTime: 0, id: 0, duration: 0 }] },
    { name: 'ValveLine',
      id: 5,
      ShortName: 'GV6',
      changes: [{ startTime: 0, endTime: 0, id: 0, duration: 0 }] },
    { name: 'ValveLine',
      id: 6,
      ShortName: 'HV1',
      changes: [{ startTime: 0, endTime: 0, id: 0, duration: 0 }] },
    { name: 'ValveLine',
      id: 7,
      ShortName: 'HV2',
      changes: [{ startTime: 0, endTime: 0, id: 0, duration: 0 }] },
    { name: 'RPMSetter',
      ShortName: 'RPM',
      id: 8,
      changes: [{ startTime: 0, endTime: 0, value: 0, id: 0, duration: 0 }] },
    { name: 'TempSetter',
      ShortName: 'T°C',
      id: 9,
      changes: [{ startTime: 0, endTime: 0, value: 0, id: 0, duration: 0 }] },
  ],
}

const initialstate = {
  notes: 'Notes can be added here',
  showEditModal: false,
  allTime: 400,
  lineFormer: [
    { name: 'ValveLine',
      id: 0,
      ShortName: 'GV1',
      changes: [{ startTime: 0, endTime: 10, id: 0, duration: 10 },
               { startTime: 20, endTime: 130, id: 1, duration: 110 },
               { startTime: 220, endTime: 400, id: 2, duration: 180 }] },
    { name: 'ValveLine',
      id: 1,
      ShortName: 'GV2',
      changes: [{ startTime: 0, endTime: 0, id: 0, duration: 0 }] },
    { name: 'ValveLine',
      id: 2,
      ShortName: 'GV3',
      changes: [{ startTime: 0, endTime: 10, id: 0, duration: 10 },
               { startTime: 120, endTime: 130, id: 1, duration: 10 },
               { startTime: 320, endTime: 400, id: 2, duration: 80 }] },
    { name: 'ValveLine',
      id: 3,
      ShortName: 'GV4',
      changes: [{ startTime: 0, endTime: 0, id: 0, duration: 0 }] },
    { name: 'ValveLine',
      id: 4,
      ShortName: 'GV5',
      changes: [{ startTime: 0, endTime: 0, id: 0, duration: 0 }] },
    { name: 'ValveLine',
      id: 5,
      ShortName: 'GV6',
      changes: [{ startTime: 0, endTime: 0, id: 0, duration: 0 }] },
    { name: 'ValveLine',
      id: 6,
      ShortName: 'HV1',
      changes: [{ startTime: 0, endTime: 100, id: 0, duration: 100 },
               { startTime: 150, endTime: 200, id: 1, duration: 50 },
               { startTime: 250, endTime: 300, id: 2, duration: 50 }] },
    { name: 'ValveLine',
      id: 7,
      ShortName: 'HV2',
      changes: [{ startTime: 0, endTime: 100, id: 0, duration: 100 },
               { startTime: 150, endTime: 200, id: 1, duration: 50 },
               { startTime: 250, endTime: 300, id: 2, duration: 50 }] },
    { name: 'RPMSetter',
      ShortName: 'RPM',
      id: 8,
      changes: [
        { startTime: 0, endTime: 50, value: 1500, id: 0, duration: 50 },
        { startTime: 75, endTime: 150, value: 1000, id: 1, duration: 75 },
        { startTime: 200, endTime: 250, value: 4000, id: 2, duration: 50 },
        { startTime: 300, endTime: 350, value: 1000, id: 3, duration: 50, waitForValue: true },
      ] },
    { name: 'TempSetter',
      ShortName: 'T°C',
      id: 9,
      changes: [{ startTime: 0, endTime: 50, value: 15, id: 0, duration: 50 },
                { startTime: 100, endTime: 150, value: 25, id: 1, duration: 50 },
                { startTime: 175, endTime: 275, value: 35, id: 2, duration: 100 },
                { startTime: 300, endTime: 350, value: 45, id: 3, duration: 50 },
      ] },
  ],
}
// end and start time of changes should have different values (i.e. endtime[1] !== startTime[2]) - resolve programmly
export default function mainForm(state = initialstate, action) {
  switch (action.type) {
    case 'SHOW_EDIT_MODAL':
      return {
        ...state,
        showEditModal: true,
        id: action.id,
      }

    case 'HIDE_EDIT_MODAL':
      return {
        ...state,
        showEditModal: false,
      }

    case 'SET_LINE_VALUES':
      if (action.payload.stop > state.allTime) {
        return {
          ...state,
          allTime: state.allTime + (action.payload.stop - state.allTime),
          lineFormer: setLineFormer(state, action),
        }
      }
      return {
        ...state,
        lineFormer: setLineFormer(state, action),
      }

    case 'SET_VALUES':
      // console.log('state', state)
      // console.log({ ...action.values })
      return {
        ...state,
        ...action.values,
        showEditModal: false,
      }

    case 'SET_NOTES':
      // console.log('state', state)
      // console.log('action', action)
      return {
        ...state,
        notes: action.notes,
      }

    case 'SET_SLIDER_WIDTH':
      return {
        ...state,
        sliderWidth: action.width,
      }

    case 'SET_SLIDER_POSITION':
      return {
        ...state,
        sliderPosition: action.sliderPosition,
      }

    case 'GET_SLIDER_POSITION':
      return state

    case 'SET_MAINFORM_POSITION':
      return {
        ...state,
        mainFromPosition: action.mainFromPosition,
      }

    case 'RESET_FORM':
      return {
        ...state,
        ...resetState,
      }

    default:
      return state
  }
}
