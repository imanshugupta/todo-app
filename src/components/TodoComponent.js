import React, { Component } from 'react'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, FormGroup, Input, Label, Col, ListGroupItem, ListGroup, ButtonGroup } from 'reactstrap'
import { connect } from 'react-redux'
import { addNewTodo, deleteTodo, editTodo, markDone } from '../redux/actionCreators'

const mapStateToProps = state => ({
    todos: state.todos
})

const mapDispatchToProps = dispatch => ({
    addNewTodo: (todo) => dispatch(addNewTodo(todo)),
    deleteTodo: (todoId) => dispatch(deleteTodo(todoId)),
    editTodo: (todoId, todo) => dispatch(editTodo(todoId, todo)),
    markDone: (todoId) => dispatch(markDone(todoId))
})

class Todo extends Component {
    constructor(props){
        super(props);
        this.state = {
            isModalOpen: false,
            isViewModalOpen: false,
            selectedTodo: null,
            isEditModelOpen: false
        }
    }

    toggleModal = () => this.setState({ isModalOpen: !this.state.isModalOpen })
    toggleViewModal = (todo=null) => this.setState({isViewModalOpen: !this.state.isViewModalOpen, selectedTodo: todo })
    toggleEditModal = () => this.setState({isEditModelOpen: !this.state.isEditModelOpen})

    handleAddTodo = (e) => {
        e.preventDefault();
        this.toggleModal()
        this.props.addNewTodo({title: this.title.value, date: this.date.value, description: this.description.value, done: false})
    }
    handleUpdateTodo = (event) => {
        event.preventDefault();
        this.toggleViewModal(this.state.selectedTodo)
        this.toggleEditModal()
        this.props.editTodo(this.state.selectedTodo.id, {title: this.newTitle.value, date: this.newDate.value, description: this.newDescription.value, done: this.state.selectedTodo.done, id: this.state.selectedTodo.id})    
    }
    handleDelete = () => {
        this.props.deleteTodo(this.state.selectedTodo.id)
        this.toggleViewModal()
    }

