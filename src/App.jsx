import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Box from "./components/Box";
import { firebaseConfig } from "./utils/firebaseConfig";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allRandom: [],
      howMany: 25,
      selectedBoxes: [],
      selectedNumbers: [],
      currentlySelected: null,
      currentlySelectedIndex: null,
      otherPlayerSelectedNumbers: [],
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
      isWinner: false,
      blockRender: false,
      winnerMessage: ""
    };
    this.generateAllRandomNumbers = this.generateAllRandomNumbers.bind(this);
    this.generateUiBoxes = this.generateUiBoxes.bind(this);
    this.generateRandomNumber = this.generateRandomNumber.bind(this);
    this.checkIfNumIsUnique = this.checkIfNumIsUnique.bind(this);
    this.handleOnBoxClick = this.handleOnBoxClick.bind(this);
    this.checkTheWin = this.checkTheWin.bind(this);
  }
  componentDidMount = () => {
    const { playerName, roomName } = this.props;
    this.generateAllRandomNumbers();
    console.log({ playerName, roomName });

    // var databaseRef = firebaseConfig
    //   .database()
    //   .ref()
    //   .child("object");
    // databaseRef.on("value", snap => this.setState({ test: [snap.val()] }));

    var fireBaseDbref = firebaseConfig.database().ref();
    // fireBaseDbref.child(`game/${this.state.roomName}/`).on("value", snap => console.log("updated status is", snap.val()));

    fireBaseDbref.child(`game/${this.props.roomName}`).on("value", snap => {
      var allPlayerInfo = snap.val();
      console.log("allPlayerInfo", allPlayerInfo);
      if (allPlayerInfo) {
        if (allPlayerInfo.winnerMessage) {
          this.setState({
            winnerMessage: allPlayerInfo.winnerMessage
          });
        }
        for (let key in allPlayerInfo) {
          if (key !== this.props.playerName) {
            if (allPlayerInfo[key].currentlySelected) {
              console.log("what is key", key);
              //  if(allPlayerInfo[key].selectedBoxes){
              console.log(
                "other player no and its index in current player",
                allPlayerInfo[key].currentlySelected,
                this.state.allRandom.indexOf(
                  allPlayerInfo[key].currentlySelected
                )
              );
              this.setState(
                {
                  selectedBoxes: [
                    ...this.state.selectedBoxes,
                    this.state.allRandom.indexOf(
                      allPlayerInfo[key].currentlySelected
                    )
                  ],
                  selectedNumbers: [
                    ...this.state.selectedNumbers,
                    allPlayerInfo[key].currentlySelected
                  ]
                },
                () => {
                  this.checkTheWin();
                }
              );
            }
            //  }
          }
        }
      }
    });
  };

  shouldComponentUpdate(nextProps, nextState) {
    if (nextState.blockRender == true) {
      return false;
    }
    return true;
  }
  componentDidUpdate(prevProps, prevState) {
    // console.log("prevState", this.state.isWin, prevState.isWin);
    // alert("updating");
    // () => {this.setTheValueInFirebaseDatabase()}
    this.setTheValueInFirebaseDatabase();
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
      // alert("you won");
      this.setState({
        isWinner: true
      });
    }
    if (this.state.isWinner) {
      this.setState({
        blockRender: true
      });
    }
  }

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
    let selectedNumber = parseInt(e.target.textContent);
    // console.log(
    //   "index value is ",
    //   this.state.allRandom.indexOf(parseInt(e.target.textContent))
    // );
    var indexOfSelected = this.state.allRandom.indexOf(selectedNumber);
    console.log("selectedNumber", selectedNumber);
    this.setState({
      selectedBoxes: [...this.state.selectedBoxes, indexOfSelected],
      selectedNumbers: [...this.state.selectedNumbers, selectedNumber],
      currentlySelected: selectedNumber,
      currentlySelectedIndex: indexOfSelected
    });
  }
  generateUiBoxes() {
    console.log("generateUiBoxes");
    var allBoxes = [];
    this.state.allRandom.forEach((item, index) => {
      if (this.state.selectedNumbers.indexOf(item) == -1) {
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
    const { roomName, playerName } = this.props;
    var playersRef = firebaseConfig
      .database()
      .ref(`game/${roomName}/${playerName}`);

    playersRef.update({
      allRandom: [...this.state.allRandom],
      howMany: this.state.howMany,
      // selectedBoxes: [...this.state.selectedBoxes],
      // selectedNumbers:[...this.state.selectedNumbers],
      currentlySelected: this.state.currentlySelected,
      currentlySelectedIndex: this.state.currentlySelectedIndex
    });
  };

  redirectToLogin = () => {
    this.props.history.push(`/login`);
  };

  winnerMessage = () => {
    // if (this.state.isWinner) {
    //   this.setState({
    //     blockRender: true
    //   });
    // }
    return <p>Congrats! You won the match</p>;
  };

  informOtherPlayer = () => {
    var playersRef = firebaseConfig
      .database()
      .ref(`game/${this.props.roomName}`);

    playersRef.update({
      winnerMessage: "Your opponent won the match"
    });
  };

  componentWillUnmount() {
    var roomRef = firebaseConfig
    .database()
    .ref(`game/${this.props.roomName}/`);
    roomRef.off("value");
    roomRef.remove();
  }


  render() {
    console.log("test", this.state.playerTwoName);
    console.log("selected box", this.state.isWin);
    return (
      <div className="App">
        <div className="bingo">
          {/* <pre>{this.state.test || "nothing"}</pre> */}
          <div className="game-wrapper">{this.generateUiBoxes()}</div>
        </div>
        <div>{this.state.isWinner ? this.winnerMessage() : ""}</div>
        <div>
          {this.state.isWinner ? (
            <button
              onClick={this.informOtherPlayer}
              className="pure-button pure-button-primary"
            >
              inform other user
            </button>
          ) : (
            ""
          )}
        </div>
        <div>{this.state.winnerMessage}</div>
        <button
          onClick={this.redirectToLogin}
          className="new-game pure-button pure-button-primary"
        >
          New Game
        </button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    playerName: state.playerInfo.playerName,
    roomName: state.playerInfo.roomName
  };
};

export default connect(
  mapStateToProps,
  null
)(App);
