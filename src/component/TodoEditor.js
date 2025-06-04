import { TodoContext, TodoDispatchContext } from "../App";
import "../TodoEditor.css";
import { useState, useRef, useContext } from "react";


const TodoEditor = () => {

    const {onCreate}= useContext(TodoDispatchContext);
    const [content, setContent] = useState("");
    const inputRef = useRef();

    const onKeyDown = (e) => {
        if(e.keyCode===13){
            onSubmit();
        }
    };

    const onChangeContent = (e) => {
        setContent(e.target.value);//content가 변하면 바로 화면에 적용하기 위한 state<- 이렇게 안 하면 화면에 그려지지도 않는다. good
    };

    const onSubmit = () => {
        if(!content){
            inputRef.current.focus();
            return;
        }
        onCreate(content);
        setContent("");
    };

    return (
    <div className = "TodoEditor">
        <h4>새로운 Todo 작성하기 ✏️</h4> 
        <div className="editor_wrapper">
            <input value={content}
            ref={inputRef}
            onChange={onChangeContent}
            onKeyDown={onKeyDown}
            placeholder="새로운 Todo..." />
            <button onClick={onSubmit}>추가</button>    
        </div>   
    </div>
    );
};

export default TodoEditor;