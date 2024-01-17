function viewModal(email, age, name, height, weight, pal, sex, requiredCaloriesAmount, photoUrl, bmi) {
    document.getElementById('viewName').value = name;
    document.getElementById('viewEmail').value = email;
    document.getElementById('viewHeight').value = height;
    document.getElementById('viewWeight').value = weight;
    document.getElementById('viewAge').value = age;
    document.getElementById('viewBMI').value = bmi;
    document.getElementById('viewRequirement').value = requiredCaloriesAmount;
    document.getElementById('viewPhotoUrl').value = photoUrl;

    if (pal == ActivityStatus.SEDENTARY) {
        document.getElementById('View_Sedentary').checked = true;
    } else if (pal == ActivityStatus.LIGHTLY_ACTIVE) {
        document.getElementById('View_Lightly_Active').checked = true;
    } else if (pal == ActivityStatus.VERY_ACTIVE) {
        document.getElementById('View_Moderately_Active').checked = true;
    } else {
        document.getElementById('View_Extremely_Active').checked = true;
    }

    if (sex == 'Male') {
        document.getElementById('viewMale').checked = true;
    } else if (sex == 'Female') {
        document.getElementById('viewFemale').checked = true;
    } else {
        document.getElementById('viewSex3').checked = true;
    }
}
function deleteUser(id) {
    document.getElementById('deleteForm').action = '/admin/delete-user/' + id;
}