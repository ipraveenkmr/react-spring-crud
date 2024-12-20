import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [items, setItems] = useState([]);
  const [newName, setNewName] = useState('');
  const [department, setDepartment] = useState('');
  const [salary, setSalary] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingTextName, setEditingTextName] = useState('');
  const [editingTextDept, setEditingTextDept] = useState('');
  const [editingTextSalary, setEditingTextSalary] = useState('');

  const API_URL = 'http://localhost:8080/api/employees';

  const fetchItems = async () => {
    try {
      const response = await axios.get(API_URL);
      setItems(response.data);
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const addItem = async () => {
    if (newName.trim()) {
      try {
        const response = await axios.post(API_URL, { name: newName, department: department, salary: salary });
        setItems([...items, response.data]);
        setNewName('');
        setDepartment('');
        setSalary('');
      } catch (error) {
        console.error('Error adding item:', error);
      }
    }
  };

  const deleteItem = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setItems(items.filter(item => item.id !== id));
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  const editItem = (index) => {
    setEditingIndex(index);
    setEditingTextName(items[index].name);
    setEditingTextDept(items[index].department);
    setEditingTextSalary(items[index].salary);
  };

  const updateItem = async (id) => {
    const updatedItem = { name: editingTextName, department: editingTextDept, salary: editingTextSalary };
    try {
      const response = await axios.put(`${API_URL}/${id}`, updatedItem);
      const updatedItems = items.map((item, index) => (index === editingIndex ? response.data : item));
      setItems(updatedItems);
      setEditingIndex(null);
      editingTextName('');
      editingTextDept('');
      editingTextSalary('');
    } catch (error) {
      console.error('Error updating item:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-5">
      <div className="bg-white shadow-md rounded-lg p-6 max-w-[60vw] w-full">
        <h1 className="text-2xl font-bold text-center mb-4">CRUD App in React</h1>

        {/* Add Item */}
        <div className="flex items-center space-x-2 mb-4">
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder="Enter name"
            className="border p-2 rounded w-full"
          />
          <input
            type="text"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            placeholder="Enter department"
            className="border p-2 rounded w-full"
          />
          <input
            type="number"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
            placeholder="Enter salary"
            className="border p-2 rounded w-full"
          />
          <button onClick={addItem} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Add
          </button>
        </div>

        {/* Item List */}
        <ul className="space-y-2">
          {items.map((item, index) => (
            <li key={item.id} className="flex justify-between items-center bg-gray-100 p-2 rounded">
              {editingIndex === index ? (
                <>
                  <input
                    type="text"
                    value={editingTextName}
                    onChange={(e) => setEditingTextName(e.target.value)}
                    placeholder="Enter name"
                    className="border p-2 rounded w-full"
                  />
                  <input
                    type="text"
                    value={editingTextDept}
                    onChange={(e) => setEditingTextDept(e.target.value)}
                    placeholder="Enter department"
                    className="border p-2 rounded w-full"
                  />
                  <input
                    type="number"
                    value={editingTextSalary}
                    onChange={(e) => setEditingTextSalary(e.target.value)}
                    placeholder="Enter salary"
                    className="border p-2 rounded w-full"
                  />
                </>

              ) : (
                <>
                  <span className='mr-1'>{item.name}</span>
                  <span className='mr-1'>{item.department}</span>
                  <span>{item.salary}</span>
                </>
              )}

              <div className="space-x-2 flex">
                {editingIndex === index ? (
                  <button onClick={() => updateItem(item.id)} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 ml-2">
                    Save
                  </button>
                ) : (
                  <button
                    onClick={() => editItem(index)}
                    className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                )}
                {editingIndex === index ? (
                  <button
                    onClick={() => setEditingIndex(null)}
                    className="bg-slate-500 text-white px-4 py-2 rounded hover:bg-red-600"
                  >
                    Cancel
                  </button>
                ) : (
                  <button
                    onClick={() => deleteItem(item.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                )}

              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
