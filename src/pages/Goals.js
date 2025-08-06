import React, { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';

const Goals = () => {
  const dailyGoal = 120;
  const weeklyGoal = 600;

  const [dailyProgress, setDailyProgress] = useState(45);
  const [weeklyProgress, setWeeklyProgress] = useState(180);
  const [taskInput, setTaskInput] = useState('');
  const [taskMinutes, setTaskMinutes] = useState('');
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Complete project report', minutes: 45, done: true },
    { id: 2, text: 'Review emails', minutes: 15, done: false },
    { id: 3, text: 'Team meeting prep', minutes: 30, done: false }
  ]);

  const handleAddTask = () => {
    const minutes = parseInt(taskMinutes);
    if (taskInput.trim() === '' || isNaN(minutes) || minutes <= 0) return;

    const newTask = {
      id: Date.now(),
      text: taskInput,
      minutes,
      done: false
    };
    setTasks([...tasks, newTask]);
    setTaskInput('');
    setTaskMinutes('');
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(task => {
      if (task.id === id) {
        const newDone = !task.done;
        if (newDone) {
          setDailyProgress(prev => Math.min(prev + task.minutes, dailyGoal));
          setWeeklyProgress(prev => Math.min(prev + task.minutes, weeklyGoal));
        } else {
          setDailyProgress(prev => Math.max(prev - task.minutes, 0));
          setWeeklyProgress(prev => Math.max(prev - task.minutes, 0));
        }
        return { ...task, done: newDone };
      }
      return task;
    }));
  };

  const deleteTask = (id) => {
    const task = tasks.find(t => t.id === id);
    if (task && task.done) {
      setDailyProgress(prev => Math.max(prev - task.minutes, 0));
      setWeeklyProgress(prev => Math.max(prev - task.minutes, 0));
    }
    setTasks(tasks.filter(t => t.id !== id));
  };

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Focus Goals</h2>
        
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-xl">
            <h3 className="font-semibold text-lg mb-2">Daily Goal</h3>
            <div className="mb-2">
              <div className="flex justify-between text-sm text-gray-600 mb-1">
                <span>{dailyProgress} min</span>
                <span>{dailyGoal} min</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className="bg-blue-500 h-3 rounded-full transition-all duration-300"
                  style={{ width: `${Math.min((dailyProgress / dailyGoal) * 100, 100)}%` }}
                ></div>
              </div>
            </div>
            <p className="text-sm text-gray-600">{Math.round((dailyProgress / dailyGoal) * 100)}% complete</p>
          </div>

          <div className="bg-gradient-to-r from-green-50 to-green-100 p-6 rounded-xl">
            <h3 className="font-semibold text-lg mb-2">Weekly Goal</h3>
            <div className="mb-2">
              <div className="flex justify-between text-sm text-gray-600 mb-1">
                <span>{weeklyProgress} min</span>
                <span>{weeklyGoal} min</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className="bg-green-500 h-3 rounded-full transition-all duration-300"
                  style={{ width: `${Math.min((weeklyProgress / weeklyGoal) * 100, 100)}%` }}
                ></div>
              </div>
            </div>
            <p className="text-sm text-gray-600">{Math.round((weeklyProgress / weeklyGoal) * 100)}% complete</p>
          </div>
        </div>

        <div>
          <h3 className="text-2xl font-semibold mb-6">Task Management</h3>
          
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <input
              type="text"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Add a new task..."
              value={taskInput}
              onChange={(e) => setTaskInput(e.target.value)}
            />
            <input
              type="number"
              className="w-24 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="min"
              value={taskMinutes}
              onChange={(e) => setTaskMinutes(e.target.value)}
            />
            <button
              onClick={handleAddTask}
              className="flex items-center px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-semibold transition-all"
            >
              <Plus size={20} className="mr-2" />
              Add Task
            </button>
          </div>

          <div className="space-y-3">
            {tasks.map((task) => (
              <div
                key={task.id}
                className={`flex items-center justify-between p-4 rounded-xl border transition-all ${
                  task.done 
                    ? 'bg-green-50 border-green-200' 
                    : 'bg-gray-50 border-gray-200 hover:border-gray-300'
                }`}
              >
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={task.done}
                    onChange={() => toggleTask(task.id)}
                    className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <span className={`font-medium ${task.done ? 'line-through text-gray-500' : 'text-gray-800'}`}>
                    {task.text}
                  </span>
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                    {task.minutes} min
                  </span>
                </label>
                <button
                  onClick={() => deleteTask(task.id)}
                  className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Goals;