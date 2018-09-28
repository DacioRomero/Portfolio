$(document).ready(function() {
    setInterval(lastupdatedUpdate, 1000);
});

function lastupdatedUpdate() {
    $('.lastupdated').each(function () {
        date = moment($(this).attr('datetime'));
        $(this).html(date.fromNow());
    })
}
