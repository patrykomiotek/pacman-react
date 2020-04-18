import React, { Component } from 'react';

import { ReactComponent as GhostSvg } from './ghost.svg';

import './style.css';

class Ghost extends Component {

  state = {
    direction: 'left',
    position: {
      top: 50 * 3,
      left: 50 * 3
    }
  }

  componentDidMount() {
    // TODO: uncomment me when necessary
    this.moveInterval = setInterval(this.move, 500);
    this.changeDirectionInterval = setInterval(
      this.changeDirection, 500
    );
  }

  changeDirection = () => {
    // TODO: implement change direction
    const arrayOfMovement = ['left', 'up', 'down', 'right'];
    const movement = Math.floor(Math.random() * 4);

    this.setState({ direction: arrayOfMovement[movement] });
  }

  move = () => {
    const currentTop = this.state.position.top;
    const currentLeft = this.state.position.left;

    // TODO: move ghost

    if (this.state.direction === 'up') {
      this.setState({
        position: {
          top: Math.max(currentTop - this.props.step, 0),
          left: currentLeft
        }
      });
    } else if (this.state.direction === 'right') {
      this.setState({
        position: {
          top: currentTop,
          left: Math.min(currentLeft + this.props.step, window.innerWidth - this.props.border - this.props.size)
        }
      });
    } else if (this.state.direction === 'down') {
      this.setState({
        position: {
          top: Math.min(currentTop + this.props.step, window.innerHeight - this.props.size - this.props.border - this.props.topScoreBoard),
          left: currentLeft
        }
      });
    } else if (this.state.direction === 'left') {
      this.setState({
        position: {
          top: currentTop,
          left: Math.max(currentLeft - this.props.step, 0)
        }
      });
    }
 }

  render() {
    return(
      <div style={this.state.position} className="ghost">
        <GhostSvg className={`ghost-${this.props.color}`} />
      </div>
    )
  }
}

Ghost.defaultProps = {
  color: 'red',
  step: 50, // move size
  size: 50, // ghost size
  border: 20,
  topScoreBoard: 100
};


export default Ghost;