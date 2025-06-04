import {useCallback, useReducer, useRef,useState, useMemo} from "react";
import React from "react";
import Header from './component/Header.js';
import TodoEditor from './component/TodoEditor.js';
import TodoList from './component/TodoList.js';
import './App.css';
import TestComp from "./component/TestComp.js";

const mockTodo = [
  {
    id: 0,
    isDone: false,
    content: "React 공부하기",
    createdDate: new Date().getTime(),
  },
  {
    id:1,
    isDone: false,
    content: "빨래 넣기",
    createdDate: new Date().getTime(),
  },
  {
    id: 2,
    idDone: false,
    content: "노래 연습하기",
    createdDate: new Date().getTime(),
  },
];

function reducer(state, action){
  switch (action.type) {
    case "CREATE": {
      return [action.newItem, ...state];
    }
    case "UPDATE":{
      return state.map((it) => it.id === action.targetId ? {...it, isDone: !it.isDone,}: it);// 수정하는데 목적이 있지
    }
    case "DELETE":{
      return state.filter((it) => it.id !== action.targetId);//조건에 따라 제거하는데 목적이 있고고
    }
    default:
      return state;
  }
}

export const TodoStateContext = React.createContext();
export const TodoDispatchContext = React.createContext();


function App() {

  // const [todo, setTodo] = useState(mockTodo);
  const [todo, dispatch] = useReducer(reducer, mockTodo)
  const idRef = useRef(3);  


  const onCreate = (content) => {
    dispatch({
      type: "CREATE",
      newItem: {
        id: idRef.current,
        content,
        isDone: false,
        createdDate: new Date().getTime(),
      },
    });
    idRef.current += 1;
  };

  const onUpdate = useCallback((targetId) => {
    dispatch({
      type: "UPDATE",
      targetId,
    });
  },[]);

  const onDelete = useCallback((targetId) => {
    dispatch({type:"DELETE", targetId,});
  },[]);
  
  const memoizedDispatches = useMemo(() => {
    return {onCreate, onUpdate, onDelete};
  },[]);

  return (
    <div className="App">
      {/* <TestComp /> */}
      <Header />
      <TodoStateContext.Provider value={todo}>
        <TodoDispatchContext.Provider value={memoizedDispatches}>
          <TodoEditor />
          <TodoList />
        </TodoDispatchContext.Provider>
      </TodoStateContext.Provider>
      
      
    </div>
  );
}

export default App;
