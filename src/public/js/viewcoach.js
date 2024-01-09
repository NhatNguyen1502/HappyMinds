function calculateDuration() {
    var elements = document.querySelectorAll('.duration');
    var durations = 0;

    elements.forEach(function (element) {
        var durationValue = parseInt(element.getAttribute('data-duration'));
        durations += durationValue;
    });
    document.getElementById('time_viewcoach').innerText = durations;
}

function calculateCalo() {
    var elements = document.querySelectorAll('.calo');
    var totalCalo = 0;

    elements.forEach(function (element) {
        var caloValue = parseInt(element.getAttribute('data-calo'));
        totalCalo += caloValue;
    });
    document.getElementById('calo_viewcoach').innerText = totalCalo;
}

function calculatteLesson() {
    var elements = document.querySelectorAll('.title');
    var totalLesson = 0;

    elements.forEach(function (element) {
        totalLesson++;
    });
    document.getElementById('lesson_viewcoach').innerText = totalLesson;
}

document.addEventListener('DOMContentLoaded', function () {
    calculatteLesson();
    calculateCalo();
    calculateDuration();
});
