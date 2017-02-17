export default(state, action) => state.lineFormer.map(changeElem => {
  if (changeElem.id !== action.id) {
    return changeElem
  }
  if (changeElem.id === 7) {
    console.log('changeElem', changeElem)
  }
  changeElem.changes.push(
    { endTime: +action.payload.stop,
      startTime: +action.payload.start,
      value: +action.payload.value,
      id: changeElem.changes.length,
    }
  )
  return {
    ...changeElem,
  }
}
)
