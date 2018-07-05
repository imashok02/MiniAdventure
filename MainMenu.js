Game.MainMenu = function(game) {

};

var titlescreen;

Game.MainMenu.prototype = {

	create: function(game) {

		this.createButton(game,"Play", game.world.centerX,game.world.centerY + 50, 250, 50,
			function() {
				this.state.start('Level1');
			});

		this.createButton(game,"About", game.world.centerX,game.world.centerY + 100, 250, 50,
			function() {
				console.log('About');
			});

		titlescreen = game.add.sprite(game.world.centerX,game.world.centerY - 192, 'titlescreen');
		titlescreen.anchor.setTo(0.5,0.5);	
	},

	update: function(game) {

	},


	createButton: function(game,string, x, y, w, h, callback) {

		var button = game.add.button(x,y,'button',callback, this,2,1,0);

		button.anchor.setTo(0.5,0.5);
		button.width = w;
		button.height = h;

		var txt = game.add.text(button.x,button.y,string,{font:"14px Arial", fill:"#fff", align:"center"});

		txt.anchor.setTo(0.5,0.5);	
	}

}
