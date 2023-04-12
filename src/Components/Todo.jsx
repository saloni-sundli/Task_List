import React, { useEffect, useState } from 'react'
import '../App.css'
import { v4 as uuid } from "uuid";
import { FiPlay, FiTrash, FiEdit} from 'react-icons/fi';

const Todo = () => {
  const [input, setInput] = useState("");
  const [edit, setEdit] = useState("");
  const [list, setList] = useState([]);
  const [refresh, setRefresh] = useState(false);

  function addTask() {
    const data = { id: uuid(), input: input };
    console.log(data);
    localStorage.setItem("listContainer", JSON.stringify([...list, data]));
    setInput("");
    setRefresh(!refresh);
  }

  function deleteItem(id) {
    const filteredData = list.filter((i) => i.id !== id);
    localStorage.setItem("listContainer", JSON.stringify([...filteredData]));
    setRefresh(!refresh);
  }

  function editData(id) {
    const data = list.map((i) => {
      if (i.id === id) {
        i.input = edit;
      }
      return i
    });

    localStorage.setItem("listContainer", JSON.stringify([...data]));
    setRefresh(!refresh);
  }

  useEffect(() => {
    if(localStorage.getItem("listContainer")){
      setList([...JSON.parse(localStorage.getItem("listContainer"))]);
    }
  }, [refresh]);

  return (
    <>

      <div className='main'>
        {list.length > 0 ? list.map((i) => (
          <div className='listItem' key={i.id}>
            <li>{i.input}
              <FiTrash className='fitrash' onClick={() => deleteItem(i.id)}>delete</FiTrash>
            </li>
            <input className='listtask' type="text" value={edit} onChange={(e) => setEdit(e.target.value)} />
            <FiEdit className='fiedit' onClick={() => editData(i.id)}>edit</FiEdit>
          </div>
        )) : null}
      <div className='mainInput'>
        <h1>Task List</h1>
        <input className='maintask' type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder='what do you have planned ?'/>
        <FiPlay className='fiplay' onClick={() => addTask()}>Add</FiPlay>
        {/* <button  onClick={() => localStorage.removeItem("listContainer")}>remove all</button> */}
      </div>
      </div>
    </>
  )
}

export default Todo