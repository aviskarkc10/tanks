import React, { Component } from 'react';

class Enemy extends Component{

	render() {

				return(

			<div className="enemy" 
			style={{height: this.props.enemyHeight, width: this.props.enemyWidth, 
				top: this.props.enemyY, left: this.props.enemyX, backgroundColor: 'red'}}>
				
			</div>
		);
	}

}

export default Enemy;