    render() {

        const RenderTodos = ({todos}) => {
            const renderItems = todos.todos.map(item => {
                return (
                    <ListGroupItem key={item.id}>
                        <div className='row'>
                            <div className='col-1'>
                                <p>{item.id+1}</p>
                            </div>
                            <div className='col-10 col-md-4' onClick={()=> this.toggleViewModal(item)}>
                                <h6>{item.title}</h6>
                            </div>
                            <div className='col-4 text-right d-md-none'>
                                <h6>Date : </h6>
                            </div>
                            <div className='col-8 col-md-3'>
                                <p>{item.date}</p>
                            </div>
                            <div className='col-6 col-md-2 pl-4'>
                                <Label check>
                                    <Input type='checkbox' id='done' defaultChecked={item.done} onChange={()=> this.props.markDone(item.id)} /> Mark as Done
                                </Label>
                            </div>
                            <div className='col-6 text-right col-md-auto ml-auto'>
                                <Button color='danger' onClick={()=> this.props.deleteTodo(item.id)}>Delete</Button>
                            </div>

                        </div>
                    </ListGroupItem>
                )
            })
            return (
                <ListGroup>
                    <div className='d-none d-md-block'>
                        <div className='row'>
                            <div className='col-1'>
                                <h6>Sr No.</h6>
                            </div>
                            <div className='col-10 ml-3 col-md-4'>
                                <h6>Name</h6>
                            </div>
                            <div className='col-4 text-right d-md-none'>
                                <h6>Date : </h6>
                            </div>
                            <div className='col-8 col-md-3'>
                                <h6>Date</h6>
                            </div>
                        </div>
                    </div>
                    {renderItems}
                </ListGroup>
            );
        }

        return(
            <div className='container'>
                <div className='row p-3'>
                    <div className='col'>
                        <h1>Todo App</h1>
                    </div>
                    <div className='col-auto'>
                        <Button color='dark' onClick={this.props.handleLogout}>Logout</Button>
                    </div>
                </div>
                <div className='row bg-light p-2'>
                    <div className='col mt-2'><h4>All Todos</h4></div>
                    <div className='col-auto m-2'>
                        <Button onClick={this.toggleModal} color='primary'>New Todo</Button>
                    </div>
                    
                    <div className='col-12 mt-3'>
                        <RenderTodos todos={this.props.todos} />
                    </div>
                </div>
                
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Add Todo</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.handleAddTodo}>
                            <FormGroup row>
                                <Col md={4}>
                                    <Label htmlFor='title'>Title</Label>
                                </Col>
                                <Col md={8}>
                                    <Input type='text' id='title' name='title' innerRef={Input=> this.title=Input} />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Col md={4}>
                                    <Label htmlFor='date'>Date and Time</Label>
                                </Col>
                                <Col md={8}>
                                    <Input type='date' rows={3} id='date' name='date' innerRef={Input=> this.date=Input} />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Col md={4}>
                                    <Label htmlFor='description'>Description</Label>
                                </Col>
                                <Col md={8}>
                                    <Input type='textarea' rows={3} id='description' name='description' innerRef={Input=> this.description=Input} />
                                </Col>
                            </FormGroup>
                            <Button type='submit' color='primary'>Add</Button>
                        </Form>
                    </ModalBody>
                </Modal>

                {
                    this.state.selectedTodo ? 
                    <Modal isOpen={this.state.isViewModalOpen} toggle={this.toggleViewModal}>
                        <ModalHeader toggle={this.toggleViewModal}>Todo</ModalHeader>
                        <ModalBody>
                            <ListGroup>
                                <ListGroupItem>
                                    <div className='row'>
                                        <div className='col-4'>
                                            <h6>Title</h6>
                                        </div>
                                        <div className='col-8'>
                                            <p>{this.state.selectedTodo.title}</p>
                                        </div>  
                                    </div>
                                </ListGroupItem>
                                
                                <ListGroupItem>
                                    <div className='row'>
                                        <div className='col-4'>
                                            <h6>Date</h6>
                                        </div>
                                        <div className='col-8'>
                                            <p>{this.state.selectedTodo.date}</p>
                                        </div>
                                    </div>
                                </ListGroupItem>
                                
                                <ListGroupItem>
                                    <div className='row'>
                                        <div className='col-12 col-md-4'>
                                            <h6>Description</h6>
                                        </div>
                                        <div className='col-12 col-md-8'>
                                            <p>{this.state.selectedTodo.description}</p>
                                        </div>        
                                    </div>
                                </ListGroupItem>
        
                            </ListGroup>
                        </ModalBody>
                        <ModalFooter>
                            <Button color='warning' onClick={this.toggleEditModal}>Edit</Button>
                            <Button color='danger' onClick={this.handleDelete}>Delete</Button>
                        </ModalFooter>
                    </Modal> : null
                }

                {
                    this.state.selectedTodo ? 
                    <Modal isOpen={this.state.isEditModelOpen} toggle={this.toggleEditModal}>
                        <ModalHeader toggle={this.toggleEditModal}>Edit Todo</ModalHeader>
                        <ModalBody>
                            <Form onSubmit={this.handleUpdateTodo}>
                                <FormGroup row>
                                    <Col md={4}>
                                        <Label htmlFor='title'>Title</Label>
                                    </Col>
                                    <Col md={8}>
                                        <Input type='text' id='title' name='title' defaultValue={this.state.selectedTodo.title} innerRef={Input=> this.newTitle=Input} />
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col md={4}>
                                        <Label htmlFor='date'>Date and Time</Label>
                                    </Col>
                                    <Col md={8}>
                                        <Input type='date' rows={3} id='date' name='date' defaultValue={this.state.selectedTodo.date} innerRef={Input=> this.newDate=Input} />
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col md={4}>
                                        <Label htmlFor='description'>Description</Label>
                                    </Col>
                                    <Col md={8}>
                                        <Input type='textarea' rows={3} id='description' name='description' defaultValue={this.state.selectedTodo.description} innerRef={Input=> this.newDescription=Input} />
                                    </Col>
                                </FormGroup>
                                <Button type='submit' color='warning'>Update</Button>
                            </Form>
                        </ModalBody>
                    </Modal> : null
                }
            </div>
        )
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Todo)