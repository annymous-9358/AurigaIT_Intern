// import logo from './logo.svg';
import './App.css';
import { ChildA } from './component/Context/ContextChildren';
import { ContextParent } from './component/Context/ContextParent';
// import { Parent } from './component/Parent Child/Parent';
// import { ObjectUseState } from './component/Immutable State/ObjectUseState';
// import { UseReducer } from './component/UseReducer/UseReducer';
// import UseState from './component/UseState';
// import { ArrayUseState } from './component/Immutable State/ArrayUseState';

function App() {
  return (
    <div className="App">
     {/* <UseState /> */}
     {/* <UseReducer /> */}
     {/* <ObjectUseState /> */}
     {/* <ArrayUseState /> */}
     {/* <Parent /> */}
       <ContextParent >
        <ChildA />
       </ContextParent>

    </div>
  );
}

export default App;
