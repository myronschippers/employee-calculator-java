console.log('I missed you JS');

$(document).ready(onReady);

function onReady() {
    const $firstName = $('.js-employee-firstname');
    const $lastName = $('.js-employee-lastname');
    const $position = $('.js-employee-position');
    const $salary = $('.js-employee-salary');
    const $message = $('.js-employee-message');
    const $searchId = $('.js-search-id');

    $('.js-add-employee').on('click', addEmployeeHandler);
    $('.js-on-search-id').on('click', onSearchEmployeeId);

    function addEmployeeHandler (event) {
        const data = {
            firstName: $firstName.val(),
            lastName: $lastName.val(),
            position: $position.val(),
            salary: $salary.val(),
            id: randomNumber(1, 100000) + '',
        }

        $.ajax({
            url: '/add/employee',
            method: 'POST',
            data: JSON.stringify(data),
            contentType: "application/json; charset=utf-8",
            beforeSend: function() {
                console.log('hi');
            },
        })
        .then(function(response) {
            $message.text('The Employee has been added.');
            clearFields();
            getEmployees();
        })
        .catch(function(error) {
            console.log('ERROR: ', error);
            $message.text('An error has occurred while adding the Employee.');
        })
    }

    function clearFields() {
        $firstName.val('');
        $lastName.val('');
        $salary.val('');
        $position.val('');
    }

    function getEmployees() {
        $.ajax({
            method: 'GET',
            url: '/get/employees',
        })
        .then(function(response) {
            console.log(response);
        })
    }

    function onSearchEmployeeId(event) {
        $.ajax({
            method: 'GET',
            url: `/search/${$searchId.val()}`,
        })
        .then(function(response) {
            console.log(response);
        })
    }
}

function randomNumber(min, max){
    return Math.floor(Math.random() * (1 + max - min) + min);
}