import React, { Component } from 'react'
import Snackbar from 'material-ui/Snackbar'

import './style.scss'

import getUniqTimeLines from './../../helpers/getUniqTimeLines.js'
import setLineTemplate from './../../helpers/templates/lineTemplate.jsx'
import LineDescription from './lineDescription/lineDescription.jsx'

class ValveLine extends Component {
  constructor(props) {
    super(props)
    this.linesTemplate = []
    this.resultLines = {}
  }

  state = {
    elem:null,
    showDescription: true,
  }

  componentWillMount() {
    // const { changes } = this.props.elem
    const { elem } = this.props
    this.resultLines = getUniqTimeLines(elem)
    this.linesTemplate = setLineTemplate(this.resultLines, this.props.allTime)
  }

  componentWillReceiveProps(nextProps) {
    // this.resultLines = getUniqTimeLines(nextProps.elem.changes)
    this.resultLines = getUniqTimeLines(nextProps.elem)
    this.linesTemplate = setLineTemplate(this.resultLines, nextProps.allTime)
  }

  showDescription = (elem) => {
    this.setState({
      elem,
      showDescription:true
    }) 
  }

  hideDescrioption = () => {
    this.setState({
      showDescription:false
    })
  }

  render() {
    const { handle, elem } = this.props
    return (<div className="line-wraper">
      <div className="line-definition">
        <span
          onClick={() => this.showDescription(elem)}
          //onMouseEnter={this.showDescription}
          // onMouseLeave={this.hideDescrioption}
        >{elem.ShortName}</span>
        <LineDescription
          valve={elem.ShortName}
          currentElem={this.state.elem}
          showDescription={this.state.showDescription}
          hideDescrioption={this.hideDescrioption}
        />
      </div>
      <div className="time-box_keeper" onClick={() => handle(elem)}>
        <div className="time-box">
          { this.linesTemplate }
        </div>
      </div>
    </div>
    )
  }
}

        // {this.state.showDescription ? <LineDescription
        //   valve = {elem.ShortName}
        //   /> : null }
ValveLine.propTypes = {
  id: React.PropTypes.number,
  handle: React.PropTypes.func,
  width: React.PropTypes.string,
  elem: React.PropTypes.object,
}

ValveLine.defaultProps = {
  width: '20%',
}

export default ValveLine
