import { faPen, faTrainSubway, faTrash, faTrashAlt, faTrashArrowUp, faTrashCan, faTrashRestore, faTrashRestoreAlt } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { activeFilterTodo, addTodo, completeFilterTodo, completeTodo, deleteTodo, editTodo } from "../redux/actions/todoAction"

export const TodoList = () => {
    const dispatch = useDispatch()
    const [inputTodo, setInputTodo] = useState("")
    const [focusOnFilter, setFocusOnFilter] = useState(null)
    const [updateTodo, setUpdateTodo] = useState(null)
    const {todos, filter} = useSelector(state => state)
    // console.log(todos);
    
    const handleSubmit = (e) => {
        e.preventDefault()
        // console.log(inputTodo);
        if (!updateTodo) {           
            
            const newTodo = {
                id: Date.now(),
                title: inputTodo,
                isDone: false
            }
    
            dispatch(addTodo(newTodo))
            // console.log(newTodo);
        } else {
            updateTodo.title = inputTodo
            dispatch(editTodo(updateTodo))
            setUpdateTodo(null)
        }

        setInputTodo("")

        switch (focusOnFilter?.type) {
            case "ACTIVE":
                dispatch(activeFilterTodo(todos))
                break
            case "COMPLETE":
                dispatch(completeFilterTodo(todos))
                break
        }
    }

    const handleEdit = (todoId, updateTitle) => {
        const todo = {id: todoId, title: updateTitle}
        setInputTodo(updateTitle)
        setUpdateTodo(todo)
    }

    const handleComplete = (item) => {
        dispatch(completeTodo(item))
    }

    const handleCatchAll = (e) => {

        // merge
        setFocusOnFilter(null)
    }
    
    const handleCatchActive = (e) => {

        dispatch(activeFilterTodo(todos))
        setFocusOnFilter({
            type: "ACTIVE"
        })
    }

    const handleCatchComplete = (e) => {
        
        dispatch(completeFilterTodo(todos))
        setFocusOnFilter({
            type: "COMPLETE"
        })
    }



    return (
        <>
            <div className="container box">
                <h2 className='text-center pt-4 font-link' style={{color: "#1a1919"}}>What's the plan for today?</h2>
                <div className="todo-input d-flex justify-content-center mt-lg-5 mt-4">
                    <form onSubmit={handleSubmit}>
                        <div className="row d-flex justify-content-center">
                        <div className="col-lg-7 col-md-12">
                            <input 
                                type="text" 
                                name="todo" 
                                className="form-control py-lg-2 py-1" 
                                placeholder='What to do' 
                                value={inputTodo} 
                                onChange={e => {
                                    setInputTodo(e.target.value)
                                }}
                            />
                        </div>
                        <div className="col-lg-2 col-md-12 pt-lg-0 pt-2">
                            {updateTodo ? (<button type='submit' className='btn py-lg-2 py-1 w-150 font-link' style={{color: "#ffff",backgroundColor: "#8b51c2"}}>Update</button>) : (<button type='submit' className='btn py-lg-2 py-1 w-1 font-link' style={{color: "#ffff",backgroundColor: "#8b51c2"}}>Add</button>)}
                        </div>
                        </div>
                    </form>
                </div>

                
                
                <div className="todo-lists d-flex justify-content-center mt-4">
                    <div className="todos">
                        <ul className="nav nav-tabs" id="myTab" role="tablist">
                            <li className="nav-item" role="presentation">
                                <button 
                                    className="nav-link active font-link"
                                    id="all-tab" 
                                    data-bs-toggle="tab" 
                                    data-bs-target="#all-tab-pane" 
                                    type="button" 
                                    role="tab" 
                                    aria-controls="all-tab-pane" 
                                    aria-selected="true"
                                    onClick={handleCatchAll}
                                >
                                        ALL
                                </button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button 
                                    className="nav-link font-link"
                                    id="active-tab" 
                                    data-bs-toggle="tab" 
                                    data-bs-target="#active-tab-pane" 
                                    type="button" role="tab" 
                                    aria-controls="active-tab-pane" 
                                    aria-selected="false" 
                                    onClick={handleCatchActive}
                                >
                                        ACTIVE
                                </button>
                            </li>
                            <li className="nav-item" rol="presentation">
                                <button 
                                    className="nav-link font-link"
                                    id="completed-tab" 
                                    data-bs-toggle="tab" 
                                    data-bs-target="#completed-tab-pane" 
                                    type="button" 
                                    role="tab" 
                                    aria-controls="completed-tab-pane" 
                                    aria-selected="false"
                                    onClick={handleCatchComplete}
                                >
                                        COMPLETED
                                </button>
                            </li>
                        </ul>
                        <div className="tab-content" id="myTabContent">
                            <div className="tab-pane fade show active" id="all-tab-pane" role="tabpanel" aria-labelledby="all-tab" tabIndex="0">
                                <ul className="list-group">
                                    {todos.map((item, index) => (
                                        <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                                            <div className="form-check">
                                                <input 
                                                    type="checkbox" 
                                                    className='form-check-input' 
                                                    name="" 
                                                    id="" 
                                                    checked={item.isDone} 
                                                    onChange={() => handleComplete(item)} 
                                                />
                                                <label className={item.isDone ? "text-decoration-line-through text-muted form-check-label" : "form-check-label"}>
                                                    {item.title}
                                                </label>
                                            </div>
                                            <div className="btn-group">
                                                <button 
                                                    onClick={() => handleEdit(item.id, item.title)} className="btn" style={{padding: "7px", border: "none"}}
                                                >
                                                    <FontAwesomeIcon icon={faPen} size="sm" style={{color: "gray"}} />
                                                </button>
                                                <button onClick={() => dispatch(deleteTodo(item))} className="btn" style={{padding: "7px", border: "none"}}>
                                                    <FontAwesomeIcon icon={faTrashArrowUp} size="sm" style={{color: "gray"}} />
                                                </button>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="tab-pane fade" id="active-tab-pane" role="tabpanel" aria-labelledby="active-tab" tabIndex="0">
                                <ul className="list-group">
                                    {filter.map((item, index) => (
                                            <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                                                <div className="form-check">
                                                    <input 
                                                        type="checkbox" 
                                                        className='form-check-input' 
                                                        name="" 
                                                        id="" 
                                                        checked={item.isDone} 
                                                        onChange={() => {
                                                            handleComplete(item)
                                                            dispatch(activeFilterTodo(todos))
                                                        }} 
                                                    />
                                                    <label className={item.isDone ? "text-decoration-line-through text-muted form-check-label" : "form-check-label"}>
                                                        {item.title}
                                                    </label>
                                                </div>
                                                <div className="btn-group">
                                                    <button 
                                                        onClick={() => {
                                                            handleEdit(item.id, item.title)
                                                            dispatch(activeFilterTodo(todos))
                                                        }} className="btn" style={{padding: "7px", border: "none"}}
                                                    >
                                                        <FontAwesomeIcon icon={faPen} size="sm" style={{color: "gray"}} />
                                                    </button>
                                                    <button 
                                                        onClick={() => {
                                                            dispatch(deleteTodo(item))
                                                            dispatch(activeFilterTodo(todos))
                                                        }} 
                                                        className="btn" 
                                                        style={
                                                            {padding: "7px", border: "none"}
                                                        }
                                                    >
                                                        <FontAwesomeIcon icon={faTrashArrowUp} size="sm" style={{color: "gray"}} />
                                                    </button>
                                                </div>
                                            </li>
                                        ))
                                    }
                                </ul>
                            </div>
                            <div className="tab-pane fade" id="completed-tab-pane" role="tabpanel" aria-labelledby="completed-tab" tabIndex="0">
                                <ul className="list-group">
                                    {filter.map((item, index) => (
                                            <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                                                <div className="form-check">
                                                    <input 
                                                        type="checkbox" 
                                                        className='form-check-input' 
                                                        name="" 
                                                        id="" 
                                                        checked={item.isDone} 
                                                        onChange={() => {
                                                            handleComplete(item)
                                                            dispatch(completeFilterTodo(todos))
                                                        }} 
                                                    />
                                                    <label className={item.isDone ? "text-decoration-line-through text-muted form-check-label" : "form-check-label"}>
                                                        {item.title}
                                                    </label>
                                                </div>
                                                <div className="btn-group">
                                                    <button 
                                                        onClick={() => {
                                                            handleEdit(item.id, item.title)
                                                            dispatch(completeFilterTodo(todos))
                                                        }} 
                                                        className="btn" 
                                                        style={
                                                            {padding: "7px", border: "none"}
                                                        }
                                                    >
                                                        <FontAwesomeIcon icon={faPen} size="sm" style={{color: "gray"}} />
                                                    </button>
                                                    <button 
                                                        onClick={() => {
                                                            dispatch(deleteTodo(item))
                                                            dispatch(completeFilterTodo(todos))
                                                        }} 
                                                        className="btn" 
                                                        style={
                                                            {padding: "7px", border: "none"}
                                                        }
                                                    >
                                                        <FontAwesomeIcon icon={faTrashArrowUp} size="sm" style={{color: "gray"}} />
                                                    </button>
                                                </div>
                                            </li>
                                        ))
                                    } 
                                </ul>
                            </div>
                        </div>                     
                    </div>
                </div>
            </div>
        </>
    )
}