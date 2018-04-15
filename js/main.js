
$(document).ready(function () {

    displayCalendar(3, 2018);
    displayCalendar(4, 2018);
    displayCalendar(5, 2018);
    displayCalendar(6, 2018);
    displayCalendar(7, 2018);

    $('#btn').click(function() {
        var clicked = $('.active').hasClass("marked");
        if (!clicked) {
            $('.active').addClass("marked");
            let data = JSON.parse(localStorage.marked);
            data.push({
                'month': new Date().getMonth(),
                'day': new Date().getDate()
            })
            localStorage.marked = JSON.stringify(data);
        }
    })

});

function displayCalendar(m, y) {
    var cal = new Calendar(m, y);
    cal.generateHTML();

    $('#main').append(cal.getHTML());
}