import React, { Component } from 'react';


class Container extends Component{

	render() {

		return(

			<div className="container" style={{height: this.props.containerHeight, width: this.props.containerWidth}}>
				
			</div>
		);
	}

}

export default Container;