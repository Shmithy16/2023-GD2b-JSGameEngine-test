// Import necessary classes and resources
import Game from '../engine/game.js';
import Player from './player.js';
import Enemy from './enemy.js';
import PlayerUI from './playerUI.js';
import Platform from './platform.js';
import Collectible from './collectible.js';
import Obstacle from './obstacle.js';
import Wall from './wall.js';

// Define a class Level that extends the Game class from the engine
class Level extends Game {
  
  // Define the constructor for this class, which takes one argument for the canvas ID
  constructor(canvasId) {
    // Call the constructor of the superclass (Game) with the canvas ID
    super(canvasId);
    
    // Create a player object and add it to the game
    const player = new Player(100,-70);
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
      new Platform(793.0, 0.0, 587.0, 70.0, "rgb(255, 0, 0)", "platform"),
      new Platform(1466.0, -145.0, 227.0, 38.5, "rgb(0, 128, 255)", "semi_solid"),
      new Platform(1052.0, -456.5, 227.0, 38.0, "rgb(0, 128, 255)", "sami_solid"),
      new Platform(1804.0, -394.5, 227.0, 38.0, "rgb(0, 128, 255)", "semi_solid"),
      new Platform(0.0, 0.0, 587.0, 70.0, "rgb(255, 0, 0)", "platform"),
      new Platform(1052, -694, 227.0, 38, "rgb(0, 128, 255)", "semi_solid"),
      new Platform(1588, -781, 692, 85, "rgb(255, 0, 0)", "platform"),      
    ];
    for (const platform of platforms) {
      this.addGameObject(platform);
    }
    //creates walls and adds them to the game
    const walls = [
      new Wall(-120.0, -407.0, 125.0, 477.0, "rgb(187, 0, 0)", "wall"),
      new Wall(1584, -1285, 108, 384, "rgb(187, 0, 0)", "wall"),             
    ];
    for (const wall of walls) {
      this.addGameObject(wall);
    }

    //this creates the obstacles and adds them to the game
    const obstacles = [
      new Obstacle(400, -50, obstacleWidth, 20),
      new Obstacle(800, -50, obstacleWidth, 20),
      new Obstacle(840, -50, obstacleWidth, 20),
      new Obstacle(1000, -50, obstacleWidth, 20),
    ];

    for (const obstacle of obstacles) {
      this.addGameObject(obstacle);
    }

    // Create enemies and add them to the game
    this.addGameObject(new Enemy(1200, -50));
    this.addGameObject(new Enemy(1466, -150));
    this.addGameObject(new Enemy(1804, -400));

    // Create collectibles and add them to the game
    this.addGameObject(new Collectible(1550, -450, 20, 20));
    this.addGameObject(new Collectible(2000, -850, 20, 20));
    this.addGameObject(new Collectible(650, -50, 20, 20));
  }
  
}

// Export the Level class as the default export of this module
export default Level;
