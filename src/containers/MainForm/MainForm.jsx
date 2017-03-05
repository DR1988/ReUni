import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import MainFormAction from './../../actions/MainForm.js'
import LineFormer from './../../components/LineFormer/LineFormer.jsx'
import TimeLine from './../../components/TimeLine/TimeLine.jsx'

import scrolling, { setCoord } from './../../helpers/scrolling.js'

// import ValveLine from './../../components/valveLine/valveLine.jsx'
// import RPMSetter from './../../components/RPMSetter/RPMSetter.jsx'
// import TempSetter from './../../components/TempSetter/TempSetter.jsx'

class MainForm extends Component {
  constructor(props) {
    super(props)
    this.timerIdInner = null
    this.timerIdOuter = null
    this.hold = false
    this.action = null
    this.timer = null
    this.sliderW = 0
  }

  componentDidMount() {
    this.sliderW = this.getSliderWidth()// width of container
    this.props.actions.setSliderWidth(this.sliderW)
    setCoord(null, parseInt(this.props.mainForm.sliderPosition, 10), document.querySelector('.form-Manupalation'))
    document.querySelector('.mover').style.left = this.props.mainForm.sliderPosition
  }

  componentDidUpdate() {
    this.sliderW = this.getSliderWidth()
    if (Math.floor(this.sliderW) !== Math.floor(this.props.mainForm.sliderWidth)) {
      this.props.actions.setSliderWidth(this.sliderW)
    }
  }


  getSliderWidth = () => (document.querySelector('.form-Manupalation').clientWidth
    / document.querySelector('.data-set').clientWidth)
    * document.querySelector('.form-Manupalation').clientWidth

  setSliderPosition = () => {
    const sliderPosition = document.querySelector('.mover').style.left
    this.props.actions.setSliderPosition(sliderPosition)
  }
  // getSource = () => {
  //   const source = new EventSource('/stream')
  //   source.onmessage = (e) => {
  //     const data = JSON.parse(e.data)
  //     this.timer = data.counts
  //     this.forceUpdate()
  //   }
  // }

  showModal = (elem) => {
    this.props.actions.showModal(elem)
  }

/*
  loadFile = (e) => {
    const file = e.target.files[0]
    const reader = new FileReader()
    if (file) {
      reader.readAsBinaryString(file)
      reader.onloadend = (evt) => {
        if (evt.target.readyState === FileReader.DONE) { // DONE == 2
          this.props.actions.setValues(JSON.parse(evt.target.result))
        }
      }
    }
  }
*/

  decline = () => {
    this.props.actions.hideModal()
  }

  handle = (e) => {
    e.persist()
    if (e.button === 2) {
      e.preventDefault()
    }
    if (e.button === 1) {
      let { mainFromPostion } = this.props.mainForm
      const container = e.currentTarget
      if (!mainFromPostion) {
        mainFromPostion = 0
      }
      e.currentTarget.style.cursor = 'move'
      container.scrollLeft = mainFromPostion
      // console.log(container.scrollLeft)
      document.onmousemove = (evt) => {
        // console.log('evt.pageX - e.pageX', evt.pageX - e.pageX)
        container.scrollLeft = (mainFromPostion + evt.pageX - e.pageX)
      }
      document.onmouseup = () => {
        document.onmousemove = document.onmouseup = null
        this.props.actions.setMainFormPosition(container.scrollLeft)
        e.target.style.cursor = null
      }
    }
  }

  render() {
    // console.log(this.props.mainForm)
    // console.log('mainForm', this.props.actions)
    // this.getSource()
    // console.log(this.props.mainForm)
    const { lineFormer } = this.props.mainForm
    return (
      <div
        className="form-Manupalation"
        // onMouseDown={(e) => this.handle(e)}
      >
        <div className="data-set">
          <form id="mainForm">
            {lineFormer.map((elem, idx) => <LineFormer
              handle={this.showModal}
              key={idx}
              elem={elem}
            />
            )}
          </form>
          <TimeLine
            distance={this.props.distance}
            time={this.props.time}
            allTime={this.props.mainForm.allTime}
          />
        </div>
        <div className="slider-bar">
          <div
            className="mover"
            style={{ width: `${this.props.mainForm.sliderWidth}px` }}
            // onMouseDown={scrolling}
            // onMouseUp={this.setSliderPosition}
          />
        </div>
        {/*<input type="file" onChange={this.loadFile} />*/}
      </div>
    )
  }
}

MainForm.propTypes = {
  numericProp: React.PropTypes.array,
  minValue: React.PropTypes.number,
  actions: React.PropTypes.object,
  scale: React.PropTypes.number,
  id: React.PropTypes.number,
  lineFormer: React.PropTypes.node,
  mainForm: React.PropTypes.object,
}

MainForm.defaultProps = {
  sliderWidth: 100,
}
const mapStateToProps = (state) => ({ mainForm: state.mainForm })

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(MainFormAction, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(MainForm)
