import '../TodoItem.css'
import React, { useContext } from 'react';
import { TodoContext, TodoDispatchContext } from '../App';

const TodoItem= ({id, content, idDone, createdDate}) =>{

    const {onUpdate, onDelete} = useContext(TodoDispatchContext);
    
    console.log(`${id} TodoItem 업데이트`);

    const onChangeCheckbox = () => {//함수 안에 함수를 정의..
        onUpdate(id);
    };
    const onClickDelete = () => {
        onDelete(id); // 굳이 이렇게 한번 메소드로 덮어서 쓰는 이유가.. 태그의 이벤트 함수로 등록할때 괄호까지 붙여서 넣으면, 이벤트랑 상관업싱 렌더링 될 때 실행되어서 그랬다. 
    }
    return(
        <div className="TodoItem">
            <div className="checkbox_col">
                <input onChange={onChangeCheckbox} checked={idDone} type="checkbox" />
            </div>
            <div className="title_col">{content}</div>
            <div className="date_col">{new Date(createdDate).toLocaleDateString()}</div>
            <div className="btn_col">
                <button onClick={onClickDelete}>삭제</button>
            </div>
        </div>
    )
}

export default React.memo(TodoItem);