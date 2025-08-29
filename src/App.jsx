import { useState } from "react";

function App() {
  const [opponent, setOpponent] = useState("");
  const [date, setDate] = useState("");

  const [ownStats, setOwnStats] = useState({
    fastBreak: 0,
    setPlay: 0,
    onTarget: 0,
    offTarget: 0,
    goals: 0,
  });

  const [oppStats, setOppStats] = useState({
    fastBreak: 0,
    setPlay: 0,
    onTarget: 0,
    offTarget: 0,
    goals: 0,
  });

  const resetStats = () => {
    setOwnStats({ fastBreak: 0, setPlay: 0, onTarget: 0, offTarget: 0, goals: 0 });
    setOppStats({ fastBreak: 0, setPlay: 0, onTarget: 0, offTarget: 0, goals: 0 });
    setOpponent("");
    setDate("");
  };

  const calcStats = (team) => {
    const attacks = team.fastBreak + team.setPlay;
    const shots = team.onTarget + team.offTarget;
    const saves = team.onTarget - team.goals;
    const successRate = attacks > 0 ? ((team.goals / attacks) * 100).toFixed(1) : 0;
    const saveRate = team.onTarget > 0 ? ((saves / team.onTarget) * 100).toFixed(1) : 0;
    return { attacks, shots, saves, successRate, saveRate };
  };

  const own = calcStats(ownStats);
  const opp = calcStats(oppStats);

  const StatCard = ({ title, stats, setStats }) => (
    <div className="bg-white shadow-md rounded-lg p-4 w-full sm:w-1/2">
      <h2 className="text-lg font-bold mb-2">{title}</h2>
      <div className="grid grid-cols-2 gap-2">
        <button
          onClick={() => setStats({ ...stats, fastBreak: stats.fastBreak + 1 })}
          className="bg-blue-400 text-white p-2 rounded"
        >
          速攻 ({stats.fastBreak})
        </button>
        <button
          onClick={() => setStats({ ...stats, setPlay: stats.setPlay + 1 })}
          className="bg-green-400 text-white p-2 rounded"
        >
          セット ({stats.setPlay})
        </button>
        <button
          onClick={() => setStats({ ...stats, onTarget: stats.onTarget + 1 })}
          className="bg-orange-400 text-white p-2 rounded"
        >
          枠内 ({stats.onTarget})
        </button>
        <button
          onClick={() => setStats({ ...stats, offTarget: stats.offTarget + 1 })}
          className="bg-gray-400 text-white p-2 rounded"
        >
          枠外 ({stats.offTarget})
        </button>
        <button
          onClick={() => setStats({ ...stats, goals: stats.goals + 1 })}
          className="bg-red-500 text-white p-2 rounded col-span-2"
        >
          ゴール ({stats.goals})
        </button>
      </div>

      <div className="mt-4 text-sm">
        <p>総攻撃回数: {stats.fastBreak + stats.setPlay}</p>
        <p>シュート本数: {stats.onTarget + stats.offTarget}</p>
        <p>ゴール数: {stats.goals}</p>
        <p>セーブ数: {stats.onTarget - stats.goals}</p>
        <p>攻撃成功率: {calcStats(stats).successRate}%</p>
        <p>セーブ率: {calcStats(stats).saveRate}%</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-lg p-4 mb-4">
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="border p-2 mr-2"
        />
        <input
          type="text"
          placeholder="相手チーム名"
          value={opponent}
          onChange={(e) => setOpponent(e.target.value)}
          className="border p-2"
        />
        <h1 className="text-xl font-bold mt-2">
          {date && <>{date}<br /></>}
          近江兄弟社 ({ownStats.goals}) - ({oppStats.goals}) {opponent || "相手チーム"}
        </h1>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <StatCard title="🏠 近江兄弟社" stats={ownStats} setStats={setOwnStats} />
        <StatCard title={`🆚 ${opponent || "相手チーム"}`} stats={oppStats} setStats={setOppStats} />
      </div>

      <button
        onClick={resetStats}
        className="mt-6 bg-black text-white px-4 py-2 rounded w-full"
      >
        リセット
      </button>
    </div>
  );
}

export default App;
