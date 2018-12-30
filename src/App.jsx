import React, { Component } from "react";
import {connect} from 'react-redux';
import Box from "./components/Box";
import { firebaseConfig } from "./utils/firebaseConfig";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playerName:"player1",
      allRandom: [],
      howMany: 25,
      selectedBoxes: [],
      winRules: {
        //horizontal
        rule1: [0, 1, 2, 3, 4],
        rule2: [5, 6, 7, 8, 9],
        rule3: [10, 11, 12, 13, 14],
        rule4: [15, 16, 17, 18, 19],
        rule5: [20, 21, 22, 23, 24],

        //vertical
        rule6: [0, 5, 10, 15, 20],
        rule7: [1, 6, 11, 16, 21],
        rule8: [2, 7, 12, 17, 22],
        rule9: [3, 8, 13, 18, 23],
        rule10: [4, 9, 14, 19, 24],

        //diagonal
        rule11: [0, 6, 12, 18, 24],
        rule12: [4, 8, 12, 16, 20]
      },
      isWin: [],
      test: []
    };
    this.generateAllRandomNumbers = this.generateAllRandomNumbers.bind(this);
    this.generateUiBoxes = this.generateUiBoxes.bind(this);
    this.generateRandomNumber = this.generateRandomNumber.bind(this);
    this.checkIfNumIsUnique = this.checkIfNumIsUnique.bind(this);
    this.handleOnBoxClick = this.handleOnBoxClick.bind(this);
    this.checkTheWin = this.checkTheWin.bind(this);
  }
  componentDidMount = () => {
    console.log("bingo component");
    const {playerName, roomName} = this.props;
    this.generateAllRandomNumbers();
    console.log({playerName, roomName});

    var databaseRef = firebaseConfig
      .database()
      .ref()
      .child("object");
    databaseRef.on("value", snap => this.setState({ test: [snap.val()] }));
  };
  componentDidUpdate(prevProps, prevState) {
    // console.log("prevState", this.state.isWin, prevState.isWin);
    // alert("updating");
    if (this.state.isWin == prevState.isWin) {
      this.checkTheWin();
    }
    console.log("componentDidUpdate");

    var countTrues = 0;
    this.state.isWin.map((item, index) => {
      if (item === true) {
        countTrues++;
      }
    });
    if (countTrues == 5) {
      alert("you won");
    }
  }

  // shouldComponentUpdate(nextProps, nextState){
  //   console.log("shouldComponentUpdate", nextProps, nextState);
  //   if(nextState !== this.state)
  //   return true;
  // }
  // shouldComponentUpdate(){

  // }
  generateAllRandomNumbers() {
    for (let i = 1; i <= this.state.howMany; i++) {
      var random = this.generateRandomNumber(this.state.howMany - 1);
      var isUnique = this.checkIfNumIsUnique(random);
    }
    this.setState({ ...this.state, random });
  }
  generateRandomNumber(howMany) {
    return Math.floor(Math.random() * howMany) + 1;
  }

  checkIfNumIsUnique(num) {
    if (this.state.allRandom.indexOf(num) === -1) {
      this.state.allRandom.push(num);
      return true;
    }
    var generateAgain = this.generateRandomNumber(this.state.howMany);
    this.checkIfNumIsUnique(generateAgain);
  }

  handleOnBoxClick(e) {
    console.log(e.target.textContent);
    // console.log(
    //   "index value is ",
    //   this.state.allRandom.indexOf(parseInt(e.target.textContent))
    // );
    var indexOfSelected = this.state.allRandom.indexOf(
      parseInt(e.target.textContent)
    );
    this.setState({
      selectedBoxes: [...this.state.selectedBoxes, indexOfSelected]
    });

    this.setTheValueInFirebaseDatabase()
  }
  generateUiBoxes() {
    console.log("generateUiBoxes");
    var allBoxes = [];
    this.state.allRandom.forEach((item, index) => {
      if (this.state.selectedBoxes.indexOf(index) == -1) {
        allBoxes.push(
          <Box
            isSelected={false}
            onClick={e => this.handleOnBoxClick(e)}
            num={item}
            key={index}
          />
        );
      } else {
        allBoxes.push(
          <Box
            isSelected={true}
            onClick={e => this.handleOnBoxClick(e)}
            num={item}
            key={index}
          />
        );
      }
    });
    return allBoxes;
  }

  checkTheWin() {
    console.log("checkTheWin", this.state.selectedBoxes);
    if (this.state.selectedBoxes.length >= 5) {
      var winrules = this.state.winRules;
      var winSquence = [];
      var res = false;
      for (let key in winrules) {
        res = winrules[key].every((item, index) => {
          if (this.state.selectedBoxes.indexOf(item) !== -1) {
            return true;
          } else {
            return false;
          }
        });
        winSquence.push(res);
      }

      console.log("winSquence", winSquence);
      if (winSquence.length >= 5) {
        console.log("inside if");
        this.setState({
          isWin: [...winSquence]
        });
      }
    }
  }

  setTheValueInFirebaseDatabase = () => {
    const {roomName, playerName} = this.props;
    var playersRef = firebaseConfig.database().ref(`game/${roomName}/${playerName}`);

    playersRef.update({
      info: {
        allRandom: this.state.allRandom || [],
        howMany: this.state.howMany || 25,
        selectedBoxes: this.state.selectedBoxes || [],
      }
    })
    // playersRef.set({
    //   John: {
    //     number: 1,
    //     age: 30
    //   },

    //   Amanda: {
    //     number: 2,
    //     age: 20
    //   }
    // });
    playersRef.set({
      allRandom: [...this.state.allRandom],
      howMany: this.state.howMany,
      selectedBoxes: [...this.state.selectedBoxes],
    })
  };

  render() {
    console.log("test", this.state.test);
    console.log("selected box", this.state.isWin);
    return (
      <div className="App">
        <div className="bingo">
          {/* <pre>{this.state.test || "nothing"}</pre> */}
          <div className="game-wrapper">{this.generateUiBoxes()}</div>
        </div>
        <button onClick={() => window.location.reload()}>Generate new</button>
        <button onClick={this.setTheValueInFirebaseDatabase()}>click me</button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    playerName: state.playerInfo.playerName,
    roomName: state.playerInfo.roomName
  }
}

export default connect(mapStateToProps,null)(App);
