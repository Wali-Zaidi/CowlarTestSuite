
const validateUserCreation = (user) => { 

    let errors = {};

    if (!user.username.trim()) {
        errors.username = "Username is required";
    }

    if (!user.password.trim()) {
        errors.password = "Password is required";
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