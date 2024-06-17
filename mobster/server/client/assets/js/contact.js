var mobile = 'desktop';
if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    // true for mobile device
    mobile = 'mobile';
}

var queryString = location.search;
const urlParams = new URLSearchParams(queryString);
const utm = urlParams.get("utm");


// Sam pading value to start with 0. eg: 01, 02, .. 09, 10, ..
function padValue(value) {
    return (value < 10) ? "0" + value : value;
}

function getTimeStamp() {
    const date = new Date();

    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    const formattedDate = `${padValue(year)}-${padValue(month)}-${padValue(day)} ${padValue(hours)}:${padValue(minutes)}:${padValue(seconds)}`;

    return formattedDate;
}

// 쿠키에서 값을 가져오는 함수
function getCookieValue(name) {
    const value = "; " + document.cookie;
    const parts = value.split("; " + name + "=");
    if (parts.length === 2) {
        return parts.pop().split(";").shift();
    }
}

  // 쿠키에 값을 저장하는 함수
function setCookieValue(name, value, days) {
    let expires = "";
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

function getUVfromCookie() {
    // 6자리 임의의 문자열 생성
    const hash = Math.random().toString(36).substring(2, 8).toUpperCase();
    // 쿠키에서 기존 해시 값을 가져옴
    const existingHash = getCookieValue("user");
    // 기존 해시 값이 없으면, 새로운 해시 값을 쿠키에 저장
    if (!existingHash) {
        setCookieValue("user", hash, 180); // 쿠키 만료일은 6개월 
        return hash;
    } else {
        // 기존 해시 값이 있으면, 기존 값을 반환
        return existingHash;
    }
}

/* data를 만들 땐 모든 field가 들어 있어야 함 */
var data = JSON.stringify(
            {"id": getUVfromCookie(),
        "landingUrl":window.location.href, 
        "ip":ip, 
        "referer":document.referrer,
        "time_stamp":getTimeStamp(), 
        "utm":utm,
        "device":mobile});


$(document).ready(function () {
    /*
    $.ajax({
        url: 'https://script.google.com/macros/s/AKfycbxdIL7qepDjqI28PrFc8AmpiDJ5to0dT7F9NfHQdoHqGvR6eXbISRoqSg1yb6YnDmhHUg/exec?action=insert&id=id&table=tab_master&data='+data,
        dataType: 'jsonp',
        success: function (data) {
      console.log('성공 - ', JSON.stringify(data));
        },
        error: function (xhr) {
      console.log('실패 - ', JSON.stringify(xhr));
        }
    });
    */

    axios.get('https://script.google.com/macros/s/AKfycbzd1m6tylQ9ZATVeHcbFySQvDeOvm2vuV87lzdl94z8wWc-45wRWDMUNZ748d6YVSBc6A/exec?action=insert&table=log&data='+data)
    .then(response => {
        console.log(JSON.stringify(response));
    });
});


$("#submit").on("click", function () {

    const email = $("#email").val();
    const advice = $("#message").val();
    const name = $("#name").val();
    const phone = $("#phone").val();

    function validateEmail(email) {
        var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
        return re.test(email);
    }

    if (email == '' || !validateEmail(email)) {
        alert("이메일이 유효하지 않아 알림을 드릴 수가 없습니다. ");
        return;
    }

    var finalData = JSON.stringify({
        "id": getUVfromCookie(),
        "email": email,
        "advice": advice,
        "number": 5,
        "name": name,
        "phone": phone,
    })

    $.busyLoadFull("show");

    axios.get('https://script.google.com/macros/s/AKfycbzd1m6tylQ9ZATVeHcbFySQvDeOvm2vuV87lzdl94z8wWc-45wRWDMUNZ748d6YVSBc6A/exec?action=insert&table=log_user&data=' + finalData)
    .then(response => {
        console.log(response.data.data);
        $.busyLoadFull("hide");
        $('#email').val('');
        $('#message').val('');
        $('#name').val('')
        $('#phone').val('');
        $.fn.simplePopup({ type: "html", htmlSelector: "#popup" });
    })
});

const url_backend = 'https://2339-35-187-234-156.ngrok-free.app';

$("#API-BUTTON").on('click', function(){

    const formData = new FormData();

    // var data = JSON.stringify({"data":"data"});
    var data = JSON.stringify({"data":"yonsei"});
    var data_str = $("#message").val();

    formData.append('data', data_str);
    formData.append('request', data);

    axios.post(url_backend+"/data", formData, {
        headers : {
            'Content-Type' : 'multipart/form-data'
        }
    })
    .then(response=> {
        console.log(JSON.stringify(response));
        $("#API-RESULT").text(JSON.stringify(response['data']['string'])+response['data']['json']);
    })
    .catch(error => {
        alert(error);
    })
});