import { useState } from 'react';
import { 
  Dog, 
  ClipboardList, 
  Calendar, 
  PlusCircle, 
  CheckCircle2, 
  Circle, 
  Trash2,
  Heart,
  Info
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Types
interface Animal {
  id: string;
  name: string;
  breed: string;
  intakeDate: string;
  allergy: string;
  isNeutered: boolean;
  weight: string;
}

interface Task {
  id: string;
  animalId: string;
  type: 'walk' | 'cleaning' | 'meal' | 'medication';
  completed: boolean;
}

type View = 'registration' | 'tasks' | 'calendar';

export default function App() {
  const [currentView, setCurrentView] = useState<View>('registration');
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);

  // Registration Form State
  const [formData, setFormData] = useState({
    name: '',
    breed: '',
    intakeDate: '',
    allergy: '',
    isNeutered: false,
    weight: ''
  });

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name) return;

    const newAnimal: Animal = {
      ...formData,
      id: Math.random().toString(36).substr(2, 9)
    };

    setAnimals([...animals, newAnimal]);
    
    // Initialize tasks for the new animal
    const newTasks: Task[] = [
      { id: Math.random().toString(), animalId: newAnimal.id, type: 'walk', completed: false },
      { id: Math.random().toString(), animalId: newAnimal.id, type: 'cleaning', completed: false },
      { id: Math.random().toString(), animalId: newAnimal.id, type: 'meal', completed: false },
      { id: Math.random().toString(), animalId: newAnimal.id, type: 'medication', completed: false },
    ];
    setTasks([...tasks, ...newTasks]);

    setFormData({
      name: '',
      breed: '',
      intakeDate: '',
      allergy: '',
      isNeutered: false,
      weight: ''
    });
  };

  const toggleTask = (taskId: string) => {
    setTasks(tasks.map(t => t.id === taskId ? { ...t, completed: !t.completed } : t));
  };

  const deleteAnimal = (id: string) => {
    setAnimals(animals.filter(a => a.id !== id));
    setTasks(tasks.filter(t => t.animalId !== id));
  };

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-pink-50 flex flex-col shadow-sm">
        <div className="p-6">
          <div className="flex items-center gap-2 text-hotpink mb-8">
            <Heart className="fill-current" />
            <span className="font-bold text-lg tracking-tight">내품애 센터</span>
          </div>
          
          <nav className="space-y-2">
            <SidebarItem 
              icon={<PlusCircle size={20} />} 
              label="개체 등록" 
              active={currentView === 'registration'} 
              onClick={() => setCurrentView('registration')} 
            />
            <SidebarItem 
              icon={<ClipboardList size={20} />} 
              label="오늘의 업무" 
              active={currentView === 'tasks'} 
              onClick={() => setCurrentView('tasks')} 
            />
            <SidebarItem 
              icon={<Calendar size={20} />} 
              label="이벤트 달력" 
              active={currentView === 'calendar'} 
              onClick={() => setCurrentView('calendar')} 
            />
          </nav>
        </div>
        
        <div className="mt-auto p-6">
          <div className="bg-pink-50 rounded-2xl p-4 flex items-start gap-3">
            <Info size={16} className="text-hotpink mt-0.5 shrink-0" />
            <p className="text-xs text-pink-700 leading-relaxed">
              동물들의 행복한 일상을 위해 정성껏 관리해주세요.
            </p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <header className="mb-10">
          <h1 className="text-3xl font-black text-hotpink mb-2">
            서대문 내품애센터 스마트 관리 앱
          </h1>
          <p className="text-gray-500">반려동물과 함께하는 행복한 서대문</p>
        </header>

        <AnimatePresence mode="wait">
          {currentView === 'registration' && (
            <motion.div
              key="registration"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              <section className="card max-w-2xl">
                <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <Dog className="text-mint" /> 신규 개체 등록
                </h2>
                <form onSubmit={handleRegister} className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-600 ml-1">이름</label>
                    <input 
                      className="input-field" 
                      placeholder="예: 멍멍이" 
                      value={formData.name}
                      onChange={e => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-600 ml-1">견종</label>
                    <input 
                      className="input-field" 
                      placeholder="예: 리트리버" 
                      value={formData.breed}
                      onChange={e => setFormData({...formData, breed: e.target.value})}
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-600 ml-1">입소년월</label>
                    <input 
                      type="month" 
                      className="input-field" 
                      value={formData.intakeDate}
                      onChange={e => setFormData({...formData, intakeDate: e.target.value})}
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-600 ml-1">몸무게 (kg)</label>
                    <input 
                      type="number" 
                      step="0.1" 
                      className="input-field" 
                      placeholder="예: 5.2" 
                      value={formData.weight}
                      onChange={e => setFormData({...formData, weight: e.target.value})}
                    />
                  </div>
                  <div className="col-span-2 space-y-1">
                    <label className="text-sm font-medium text-gray-600 ml-1">알러지 정보</label>
                    <input 
                      className="input-field" 
                      placeholder="예: 닭고기 알러지 있음" 
                      value={formData.allergy}
                      onChange={e => setFormData({...formData, allergy: e.target.value})}
                    />
                  </div>
                  <div className="col-span-2 flex items-center gap-3 py-2">
                    <button
                      type="button"
                      onClick={() => setFormData({...formData, isNeutered: !formData.isNeutered})}
                      className={`w-12 h-6 rounded-full transition-colors relative ${formData.isNeutered ? 'bg-mint' : 'bg-gray-200'}`}
                    >
                      <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${formData.isNeutered ? 'left-7' : 'left-1'}`} />
                    </button>
                    <span className="text-sm font-medium text-gray-700">중성화 여부</span>
                  </div>
                  <div className="col-span-2 pt-4">
                    <button type="submit" className="btn-primary w-full flex items-center justify-center gap-2">
                      <PlusCircle size={20} /> 등록하기
                    </button>
                  </div>
                </form>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-4">등록된 개체 목록 ({animals.length})</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {animals.map(animal => (
                    <motion.div 
                      layout
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      key={animal.id} 
                      className="card relative group"
                    >
                      <button 
                        onClick={() => deleteAnimal(animal.id)}
                        className="absolute top-4 right-4 text-gray-300 hover:text-hotpink opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Trash2 size={18} />
                      </button>
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center text-hotpink">
                          <Dog size={24} />
                        </div>
                        <div>
                          <h3 className="font-bold text-lg">{animal.name}</h3>
                          <p className="text-xs text-gray-500">{animal.breed}</p>
                        </div>
                      </div>
                      <div className="space-y-2 text-sm text-gray-600">
                        <div className="flex justify-between">
                          <span>입소년월</span>
                          <span className="font-medium">{animal.intakeDate || '-'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>몸무게</span>
                          <span className="font-medium">{animal.weight ? `${animal.weight}kg` : '-'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>중성화</span>
                          <span className={`font-medium ${animal.isNeutered ? 'text-mint' : 'text-gray-400'}`}>
                            {animal.isNeutered ? '완료' : '미완료'}
                          </span>
                        </div>
                        {animal.allergy && (
                          <div className="mt-2 p-2 bg-yellow-50 rounded-lg text-xs text-yellow-700">
                            <strong>알러지:</strong> {animal.allergy}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                  {animals.length === 0 && (
                    <div className="col-span-full py-12 text-center text-gray-400 border-2 border-dashed border-pink-100 rounded-2xl">
                      등록된 개체가 없습니다.
                    </div>
                  )}
                </div>
              </section>
            </motion.div>
          )}

          {currentView === 'tasks' && (
            <motion.div
              key="tasks"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">오늘의 업무 체크리스트</h2>
                <div className="text-sm text-gray-500 bg-white px-4 py-2 rounded-full shadow-sm border border-pink-50">
                  {new Date().toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' })}
                </div>
              </div>

              {animals.length === 0 ? (
                <div className="py-20 text-center text-gray-400 bg-white rounded-2xl border border-pink-50">
                  업무를 관리할 개체가 없습니다. 먼저 개체를 등록해주세요.
                </div>
              ) : (
                <div className="space-y-4">
                  {animals.map(animal => (
                    <div key={animal.id} className="card">
                      <div className="flex items-center gap-3 mb-4 border-b border-pink-50 pb-3">
                        <div className="w-10 h-10 bg-mint/10 rounded-full flex items-center justify-center text-mint">
                          <Dog size={20} />
                        </div>
                        <h3 className="font-bold text-lg">{animal.name} <span className="text-sm font-normal text-gray-400 ml-2">{animal.breed}</span></h3>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <TaskItem 
                          label="산책" 
                          completed={tasks.find(t => t.animalId === animal.id && t.type === 'walk')?.completed || false}
                          onClick={() => {
                            const task = tasks.find(t => t.animalId === animal.id && t.type === 'walk');
                            if (task) toggleTask(task.id);
                          }}
                        />
                        <TaskItem 
                          label="청소" 
                          completed={tasks.find(t => t.animalId === animal.id && t.type === 'cleaning')?.completed || false}
                          onClick={() => {
                            const task = tasks.find(t => t.animalId === animal.id && t.type === 'cleaning');
                            if (task) toggleTask(task.id);
                          }}
                        />
                        <TaskItem 
                          label="식사" 
                          completed={tasks.find(t => t.animalId === animal.id && t.type === 'meal')?.completed || false}
                          onClick={() => {
                            const task = tasks.find(t => t.animalId === animal.id && t.type === 'meal');
                            if (task) toggleTask(task.id);
                          }}
                        />
                        <TaskItem 
                          label="복약" 
                          completed={tasks.find(t => t.animalId === animal.id && t.type === 'medication')?.completed || false}
                          onClick={() => {
                            const task = tasks.find(t => t.animalId === animal.id && t.type === 'medication');
                            if (task) toggleTask(task.id);
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {currentView === 'calendar' && (
            <motion.div
              key="calendar"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              className="card min-h-[500px] flex flex-col items-center justify-center text-center"
            >
              <div className="w-20 h-20 bg-pink-100 rounded-full flex items-center justify-center text-hotpink mb-6">
                <Calendar size={40} />
              </div>
              <h2 className="text-2xl font-bold mb-2">이벤트 달력</h2>
              <p className="text-gray-500 max-w-md">
                센터의 주요 일정과 교육 프로그램을 한눈에 확인하세요. 
                (현재 달력 기능 준비 중입니다)
              </p>
              
              <div className="mt-8 grid grid-cols-7 gap-2 w-full max-w-2xl">
                {['일', '월', '화', '수', '목', '금', '토'].map(day => (
                  <div key={day} className="text-xs font-bold text-gray-400 py-2">{day}</div>
                ))}
                {Array.from({ length: 31 }).map((_, i) => (
                  <div key={i} className="aspect-square border border-pink-50 rounded-lg flex items-start p-1 text-[10px] text-gray-400 hover:bg-pink-50 transition-colors cursor-pointer">
                    {i + 1}
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

function SidebarItem({ icon, label, active, onClick }: { icon: React.ReactNode, label: string, active: boolean, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
        active 
          ? 'bg-hotpink text-white shadow-md' 
          : 'text-gray-500 hover:bg-pink-50 hover:text-hotpink'
      }`}
    >
      {icon}
      <span className="font-medium">{label}</span>
    </button>
  );
}

function TaskItem({ label, completed, onClick }: { label: string, completed: boolean, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={`flex items-center justify-between p-3 rounded-xl border transition-all ${
        completed 
          ? 'bg-mint/5 border-mint text-mint' 
          : 'bg-white border-gray-100 text-gray-500 hover:border-mint/30'
      }`}
    >
      <span className="text-sm font-bold">{label}</span>
      {completed ? <CheckCircle2 size={18} /> : <Circle size={18} className="text-gray-200" />}
    </button>
  );
}
