import React, { Component } from 'react';


class Bullet extends Component{

	render() {

		let angleDeg = this.props.bulletAngle * 180/Math.PI;

		return(

			<div className="bullet" 
			style={{top: this.props.bulletY, left: this.props.bulletX, transform: 'rotate('+(angleDeg+90)+'deg)'}}>
				
			</div>
		);
	}

}

export default Bullet;