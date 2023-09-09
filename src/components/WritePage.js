import React, { useState, useCallback, useEffect } from "react";
import './WritePage.css';
import { useNavigate  } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {db} from "../Myfirebase"
import { collection, addDoc, getDocs } from "firebase/firestore";


const WritePage = ({ onInsert }) => {
    const navigate = useNavigate();
    const [inputTitle, setInputTitle] = useState("");
    const [inputValue, setInputValue] = useState("");
    const [inputPlace, setInputPlace] = useState("");
    const [maxNum, setMaxNum] = useState(0);
    const [startDate, setStartDate] = useState(new Date());

    useEffect(async () => {
        // db 뒤에 "techInfo"는 정보를 가져올 컬렉션 이름이다.
        const query = await getDocs(collection(db, "write_page")); 
        query.forEach((doc) => {
          console.log(doc.content, doc.data())
        });
      }, [])

    // useEffect(async () => {
    //     addDoc(collection(db, "write_page"), {contents: "데이터 저장 테스트"})
    //   }, [])

    const submit = (event) => {
        addDoc(collection(db, "write_page"), {contents: {inputTitle, inputValue, inputPlace, startDate, maxNum}})
        //등록 확인

        navigate("/MainPage");
    }

    return (
        <div className="top">
            <div className="top_tv">글 작성 페이지</div>
        <div className="writePage">

            <div className="title_tv">제목</div>
            <input className="title" placeholder='제목을 입력하세요.' value={inputTitle} onChange={(event) => {
                setInputTitle(event.target.value);
            }} />
            <div className="content_tv">내용</div>
            <input className="content" placeholder='내용을 입력하세요.' value={inputValue} onChange={(event) => {
                setInputValue(event.target.value);
            }} />
            <div className="place_tv">만남 장소</div>
            
            <input className="place" placeholder='만남 장소를 입력하세요.' value={inputPlace} onChange={(event) => {
                setInputPlace(event.target.value);
            }} />
            <div className="time_tv">만남 일시
            <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            timeInputLabel="Time:"
            dateFormat="yyyy/MM/dd h:mm aa"
            showTimeInput
            />
            </div>
            
            <div className="maxNum_tv">최대 인원</div>
            <div className="maxNum_set">
                <button className="maxNum_subtract" onClick={(event)=> {
                setMaxNum(maxNum -1)
                }} >-</button>
                <p value={maxNum}>{maxNum}</p>
            <button className="maxNum_add" onClick={(event)=> {
                setMaxNum(maxNum +1)
                }} >+</button>
            </div>
            
            <button className="submit-btn" type="submit" onClick={(event)=>{submit(event)}} >등록</button>
            </div>

        </div>
        
        
        
    )

}

export default WritePage;