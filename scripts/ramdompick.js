// Commands:
//  hubot <결정장애> <ex1,ex2,***,exN> - Random pick
module.exports = function(robot){   
	robot.respond(/<결정장애> (.*)/i, function(res){
		var list = res.match[1]
		var parsing = list.split(",");
		var randomNumber = Math.floor(Math.random()*parsing.length);
		res.send("Selected content : " + parsing[randomNumber] );
	}); 
}
