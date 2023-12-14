// Importing necessary components and resources
import GameObject from '../engine/gameobject.js';
import Renderer from '../engine/renderer.js';
import Physics from '../engine/physics.js';
import Input from '../engine/input.js';
import { Images } from '../engine/resources.js';
import { AudioFiles } from '../engine/resources.js';
import Enemy from './enemy.js';
import Platform from './platform.js';
import Collectible from './collectible.js';
import ParticleSystem from '../engine/particleSystem.js';

// Defining a class Player that extends GameObject
class Player extends GameObject {
  // Constructor initializes the game object and add necessary components
  constructor(x, y) {
    super(x, y); // Call parent's constructor
    this.renderPlayer = new Renderer('blue', 50, 60, Images.player); // Add renderer
    this.addComponent(this.renderPlayer);
    this.renderJump = new Renderer('blue', 50, 60, Images.playerJump);
    this.renderAudioJ = new Audio(AudioFiles.jump); // Add audio for jump
    this.renderAudioD = new Audio(AudioFiles.death); // Add audio for death
    this.renderAudioC = new Audio(AudioFiles.collect); // Add audio for death
    this.addComponent(new Physics({ x: 0, y: 0 }, { x: 0, y: 0 })); // Add physics
    this.addComponent(new Input()); // Add input for handling user input
    // Initialize all the player specific properties
    this.direction = 1;
    this.lives = 3;
    this.score = 0;
    this.isOnPlatform = false;
    this.isJumping = false;
    this.jumpForce = 250;
    this.jumpTime = 3.0;
    this.jumpTimer = 0;
    this.isInvulnerable = false;
    this.isGamepadMovement = false;
    this.isGamepadJump = false;
    this.inAir = false;
    this.upHeld = false;
    this.hasdoubleJump = false;
    this.canDash = true;
    this.dashSpeed = 500;
    this.dashCool = 0;
    this.dashCool2 = 0;
  }

  // The update function runs every frame and contains game logic
  update(deltaTime) {
    
    const physics = this.getComponent(Physics); // Get physics component
    const input = this.getComponent(Input); // Get input component
    
    if(this.upHeld){//checks if you are pressing up 
        this.upHeld = input.isKeyDown('ArrowUp');
      }

    if(!this.hasdoubleJump){//checks if you have dont have a double jump then gives it to you
      this.hasdoubleJump = this.isOnPlatform;
    }
    this.handleGamepadInput(input);
    
    // Handle player movement
    if (!this.isGamepadMovement && input.isKeyDown('ArrowRight')) {
      physics.velocity.x = 200;
      this.direction = -1;
    } else if (!this.isGamepadMovement && input.isKeyDown('ArrowLeft')) {
      physics.velocity.x = -200;
      this.direction = 1;
    } else if (!this.isGamepadMovement) {
      physics.velocity.x = 0;
    }
    
    this.dashForward(deltaTime,input,physics);

    // Handle player jumping
    if (!this.isGamepadJump && input.isKeyDown('ArrowUp') && !this.upHeld) {
      this.startJump();
      this.upHeld = true;
    }

    if (this.isJumping) {
      this.updateJump(deltaTime);
    }

    // Handle collisions with collectibles
    const collectibles = this.game.gameObjects.filter((obj) => obj instanceof Collectible);
    for (const collectible of collectibles) {
      if (physics.isColliding(collectible.getComponent(Physics))) {
        this.collect(collectible);
        this.game.removeGameObject(collectible);
      }
    }
  
    // Handle collisions with enemies
    const enemies = this.game.gameObjects.filter((obj) => obj instanceof Enemy);
    for (const enemy of enemies) {
      if (physics.isColliding(enemy.getComponent(Physics))) {
        this.collidedWithEnemy();
      }
    }
  
    // Handle collisions with platforms
    this.isOnPlatform = false;  // Reset this before checking collisions with platforms
    const platforms = this.game.gameObjects.filter((obj) => obj instanceof Platform);
    for (const platform of platforms) {
      if (physics.isColliding(platform.getComponent(Physics))) {
        if (!this.isJumping) {
          physics.velocity.y = 0;
          physics.acceleration.y = 0;
          this.y = platform.y - this.renderPlayer.height;
          this.isOnPlatform = true;
        }
      }
    }
  
    // Check if player has fallen off the bottom of the screen
    if (this.y > 150) {
      this.resetPlayerState();
      console.log("Test")
    }

    // Check if player has no lives left
    if (this.lives <= 0) {
      location.reload();
    }

    // Check if player has collected all collectibles
    if (this.score >= 3) {
      console.log('You win!');
      location.reload();
    }

    super.update(deltaTime);
  }

