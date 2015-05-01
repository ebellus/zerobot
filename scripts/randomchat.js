// Commands:
//  hubot <중재> - Print KoreanSong to clamdown
//  hubot randomchat_on -Turn on randomchatting 
//  hubot randomchat_off - Trun off randomchatting
//  hubot randomchat <Sentense> - Post your contents
module.exports = function(robot){   

	if(robot.brain.bamboo_randomchatlist == undefined){
		robot.brain.bamboo_randomchatlist = [];
	} 

	robot.respond(/<중재>/i, function(res){
		res.send("우리 분위기도 식힐겸 잠시 애국가나 읽으면서 쉬어가도록 해요");
		res.send("1 \n 동해물과 백두산이 \n마르고 닳도록 \n하느님이 보우하사 \n우리나라 만세. \n무궁화 삼천리 화려강산 \n대한 사람, 대한으로 \n길이 보전하세");
		res.send("2 \n 남산 위에 저 소나무, \n철갑을 두른 듯 \n바람서리 불변함은 \n우리 기상일세. \n무궁화 삼천리 화려강산 \n대한 사람, 대한으로 \n길이 보전하세");
		res.send("3 \n 가을 하늘 공활한데 \n높고 구름 없이 \n밝은 달은 우리 가슴 \n일편단심일세. \n무궁화 삼천리 화려강산 \n대한 사람, 대한으로 \n길이 보전하세");
		res.send("4 \n 이 기상과 이 맘으로 \n충성을 다하여 \n괴로우나 즐거우나 \n나라 사랑하세. \n무궁화 삼천리 화려강산 \n대한 사람, 대한으로 \n길이 보전하세");
	}); 

	robot.respond(/randomchat_on/i, function(res){
		var temp = robot.brain.bamboo_randomchatlist.indexOf( res.envelope.user.name );
		if( temp === -1 ){
			robot.brain.bamboo_randomchatlist.push(res.envelope.user.name);
		}
		else{
			res.send( "이미 존재하는 이름입니다." );
		}
	});  
	
	robot.respond(/randomchat_off/i, function(res){
		var temp = robot.brain.bamboo_randomchatlist.indexOf( res.envelope.user.name );
		if(temp === -1){
			res.send("존재하지 않는 이름입니다." );
		}
		else{
			robot.brain.bamboo_randomchatlist.splice( temp,1 );
		}

	});    

	robot.respond(/randomchat (.*)/i, function(res){

		for(i = 0; i<robot.brain.bamboo_randomchatlist.length; i++){
			var tempuser = robot.brain.bamboo_randomchatlist[i];
			robot.messageRoom(tempuser, "랜덤 채팅 : " + res.match[1]);
		}
	});  
}
