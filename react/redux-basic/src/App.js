// import logo from './logo.svg';
import React, {useState, useEffect, use} from 'react';
import './App.css';

function App() {
  const TaskForm=({onAddTask}) =>{
    const [taskText, setTaskText] = useState('');

    const handleSubmit = (e) => {
      e.preeventDefault();
      if(taskText.trim()){
        onAddTask(taskText.trim());
        setTaskText('');
      }
    };
  }
  return (
    <form onSubmit={handleSubmit}>
      <input type='text' placeholder='add a task'
      value={taskText} onChange={e.target.value}/>
      <button type='submit'>Add Task</button>
    </form>
  );
};
const taskItem = ({task, onUpdateTask, onDeleteTask}) => {
  const [isEditing, setIsEditing] = useState(false)
  const [editText, setEditText] = useState(task.text);
 const handleEditToggle = () => {
  setIsEditing(!isEditing);
  setEditText(task.edit);
 };
 const handleUpdate =() =>{
  if (editText.trim()){
    onUpdateTask(task.id, editText.trim());
    setIsEditing(false);
  }
 }
 return(
  <li className=''></li>
 )



}
const Searchbar = ({onSearchChange}) =>{
  return(
    <div className='search-bar'>
      <input type='text'
      placeholder='search task'
      onChange={(e) => onSearchChange(e.target.value)}/>
    </div>
  )
}
const TaskList = ({tasks, onUpdateTask, onDeleteTask} => {
  if (tasks.length == 0){
    return <p>No task found</p>
  }
})

export default App;
