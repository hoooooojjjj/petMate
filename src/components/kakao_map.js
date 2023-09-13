import React, { useEffect, useState } from "react";
import WritePage from './WritePage';
import { db } from "../Myfirebase";
import { collection, addDoc, getDocs } from "firebase/firestore";

const { kakao } = window;

const KakaoMap = ({onReturnPlaceChange}) => {
  const [place, setPlace] = useState("");
  const [returnPlace, setReturnPlace] = useState("ㅜㅜ");

  useEffect(() => {
    var infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });

    var mapOption = {
      center: new kakao.maps.LatLng(37.566826, 126.9786567),
      level: 3,
    };

    var map = new kakao.maps.Map(document.getElementById("map"), mapOption);

    var ps = new kakao.maps.services.Places();

    if (place) {
      ps.keywordSearch(place, placesSearchCB);
    }

    function placesSearchCB(data, status, pagination) {
      if (status === kakao.maps.services.Status.OK) {
        var bounds = new kakao.maps.LatLngBounds();

        for (var i = 0; i < data.length; i++) {
          displayMarker(data[i]);
          bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
        }

        map.setBounds(bounds);
      }
    }

    function displayMarker(place) {
      var marker = new kakao.maps.Marker({
        map: map,
        position: new kakao.maps.LatLng(place.y, place.x),
      });

      kakao.maps.event.addListener(marker, "click", function () {
        infowindow.setContent(
          '<div style="padding:5px;font-size:12px;">' +
          place.place_name +
          "</div>"
        );
        infowindow.open(map, marker);
        setReturnPlace(place.place_name)
        onReturnPlaceChange(place.place_name)
        console.log(place.place_name)
      });

    }
  }, [place, onReturnPlaceChange]);

  return (
    <div className="map_wrap">
      <div style={{ margin: 10 }}>장소: {returnPlace}</div>

      <input
        className="searchPlace"
        placeholder="장소를 검색하세요."
        value={place}
        onChange={(event) => {
          setPlace(event.target.value);
        }}
        style={{
          margin: '10px 0 0 0',
          fontSize: '15px',
        }}
      />
      <p>장소 클릭 시 해당 장소가 저장됩니다.</p>

      <div
        id="map"
        style={{
          width: "80%",
          height: "300px",
          position: "relative",
          overflow: "hidden",
        }}
      ></div>
    </div>
  );
}

export default KakaoMap;
