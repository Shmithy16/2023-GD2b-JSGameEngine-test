import GameObject from '../engine/gameobject.js';
import Renderer from '../engine/renderer.js';
import Physics from '../engine/physics.js';
import Player from './player.js';
import {Images} from '../engine/resources.js';

class Obstacle extends GameObject{
    //define the constructor and take arguments for x,y,widht, height and color setting blue as the default colour
    constructor(x, y, width, height, color = "blue"){

        super(x,y);

        this.addComponent(new Renderer(color, 50, 50, Images.obstacle)); //this creates the obstacle, gives its sizes and sets the imgage to the spikes

        this.addComponent(new Physics({ x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 })); //sets all its physics to 0 as it does not need to move
    }

    //this updates the game using delta time (the time between frames) 
    update(deltaTime){
        const physics = this.getComponent(Physics);

        //this checks if the player is colliding with the player
        const player = this.game.gameObjects.find(obj => obj instanceof Player);
        if (physics.isColliding(player.getComponent(Physics))) {
         player.collidedWithObstacle();
        }   
        super.update(deltaTime)
    }
}
export default Obstacle;