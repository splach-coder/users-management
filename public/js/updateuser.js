function validateForm() {

    // Validate form inputs
    const code = form.elements.code.value;
    const fullname = form.elements.fullname.value;
    const age = form.elements.age.value;
    const birthdate = form.elements.birthdate.value;
    const tel = form.elements.tel.value;

    if (!code || !fullname || !age || !birthdate || !tel) {
        alert('All fields are required');
        return false;
    }

    if (!/^06[\d]{8}$/.test(tel)) {
        alert('Telephone number must be in the Moroccan format (06X-XXX-XXXX)');
        return false;
    }

    if (age < 15) {
        alert('Age must be greater than 15');
        return false;
    }

    if (new Date(birthdate) > new Date('2007-01-01')) {
        alert('Birth date must be before 2007');
        return false;
    }

    if (!/^[a-zA-Z]\d{5}[a-zA-Z]{2}$/.test(code)) {
        alert('Code must be in the correct format (f12345gh)');
        return false;
    }

    return true;
}