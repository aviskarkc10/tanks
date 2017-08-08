import React, { Component } from 'react';
import Container from './Container';
import Player from './Player';
import Bullet from './Bullet';
import Enemy from './Enemy';


class GameController extends Component{

	constructor() {

		super();
		this.state = {

			game: true,
			score: 0,
			health: 100,
			healthBarColour: "green",
			containerHeight: 600,
			containerWidth: 800,
			playerHeight: 80,
			playerWidth: 70,
			playerX: 400,
			playerY: 500,
			playerVelocity: 5,
			keyDown: "",
			keyup: false,
			angle: Math.PI/2,
			angleDegrees: 90,
			bulletX: '',
			bulletY: '',
			bulletFired: false,
			bulletWidth: 10,
			bulletHeight: 20,
			bulletAngle: '',
			bulletVelocity: 10,
			enemies: {
				id: '',
				enemyX:'',
				enemyY:'',
				velocityX:2,
				velocityY:2,
				enemyAngle: '',
				alive: false
			},
			enemyNumber: 1,
			enemyHeight: 40,
			enemyWidth: 40,
		}

		this.initialState = this.state;
	}

	gameLoop = () => {

		if(this.state.game){

			document.onkeydown = (e) => {
				this.checkKeyDown(e);
				
			}

			document.onkeyup = (e) => {

				this.checkKeyUp(e);
			}

			document.onmousemove = (e) => {

				this.mouseMovement(e);
			}

			document.onclick = (e) => {

				if(!this.state.bulletFired){
					this.spawnBullet(e);
				}
			}

			if(this.state.bulletFired){
				this.moveBullet();
			}
			this.moveEnemy();
			this.checkCollision();

			

			if(this.state.score>3){
				this.setState({
					enemyNumber: 2,
				})
			}

			if(this.state.score>6){
				this.setState({
					enemyNumber: 3,
				})
			}

			window.requestAnimationFrame(this.gameLoop)
		}

	}

	moveBullet = () => {

		let tempY = this.state.bulletY + (this.state.bulletVelocity*Math.sin(this.state.bulletAngle));
    	let tempX = this.state.bulletX + (this.state.bulletVelocity*Math.cos(this.state.bulletAngle));

    	this.setState({

    		bulletX: tempX,
    		bulletY: tempY
    	})

    	if(this.state.bulletX<0 || this.state.bulletX>this.state.containerWidth || this.state.bulletY<0 || this.state.bulletY+this.state.bulletHeight>this.state.containerHeight){
	   		this.setState({
    			bulletFired: false
    		})
    		
    	}

    	

	}

	checkCollision = () => {

		
		if(this.state.enemies.length>0) {
			for(let i=0;i<this.state.enemyNumber;i++){

				let enemy = this.state.enemies[i];

					
				
			if ((enemy.enemyX < this.state.playerX + this.state.playerWidth &&
			   enemy.enemyX + this.state.enemyWidth > this.state.playerX &&
			   enemy.enemyY < this.state.playerY + this.state.playerHeight &&
			   this.state.enemyHeight + enemy.enemyY > this.state.playerY)) {

					//collision between player and enemy
					let tempHealth = this.state.health-25;

					if(tempHealth<=0){
						this.setState({
							game: false
						})
						this.restartGame();
					}

					else if(tempHealth<=25){
						this.setState({
							healthBarColour: 'red',
							health: tempHealth
						})
					}

					else{
						this.setState({
							health: tempHealth
						})
					}

					delete this.state.enemies[i];

				}

			if ((enemy.enemyX < this.state.bulletX + this.state.bulletWidth &&
			   enemy.enemyX + this.state.enemyWidth > this.state.bulletX &&
			   enemy.enemyY < this.state.bulletY + this.state.bulletHeight &&
			   this.state.enemyHeight + enemy.enemyY > this.state.bulletY)) {

			   	//collision between enemy and bullet

				delete this.state.enemies[i];

				let tempScore = this.state.score+1

				this.setState({
					bulletFired: false,
					score: tempScore
				})

			}

			}



		}
		
	}

	restartGame = () => {

		this.setState(this.initialState);
		// this.gameLoop();

	}

	spawnBullet = () => {
		
		let bulletAngle = this.state.angle;
		let bulletX = (this.state.playerX+(this.state.playerWidth/2)-this.state.bulletWidth/2);
		let bulletY = (this.state.playerY+this.state.playerHeight/2);
	
		this.setState({
			bulletX: bulletX,
			bulletY: bulletY,
			bulletAngle: bulletAngle,
			bulletFired: true
		})

	}

