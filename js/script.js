let currentYear = 2020;
const days = ['Пн','Вт','Ср','Чт','Пт','Сб','Вс'];
const mounth = ['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрю', 'Декабрь'];
const container = document.querySelector('.calendar');
const color = ['#2D6B5F', '#72E3A6', '#A29E9F', '#EDBF98', '#EA3D36'];
let activeColor = null;


const getAllDays = year => {
    const firstDay = new Date(`January 1 ${year}`);
    const lastDay = new Date(`December 31 ${year}`);

    const days = [firstDay];

    let lastDayInArray = firstDay;

    while (lastDayInArray.getTime() !== lastDay.getTime()) {
        days.push(addDays(lastDayInArray, 1));
        lastDayInArray = days[days.length - 1];
    }

    return days;
};

const dates = getAllDays(currentYear);

let monthsHTML = '';


mounth.forEach((month, idx) => {
    monthsHTML += `
        <div class="calendar-mounth month-${idx}">
            <div class="calendar-mounth__title">${month}</div>
            <div class="calendar-mounth__wrap">
                <div class="calendar-mounth__weeks">${days.map(day => `<div class="week_days">${day}</div>`).join('')}</div>
                <div class="calendar-mounth__days"></div>
            </div>
        </div>`;
});

container.innerHTML = monthsHTML;


dates.forEach(date => {
    const month = date.getMonth();
    const monthEl = document.querySelector(`.calendar-mounth.month-${month} .calendar-mounth__days`);

    if (date.getDate() === 1 && date.getDay() !== 0) {
        for (let i = 1; i < date.getDay(); i++) {
            const emptySpot = createEmptySpot();
            monthEl.appendChild(emptySpot);
        }
    }

    const dateEl = createDateEl(date);

    monthEl.appendChild(dateEl);
});

function createDateEl(date) {
    const day = date.getDate();
    const dateEl = document.createElement('div');
    dateEl.classList.add('calendar-mounth__day');
    dateEl.innerHTML = `<span class="circle">${day}</span>`;

    return dateEl;
}

function createEmptySpot() {
    const emptyEl = document.createElement('div');
    emptyEl.classList.add('calendar-mounth__day');

    return emptyEl;
}


function addDays(date, days) {
    let result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}



const btns = document.querySelectorAll('.calendar-btn');

btns.forEach((btn, index) => {
    btn.addEventListener('click', item => {
        btns.forEach(btn => {
            btn.classList.remove('active');
        });

        item.target.classList.add('active');
        activeColor = color[index];
    })
});

const allDays = document.querySelectorAll('.calendar-mounth__day');
allDays.forEach(day => {
    day.addEventListener('click', item => {
        console.log('item',item);
        item.target.style.backgroundColor = activeColor;
    });
});






















