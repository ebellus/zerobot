// Commands:
//  hubot bamboo_list - Show all contents
//  hubot bamboo_post <Sentense> - Post your contents
//  hubot bamboo_reply <Contents num> <Sentense> - Reply sentense to one contents
//  hubot bamboo_show <Contents num> - Show Contents
//  hubot bamboo_on - Turn on bamboo
//  hubot bamboo_off - Turn off bamboo
module.exports = function(robot){   
	robot.respond(/bamboo_list/i, function(res){

		var length = robot.brain.bamboo_messagebox.length;
		for(i = 0; i < length; i++){
			res.send("num : " + robot.brain.bamboo_messagebox[i].no);
			res.send("contents : " + robot.brain.bamboo_messagebox[i].contents);
		}
	});    

	robot.respond(/bamboo_on/i, function(res){
		var temp = robot.brain.bamboo_userlist.indexOf( res.envelope.user.name );
		if( temp === -1 ){
			robot.brain.bamboo_userlist.push(res.envelope.user.name);
		}
		else{
			res.send( "이미 존재하는 이름입니다." );
		}
	});   
	robot.respond(/bamboo_off/i, function(res){
		var temp = robot.brain.bamboo_userlist.indexOf( res.envelope.user.name );
		if(temp === -1){
			res.send("존재하지 않는 이름입니다." );
		}
		else{
			robot.brain.bamboo_userlist.splice( temp,1 );
		}

	});   

	robot.respond(/bamboo_post (.*)/i, function(res){
		robot.brain.bamboo_messagebox.push({no : robot.brain.bamboo_messagebox.length,
			contents : res.match[1],
			reply_count : 0,
			reply : []
		});
		for(i = 0; i<robot.brain.bamboo_userlist.length; i++){
			var tempuser = robot.brain.bamboo_userlist[i];
			robot.messageRoom(tempuser,robot.brain.bamboo_messagebox.length - 1 + "번째 글이 올라왔습니다. 제목 : " + res.match[1]);
		} 
	});   
	robot.respond(/bamboo_reply ([0-9]*) (.*)/i, function(res){
		var number = parseInt(res.match[1]);
		var thread = robot.brain.bamboo_messagebox[number];
		var reply = res.match[2];

		thread.reply.push(reply);
		thread.reply_count++;

		for(i = 0; i<robot.brain.bamboo_userlist.length; i++){
			var tempuser = robot.brain.bamboo_userlist[i];
			robot.messageRoom(tempuser, "#" + number + " : " + reply );
		}
	});
	robot.respond(/bamboo_show (.*)/i, function(res){
		var number = parseInt(res.match[1]);
		var thread = robot.brain.bamboo_messagebox[number];
		res.send("#" + number + ":");
		res.send("contents : " + thread.contents);
		res.send("------------- Reply --------------");
		for(i = 0; i < thread.reply_count; i++){
			res.send("reply " + i + " : " + thread.reply[i]);
		}
	}); 
	if(robot.brain.bamboo_messagebox == undefined){
		robot.brain.bamboo_messagebox = [];
		messagebox = robot.brain.bamboo_messagebox;    
	}
	if(robot.brain.bamboo_userlist == undefined){
		robot.brain.bamboo_userlist = [];
	}  
}

