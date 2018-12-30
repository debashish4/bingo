import { combineReducers, createStore } from "redux";
import { SAVE_PLAYER_NAME, SAVE_ROOM_NAME } from "../constants";

const playerInfoReducer = (playerInfo = {}, action) => {
  switch (action.type) {
    case SAVE_PLAYER_NAME:
      return { ...playerInfo, playerName: action.payload };
    case SAVE_ROOM_NAME:
      return { ...playerInfo, roomName: action.payload };
    default:
      return playerInfo;
  }
};

export default createStore(
  combineReducers({
    playerInfo: playerInfoReducer
  }), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
