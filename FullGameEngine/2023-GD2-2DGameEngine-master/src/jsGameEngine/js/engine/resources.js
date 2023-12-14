// Create an Images object to hold the Image instances for the player and the enemy.
const Images = {
  player: new Image(), // The Image instance for the player.
  enemy: new Image(), // The Image instance for the enemy.
  obstacle: new Image(), //Image for the spike
  playerJump:new Image(), //Image for the jump
};

// Create an AudioFiles object to hold the file paths of the audio resources.
const AudioFiles = {
  jump: './resources/audio/jumpSound.wav', // The file path of the jump sound.
  collect: './resources/audio/collect.mp3', // The file path of the collect sound.
  death: './resources/audio/Death.wav',  // The file path of the death sound.
  collect: './resources/audio/Collect.wav',
};

// Set the source of the player image.
Images.player.src = './resources/images/player/player.png'; // Update the image path
// Set the source of the player jump image.
Images.playerJump.src = './resources/images/player/JumpPic.png';
// Set the source of the enemy image.
Images.enemy.src = './resources/images/enemy/enemy.png'; // Update the image path

// set the source for the spikes image 
Images.obstacle.src = './resources/images/objects/spikes.png';

// Export the Images and AudioFiles objects so they can be imported and used in other modules.
export { Images, AudioFiles };
