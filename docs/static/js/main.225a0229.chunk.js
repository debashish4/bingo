(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{30:function(e,t,a){e.exports=a(57)},39:function(e,t,a){},50:function(e,t,a){},52:function(e,t,a){},55:function(e,t,a){},57:function(e,t,a){"use strict";a.r(t);var n=a(0),o=a.n(n),r=a(25),l=a.n(r),c=a(59),s=a(58),i=a(9),m=a(6),u=a(7),d=a(11),h=a(8),p=a(10),b=a(60),f=a(14),g=a(12),y=a(3),N=(a(39),function(e){function t(){var e;return Object(m.a)(this,t),(e=Object(d.a)(this,Object(h.a)(t).call(this))).state={},e}return Object(p.a)(t,e),Object(u.a)(t,[{key:"render",value:function(){console.log("ui box render");var e=this.props,t=e.num,a=e.onClick,n=e.isSelected;return o.a.createElement("div",{className:n?"chosen box":"box",onClick:a},t)}}]),t}(n.Component)),O=a(27),v=a.n(O),E=(a(46),v.a.initializeApp({apiKey:"AIzaSyDDRmhKcGal-1wH6Idsd5QQrBVBNGU8HMk",authDomain:"bingo-f671a.firebaseapp.com",databaseURL:"https://bingo-f671a.firebaseio.com",projectId:"bingo-f671a",storageBucket:"bingo-f671a.appspot.com",messagingSenderId:"122655200780"})),k=(a(50),function(e){function t(e){var a;return Object(m.a)(this,t),(a=Object(d.a)(this,Object(h.a)(t).call(this,e))).componentDidMount=function(){var e=a.props,t=e.playerName,n=e.roomName;a.generateAllRandomNumbers(),console.log({playerName:t,roomName:n}),E.database().ref().child("game/".concat(a.props.roomName)).on("value",function(e){var t=e.val();if(console.log("allPlayerInfo",t),t)for(var n in t.winnerMessage&&a.setState({winnerMessage:t.winnerMessage}),t)n!==a.props.playerName&&t[n].currentlySelected&&(console.log("what is key",n),console.log("other player no and its index in current player",t[n].currentlySelected,a.state.allRandom.indexOf(t[n].currentlySelected)),a.setState({selectedBoxes:Object(g.a)(a.state.selectedBoxes).concat([a.state.allRandom.indexOf(t[n].currentlySelected)]),selectedNumbers:Object(g.a)(a.state.selectedNumbers).concat([t[n].currentlySelected])},function(){a.checkTheWin()}))})},a.setTheValueInFirebaseDatabase=function(){var e=a.props,t=e.roomName,n=e.playerName;E.database().ref("game/".concat(t,"/").concat(n)).update({allRandom:Object(g.a)(a.state.allRandom),howMany:a.state.howMany,currentlySelected:a.state.currentlySelected,currentlySelectedIndex:a.state.currentlySelectedIndex})},a.redirectToLogin=function(){a.props.history.push("/bingo/")},a.winnerMessage=function(){return o.a.createElement("p",null,"Congrats! You won the match")},a.informOtherPlayer=function(){E.database().ref("game/".concat(a.props.roomName)).update({winnerMessage:"Your opponent won the match"})},a.state={allRandom:[],howMany:25,selectedBoxes:[],selectedNumbers:[],currentlySelected:null,currentlySelectedIndex:null,otherPlayerSelectedNumbers:[],winRules:{rule1:[0,1,2,3,4],rule2:[5,6,7,8,9],rule3:[10,11,12,13,14],rule4:[15,16,17,18,19],rule5:[20,21,22,23,24],rule6:[0,5,10,15,20],rule7:[1,6,11,16,21],rule8:[2,7,12,17,22],rule9:[3,8,13,18,23],rule10:[4,9,14,19,24],rule11:[0,6,12,18,24],rule12:[4,8,12,16,20]},isWin:[],isWinner:!1,blockRender:!1,winnerMessage:""},a.generateAllRandomNumbers=a.generateAllRandomNumbers.bind(Object(y.a)(Object(y.a)(a))),a.generateUiBoxes=a.generateUiBoxes.bind(Object(y.a)(Object(y.a)(a))),a.generateRandomNumber=a.generateRandomNumber.bind(Object(y.a)(Object(y.a)(a))),a.checkIfNumIsUnique=a.checkIfNumIsUnique.bind(Object(y.a)(Object(y.a)(a))),a.handleOnBoxClick=a.handleOnBoxClick.bind(Object(y.a)(Object(y.a)(a))),a.checkTheWin=a.checkTheWin.bind(Object(y.a)(Object(y.a)(a))),a}return Object(p.a)(t,e),Object(u.a)(t,[{key:"shouldComponentUpdate",value:function(e,t){return 1!=t.blockRender}},{key:"componentDidUpdate",value:function(e,t){this.setTheValueInFirebaseDatabase(),this.state.isWin==t.isWin&&this.checkTheWin(),console.log("componentDidUpdate");var a=0;this.state.isWin.map(function(e,t){!0===e&&a++}),5==a&&this.setState({isWinner:!0}),this.state.isWinner&&this.setState({blockRender:!0})}},{key:"generateAllRandomNumbers",value:function(){for(var e=1;e<=this.state.howMany;e++){var t=this.generateRandomNumber(this.state.howMany-1);this.checkIfNumIsUnique(t)}this.setState(Object(f.a)({},this.state,{random:t}))}},{key:"generateRandomNumber",value:function(e){return Math.floor(Math.random()*e)+1}},{key:"checkIfNumIsUnique",value:function(e){if(-1===this.state.allRandom.indexOf(e))return this.state.allRandom.push(e),!0;var t=this.generateRandomNumber(this.state.howMany);this.checkIfNumIsUnique(t)}},{key:"handleOnBoxClick",value:function(e){var t=parseInt(e.target.textContent),a=this.state.allRandom.indexOf(t);console.log("selectedNumber",t),this.setState({selectedBoxes:Object(g.a)(this.state.selectedBoxes).concat([a]),selectedNumbers:Object(g.a)(this.state.selectedNumbers).concat([t]),currentlySelected:t,currentlySelectedIndex:a})}},{key:"generateUiBoxes",value:function(){var e=this;console.log("generateUiBoxes");var t=[];return this.state.allRandom.forEach(function(a,n){-1==e.state.selectedNumbers.indexOf(a)?t.push(o.a.createElement(N,{isSelected:!1,onClick:function(t){return e.handleOnBoxClick(t)},num:a,key:n})):t.push(o.a.createElement(N,{isSelected:!0,onClick:function(t){return e.handleOnBoxClick(t)},num:a,key:n}))}),t}},{key:"checkTheWin",value:function(){var e=this;if(console.log("checkTheWin",this.state.selectedBoxes),this.state.selectedBoxes.length>=5){var t=this.state.winRules,a=[],n=!1;for(var o in t)n=t[o].every(function(t,a){return-1!==e.state.selectedBoxes.indexOf(t)}),a.push(n);console.log("winSquence",a),a.length>=5&&(console.log("inside if"),this.setState({isWin:a.concat()}))}}},{key:"componentWillUnmount",value:function(){var e=E.database().ref("game/".concat(this.props.roomName,"/"));e.off("value"),e.remove()}},{key:"render",value:function(){return console.log("test",this.state.playerTwoName),console.log("selected box",this.state.isWin),o.a.createElement("div",{className:"App"},o.a.createElement("div",{className:"bingo"},o.a.createElement("div",{className:"game-wrapper"},this.generateUiBoxes())),o.a.createElement("div",null,this.state.isWinner?this.winnerMessage():""),o.a.createElement("div",null,this.state.isWinner?o.a.createElement("button",{onClick:this.informOtherPlayer,className:"pure-button pure-button-primary"},"inform other user"):""),o.a.createElement("div",null,this.state.winnerMessage),o.a.createElement("button",{onClick:this.redirectToLogin,className:"new-game pure-button pure-button-primary"},"New Game"))}}]),t}(n.Component)),j=Object(i.b)(function(e){return{playerName:e.playerInfo.playerName,roomName:e.playerInfo.roomName}},null)(k),x=(a(52),function(e){function t(){var e,a;Object(m.a)(this,t);for(var n=arguments.length,o=new Array(n),r=0;r<n;r++)o[r]=arguments[r];return(a=Object(d.a)(this,(e=Object(h.a)(t)).call.apply(e,[this].concat(o)))).state={roomName:"",playerName:""},a.handleOnFormSubmit=function(e){e.preventDefault()},a.goToBingoGamePage=function(e){var t,n=a.props,o=n.savePlayerName,r=n.saveRoomName;t=E.database().ref("game/".concat(a.state.roomName,"/").concat(a.state.playerName)),o(a.state.playerName),r(a.state.roomName),t.update({playerName:a.state.playerName,roomName:a.state.roomName}),a.props.history.push("/bingo/game")},a.componentDidMount=function(){E.database().ref("game/testing")},a.handleOnRoomNameChange=function(e){a.setState({roomName:e.target.value})},a.handleOnNameChange=function(e){a.setState({playerName:e.target.value})},a}return Object(p.a)(t,e),Object(u.a)(t,[{key:"render",value:function(){return console.log("props",this.props),o.a.createElement("div",{className:"login-page"},o.a.createElement(s.a,{exact:!0,path:"/bingo/game",Component:j}),o.a.createElement(s.a,{exact:!0,path:"/bingo/",Component:t}),o.a.createElement("form",{className:"pure-form pure-form-stacked",onSubmit:this.handleOnFormSubmit},o.a.createElement("fieldset",null,o.a.createElement("label",{htmlFor:"player-name"},"Enter your Name"),o.a.createElement("input",{type:"text",id:"player-name",placeholder:"Enter your name",onChange:this.handleOnNameChange})),o.a.createElement("fieldset",null,o.a.createElement("label",{htmlFor:"room-name"},"Room Name"),o.a.createElement("input",{type:"text",id:"room-name",placeholder:"Enter room name",onChange:this.handleOnRoomNameChange}),o.a.createElement("p",{className:"button"},o.a.createElement("button",{type:"button",className:"pure-button pure-button-primary",onClick:this.goToBingoGamePage},"Create Room")),o.a.createElement("p",{className:"button"}))))}}]),t}(n.Component)),S=Object(i.b)(null,{savePlayerName:function(e){return{type:"SAVE_PLAYER_NAME",payload:e}},saveRoomName:function(e){return{type:"SAVE_ROOM_NAME",payload:e}}})(Object(b.a)(x)),w=a(13),R=Object(w.c)(Object(w.b)({playerInfo:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"SAVE_PLAYER_NAME":return Object(f.a)({},e,{playerName:t.payload});case"SAVE_ROOM_NAME":return Object(f.a)({},e,{roomName:t.payload});default:return e}}}),window.__REDUX_DEVTOOLS_EXTENSION__&&window.__REDUX_DEVTOOLS_EXTENSION__());a(55);console.log("store",R.getState()),l.a.render(o.a.createElement(i.a,{store:R},o.a.createElement(c.a,null,o.a.createElement("div",null,o.a.createElement(s.a,{exact:!0,path:"/bingo/game",component:j}),o.a.createElement(s.a,{exact:!0,path:"/bingo/",component:S})))),document.getElementById("root"))}},[[30,2,1]]]);
//# sourceMappingURL=main.225a0229.chunk.js.map