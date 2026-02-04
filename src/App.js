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

  // Игровые данные
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
      localStorage.setItem('mansur_active_user', login);
      localStorage.setItem('mansur_session', 'true');
      setCardNumber(newCard);
      setBalance(500); 
      setBtcBalance(0.001);
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
      <div className="min-h-screen flex items-center justify-center bg-black p-6 font-mono">
        <div className="w-full max-w-md p-10 bg-[#050505] border border-green-500/30 rounded-[30px] shadow-[0_0_40px_rgba(0,255,0,0.2)]">
          <div className="flex justify-center gap-4 mb-8">
             <ShieldCheck className="text-green-500" size={40}/>
             <div className="text-left">
                <h1 className="text-2xl font-black text-green-500 italic">E-BANK</h1>
                <p className="text-[9px] text-cyan-400 font-bold uppercase tracking-widest">Асидный цифровой банкинг</p>
             </div>
          </div>
          <h2 className="text-xl font-black text-center text-green-400 mb-8 uppercase tracking-widest">{isRegistering ? 'РЕГИСТРАЦИЯ' : 'ВХОД'}</h2>
          <div className="space-y-4">
            <input type="text" placeholder="Придумайте username" className="w-full bg-black border border-green-500/40 rounded-xl p-4 text-white outline-none" onChange={e => setLoginData({...loginData, login: e.target.value})} />
            <input type="password" placeholder="Пароль" className="w-full bg-black border border-green-500/40 rounded-xl p-4 text-white outline-none" onChange={e => setLoginData({...loginData, pass: e.target.value})} />
            <button onClick={handleAuth} className="w-full py-4 rounded-xl font-black bg-gradient-to-r from-green-500 to-cyan-500 text-black uppercase shadow-lg shadow-green-500/20 active:scale-95 transition-all">
              <User size={16} className="inline mr-2"/> {isRegistering ? 'СОЗДАТЬ АККАУНТ' : 'ВОЙТИ'}
            </button>
            <button onClick={() => setIsRegistering(!isRegistering)} className="w-full text-center text-[10px] text-purple-400 font-bold underline">
              {isRegistering ? 'Уже есть аккаунт?' : 'Создать новый аккаунт'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white flex font-mono overflow-hidden">
      {notif && <div className="fixed top-5 right-5 bg-black border border-green-500 p-4 z-[300] rounded-lg shadow-2xl text-xs">{notif}</div>}

      <aside className="w-64 bg-black border-r border-purple-500/20 p-6 flex flex-col gap-1">
        <div className="mb-10"><h2 className="text-2xl font-black text-green-500">E-BANK</h2></div>
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
            <h3 className="text-3xl font-black text-yellow-500 italic uppercase">ДАШБОРД E-BANK</h3>
            <p className="text-[10px] opacity-40 uppercase tracking-widest">{currentUser} | {cardNumber}</p>
          </div>
          <div className="bg-black/60 p-6 rounded-3xl border border-white/5 text-right min-w-[200px]">
            <p className="text-[9px] opacity-40 uppercase">БАЛАНС</p>
            <p className="text-3xl font-black text-green-400 tracking-tighter">${balance.toLocaleString()} ₽</p>
            <p className="text-[10px] text-orange-400 font-bold">₿ {btcBalance.toFixed(4)}</p>
          </div>
        </header>

        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            <div className="grid grid-cols-4 gap-4">
                <div className="p-6 bg-[#0a0a0a] border border-purple-500/20 rounded-2xl text-center">
                    <p className="text-[10px] opacity-40 uppercase font-black mb-3">Ваш уровень</p>
                    <p className="text-3xl font-black">{level}</p>
                    <div className="w-full bg-black h-1.5 rounded-full mt-4 overflow-hidden border border-white/5">
                        <div className="bg-green-500 h-full" style={{ width: `${(exp % 150) / 1.5}%` }}></div>
                    </div>
                </div>
                <div className="p-6 bg-[#0a0a0a] border border-purple-500/20 rounded-2xl text-center">
                    <p className="text-[10px] opacity-40 uppercase font-black mb-3">VIP статус</p>
                    <p className={`text-xl font-black ${isVip ? 'text-purple-400' : 'text-cyan-400'}`}>{isVip ? 'Элитный' : 'Обычный'}</p>
                </div>
                <div className="p-6 bg-[#0a0a0a] border border-purple-500/20 rounded-2xl text-center">
                    <p className="text-[10px] opacity-40 uppercase font-black mb-3">Стрик кликов</p>
                    <p className="text-xl font-black text-cyan-400">0 дней</p>
                </div>
                <div className="p-6 bg-[#0a0a0a] border border-purple-500/20 rounded-2xl text-center">
                    <p className="text-[10px] opacity-40 uppercase font-black mb-3">Кредиты</p>
                    <p className="text-xl font-black text-red-500">${loan.toLocaleString()} ₽</p>
                </div>
            </div>
            <div className="grid grid-cols-4 gap-4">
                <button onClick={() => setActiveTab('clicker')} className="p-4 bg-green-500 text-black font-black rounded-xl text-xs uppercase">ЗАРАБОТАТЬ В КЛИКЕРЕ</button>
                <button onClick={() => setActiveTab('crypto')} className="p-4 bg-purple-500 text-black font-black rounded-xl text-xs uppercase">КУПИТЬ КРИПТУ</button>
                <button onClick={() => showNotif("БОНУС УЖЕ ПОЛУЧЕН")} className="p-4 bg-cyan-500 text-black font-black rounded-xl text-xs uppercase">ЕЖЕДНЕВНЫЙ БОНУС</button>
                <button onClick={() => setActiveTab('credit')} className="p-4 bg-purple-600 text-black font-black rounded-xl text-xs uppercase">ВЗЯТЬ КРЕДИТ</button>
            </div>
          </div>
        )}

        {activeTab === 'clicker' && (
          <div className="flex flex-col items-center justify-center py-10">
            <button onClick={() => { setBalance(b => b + 10); setExp(e => e + 5); }} className="w-64 h-64 rounded-full border-[10px] border-purple-500/30 bg-black flex items-center justify-center shadow-[0_0_50px_rgba(168,85,247,0.2)] active:scale-90 transition-all">
              <Zap size={80} className="text-purple-500"/>
            </button>
            <p className="mt-10 text-xl font-black text-purple-400 animate-pulse">КЛИКАЙ!</p>
          </div>
        )}

        {activeTab === 'p2p' && (
          <div className="max-w-md mx-auto bg-[#0a0a0a] p-8 rounded-3xl border border-white/10 space-y-6">
            <h4 className="text-xl font-black uppercase tracking-tighter italic">Перевод по номеру карты</h4>
            <input type="text" placeholder="4455 XXXX XXXX XXXX" className="w-full bg-black border border-white/10 p-4 rounded-xl text-sm" />
            <input type="number" id="send_val" placeholder="Сумма ₽" className="w-full bg-black border border-white/10 p-4 rounded-xl text-xl font-black" />
            <button onClick={() => {
              const v = Number(document.getElementById('send_val').value);
              if(balance >= v && v > 0) { setBalance(b => b - v); addTransaction('ПЕРЕВОД', -v); showNotif("УСПЕШНО"); }
              else { showNotif("МАЛО СРЕДСТВ"); }
            }} className="w-full py-4 bg-green-500 text-black font-black rounded-xl">ОТПРАВИТЬ</button>
          </div>
        )}

        {activeTab === 'crypto' && (
           <div className="max-w-md mx-auto bg-[#0a0a0a] p-8 rounded-3xl border border-white/10 space-y-6 text-center">
              <Bitcoin size={60} className="mx-auto text-orange-500 shadow-orange-500/50"/>
              <h4 className="text-xl font-black uppercase italic">BITCOIN MARKET</h4>
              <p className="text-2xl font-black">КУРС: $65,000 ₽</p>
              <button onClick={() => {
                if(balance >= 6500) { setBalance(b => b - 6500); setBtcBalance(v => v + 0.1); showNotif("КУПЛЕНО 0.1 BTC"); }
                else { showNotif("НУЖНО 6500 ₽"); }
              }} className="w-full py-4 bg-orange-500 text-black font-black rounded-xl">КУПИТЬ 0.1 BTC (6500 ₽)</button>
           </div>
        )}

        {activeTab === 'shop' && (
          <div className="grid grid-cols-2 gap-4">
            {IPHONES.map(p => (
              <div key={p.id} className="p-6 bg-[#0a0a0a] border border-white/10 rounded-2xl flex justify-between items-center">
                <span className="font-black italic text-lg">{p.name}</span>
                <button onClick={() => {
                  if(balance >= p.price) { setBalance(b => b - p.price); addTransaction(p.name, -p.price); showNotif("КУПЛЕНО"); }
                  else { showNotif("МАЛО ДЕНЕГ"); }
                }} className="px-6 py-2 bg-green-500 text-black font-black rounded-lg">{p.price} ₽</button>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'invest' && (
          <div className="max-w-md mx-auto space-y-4">
            <div className="p-6 bg-[#0a0a0a] border border-green-500/20 rounded-2xl flex justify-between">
              <span className="font-black italic uppercase">АКЦИИ ГАЗПРОМ</span>
              <button onClick={() => {
                if(balance >= 1000) {
                  const win = Math.random() > 0.5;
                  setBalance(b => b + (win ? 2000 : -1000));
                  showNotif(win ? "ПРИБЫЛЬ +2000" : "УБЫТОК -1000");
                }
              }} className="px-4 py-2 bg-white/5 rounded-lg border border-white/20 text-xs font-black">ИНВЕСТ 1000₽</button>
            </div>
          </div>
        )}

        {activeTab === 'credit' && (
          <div className="max-w-md mx-auto bg-[#0a0a0a] p-10 rounded-3xl border border-red-500/20 text-center space-y-6">
            <Landmark size={48} className="mx-auto text-red-500"/>
            <h4 className="text-xl font-black uppercase">ВЗЯТЬ 50,000 ₽ В ДОЛГ</h4>
            <p className="text-[10px] opacity-40">Возврат: 60,000 ₽</p>
            <button onClick={() => {
              if(loan === 0) { setBalance(b => b + 50000); setLoan(60000); showNotif("ЗАЧИСЛЕНО"); }
              else { showNotif("ЕСТЬ ДОЛГ"); }
            }} className="w-full py-4 bg-red-600 text-black font-black rounded-xl">ПОЛУЧИТЬ КРЕДИТ</button>
            <button onClick={() => {
              if(balance >= loan && loan > 0) { setBalance(b => b - loan); setLoan(0); showNotif("ПОГАШЕНО"); }
            }} className="w-full py-4 border border-white/10 rounded-xl">ВЕРНУТЬ ДОЛГ</button>
          </div>
        )}

        {activeTab === 'leader' && (
          <div className="bg-[#0a0a0a] border border-white/10 rounded-3xl overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-white/5 text-[10px] font-black uppercase opacity-40">
                <tr><th className="p-6">RANK</th><th className="p-6">ИГРОК</th><th className="p-6">БАЛАНС</th></tr>
              </thead>
              <tbody>
                <tr className="bg-yellow-500/5 text-yellow-500 font-bold">
                  <td className="p-6">#1</td><td className="p-6">MANSUR_BOSS</td><td className="p-6">9,999,999 ₽</td>
                </tr>
                <tr className="bg-green-500/5 text-green-500 font-bold">
                  <td className="p-6">#2</td><td className="p-6">{currentUser} (Вы)</td><td className="p-6">{balance.toLocaleString()} ₽</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'history' && (
          <div className="space-y-2">
            {transactions.map(t => (
              <div key={t.id} className="p-4 bg-[#0a0a0a] border border-white/5 rounded-xl flex justify-between text-xs font-bold">
                <span className="opacity-40">{t.date} | {t.desc}</span>
                <span className={t.amount > 0 ? 'text-green-500' : 'text-red-500'}>{t.amount > 0 ? '+' : ''}{t.amount} ₽</span>
              </div>
            ))}
            {transactions.length === 0 && <p className="text-center opacity-20 py-20 uppercase font-black">История пуста</p>}
          </div>
        )}
      </main>
    </div>
  );
}
