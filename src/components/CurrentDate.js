import React from 'react';

const CurrentDate = () => {
    const todayTime = () => {
        let now = new Date();
        //현재 날짜 및 시간
        let todayYear = now.getFullYear();
        let todayMonth = now.getMonth() + 1;
        let todayDate = now.getDate();
        const week = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
        let dayOfWeek = week[now.getDay()];
        let hours = now.getHours();
        let minutes = now.getMinutes()<10 ? '0'+now.getMinutes() : now.getMinutes() ;
        return todayYear + '.' + todayMonth + '.' + todayDate + ' ' + dayOfWeek + ' ' + hours + ' : ' + minutes;
    }
    let currentDate = todayTime();
    return currentDate;
    // return (
    //     <div>
    //         {currentDate}
    //         {/* {todayTime().slice(0, 9)}
    //         <span>{todayTime().slice(9, 12)}</span>
    //         <span>{todayTime().slice(12,21)}</span> */}
    //     </div>
    // );
};
export default CurrentDate;