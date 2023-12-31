import {Container, Form, Button, Modal} from 'react-bootstrap';

function AddTaskForm(toDo, setShowForm, handleFormInputChange, handleKeyDown, onFormSubmit) {

    return (
        <Modal show={() => setShowForm(true)} onHide={() => setShowForm(false)}>
            <Modal.Header>
            <Modal.Title>Add a Task</Modal.Title>
            </Modal.Header>
                <Modal.Body>
                    <Form id='toDoListFormAdd' className='toDoListForm'>
                        <Form.Group controlId="formBasicTitle">
                            <Form.Label>Title</Form.Label>
                            <Form.Control type="text" placeholder="Enter title" name='title' value={toDo.title} onChange={handleFormInputChange} required/>
                        </Form.Group>
                        <Form.Group controlId="formBasicDescription">
                            <Form.Label>Description</Form.Label>
                            <Form.Control type="text" placeholder="Enter description" name='description' value={toDo.description} onKeyDown={handleKeyDown} onChange={handleFormInputChange} required/>
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
                </Modal.Body>
            <Modal.Footer>
            </Modal.Footer>
        </Modal>
    )
}

export default AddTaskForm;