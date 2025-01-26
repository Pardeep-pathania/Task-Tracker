
import {useEffect, useState} from 'react'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";


function App() {
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [ShowFinished, setShowFinished] = useState(true)
  
  useEffect(()=>{
    let todoString= localStorage.getItem("todos")
    if(todoString){
    let todos = JSON.parse(localStorage.getItem("todos"))
    setTodos(todos)
    }
  },[])

  const saveToLS=(params)=>{
    localStorage.setItem("todos", JSON.stringify(todos))
  }

  const toggleFinished = (e)=>{
    setShowFinished(!ShowFinished)
  }

  const handleEdit=(e, id)=>{
    let t = todos.filter(i=>i.id ===id)
    setTodo(t[0].todo)
    let newTodos = todos.filter(item =>{
      return item.id!== id
    });
    setTodos(newTodos)
    saveToLS()
  }
  const handleDelete=(e, id)=>{
   
    let newTodos = todos.filter(item =>{
      return item.id!== id
    });
    setTodos(newTodos)
    saveToLS()
  }
  const handleAdd=()=>{
    setTodos([...todos,{id:uuidv4(), todo, isCompleted:false}])
    setTodo("")
    saveToLS()
  }
  const handleChange = (e)=>{
    setTodo(e.target.value)
  }

  const handleCheckbox= (e) => {
    let id = e.target.name;
   let index = todos.findIndex(item =>{
    return item.id === id;
    
   })
   let newTodos= [...todos];
   newTodos[index].isCompleted = !newTodos[index].isCompleted;
   setTodos(newTodos)
   saveToLS()
  }
  

  return (
    <>
    <Navbar/>
      <div className="container mx-auto my-5 rounded-xl p-5 bg-violet-200 min-h-[80vh]">
        <h1 className='font-bold text-center text-xl'>Task Tracker-Manage your todos here</h1>
        <div className="addTodo">
          <h2 className='text-lg font-bold mb-5'>Add a Todo</h2>
          <input onChange={handleChange} value={todo} type='text'className='w-1/2 md:w-[85%] bg-white shadow-lg rounded-md px-3 py-1'/>
          <button onClick={handleAdd} disabled={todo.length<=3} className='bg-violet-700 hover:bg-violet-900 disabled:bg-violet-700 text-white p-3 py-1 rounded-md mx-6 font-bold' >Save</button>
        </div>
        <input onChange= {toggleFinished} type='checkbox' checked={ShowFinished} className='m-3'/> Show Finished
        <h3 className='text-xl font-bold'>Your Todos</h3>
        <div className="todos">
          {todos.length===0 && <div className='m-5'>No Todos to display</div>}

        {todos.map(item => {
       return (ShowFinished || !item.isCompleted)&&<div key={item.id} className="todo flex md:w-1/2 my-3 justify-between">
        <div className='flex gap-5'>
        <input name={item.id} onChange={handleCheckbox} type='checkbox' checked={item.isCompleted} id=''/>
        <div className={item.isCompleted?"line-through":""}>{item.todo}</div>
        </div>
          
            <div className="buttons flex h-full">
            <button onClick={(e)=>{handleEdit(e, item.id)} }className='bg-violet-700 hover:bg-violet-900 text-white p-2 py-1 rounded-md mx-1 font-bold'><FaEdit /></button>
            <button onClick={(e)=>{handleDelete(e, item.id)}} className='bg-violet-700 hover:bg-violet-900 text-white p-2 py-1 rounded-md mx-1 font-bold'><MdDelete /></button>
          </div>
          </div>
        })}
        </div>
      </div>
    </>
  )
}

export default App
