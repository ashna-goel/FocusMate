import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Play, RotateCcw } from 'lucide-react';

const Dashboard = () => {
  const [timer, setTimer] = useState(1500); // 25 minutes in seconds
  const [isRunning, setIsRunning] = useState(false);

  const data = [
    { day: 'Mon', minutes: 15 },
    { day: 'Tue', minutes: 30 },
    { day: 'Wed', minutes: 25 },
    { day: 'Thu', minutes: 40 },
    { day: 'Fri', minutes: 35 },
  ];

  useEffect(() => {
    let interval;
    if (isRunning && timer > 0) {
      interval = setInterval(() => {
        setTimer(prev => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, timer]);

  const formatTime = () => {
    const mins = Math.floor(timer / 60);
    const secs = timer % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStart = () => setIsRunning(!isRunning);
  const handleReset = () => {
    setIsRunning(false);
    setTimer(1500);
  };

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Pomodoro Timer</h2>
        
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-64 h-64 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full shadow-2xl mb-8">
            <span className="text-6xl font-mono font-bold text-white">{formatTime()}</span>
          </div>
          
          <div className="flex justify-center gap-4">
            <button
              onClick={handleStart}
              className={`flex items-center px-8 py-3 rounded-full font-semibold transition-all ${
                isRunning 
                  ? 'bg-red-500 hover:bg-red-600 text-white' 
                  : 'bg-green-500 hover:bg-green-600 text-white'
              }`}
            >
              <Play size={20} className="mr-2" />
              {isRunning ? 'Pause' : 'Start'}
            </button>
            <button
              onClick={handleReset}
              className="flex items-center px-8 py-3 bg-gray-500 hover:bg-gray-600 text-white rounded-full font-semibold transition-all"
            >
              <RotateCcw size={20} className="mr-2" />
              Reset
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-8">
        <h3 className="text-2xl font-bold text-gray-800 mb-6">Weekly Focus Summary</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="minutes" fill="#60A5FA" name="Focus Minutes" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Dashboard;