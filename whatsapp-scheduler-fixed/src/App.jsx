import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [messages, setMessages] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    target: 'meninos',
    date: '',
    time: '',
    recurring: 'none'
  });

  // Simular dados de contatos
  const contactCounts = {
    meninos: 59,
    meninas: 65,
    todos: 124
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const newMessage = {
      id: Date.now(),
      ...formData,
      status: 'agendada',
      createdAt: new Date().toISOString()
    };

    setMessages([...messages, newMessage]);
    
    // Limpar formulário
    setFormData({
      title: '',
      content: '',
      target: 'meninos',
      date: '',
      time: '',
      recurring: 'none'
    });

    alert('Mensagem agendada com sucesso!');
  };

  const deleteMessage = (id) => {
    setMessages(messages.filter(msg => msg.id !== id));
  };

  const getTargetLabel = (target) => {
    const labels = {
      meninos: '👨 Meninos (59 contatos)',
      meninas: '👩 Meninas (65 contatos)',
      todos: '👥 Todos (124 contatos)'
    };
    return labels[target] || target;
  };

  const getRecurringLabel = (recurring) => {
    const labels = {
      none: 'Não repetir',
      daily: 'Diariamente',
      weekly: 'Semanalmente',
      monthly: 'Mensalmente'
    };
    return labels[recurring] || recurring;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">💬</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">WhatsApp Scheduler</h1>
              <p className="text-gray-600">Sistema de Agendamento para Igreja</p>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Formulário */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center space-x-2 mb-6">
              <span className="text-green-500">➕</span>
              <h2 className="text-xl font-semibold">Nova Mensagem</h2>
            </div>
            <p className="text-gray-600 mb-6">Crie e agende mensagens para os jovens da igreja</p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Título da Mensagem
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  placeholder="Ex: Lembrete do Culto"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Conteúdo da Mensagem
                </label>
                <textarea
                  value={formData.content}
                  onChange={(e) => setFormData({...formData, content: e.target.value})}
                  placeholder="Digite sua mensagem aqui..."
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Destinatários
                </label>
                <select
                  value={formData.target}
                  onChange={(e) => setFormData({...formData, target: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="meninos">👨 Meninos (59 contatos)</option>
                  <option value="meninas">👩 Meninas (65 contatos)</option>
                  <option value="todos">👥 Todos (124 contatos)</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Data
                  </label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({...formData, date: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Horário
                  </label>
                  <input
                    type="time"
                    value={formData.time}
                    onChange={(e) => setFormData({...formData, time: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Repetição
                </label>
                <select
                  value={formData.recurring}
                  onChange={(e) => setFormData({...formData, recurring: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="none">Não repetir</option>
                  <option value="daily">Diariamente</option>
                  <option value="weekly">Semanalmente</option>
                  <option value="monthly">Mensalmente</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full bg-green-500 text-white py-3 px-4 rounded-md hover:bg-green-600 transition-colors font-medium"
              >
                Agendar Mensagem
              </button>
            </form>
          </div>

          {/* Lista de Mensagens */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center space-x-2 mb-6">
              <span className="text-blue-500">📅</span>
              <h2 className="text-xl font-semibold">Mensagens Agendadas</h2>
            </div>
            <p className="text-gray-600 mb-6">{messages.length} mensagem(s) agendada(s)</p>

            {messages.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-gray-400 text-6xl mb-4">💬</div>
                <p className="text-gray-500">Nenhuma mensagem agendada ainda</p>
              </div>
            ) : (
              <div className="space-y-4">
                {messages.map((message) => (
                  <div key={message.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-gray-900">{message.title}</h3>
                      <div className="flex space-x-2">
                        <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                          {message.status}
                        </span>
                        <button
                          onClick={() => deleteMessage(message.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          🗑️
                        </button>
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm mb-3">{message.content}</p>
                    <div className="flex flex-wrap gap-2 text-xs text-gray-500">
                      <span>📅 {message.date}</span>
                      <span>🕐 {message.time}</span>
                      <span>{getTargetLabel(message.target)}</span>
                      <span>🔄 {getRecurringLabel(message.recurring)}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="bg-white rounded-lg shadow-sm border p-6 text-center">
            <div className="text-3xl font-bold text-blue-600">{messages.length}</div>
            <div className="text-gray-600">Mensagens Agendadas</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border p-6 text-center">
            <div className="text-3xl font-bold text-green-600">0</div>
            <div className="text-gray-600">Mensagens Enviadas</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border p-6 text-center">
            <div className="text-3xl font-bold text-purple-600">124</div>
            <div className="text-gray-600">Total de Contatos</div>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-12 text-center text-gray-500 text-sm">
          <p>Sistema de Agendamento WhatsApp - Igreja</p>
          <p>Desenvolvido para facilitar a comunicação com os jovens</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
