import React, { useState, useEffect } from 'react';
import { 
  CreditCard, Send, ShoppingBag, ShieldCheck, Palette, Ghost, 
  LayoutDashboard, ArrowRightLeft, History, LogOut, Box,
  TrendingUp, Landmark, Crown, MousePointer2, Zap, User, Bitcoin, Gift, Clock
} from 'lucide-react';

const IPHONES = [
  { id: 1, name: "iPhone 15 Pro Max", price: 120000 },
  { id: 2, name: "iPhone 15 Pro", price: 100000 },
  { id: 3, name: "iPhone 14", price: 60000 }
];

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => localStorage.getItem('mansur_session') === 'true');
  const [isRegistering, setIsRegistering] = useState(false);
  const [loginData, setLoginData] = useState({ login: '', pass: '' });
  const [currentUser, setCurrentUser] = useState(() => localStorage.getItem('mansur_active_user') || '');

  const [balance, setBalance] = useState(0);
  const [btcBalance, setBtcBalance] = useState(0.001);
  const [cardNumber, setCardNumber] = useState('');
  const [inventory, setInventory] = useState([]);
  const [isVip, setIsVip] = useState(false);
  const [loan, setLoan] = useState(0);
  const [exp, setExp] = useState(0); 
  const [transactions, setTransactions] = useState([]);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [notif, setNotif] = useState('');

  const level = Math.floor(exp / 150) + 1;

  useEffect(() => {
    if (isLoggedIn && currentUser) {
      const userData = JSON.parse(localStorage.getItem(`data_${currentUser}`)) || {};
      setBalance(userData.balance ?? 500);
      setBtcBalance(userData.btc ?? 0.001);
      setCardNumber(userData.card || '4455 0000 0000 0000');
      setInventory(userData.inventory || []);
      setIsVip(userData.isVip || false);
      setLoan(userData.loan || 0);
      setExp(userData.exp || 0);
      setTransactions(userData.transactions || []);
    }
  }, [isLoggedIn, currentUser]);

  useEffect(() => {
    if (isLoggedIn && currentUser) {
      const dataToSave = { balance, btc: btcBalance, card: cardNumber, inventory, isVip, loan, exp, transactions };
      localStorage.setItem(`data_${currentUser}`, JSON.stringify(dataToSave));
    }
  }, [balance, btcBalance, inventory, isVip, loan, exp, transactions, isLoggedIn, currentUser, cardNumber]);

  const showNotif = (msg) => {
    setNotif(msg);
    setTimeout(() => setNotif(''), 3000);
  };

  const addTransaction = (desc, amount) => {
    const newTx = { id: Date.now(), desc, amount, date: new Date().toLocaleTimeString() };
    setTransactions(prev => [newTx, ...prev]);
  };

  const handleAuth = () => {
    const { login, pass } = loginData;
    if (!login || !pass) return showNotif("ЗАПОЛНИТЕ ПОЛЯ!");
    const userKey = `user_${login}`;
    const savedUser = JSON.parse(localStorage.getItem(userKey));

    if (isRegistering) {
      if (savedUser) return showNotif("ЛОГИН ЗАНЯТ!");
      const newCard = `4455 ${Math.floor(1000 + Math.random() * 9000)} ${Math.floor(1000 + Math.random() * 9000)} ${Math.floor(1000 + Math.random() * 9000)}`;
      localStorage.setItem(userKey, JSON.stringify({ login, pass }));
      setCurrentUser(login);
      setCardNumber(newCard);
      setBalance(500); 
      setBtcBalance(0.001);
      localStorage.setItem('mansur_active_user', login);
      localStorage.setItem('mansur_session', 'true');
      setIsLoggedIn(true);
      showNotif("БОНУС ЗАЧИСЛЕН!");
    } else {
      if (savedUser && savedUser.pass === pass) {
        setCurrentUser(login);
        localStorage.setItem('mansur_active_user', login);
        localStorage.setItem('mansur_session', 'true');
        setIsLoggedIn(true);
      } else { showNotif("ОШИБКА ДОСТУПА"); }
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black p-6 font-mono text-white">
        <div className="w-full max-w-md p-10 bg-[#050505] border border-green-500/30 rounded-[30px]">
          <div className="flex justify-center gap-4 mb-8">
             <ShieldCheck className="text-green-500" size={40}/>
             <h1 className="text-2xl font-black text-green-500">E-BANK</h1>
          </div>
          <div className="space-y-4">
            <input type="text" placeholder="Username" className="w-full bg-black border border-green-500/40 rounded-xl p-4 outline-none" onChange={e => setLoginData({...loginData, login: e.target.value})} />
            <input type="password" placeholder="Пароль" className="w-full bg-black border border-green-500/40 rounded-xl p-4 outline-none" onChange={e => setLoginData({...loginData, pass: e.target.value})} />
            <button onClick={handleAuth} className="w-full py-4 rounded-xl font-black bg-green-500 text-black uppercase active:scale-95 transition-all">
               {isRegistering ? 'СОЗДАТЬ АККАУНТ' : 'ВОЙТИ'}
            </button>
            <button onClick={() => setIsRegistering(!isRegistering)} className="w-full text-center text-xs text-purple-400 font-bold underline">
              {isRegistering ? 'Уже есть аккаунт?' : 'Создать новый аккаунт'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white flex font-mono overflow-hidden">
      {notif && <div className="fixed top-5 right-5 bg-black border border-green-500 p-4 z-[300] rounded-lg text-xs">{notif}</div>}
      <aside className="w-64 bg-black border-r border-purple-500/20 p-6 flex flex-col gap-1 overflow-y-auto">
        <h2 className="text-2xl font-black text-green-500 mb-10 text-center">E-BANK</h2>
        {[
          { id: 'dashboard', n: 'Дашборд', i: LayoutDashboard },
          { id: 'clicker', n: 'Кликер', i: MousePointer2 },
          { id: 'p2p', n: 'Переводы', i: ArrowRightLeft },
          { id: 'crypto', n: 'Крипта', i: Bitcoin },
          { id: 'shop', n: 'Магазин', i: ShoppingBag },
          { id: 'invest', n: 'Инвест', i: TrendingUp },
          { id: 'credit', n: 'Кредиты', i: Landmark },
          { id: 'leader', n: 'Топ игроков', i: Crown },
          { id: 'history', n: 'История', i: History },
        ].map(t => (
          <button key={t.id} onClick={() => setActiveTab(t.id)} className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all ${activeTab === t.id ? `bg-purple-900/30 border border-purple-500/50 text-white` : 'opacity-40 hover:opacity-100'}`}>
            <t.i size={16}/> <span className="text-xs font-bold uppercase">{t.n}</span>
          </button>
        ))}
        <button onClick={() => { localStorage.removeItem('mansur_session'); window.location.reload(); }} className="mt-auto p-2 text-red-500 text-xs font-bold flex items-center gap-2 opacity-50 hover:opacity-100"><LogOut size={16}/> ВЫХОД</button>
      </aside>
      <main className="flex-1 p-10 overflow-y-auto">
        <header className="flex justify-between items-start mb-10">
          <div>
            <h3 className="text-3xl font-black text-yellow-500 uppercase italic">E-BANK</h3>
            <p className="text-[10px] opacity-40 uppercase tracking-widest">{currentUser} | {cardNumber}</p>
          </div>
          <div className="bg-black/60 p-6 rounded-3xl border border-white/5 text-right min-w-[200px]">
            <p className="text-3xl font-black text-green-400">${balance.toLocaleString()} ₽</p>
            <p className="text-[10px] text-orange-400 font-bold italic">₿ {btcBalance.toFixed(4)}</p>
          </div>
        </header>

        {activeTab === 'dashboard' && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="p-6 bg-white/5 border border-purple-500/20 rounded-2xl text-center">
              <p className="text-[10px] opacity-40 uppercase font-black mb-3">Уровень</p>
              <p className="text-3xl font-black">{level}</p>
              <div className="w-full bg-black h-1.5 rounded-full mt-4 overflow-hidden border border-white/5">
                <div className="bg-green-500 h-full" style={{ width: `${(exp % 150) / 1.5}%` }}></div>
              </div>
            </div>
            <div className="p-6 bg-white/5 border border-purple-500/20 rounded-2xl text-center">
              <p className="text-[10px] opacity-40 uppercase font-black mb-3">XP</p>
              <p className="text-xl font-black text-cyan-400">{exp}</p>
            </div>
          </div>
        )}

        {activeTab === 'clicker' && (
          <div className="flex flex-col items-center justify-center py-10">
            <button onClick={() => { setBalance(b => b + 10); setExp(e => e + 5); }} className="w-64 h-64 rounded-full border-[10px] border-purple-500/30 bg-black flex items-center justify-center shadow-[0_0_50px_rgba(168,85,247,0.2)] active:scale-90 transition-all">
              <Zap size={80} className="text-purple-500"/>
            </button>
            <p className="mt-10 text-xl font-black text-purple-400 animate-pulse uppercase">КЛИКАЙ!</p>
          </div>
        )}

        {activeTab === 'p2p' && (
          <div className="max-w-md mx-auto bg-white/5 p-8 rounded-3xl border border-white/10 space-y-6 text-white">
            <h4 className="text-xl font-black uppercase italic">Перевод</h4>
            <input type="text" placeholder="Номер карты" className="w-full bg-black border border-white/10 p-4 rounded-xl text-sm outline-none text-white" />
            <input type="number" id="send_val" placeholder="Сумма ₽" className="w-full bg-black border border-white/10 p-4 rounded-xl text-xl font-black outline-none text-white" />
            <button onClick={() => {
              const el = document.getElementById('send_val');
              const v = Number(el.value);
              if(balance >= v && v > 0) { setBalance(b => b - v); addTransaction('ПЕРЕВОД', -v); showNotif("УСПЕШНО"); el.value = ''; }
              else { showNotif("МАЛО СРЕДСТВ"); }
            }} className="w-full py-4 bg-green-500 text-black font-black rounded-xl uppercase">Отправить</button>
          </div>
        )}

        {activeTab === 'crypto' && (
           <div className="max-w-md mx-auto bg-white/5 p-8 rounded-3xl border border-white/10 space-y-6 text-center text-white">
              <Bitcoin size={60} className="mx-auto text-orange-500"/>
              <h4 className="text-xl font-black uppercase italic">BITCOIN MARKET</h4>
              <p className="text-2xl font-black">1 BTC = 65,000 ₽</p>
              <button onClick={() => {
                if(balance >= 6500) { setBalance(b => b - 6500); setBtcBalance(v => v + 0.1); showNotif("КУПЛЕНО 0.1 BTC"); }
                else { showNotif("НУЖНО 6500 ₽"); }
              }} className="w-full py-4 bg-orange-500 text-black font-black rounded-xl uppercase">Купить 0.1 BTC (6500 ₽)</button>
           </div>
        )}

        {activeTab === 'shop' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-white">
            {IPHONES.map(p => (
              <div key={p.id} className="p-6 bg-white/5 border border-white/10 rounded-2xl flex justify-between items-center">
                <span className="font-black italic text-lg">{p.name}</span>
                <button onClick={() => {
                  if(balance >= p.price) { setBalance(b => b - p.price); addTransaction(p.name, -p.price); showNotif("КУПЛЕНО"); }
                  else { showNotif("МАЛО ДЕНЕГ"); }
                }} className="px-6 py-2 bg-green-500 text-black font-black rounded-lg">{p.price.toLocaleString()} ₽</button>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'history' && (
          <div className="space-y-2 text-white">
            {transactions.map(t => (
              <div key={t.id} className="p-4 bg-white/5 border border-white/5 rounded-xl flex justify-between text-xs font-bold">
                <span className="opacity-40">{t.date} | {t.desc}</span>
                <span className={t.amount > 0 ? 'text-green-500' : 'text-red-500'}>{t.amount > 0 ? '+' : ''}{t.amount.toLocaleString()} ₽</span>
              </div>
            ))}
            {transactions.length === 0 && <p className="text-center opacity-20 py-20 uppercase font-black">История пуста</p>}
          </div>
        )}
      </main>
    </div>
  );
}
