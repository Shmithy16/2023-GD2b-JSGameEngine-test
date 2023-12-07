import GameObject from '../engine/gameobject.js';
import Renderer from '../engine/renderer.js';
import Physics from '../engine/physics.js';
import Player from './player.js';

class Obstacle extends GameObject{
    constructor(x, y, width, height, color = "blue"){
        super(x,y);

        this.addComponent(new Renderer(color, width, height));
        this.addComponent(new Physics({ x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }));

        this.tag = obstacle
    }

    update(deltaTime){
        const player = this.game.gameObjects.find(obj => obj instanceof Player);
        if (physics.isColliding(player.getComponent(Physics))) {
         player.collidedWithObstacle();
        }   
        super.update(deltaTime)
    }
}
export default Obstacle;