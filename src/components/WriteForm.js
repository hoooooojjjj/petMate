import React, { useState, useCallback } from "react";
import './WriteForm.css';

const InsertForm = ({ onInsert }) => {
    const [inputTitle, setInputTitle] = useState("");
    const [inputValue, setInputValue] = useState("");
    // const handleSubmit = useCallback((event) => {
    //     event.preventDefault(); // 기본적인 HTML 동작으로 인해 페이지가 새로고침 되는 것을 방지
    //     if(typeof onInsert === "function" && inputValue) { // onInsert가 정상적인 함수인 지 확인하여 에러 방지
    //         onInsert(inputValue);
    //     }
    //     setInputValue("");
    // },[onInsert, inputValue])

    return (
        <div>
            <div className="top">글 작성 페이지</div>
            <div className="title_tv">제목</div>
            <input className="title" value={inputValue} onChange={(event) => {
                setInputTitle(event.target.value);
            }} />
            
            <input className="content" value={inputValue} onChange={(event) => {
                setInputValue(event.target.value);
            }} />
            <button className="submit-btn" type="submit" >등록</button>
        
        </div>
        
        
        
    )

}

export default InsertForm;