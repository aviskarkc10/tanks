import React, { Component } from 'react';

import playerImage from '../assets/tank.png';


class Player extends Component{

	render() {

				return(

			<div className="player" 
			style={{height: this.props.playerHeight, width: this.props.playerWidth, 
				top: this.props.playerY, left: this.props.playerX, transform: 'rotate('+(this.props.angleDeg+90)+'deg)'}}>
				<img src={playerImage} alt='player' />
			</div>
		);
	}

}

export default Player;