import {SAVE_PLAYER_NAME, SAVE_ROOM_NAME} from "../constants";

const savePlayerName = (userName) => {
    return {
        type: SAVE_PLAYER_NAME,
        payload: userName
    }
}

const saveRoomName = (roomName) => {
    return {
        type: SAVE_ROOM_NAME,
        payload:roomName
    }
}

export {savePlayerName, saveRoomName}