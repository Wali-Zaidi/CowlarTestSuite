import {Container, Form, Button} from 'react-bootstrap';

function AddTaskForm(toDo, day) {

    const onFormSubmit = async(event) => {
        event.preventDefault();
        toDo.createdTime = day;
        
    }

    const handleKeyDown = (event) => {
        if (event.keyCode === 13) {
          event.preventDefault();
          // Call the submit function when Enter key is pressed
          onFormSubmit(event);
        }
    };

    const handleFormInputChange = (event) => {
        setToDo({
            ...toDo,
            [event.target.name]: event.target.value
        })
    }

    return (
        <Container id="formDiv">
            <Form id='toDoListFormAdd' className='toDoListForm'>
                <Form.Group controlId="formBasicTitle">
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" placeholder="Enter title" name='title' value={toDo.title} onChange={handleFormInputChange} required/>
                </Form.Group>
                <Form.Group controlId="formBasicDescription">
                    <Form.Label>Description</Form.Label>
                    <Form.Control type="text" placeholder="Enter description" name='description' value={toDo.description} onKeyDown={handleKeyDown} onChange={handleFormInputChange} required/>
                </Form.Group>
                <Form.Group controlId="formBasicCompletedTime">
                    <Form.Label>Due Date</Form.Label>
                    <Form.Control type="date" placeholder="Enter due date" name='completedTime' value={toDo.completedTime} onChange={handleFormInputChange} required/>
                </Form.Group>
                <Form.Group controlId='formSubmit'>
                    <Button type="submit" value='Add' className='btn btn-secondary' onClick={onFormSubmit}>
                        Add
                    </Button>
                    <Button type="button" value='Cancel' className='btn btn-secondary' onClick={() => setShowForm(false)}>
                        Cancel
                    </Button>
                </Form.Group>
            </Form>
        </Container>
    )
}

export default AddTaskForm;