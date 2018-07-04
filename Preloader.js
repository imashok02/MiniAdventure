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

		this.load.tilemap('map', "assets/wo.csv");
		this.load.image('tileset', "assets/tileset.png");

		this.load.spritesheet('player', "assets/player.png", 24,26);
	},

	create: function() {
		this.state.start('Level1');
	}
}