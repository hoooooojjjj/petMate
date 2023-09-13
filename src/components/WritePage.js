import React, { useState, useCallback, useEffect } from "react";
import "./WritePage.css";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { db } from "../Myfirebase";
import { collection, addDoc, getDocs } from "firebase/firestore";
import CurrentDate from './CurrentDate';
import { useLocation } from "react-router";
import KakaoMap from './kakao_map';

// const MyContext = React.createContext();

const WritePage = ({ onInsert }) => {
    const navigate = useNavigate();
    const [inputTitle, setInputTitle] = useState("");
    const [inputValue, setInputValue] = useState("");
    const [inputPlace, setInputPlace] = useState("");
    const [maxNum, setMaxNum] = useState(0);
    const [startDate, setStartDate] = useState(new Date());
    const [submitTime, setSubmitTime] = useState(CurrentDate);

    const [returnPlace, setReturnPlace] = useState("");

    const handleReturnPlaceChange = (newReturnPlace) => {
        setReturnPlace(newReturnPlace);
    };

    // const data = useContext(MyContext);
    // console.log(data)

    const { state } = useLocation();
    const [userId, setUserId] = useState("");
    // console.log(state);
    if (state === null) {
        window.alert("재로그인이 필요합니다.");
        navigate("/signin");

      } else {
        setUserId(state);
      }


    // destroy 오류 해결
    // const getData = async () => {
    //     const query = await getDocs(collection(db, "write_page"));
    //     query.forEach((doc) => {
    //         console.log(doc.content, doc.data());
    //     });
    // };

    // useEffect(() => {
    //     getData();
    // }, []);

    // useEffect(async () => {
    //     addDoc(collection(db, "write_page"), {contents: "데이터 저장 테스트"})
    //   }, [])

    const submit = (event) => {
        addDoc(collection(db, "write_page"), {
            contents: { inputTitle, inputValue, inputPlace, startDate, maxNum, submitTime, userId, returnPlace },
            comments: [],
        })


        navigate("/MainPage");
    };

    return (
        <div className="top">
            <h2 className="top_tv">모집하기</h2>

            <div className="writePage">
                <input
                    className="title"
                    placeholder="제목을 입력하세요."
                    value={inputTitle}
                    onChange={(event) => {
                        setInputTitle(event.target.value);
                    }}
                />

                <input
                    className="content"
                    placeholder="내용을 입력하세요."
                    value={inputValue}
                    onChange={(event) => {
                        setInputValue(event.target.value);
                    }}
                />

                <input
                    className="place"
                    placeholder="자세한 만남 장소를 입력하세요."
                    value={inputPlace}
                    onChange={(event) => {
                        setInputPlace(event.target.value);
                    }}
                />
                <KakaoMap onReturnPlaceChange={handleReturnPlaceChange} />

                <div className="time_tv">만남 일시</div>
                <DatePicker
                    className="time"
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    timeInputLabel="Time:"
                    dateFormat="yyyy/MM/dd h:mm aa"
                    showTimeInput
                />

                <div className="maxNum_tv">최대 인원</div>
                <div className="maxNum_set">
                    <button className="maxNum_subtract"
                        onClick={(event) => {
                            setMaxNum(maxNum - 1);
                        }}>
                        -
                    </button>
                    <p value={maxNum}>{maxNum}</p>
                    <button className="maxNum_add"
                        onClick={(event) => {
                            setMaxNum(maxNum + 1);
                        }}>
                        +
                    </button>
                </div>

                <button className="submit-btn" type="submit"
                    onClick={(event) => {
                        submit(event);
                    }}>
                    등록
                </button>

            </div>

        </div>
    );
};

export default WritePage;