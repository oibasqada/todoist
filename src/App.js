import React, {useState} from "react";
import EditIcon from "./components/icons/edit-icon";
import DeleteIcon from "./components/icons/delete-icon";



const App = () => {
  const [todoList, setTodoList] = useState(list);
  const [todo, setTodo] = useState('');
  const [edit, setEdit] = useState(null);

  const handleAddTodo = () => {
    if (todo.length){
      if (!!edit) {
        setTodoList(todoList.map(item => item.id === edit ? {...item, text: todo} : item))
        setEdit(null)
        setTodo('')
      } else {
        const newTodo = {
          id: todoList.length + 1,
          text: todo,
          completed: false,
        }
        setTodo('')
        setTodoList([...todoList, newTodo])
      }

    }
  }

  const handleEdit = (todo) => {
    setTodo(todo.text)
    setEdit(todo.id)
  }

  const handleDelete = (id) => {
    setTodoList(todoList.filter(todo => todo.id !== id))
  }

  const checkBox = (id,e) => {
    setTodoList(todoList.map(todo => todo.id === id ? {...todo, completed: e.target.checked}: todo))
  }

  const handleComplete = (id, event) => {
    setTodoList(todoList.map(todo => todo.id === id ? {...todo, completed: event.target.checked} : todo))
  }

  const handleCompleteAll = (event) => {
    setTodoList(todoList.map(todo => ({...todo, completed: event.target.checked})))
  }
  console.log(todoList)

  return (
    <div className="wrapper">
        <div>
          <div style={{display: 'flex', alignItems: 'center', marginBottom: '10px', gap: '10px'}}>
            <input type="checkbox" onChange={handleCompleteAll} disabled={!!edit}/>
            <div className="input-wrapper">
              <input
                  value={todo}
                  onChange={(e) => setTodo(e.target.value)}
                  type="text"
              />
              <button className={'add-btn'}
                      onClick={handleAddTodo}>
                {!edit ? 'add' : 'edit'}
              </button>
            </div>
          </div>
          {
            todoList.map((todo) => (
                <div key={todo.id} className={`todo-wrapper ${todo.completed ? 'completed' : ''}`}>
                  <span>{todo.text}</span>
                  <div className={'buttons'}>
                    {
                        !todo.completed &&
                        <button className={'edit-btn'}
                                onClick={() => handleEdit(todo)}>
                          <EditIcon/>
                        </button>
                    }
                    <input type="checkbox"
                           value={todo}
                           onChange={(e)=> checkBox(todo.id, e)}/>
                    <button
                      className={'edit-btn'}
                      onClick={() => handleDelete(todo.id)}
                    >
                      <DeleteIcon/>
                    </button>
                  </div>
                </div>
            ))
          }
        </div>
    </div>
  );
}

export default App;

const list = [
  {id: 1, text: 'Learn React', completed: false},
  {id: 2, text: 'Learn Firebase', completed: false},
  {id: 3, text: 'Learn GraphQL', completed: false},
  {id: 4, text: 'Learn React Native', completed: false},
]
