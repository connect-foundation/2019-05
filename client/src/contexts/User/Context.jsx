import React, { createContext, useReducer } from 'react';
import { playerReducer } from './Reducer';

const playerInitialState = {
  playerId: null,
};

const PlayerContext = createContext(playerInitialState);

const PlayerProvider = ({ children }) => {
  const [playerState, dispatch] = useReducer(playerReducer, playerInitialState);

  return (
    <PlayerContext.Provider value={{ playerState, dispatch }}>
      {children}
    </PlayerContext.Provider>
  );
};

export { PlayerContext, PlayerProvider };
