// Import the necessary classes from the 'engine' directory
import GameObject from '../engine/gameobject.js';
import Renderer from '../engine/renderer.js';
import Physics from '../engine/physics.js';

// Define a new class, Wall, which extends (inherits from) GameObject
class Wall extends GameObject {
  

  constructor(x, y, width, height, color = 'gray',tag = "wall") {
    
    // Call the constructor of the superclass (GameObject) with the x and y coordinates
    super(x, y);
    

    this.addComponent(new Renderer(color, width, height));
    

    this.addComponent(new Physics({ x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }));
    

    this.tag = tag; 
  }
}

// Export the Wall class as the default export of this module
export default Wall;