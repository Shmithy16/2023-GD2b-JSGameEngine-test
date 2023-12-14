// Import necessary classes and resources
import Game from '../engine/game.js';
import Player from './player.js';
import Enemy from './enemy.js';
import PlayerUI from './playerUI.js';
import Platform from './platform.js';
import Collectible from './collectible.js';
import Obstacle from './obstacle.js';

// Define a class Level that extends the Game class from the engine
class Level extends Game {
  
  // Define the constructor for this class, which takes one argument for the canvas ID
  constructor(canvasId) {
    // Call the constructor of the superclass (Game) with the canvas ID
    super(canvasId);
    
    // Create a player object and add it to the game
    const player = new Player(0,-70);//this.canvas.width / 2 - 25, this.canvas.height / 2 - 25
    this.addGameObject(player);
    
    // Add the player UI object to the game
    this.addGameObject(new PlayerUI(10, 10));

    // Set the game's camera target to the player
    this.camera.target = player;

    // Define the platform's width and the gap between platforms
    const platformWidth = 200;
    const gap = 100;

    //defines obstacle size
    const obstacleWidth = 40;
    const obGap = 150;

    // Create platforms and add them to the game
    const platforms = [
      new Platform(0.0, 0.0, 587.0, 70.0, "rgb(255, 0, 0)", "platform"),
      new Platform(793.0, 0.0, 587.0, 70.0, "rgb(255, 0, 0)", "platform"),
      new Platform(1466.0, -145.0, 227.0, 38.5, "rgb(0, 128, 255)", "semi_solid"),
      new Platform(1804.0, -394.5, 227.0, 38.0, "rgb(0, 128, 255)", "platform"),
      new Platform(1052.0, -456.5, 227.0, 38.0, "rgb(0, 128, 255)", "platform"),
              
    ];
    for (const platform of platforms) {
      this.addGameObject(platform);
    }

    //this creates the obstacles and adds them to the game
    const obstacles = [
      new Obstacle(0, this.canvas.height - 60, obstacleWidth, 20),
      // new Obstacle(obstacleWidth + obGap, this.canvas.height - 40, obstacleWidth, 20),
      new Obstacle(2 * (obstacleWidth + obGap), this.canvas.height - 60, obstacleWidth, 20),
      // new Obstacle(3 * (obstacleWidth + obGap), this.canvas.height - 40, obstacleWidth, 20),
      new Obstacle(4 * (obstacleWidth + obGap)-10, this.canvas.height - 60, obstacleWidth, 20),
    ];

    for (const obstacle of obstacles) {
      this.addGameObject(obstacle);
    }

    // Create enemies and add them to the game
    this.addGameObject(new Enemy(50, this.canvas.height - 90));
    this.addGameObject(new Enemy(platformWidth + gap + 50, this.canvas.height - 90));
    this.addGameObject(new Enemy(2 * (platformWidth + gap) + 50, this.canvas.height - 90));

    // Create collectibles and add them to the game
    this.addGameObject(new Collectible(250, this.canvas.height - 100, 20, 20));
    this.addGameObject(new Collectible(450, this.canvas.height - 100, 20, 20));
    this.addGameObject(new Collectible(650, this.canvas.height - 100, 20, 20));
  }
  
}

// Export the Level class as the default export of this module
export default Level;
