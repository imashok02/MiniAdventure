Game.Preloader = function() {
	this.preloadBar = null;

};

Game.Preloader.prototype = {
	preload: function() {

		this.preloadBar = this.add.sprite(this.world.centerX,this.world.centerY, 'preloaderBar');

		this.preloadBar.anchor.setTo(0.5,0.5);

		this.time.advancedTiming = true;

		this.load.setPreloadSprite(this.preloadBar);

		//Load All assets

		this.load.tilemap('map', "assets/one.csv");
		this.load.image('tilenew', "assets/tilenew.png");

		this.load.image('enemy', "assets/enemy.png");
		this.load.image('bullet', "assets/bullet.png");


		this.load.spritesheet('player', "assets/player.png", 24,26);
	},

	create: function() {
		this.state.start('Level1');
	}
}