Enemy = function(index,game,x,y) {

	this.enemy = game.add.sprite(x,y, 'enemy');
	this.enemy.anchor.setTo(0.5,0.5);
	this.enemy.name = index.toString();
	game.physics.enable(this.enemy,Phaser.Physics.ARCADE);
	this.enemy.body.immovable = true;
	this.enemy.body.collideWorldBounds = true;
	this.enemy.body.allowGravity = false;

	this.enemyTween = game.add.tween(this.enemy).to({y:this.enemy.y + 100}, 2000, 'Linear',true, 0,100,true);



};


var enemy1;

Game.Level1 = function(game){};

var map;
var layer;

var player;
var controls ={};
var playerSpeed = 150;
var jumpTimer = 0;

var shootTime = 0;
var bullets;




Game.Level1.prototype = {
	create: function(game) {
		this.stage.backgroundColor = '#000';

		this.physics.arcade.gravity.y = 1400;

		map = this.add.tilemap('map', 64,64);

		map.addTilesetImage('tilenew');

		layer = map.createLayer(0);
		layer.resizeWorld();

		map.setCollisionBetween(0,4,5);

		//now off tap //26,27

		map.setTileIndexCallback(27, this.resetPlayer, this);

		map.setTileIndexCallback(13, this.getCoin, this);		

		player = this.add.sprite(100,560, 'player');
		player.anchor.setTo(0.5,0.5);

		player.animations.add('idle', [0,1],1,true);
		player.animations.add('jump', [2],1,true);
		player.animations.add('run', [3,4,5,6,7,8],7,true);
		this.physics.arcade.enable(player);

		this.camera.follow(player);
		player.body.collideWorldBounds = true;

		controls = {
			right: this.input.keyboard.addKey(Phaser.Keyboard.D),
			left: this.input.keyboard.addKey(Phaser.Keyboard.A),
			up: this.input.keyboard.addKey(Phaser.Keyboard.W),
			shoot: this.input.keyboard.addKey(Phaser.Keyboard.UP)
		};


		enemy1 = new Enemy(0,game,player.x+400,player.y-200);

		bullets = game.add.group();
		bullets.enableBody =  true;
		bullets.physicsBodyType = Phaser.Physics.ARCADE;
		bullets.createMultiple(5,'bullet');

		bullets.setAll('anchor.x', 0.5);
		bullets.setAll('anchor.y', 0.5);

		bullets.setAll('scale.x', 0.5);
		bullets.setAll('scale.y', 0.5);

		bullets.setAll('outOfBoundsKill', true);
		bullets.setAll('checkWorldBounds', true);

	},

	update: function() {

		player.body.velocity.x = 0;

		this.physics.arcade.collide(player, layer);


		if(controls.right.isDown)
		{
			player.animations.play('run');
			player.scale.setTo(1,1);
			player.body.velocity.x += playerSpeed;
		}

		if(controls.left.isDown)
		{
			player.animations.play('run');
			player.scale.setTo(-1,1);
			player.body.velocity.x -= playerSpeed;
		}

		if(controls.up.isDown && (player.body.onFloor() || player.body.touching.down) && this.time.now > jumpTimer)
		{
			player.body.velocity.y = -600;
			jumpTimer = this.time.now +750;
			player.animations.play('jump');

		}

		if(controls.shoot.isDown)
		{
			this.ShootBullet();
		}

		if(checkOverlap(bullets,enemy1.enemy))
		{
			enemy1.enemy.kill();
		}



		if(player.body.velocity.x == 0 && player.body.velocity.y == 0)
		{
			player.animations.play('idle');
		}

		if(checkOverlap(player,enemy1.enemy))
		{
			this.resetPlayer();
		}

	},

	resetPlayer: function() {
		player.reset(100,500);
	},

	getCoin: function() {
		map.putTile(-1,layer.getTileX(player.x), layer.getTileY(player.y));
	},

	ShootBullet: function() {
		if(this.time.now > shootTime) 
		{
			bullet = bullets.getFirstExists(false);
			if(bullet)
			{
				bullet.reset(player.x,player.y);
				bullet.body.velocity.y = -600;

				shootTime = this.time.now +900;
			}
		}
	}
}

function checkOverlap(spriteA, spriteB) {
	var boundsA = spriteA.getBounds();
	var boundsB = spriteB.getBounds();

	return Phaser.Rectangle.intersects(boundsA,boundsB);
}