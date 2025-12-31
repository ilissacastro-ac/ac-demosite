function date_time(id) {
    const now = new Date();

    // Convert local time → UTC → KST (UTC+9)
    const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
    const kst = new Date(utc + (9 * 60 * 60 * 1000));

    const year = kst.getFullYear();
    const month = kst.getMonth() + 1;
    const date = kst.getDate();

    const hours = kst.getHours();
    const minutes = kst.getMinutes();
    const seconds = kst.getSeconds();

    // Zero padding
    const mm = month < 10 ? "0" + month : month;
    const dd = date < 10 ? "0" + date : date;
    const hh = hours < 10 ? "0" + hours : hours;
    const mi = minutes < 10 ? "0" + minutes : minutes;
    const ss = seconds < 10 ? "0" + seconds : seconds;

    document.getElementById(id).textContent =
        `${year}년 ${mm}월 ${dd}일 ${hh}:${mi}:${ss}`;
}

window.addEventListener("load", function () {
    date_time("date_time");
    setInterval(function () {
        date_time("date_time");
    }, 1000);
});
