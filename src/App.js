import React, { useState, useEffect } from 'react';
import { CreditCard, Send, ShoppingBag, Smartphone, ShieldCheck, ArrowUpRight, Cpu, History, Lock, Terminal, Palette, Ghost } from 'lucide-react';

const IPHONES = [
  { id: 1, name: "iPhone 15 Pro", price: 1000 },
  { id: 2, name: "iPhone 15", price: 800 },
  { id: 3, name: "iPhone 14", price: 600 }
];

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginInput, setLoginInput] = useState('');
  const [passInput, setPassInput] = useState('');
  
  const [theme, setTheme] = useState('blue');
  const [balance, setBalance] = useState(() => Number(localStorage.getItem('mansur_balance')) || 100000);
  const [activeTab, setActiveTab] = useState('card');
  const [transactions, setTransactions] = useState(() => JSON.parse(localStorage.getItem('mansur_tx')) || [{ id: 1, desc: 'SYSTEM_INIT', amount: 100000, date: 'START' }]);
  const [notif, setNotif] = useState('');
  const [isHacking, setIsHacking] = useState(false);

  useEffect(() => {
    localStorage.setItem('mansur_balance', balance);
    localStorage.setItem('mansur_tx', JSON.stringify(transactions));
  }, [balance, transactions]);

  const showNotif = (msg) => {
    setNotif(msg);
    setTimeout(() => setNotif(''), 3000);
  };

  const handleAuth = () => {
    if (!loginInput || !passInput) {
      showNotif("ЗАПОЛНИТЕ ВСЕ ПОЛЯ!");
      return;
    }
    const savedUser = JSON.parse(localStorage.getItem('mansur_user'));
    if (!savedUser) {
      const newUser = { login: loginInput, pass: passInput };
      localStorage.setItem('mansur_user', JSON.stringify(newUser));
      setIsLoggedIn(true);
      showNotif("АККАУНТ СОЗДАН!");
    } else if (savedUser.login === loginInput && savedUser.pass === passInput) {
      setIsLoggedIn(true);
      showNotif("ДОСТУП РАЗРЕШЕН");
    } else {
      showNotif("ОШИБКА: НЕВЕРНЫЙ ПАРОЛЬ");
    }
  };

  const startHacking = () => {
    setIsHacking(true);
    setTimeout(() => {
      setIsHacking(false);
      setBalance(prev => prev + 50000);
      const newTx = { id: Date.now(), desc: 'HACK_BONUS', amount: 50000, date: 'NOW' };
      setTransactions(prev => [newTx, ...prev]);
      showNotif("ВЗЛОМ УДАЛСЯ: +$50,000");
    }, 4000);
  };

  const MatrixEffect = () => (
    <div className="fixed inset-0 bg-black z-[200] overflow-hidden flex justify-around">
      {[...Array(30)].map((_, i) => (
        <div key={i} className="matrix-line" style={{ left: `${i * 3.3}%`, animationDelay: `${Math.random() * 2}s` }}>
          {Math.random().toString(36).substring(2, 8).toUpperCase()}
        </div>
      ))}
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40">
        <Terminal size={80} className="text-green-500 animate-pulse mb-4" />
        <h2 className="text-green-500 text-2xl font-mono tracking-[0.5em]">INJECTING...</h2>
      </div>
    </div>
  );

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#020617] text-white p-6">
        <div className="glass p-10 rounded-[40px] w-full max-w-sm shadow-2xl border border-white/10 text-center">
          <div className={`${theme === 'blue' ? 'bg-blue-600' : 'bg-green-500'} w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg`}>
             <ShieldCheck size={40} />
          </div>
          <h1 className="text-3xl font-black mb-2 italic">MANSUR BANK</h1>
          <p className="text-[10px] opacity-40 mb-8 tracking-[0.3em]">SECURE GATEWAY</p>
          <div className="space-y-4 text-left">
            <input type="text" placeholder="ЛОГИН" className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 outline-none focus:ring-2 ring-blue-500" onChange={e => setLoginInput(e.target.value)} />
            <input type="password" placeholder="ПАРОЛЬ" className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 outline-none focus:ring-2 ring-blue-500" onChange={e => setPassInput(e.target.value)} />
            <button onClick={handleAuth} className={`${theme === 'blue' ? 'bg-blue-600' : 'bg-green-500'} w-full py-5 rounded-2xl font-black`}>AUTHORIZE</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020617] text-white pb-32">
      {isHacking && <MatrixEffect />}
      {notif && <div className={`fixed top-10 left-1/2 -translate-x-1/2 z-[250] glass px-8 py-4 rounded-2xl font-black border-l-4 ${theme === 'blue' ? 'border-blue-500' : 'border-green-500'} shadow-2xl`}>{notif}</div>}

      <header className="p-10 flex justify-between items-center max-w-5xl mx-auto">
        <div className="flex items-center gap-4">
          <h2 className={`text-2xl font-black italic border-b-2 ${theme === 'blue' ? 'border-blue-600' : 'border-green-500'}`}>MANSUR BANK</h2>
          <button onClick={() => setTheme(theme === 'blue' ? 'green' : 'blue')} className="p-2 glass rounded-xl"><Palette size={20} /></button>
        </div>
        <div className="text-right">
          <p className="text-slate-500 text-[10px] font-bold uppercase">Balance</p>
          <p className={`text-3xl font-black ${theme === 'blue' ? 'text-blue-400' : 'text-green-400'}`}>${balance.toLocaleString()}</p>
        </div>
      </header>

      <main className="px-6 max-w-5xl mx-auto space-y-10">
        {activeTab === 'card' && (
          <div className="space-y-8">
            <div className="h-64 w-full rounded-[45px] p-10 glass border-white/20 shadow-2xl relative overflow-hidden">
               <div className="relative z-10 h-full flex flex-col justify-between font-mono">
                  <div className="flex justify-between items-start">
                    <Cpu size={32} className={theme === 'blue' ? 'text-blue-400' : 'text-green-400'} />
                    <button onClick={startHacking} className="p-2 glass rounded-lg"><Ghost size={24} /></button>
                  </div>
                  <p className="text-2xl tracking-[0.2em]">4455 8899 0011 2026</p>
                  <p className="text-xl font-black italic">{loginInput.toUpperCase()}</p>
               </div>
            </div>
            <div className="glass rounded-[35px] p-8">
               <h3 className="text-xl font-black mb-6 italic">HISTORY</h3>
               <div className="space-y-4 max-h-60 overflow-y-auto">
                  {transactions.map(tx => (
                    <div key={tx.id} className="flex justify-between items-center p-4 bg-white/5 rounded-2xl border border-white/5">
                       <p className="text-sm font-bold">{tx.desc}</p>
                       <p className={`font-black ${tx.amount > 0 ? 'text-green-500' : 'text-red-500'}`}>{tx.amount > 0 ? '+' : ''}{tx.amount}$</p>
                    </div>
                  ))}
               </div>
            </div>
          </div>
        )}

        {activeTab === 'p2p' && (
          <div className="glass p-10 rounded-[40px] space-y-6">
             <h3 className="text-2xl font-black mb-4 italic">P2P PROTOCOL</h3>
             <input id="p2p_val" type="number" placeholder="AMOUNT" className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 outline-none text-2xl" />
             <button onClick={() => {
                const a = Number(document.getElementById('p2p_val').value);
                if(balance >= a && a > 0) { 
                  setBalance(b => b - a); 
                  setTransactions(prev => [{ id: Date.now(), desc: 'TRANSFER_OUT', amount: -a, date: 'NOW' }, ...prev]); 
                  showNotif('ОТПРАВЛЕНО'); 
                } else { showNotif('НЕДОСТАТОЧНО СРЕДСТВ'); }
             }} className={`w-full ${theme === 'blue' ? 'bg-blue-600' : 'bg-green-500'} py-5 rounded-3xl font-black`}>SEND ASSETS</button>
          </div>
        )}

        {activeTab === 'shop' && (
          <div className="space-y-4">
            {IPHONES.map(phone => (
              <div key={phone.id} className="glass p-6 rounded-[35px] flex justify-between items-center">
                <h4 className="font-black text-xl italic">{phone.name}</h4>
                <button onClick={() => { 
                  if(balance >= phone.price) { 
                    setBalance(b => b - phone.price); 
                    setTransactions(prev => [{ id: Date.now(), desc: 'IPHONE_BUY', amount: -phone.price, date: 'NOW' }, ...prev]);
                    showNotif('КУПЛЕНО'); 
                  } else { showNotif('МАЛО ДЕНЕГ'); }
                }} className={`${theme === 'blue' ? 'bg-blue-600' : 'bg-green-500'} px-8 py-3 rounded-2xl font-black`}>${phone.price}</button>
              </div>
            ))}
          </div>
        )}
      </main>

      <nav className="fixed bottom-10 left-1/2 -translate-x-1/2 w-[90%] max-w-sm glass p-2 rounded-full flex justify-around shadow-2xl z-[100]">
        <button onClick={() => setActiveTab('card')} className={`p-5 rounded-full ${activeTab === 'card' ? (theme === 'blue' ? 'bg-blue-600' : 'bg-green-500') : 'text-slate-500'}`}><CreditCard /></button>
        <button onClick={() => setActiveTab('p2p')} className={`p-5 rounded-full ${activeTab === 'p2p' ? (theme === 'blue' ? 'bg-blue-600' : 'bg-green-500') : 'text-slate-500'}`}><Send /></button>
        <button onClick={() => setActiveTab('shop')} className={`p-5 rounded-full ${activeTab === 'shop' ? (theme === 'blue' ? 'bg-blue-600' : 'bg-green-500') : 'text-slate-500'}`}><ShoppingBag /></button>
      </nav>
    </div>
  );
}
