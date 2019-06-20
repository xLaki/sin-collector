// define variables
var game;
var player;
var platforms;
var badges;
var items;
var cursors;
var jumpButton;
var text;
var winningMessage;
var won = false;
var currentScore = 10;
var winningScore = 100;

// add collectable items to the game
function addItems() {
  items = game.add.physicsGroup();
  createItem(23, 77, 'coin');
  createItem(389, 475, 'coin');
  createItem(131, 545, 'coin');
  createItem(732, 304, 'coin');
  createItem(93, 182, 'coin');
  createItem(181, 114, 'coin');
  createItem(264, 400, 'coin');
  createItem(436, 315, 'coin');
  createItem(540, 490, 'coin');
  createItem(140, 550, 'poison');
  createItem(140, 525, 'poison');
  createItem(140, 500, 'poison');
  createItem(140, 475, 'poison');
  createItem(115, 475, 'poison');
  createItem(90, 475, 'poison');
  createItem(65, 475, 'poison');
  createItem(240, 570, 'poison');
  createItem(240, 390, 'poison');
  createItem(240, 240, 'poison');
  createItem(760, 570, 'poison');
  createItem(760, 545, 'poison');
  createItem(760, 520, 'poison');
  createItem(760, 495, 'poison');
  createItem(760, 470, 'poison');
  createItem(760, 445, 'poison');
  createItem(760, 420, 'poison');
  createItem(760, 395, 'poison');
  createItem(760, 370, 'poison');
  createItem(690, 190, 'poison');
  createItem(400, 300, 'poison');
  createItem(340, 460, 'poison');
  createItem(490, 300, 'poison');
  createItem(560, 420, 'poison');
  createItem(585, 420, 'poison');
  createItem(610, 420, 'poison');
  createItem(635, 420, 'poison');
}

// add platforms to the game
function addPlatforms() {
  platforms = game.add.physicsGroup();
  platforms.create(450, 450, 'platform');
  platforms.create(500, 450, 'platform');
  platforms.create(450, 465, 'platform');
  platforms.create(500, 465, 'platform');
  platforms.create(450, 480, 'platform');
  platforms.create(500, 480, 'platform');
  platforms.create(450, 495, 'platform');
  platforms.create(500, 495, 'platform');
  platforms.create(0, 0, 'platform');
  platforms.setAll('body.immovable', true);
}

// create a single animated item and add to screen
function createItem(left, top, image) {
  var item = items.create(left, top, image);
  item.animations.add('spin');
  item.animations.play('spin', 10, true);
}

// create the winning badge and add to screen
function createBadge() {
  badges = game.add.physicsGroup();
  var badge = badges.create(500, 50, 'badge');
  badge.animations.add('spin');
  badge.animations.play('spin', 10, true);
}

// when the player collects an item on the screen
function itemHandler(player, item) {
  item.kill();
  console.log(item.key);
  // add 10 if item is coin
  if (item.key == "coin"){
    currentScore = currentScore + 10;
  // subtract 999999999999 points if item is poison
  } else if (item.key == "poison"){
      currentScore = -999999999999999 + " if (jumpOnCoins){return instant success};"
      game.stage.backgroundColor = '#000000';
  }

  if (currentScore === winningScore) {
      createBadge();
  }
}

// when the player collects the badge at the end of the game
function badgeHandler(player, badge) {
  badge.kill();
  won = true;
}

// setup game when the web page loads
window.onload = function () {
  game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update, render: render });
  
  // before the game begins
  function preload() {
    game.stage.backgroundColor = '#260026';
    
    //Load images
    game.load.image('platform', 'assets/platform_1.png');
    
    //Load spritesheets
    game.load.spritesheet('player', 'assets/chalkers.png', 48, 62);
    game.load.spritesheet('coin', 'assets/coin.png', 36, 44);
    game.load.spritesheet('badge', 'assets/badge.png', 42, 54);
    game.load.spritesheet('poison', 'assets/poison.png', 32, 32);
  }

  // initial game set up
  function create() {
    player = game.add.sprite(50, 600, 'player');
    player.animations.add('walk');
    player.anchor.setTo(0.5, 1);
    game.physics.arcade.enable(player);
    player.body.collideWorldBounds = true;
    player.body.gravity.y = 500;

    addItems();
    addPlatforms();

    cursors = game.input.keyboard.createCursorKeys();
    jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    text = game.add.text(16, 16, "SCORE: " + currentScore, { font: "bold 24px Arial", fill: "white" });
    winningMessage = game.add.text(game.world.centerX, 275, "", { font: "bold 48px Arial", fill: "white" });
    winningMessage.anchor.setTo(0.5, 1);
  }

  // while the game is running
  function update() {
    text.text = "SCORE: " + currentScore;
    game.physics.arcade.collide(player, platforms);
    game.physics.arcade.overlap(player, items, itemHandler);
    game.physics.arcade.overlap(player, badges, badgeHandler);
    player.body.velocity.x = 0;

    // is the left cursor key presssed?
    if (cursors.left.isDown) {
      player.animations.play('walk', 10, true);
      player.body.velocity.x = -300;
      player.scale.x = - 1;
    }
    // is the right cursor key pressed?
    else if (cursors.right.isDown) {
      player.animations.play('walk', 10, true);
      player.body.velocity.x = 300;
      player.scale.x = 1;
    }
    // player doesn't move
    else {
      player.animations.stop();
    }
    
    if (jumpButton.isDown && (player.body.onFloor() || player.body.touching.down)) {
      player.body.velocity.y = -400;
    }
    // when the player winw the game
    if (won) {
      winningMessage.text = "How much time did you just waste?";
    }
  }

  function render() {

  }

};
