const months = ['January', 'February', 'March', 'April',
    'May', 'June', 'July', 'August', 'September',
    'October', 'November', 'December'];

const days_in_month = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

const weekdays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

const d = new Date();

const storage = JSON.parse(localStorage.marked);

class Calendar {
    constructor(month, year) {
        this.month = month;
        this.year = year;
        this.html = '';
        this.activeMonth = false;
    }

    generateHTML() {
        // get first day of month
        var firstDay = new Date(this.year, this.month, 1);
        var startingDay = firstDay.getDay();

        // find number of days in month
        var monthLength = days_in_month[this.month];

        // generate cal header
        var monthName = months[this.month]
        // active month?
        if (d.getMonth() === this.month){
            this.activeMonth = true;
        }

        var html = '<div class="col-12 col-lg-6 col-xl-4"><div class="cal"><div class="header">'
        html += '<h3>' + monthName + '</h3>';
        html += '</div><div class="body"><table><tbody><tr class="weekdays">'
        for (var i = 0; i <= 6; i++) {
            html += '<td>';
            html += weekdays[i];
            html += '</td>';
        }
        html += '</tr><tr>';


        // generate cal days
        var day = 1;
        // this loop is for is weeks (rows)
        for (var i = 0; i < 9; i++) {
            // this loop is for weekdays (cells)
            for (var j = 0; j <= 6; j++) {
                var o = {
                    'month': this.month,
                    'day': day
                }
                if (d.getDate() === day && this.activeMonth && dateExists(storage, o)) {
                    html += '<td class="active marked"><span>';
                } else if (d.getDate() === day && this.activeMonth) {
                    html += '<td class="active"><span>';
                } else if (dateExists(storage, o)) {
                    html += '<td class="marked"><span>';
                } else {
                    html += '<td><span>';
                }
                if (day <= monthLength && (i > 0 || j >= startingDay)) {
                    html += day;
                    day++;
                }
                html += '</span></td>';
            }
            // stop making rows if we've run out of days
            if (day > monthLength) {
                break;
            } else {
                html += '</tr><tr>';
            }
        }
        html += '</tr></tbody></table></div></div></div>';

        this.html = html;
    }

    getHTML() {
        return this.html;
    }
}


function dateExists(arr, obj) {
    for (var i = 0; i < arr.length; i++) {
        if (JSON.stringify(arr[i]) === JSON.stringify(obj)) {
            return true;
        }
    }
    return false;
};