  handleGamepadInput(input){
    const gamepad = input.getGamepad(); // Get the gamepad input
    const physics = this.getComponent(Physics); // Get physics component
    if (gamepad) {
      // Reset the gamepad flags
      this.isGamepadMovement = false;
      this.isGamepadJump = false;

      // Handle movement
      const horizontalAxis = gamepad.axes[0];
      // Move right
      if (horizontalAxis > 0.1) {
        this.isGamepadMovement = true;
        physics.velocity.x = 100;
        this.direction = -1;
      } 
      // Move left
      else if (horizontalAxis < -0.1) {
        this.isGamepadMovement = true;
        physics.velocity.x = -100;
        this.direction = 1;
      } 
      // Stop
      else {
        physics.velocity.x = 0;
      }
      
      // Handle jump, using gamepad button 0 (typically the 'A' button on most gamepads)
      if (input.isGamepadButtonDown(0) && this.isOnPlatform) {
        this.isGamepadJump = true;
        this.startJump();
      }
    }
  }

  startJump() {
    // Initiate a jump if the player is on a platform
    if (this.isOnPlatform) { 
      this.renderAudioJ.play();
      this.isJumping = true;
      this.jumpTimer = this.jumpTime;
      this.getComponent(Physics).velocity.y = -this.jumpForce;
      this.isOnPlatform = false;
      this.renderPlayer = new Renderer('blue', 50, 60, Images.playerJump); // Add renderer
      // this.addComponent(this.renderPlayer);
      // this.addComponent(this.renderJump);
    } else if(this.hasdoubleJump){ //if you have a double jump then you can jump
      this.renderAudioJ.play();
      this.isJumping = true;
      this.jumpTimer = this.jumpTime;
      this.getComponent(Physics).velocity.y = -this.jumpForce;
      this.hasdoubleJump = false;
      new Renderer('blue', 50, 60, Images.playerJump);
    }
  }
  //this does a dash that moves you forward a certain amount when hitting space
dashForward(deltaTime,input,physics){ 
    if(this.canDash && input.isKeyDown("Space")&& this.dashCool<=0 && this.dashCool2<=0){
      this.dashCool = .5;
    }else if(this.dashCool>0){
      this.dashCool-=deltaTime;
      physics.velocity.x = -this.dashSpeed*this.direction;   //dash actually goes to the right direction
      this.dashCool2=1;
    }else if(this.dashCool2>0){
      this.dashCool2-=deltaTime;
    }
  }




  updateJump(deltaTime) {
      // Updates the jump progress over time
      this.jumpTimer -= deltaTime;
      if (this.jumpTimer <= 0 || this.getComponent(Physics).velocity.y > 0) {
        this.isJumping = false;
      }
  }

  collidedWithEnemy() {
    // Checks collision with an enemy and reduce player's life if not invulnerable
    if (!this.isInvulnerable) {
      this.lives--;
      this.isInvulnerable = true;
      this.renderAudioD.play();
      //tried to make it so when the player got hit they would become opaque while they were invincible but couldnt get it working
      // var element = document.getElementById("player");
      // element.style.opacity = "0.9";
      // element.style.filter  = 'alpha(opacity=90)';
      
      // Make player vulnerable again after 2 seconds
      setTimeout(() => {
        this.isInvulnerable = false;
      }, 2000);
    }
  }

  collidedWithObstacle() {
    // Checks collision with an obstacle and kills player if not invulnerable
    if (!this.isInvulnerable) {
      //if a player touches and obstacle they die instantly
      this.lives-= 3;
    }
  }
  collect(collectible) {
    // Handle collectible pickup
    this.score += collectible.value;
    console.log(`Score: ${this.score}`);
    this.emitCollectParticles(collectible);
    this.renderAudioC.play();
  }

  emitCollectParticles() {
    // Create a particle system at the player's position when a collectible is collected
    const particleSystem = new ParticleSystem(this.x, this.y, 'yellow', 20, 1, 0.5);
    this.game.addGameObject(particleSystem);
  }

  resetPlayerState() {
    // Reset the player's state, repositioning it and nullifying movement
    this.x = 0//this.game.canvas.width / 2;
    this.y = -70//this.game.canvas.height / 2;
    this.getComponent(Physics).velocity = { x: 0, y: 0 };
    this.getComponent(Physics).acceleration = { x: 0, y: 0 };
    this.direction = 1;
    this.isOnPlatform = false;
    this.isJumping = false;
    this.jumpTimer = 0;
  }

  resetGame() {
    // Reset the game state, which includes the player's state
    this.lives = 3;
    this.score = 0;
    this.resetPlayerState();
  }
}

export default Player;
