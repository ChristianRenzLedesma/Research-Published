// BACKEND 
$(document).ready(function() {

    var researchData = {
        cict: [],
        cmbt: [],
        coed: []
    };
    function loadResearch() {
        $.each(researchData, function(department, publications) {
            $.each(publications, function(index, title) {
                var date = new Date().toISOString().split('T')[0];
                $('#' + department + '-list').append('<li data-date="' + date + '">' + title + ' (Uploaded: ' + date + ')</li>');
            });
        });
    }

    loadResearch();

    $('#search, #date-filter').on('keyup change', function() {
        var searchTerm = $('#search').val().toLowerCase();
        var selectedDate = $('#date-filter').val();
        
        $('.department').each(function() {
            var department = $(this);
            var found = false;

            department.find('li').each(function() {
                var item = $(this);
                var matchesSearch = item.text().toLowerCase().indexOf(searchTerm) > -1;
                var matchesDate = selectedDate === "" || item.data('date') === selectedDate;

                if (matchesSearch && matchesDate) {
                    item.show();
                    found = true;
                } else {
                    item.hide();
                }
            });

            if (found) {
                department.show();
            } else {
                department.hide();
            }
        });
    });

    $('#save').click(function() {
        localStorage.setItem('researchData', JSON.stringify(researchData));
        alert("Successfully saved to the database");
    });

    $('#upload').click(function() {
        var newResearchTitle = $('#new-research').val();
        var selectedDepartment = $('#department-select').val();

        if (newResearchTitle && selectedDepartment) {
            var date = new Date().toISOString().split('T')[0]; 
            $('#' + selectedDepartment + '-list').append('<li data-date="' + date + '">' + newResearchTitle + ' (Uploaded: ' + date + ')</li>');
            $('#new-research').val(''); 
            $('#department-select').val('');
        } else {
            alert('Please enter a research title and select a department.');
        }
    });
});