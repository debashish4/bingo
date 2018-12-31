/* Import statements */
import React, { Component } from "react";
import { Route, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import App from "./App.jsx";
import { savePlayerName, saveRoomName } from "./actions";
import { firebaseConfig } from "./utils/firebaseConfig";
import "./login.css";

class Login extends Component {
  state = {
    roomName: "",
    playerName: ""
  };
  handleOnFormSubmit = e => {
    e.preventDefault();
  };
  goToBingoGamePage = e => {
    const { savePlayerName, saveRoomName } = this.props;
    var fireBaseDbref;
    fireBaseDbref = firebaseConfig
      .database()
      .ref(`game/${this.state.roomName}/${this.state.playerName}`);

    savePlayerName(this.state.playerName);
    saveRoomName(this.state.roomName);

    fireBaseDbref.update({
        playerName: this.state.playerName,
        roomName: this.state.roomName
    });
    this.props.history.push(`/bingo/game`);
  };
  componentDidMount = () => {
    var fb = firebaseConfig.database().ref("game/testing");
    
  };

  handleOnRoomNameChange = e => {
    this.setState({ roomName: e.target.value });
  };
  handleOnNameChange = e => {
    this.setState({ playerName: e.target.value });
  };
  render() {
    console.log("props", this.props);

    return (
      <div className="login-page">
        <Route exact path="/game" Component={App} />
        <Route exact path="/bingo" Component={Login} />
        <form
          className="pure-form pure-form-stacked"
          onSubmit={this.handleOnFormSubmit}
        >
          <fieldset>
            <label htmlFor="player-name">Enter your Name</label>
            <input
              type="text"
              id="player-name"
              placeholder="Enter your name"
              onChange={this.handleOnNameChange}
            />
          </fieldset>
          <fieldset>
            <label htmlFor="room-name">Room Name</label>
            <input
              type="text"
              id="room-name"
              placeholder="Enter room name"
              onChange={this.handleOnRoomNameChange}
            />
            <p className="button">
              <button
                type="button"
                className="pure-button pure-button-primary"
                onClick={this.goToBingoGamePage}
              >
                Create Room
              </button>
            </p>
            <p className="button">
              {/* <button type="button" className="pure-button pure-button-primary">
                Join Room
              </button> */}
            </p>
          </fieldset>
        </form>
      </div>
    );
  }
}

// const mapStateToProps = state => {
//   return {
//     playerName: state.playerName,
//     roomName: state.roomName
//   }
// }

export default connect(
  null,
  { savePlayerName, saveRoomName }
)(withRouter(Login));
// export default Login;
