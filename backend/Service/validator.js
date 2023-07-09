
const validateUserCreation = (user) => { 

    let errors = [];

    if (!user.username.trim()) {
        errors.push( "Username is required");
    }

    if (!user.password.trim()) {
        errors.push("Password is required");
    }

    return errors;
}

const validateItemCreation = (item) => { 

    let errors = [];

    if (!item.title.trim()) {
        errors.push("Title is required");
    }

    if (!item.description.trim()) {
        errors.push("Description is required");
    }

    if (!item.status.trim()) { 
        errors.push("Status is required");
    }

    if (!item.createdTime.trim()) {
        errors.push("Created Time is required");
    }

    
    return errors;
}

module.exports = { validateUserCreation, validateItemCreation };