const data = {
    cities: {
        'Москва': {
            factories: {
                'Малярный цех': ['Антонов А. А.', 'Борисов Б. Б.'],
                'Механосборочный цех': ['Викторов В. В.', 'Глебов Г. Г.']
            }
        },
        'Санкт-Петербург': {
            factories: {
                'Электрический цех': ['Дмитриев Д. Д.', 'Евгеньев Е. Е.'],
                'Заготовительный цех': ['Жуков Ж. Ж.', 'Захаров З. З.']
            }
        }
    },
    brigades: ['Бригада Производство', 'Бригада Сборка', 'Бригада Контроль'],
    shifts: ['Утренняя смена', 'Дневная смена', 'Ночная смена']
};


window.onload = function() {
    initDropdown('city', Object.keys(data.cities));
    initDropdown('brigade', data.brigades);
    initDropdown('shift', data.shifts);

    document.getElementById('city').addEventListener('change', updateFactories);
    document.getElementById('factory').addEventListener('change', updateEmployees);
};

function initDropdown(id, options) {
    const select = document.getElementById(id);
    select.disabled = false;
    select.innerHTML = options.map(option => `<option value="${option}">${option}</option>`).join('');
    select.insertAdjacentHTML('afterbegin', '<option value="" selected disabled>Выберите из списка</option>');
}

function updateFactories() {
    const city = document.getElementById('city').value;
    const factories = Object.keys(data.cities[city].factories);
    initDropdown('factory', factories);
}

function updateEmployees() {
    const city = document.getElementById('city').value;
    const factory = document.getElementById('factory').value;
    const employees = data.cities[city].factories[factory];
    initDropdown('employee', employees);
}

function saveSelections() {
    const warning = document.getElementById('warning')

    const selections = {
        city: document.getElementById('city').value,
        factory: document.getElementById('factory').value,
        employee: document.getElementById('employee').value,
        brigade: document.getElementById('brigade').value,
        shift: document.getElementById('shift').value,
    };

    if (!selections.city || !selections.factory || !selections.employee || !selections.brigade || !selections.shift) {
        warning.style.display = "block"
        return;
    }

    document.cookie = `selections=${JSON.stringify(selections)};path=/`;

    warning.style.display = "none"

    alert('Выбор сохранён в cookies');
}