	moveEnemy = () => {

		let tempX;
		let tempY;
		let tempAngle=0;
		let tempEnemy = [];	



		for(let i=0;i<this.state.enemyNumber;i++){

			if(!this.state.enemies[i] || !this.state.enemies[i].alive || this.state.enemies[i].enemyY<-this.state.enemyHeight ||
				this.state.enemies[i].enemyY>this.state.containerHeight ||
				this.state.enemies[i].enemyX<-this.state.enemyWidth ||
				this.state.enemies[i].enemyX>this.state.containerWidth){

				//spawn a new enemy

				let position = Math.floor(Math.random()*4);
				
				if(position===0){
					//spawn from top
					tempY = -this.state.enemyHeight;
					tempX = Math.floor(Math.random()*this.state.containerWidth);

				}

				else if(position===1){
					//spawn from right
					tempX = this.state.containerWidth;
					tempY = Math.floor(Math.random()*this.state.containerHeight);

				}

				else if(position===2){
					//spawn from bottom
					tempY = this.state.containerHeight;
					tempX = Math.floor(Math.random()*this.state.containerWidth);

				}

				else if(position===3){
					//spawn from left
					tempX = -this.state.enemyWidth;
					tempY = Math.floor(Math.random()*this.state.containerHeight);

				

				}
				
				let playerX = this.state.playerX+(this.state.playerWidth/2);
				let playerY = this.state.playerY+(this.state.playerHeight/2);
				tempAngle = Math.atan2(((tempY+this.state.enemyHeight/2)-playerY),
									((tempX+this.state.enemyWidth/2) - playerX));
				
					
			}

			else if(this.state.enemies[i]){
				
	  			let enemy = this.state.enemies[i];
	  			
				
				let playerX = this.state.playerX;
				let playerY = this.state.playerY;



				tempAngle = Math.atan2((-(enemy.enemyY)+playerY),
									(-(enemy.enemyX) + playerX));
				
				tempX = this.state.enemies[i].enemyX + (this.state.enemies[i].velocityX * Math.cos(tempAngle));
				tempY = this.state.enemies[i].enemyY + (this.state.enemies[i].velocityY * Math.sin(tempAngle));
				
				
			}

			
		
			
			tempEnemy[i] = {
	  				id: i,
	  				enemyX: tempX,
	  				enemyY: tempY,
	  				velocityX: 2,
	  				velocityY: 2,
	  				enemyAngle: tempAngle,
	  				alive: true
	  			}

	  		
	  		

	  		if(i===this.state.enemyNumber-1){
	  			
	  			this.setState({
	  				enemies: tempEnemy
	  			});
	  		
	  		}


		}


	}

	mouseMovement = (e) => {

		let mouseX = e.clientX; 
		let mouseY = e.clientY;
		let playerX = this.state.playerX+(this.state.playerWidth/2);
		let playerY = this.state.playerY+(this.state.playerHeight/2);
		let angle=Math.atan2(mouseY - playerY, mouseX-playerX);
		let angleDegrees = angle * 180/Math.PI;
		

		this.setState({
			angle: angle,
			angleDegrees: angleDegrees
		})


	}

	checkKeyDown = function (e) {

    	if (e.keyCode === 38){
    		//up arrow

    		let tempY = this.state.playerY + (this.state.playerVelocity*Math.sin(this.state.angle));
    		let tempX = this.state.playerX + (this.state.playerVelocity*Math.cos(this.state.angle));
    		
    		if(tempX>0 && tempX+this.state.playerWidth<this.state.containerWidth
    			&& tempY>0 && tempY+this.state.playerHeight<this.state.containerHeight)
	    		this.setState({
		       		keyDown: "down",
		      		keyup: false,
		       		playerY: tempY,
		       		playerX: tempX
	       		});
    		


    	}
			
  	}

  	checkKeyUp = function (e) {

  		if (e.keyCode === 37 || e.keyCode === 38 || e.keyCode === 39 || e.keyCode === 40) {
       	// left arrow
       		
       		this.setState({
       			keyUp: true
       		});

    	}
    }

	componentWillMount() {
		this.gameLoop();
	}


	render(){

		return(

			<div className="gameController">

				<Container containerHeight={this.state.containerHeight} containerWidth={this.state.containerWidth} />
				<Player playerHeight={this.state.playerHeight} playerWidth={this.state.playerWidth} 
						playerX={this.state.playerX} playerY={this.state.playerY} angleDeg={this.state.angleDegrees} />
				{
					this.state.bulletFired ?
							<Bullet bulletY={this.state.bulletY} bulletX={this.state.bulletX} 
								bulletAngle={this.state.bulletAngle} />
						:
						null				
				}

				{

					this.state.enemies.length>0 && this.state.enemies.map(singleEnemy  => {
						
						return(

							<Enemy key={singleEnemy.id} enemyHeight = {this.state.enemyHeight} enemyWidth = {this.state.enemyWidth}
							enemyX = {singleEnemy.enemyX} enemyY = {singleEnemy.enemyY}/>
						
						)
					})
				}

				<div className="playerInfo">
					<div className = "health-container">
						<div className="healthbar" style={{width: this.state.health+'%', backgroundColor: this.state.healthBarColour}}></div>
					</div>
					<div className = "score">Score: {this.state.score}</div>
				</div>
			</div>


			)
	}
}

export default GameController;