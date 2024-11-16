const isSameDate = (postedDate, currentDate) => {
    for (let i = 0; i < postedDate.length; i++) {
        if (postedDate[i] != currentDate[i]) {
            return false;
        }
    }
    return true;
}

const formatDate = (post, setDate) => {
    if (post) {
        // ISO Format - YYY-MM-DDTHH:mm:ss.sssss
        let posted_date = post.created_at;
        let current_date = new Date().toISOString();

        // Remove milliseconds and separate date and time into two elements in an array using .split()
        posted_date = posted_date.substring(0,19).split('T');
        current_date = current_date.substring(0,19).split('T');

        // Convert the year, month, date to an array with each its own element, same with hour, minute, second
        let posted_ymd = posted_date[0].split('-');
        let posted_time = posted_date[1].split(':');
        let current_ymd = current_date[0].split('-');
        let current_time = current_date[1].split(':');
        
        // If date is the same, check the time difference. Else, check the date difference. Work from biggest to smallest difference.
        if (isSameDate(posted_ymd, current_ymd)) {
            let hour = parseInt(current_time[0]) - parseInt(posted_time[0]);
            let minute = parseInt(current_time[1]) - parseInt(posted_time[1]);
            let second = parseInt(current_time[2]) - parseInt(posted_time[2]);

            if (hour != 0) {
                if (hour > 1) {
                    setDate({value: hour, unit: 'hours'});
                } else {
                    setDate({value: hour, unit: 'hour'});
                }
            } else if (minute != 0) {
                if (minute > 1) {
                    setDate({value: minute, unit: 'minutes'});
                } else {
                    setDate({value: minute, unit: 'minute'});
                }
            } else {
                if (second > 1) {
                    setDate({value: second, unit: 'seconds'});
                } else {
                    setDate({value: second, unit: 'second'});
                }
            }

        } else {
            let year = parseInt(current_ymd[0]) - parseInt(posted_ymd[0]);
            let month = parseInt(current_ymd[1]) - parseInt(posted_ymd[1]);
            let day = parseInt(current_ymd[2]) - parseInt(posted_ymd[2]);

            if (year != 0) {
                if (year > 1) {
                    setDate({value: year, unit: 'years'});
                } else {
                    setDate({value: year, unit: 'year'});
                }
            } else if (month != 0) {
                if (month > 1) {
                    setDate({value: month, unit: 'months'});
                } else {
                    setDate({value: month, unit: 'months'});
                }
            } else {
                if (day > 1) {
                    setDate({value: day, unit: 'days'});
                } else {
                    setDate({value: day, unit: 'day'});
                }
            }
        }
    }
}

export default formatDate;
