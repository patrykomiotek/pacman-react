import React, { Component } from 'react';

import Pacman from '../pacman';
import Ghost from '../ghost';
import Food from '../food';

import './style.css';

class Board extends Component {

  constructor(props) {
    super(props);
    this.pacmanRef = React.createRef();

    this.foods = [];
    this.amountOfFood = (
      (window.innerWidth - this.props.foodSize)
        * (window.innerHeight - this.props.topScoreBoard)
    ) / (this.props.foodSize * this.props.foodSize) - 1; // minus 1 because we substract pacman position

    for (let i = 0; i < this.amountOfFood; i++) {
      this['food' + i] = React.createRef();
    }
  }

  componentDidMount() {
    // TODO: uncomment me when necessary
    this.intervalFood = setInterval(this.lookForEat, 100);
  }

  lookForEat = () => {
    // TODO: implement food eating
    const pacmanX = this.pacmanRef.current.state.position.left;
    const pacmanY = this.pacmanRef.current.state.position.top;
    const pacmanSize = this.pacmanRef.current.props.size

    const pacmanLastX = pacmanX + pacmanSize / 2;
    const pacmanLastY = pacmanY + pacmanSize / 2;

    for (let i = 0; i <= this.amountOfFood; i++) {
      const currentFood = this['food' + i].current;
      if (currentFood) {
        const currentFoodX = currentFood.state.position.left;
        const currentFoodY = currentFood.state.position.top;
        const currentFoodSize = currentFood.props.foodSize;
        const currentFoodLastX = currentFoodX + currentFoodSize / 2;
        const currentFoodLastY = currentFoodY + currentFoodSize / 2;

        if (
          (pacmanX >= currentFoodX && pacmanX <= currentFoodLastX)
          || (pacmanLastX >= currentFoodX && pacmanLastX <= currentFoodLastX)) {
          if ((pacmanY >= currentFoodY && pacmanY <= currentFoodLastY)
            || (pacmanLastY >= currentFoodY && pacmanLastY <= currentFoodLastY)) {
            if (!currentFood.state.hidden) {
              currentFood.ate();
              this.props.increase();
            }
          }
        }
      }
    }
  }

  render() {
    // TODO: implement food rendering
    let foods = [];
		let currentTop = 0;
    let currentLeft = 1 * this.props.foodSize;

    for (let i = 0; i < this.amountOfFood; i++) {

      if (
        currentLeft + this.props.foodSize
          >= window.innerWidth - this.props.border) {
          currentTop += this.props.foodSize;
          currentLeft = 0;
      }

      if (currentTop + this.props.foodSize
          >= (window.innerHeight
              - this.props.border
              - this.props.topScoreBoard)) {
          break;
      }
      const position = { left: currentLeft, top: currentTop };
      currentLeft = currentLeft + this.props.foodSize;
      foods.push(
        <Food ref={this['food' + i]}
        position={position}
        key={i} />
      );
    }

    return (
      <div className="board">
          {foods}
          <Pacman ref={this.pacmanRef} />
          <Ghost color="blue"/>
          <Ghost color="pink"/>
      </div>
    )
  }
}

Board.defaultProps = {
	foodSize: 50,
	border: 20,
	topScoreBoard: 100
};

export default Board;