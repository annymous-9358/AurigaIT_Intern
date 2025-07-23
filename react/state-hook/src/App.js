import './App.css';
// import DataFetching from './compponents/useEffect/DataFetching';
// import IntervalClassCounter from './compponents/useEffect/IntervalClassCounter';
// import IntervalHookCounter from './compponents/useEffect/IntervalHookCounter';
// import ClassCounter1 from './compponents/useEffect/ClassCounter1';
// import ClassMouse from './compponents/useEffect/ClassMouse';
// import HookMouse from './compponents/useEffect/HookMouse';
// import MouseContainer from './compponents/useEffect/MouseContainer';
// import HookCounter1 from './compponents/useEffect/HookCounter1';
// import HookCounter from './compponents/useState/HookCounter';
// import HookCounter2 from './compponents/useState/HookCounter2';
// import HookCounter3 from './compponents/useState/HookCounter3';
// import HookCounter4 from './compponents/useState/HookCounter4';
// import ComponentC from './compponents/useContext/ComponentC';
import Greeting from './compponents/useState/Greeting';

import React from 'react';
// import ParentComponent from './compponents/useCallback/ParentComponent';

export const UserContext = React.createContext();
export const ChannelContext = React.createContext();

function App() {
  return (
    <div className="App">
      < Greeting />
      {/* <UserContext.Provider value={'Kunik'}>
        <ChannelContext.Provider value={'Channel-1'}>
          <ComponentC />
        </ChannelContext.Provider>
      </UserContext.Provider> */}
      {/* <IntervalHookCounter /> */}
      {/* <DataFetching/> */}
     {/* <ClassCounter1 /> */}
      {/* <HookCounter1 /> */}
      {/* <ClassMouse /> */}
      {/* <HookMouse /> */}
      {/* <MouseContainer /> */}
    </div>
  );
}

export default App;
