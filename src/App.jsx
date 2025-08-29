import { useState } from "react";

function App() {
  // チーム名と日付
  const [opponent, setOpponent] = useState("");
  const [date, setDate] = useState("");

  // 自チームと相手チームのデータ
  const [stats, setStats] = useState({
    self: { fast: 0, setplay: 0, shotIn: 0, shotOut: 0, goals: 0 },
    opp: { fast: 0, setplay: 0, shotIn: 0, shotOut: 0, goals: 0 },
  });

  // カウント処理
  const add = (team, key) => {
    setStats((prev) => ({
      ...prev,
      [team]: { ...prev[team], [key]: prev[team][key] + 1 },
    }));
  };

  // 計算
  const calc = (team) => {
    const d = stats[team];
    const attacks = d.fast + d.setplay;
    const shots = d.shotIn + d.shotOut;
    const saves = d.shotIn - d.goals;
    const success = shots > 0 ? ((d.goals / shots) * 100).toFixed(1) : 0;
    const saveRate = d.shotIn > 0 ? ((saves / d.shotIn) * 100).toFixed(1) : 0;
    return { attacks, shots, saves, success, saveRate };
  };

  const self = calc("self");
  const opp = calc("opp");

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">
        ハンドボール試合分析
      </h1>

      <div className="flex gap-4 mb-4">
        <input
          className="border p-2 rounded w-1/2"
          type="text"
          placeholder="相手チーム名"
          value={opponent}
          onChange={(e) => setOpponent(e.target.value)}
        />
        <input
          className="border p-2 rounded w-1/2"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>

      {["self", "opp"].map((team) => (
        <div key={team} className="bg-white rounded-2xl shadow p-4 mb-6">
          <h2 className="text-xl font-semibold mb-2">
            {team === "self" ? "自チーム" : "相手チーム"}
          </h2>
          <div className="grid grid-cols-2 gap-2 mb-4">
            <button
              onClick={() => add(team, "fast")}
              className="bg-blue-500 text-white rounded-xl p-2"
            >
              速攻 +
            </button>
            <button
              onClick={() => add(team, "setplay")}
              className="bg-blue-500 text-white rounded-xl p-2"
            >
              セットプレー +
            </button>
            <button
              onClick={() => add(team, "shotIn")}
              className="bg-green-500 text-white rounded-xl p-2"
            >
              枠内シュート +
            </button>
            <button
              onClick={() => add(team, "shotOut")}
              className="bg-green-500 text-white rounded-xl p-2"
            >
              枠外シュート +
            </button>
            <button
              onClick={() => add(team, "goals")}
              className="bg-red-500 text-white rounded-xl p-2"
            >
              ゴール +
            </button>
          </div>

          <div className="space-y-1 text-sm">
            <p>攻撃回数: {self.attacks}</p>
            <p>シュート本数: {self.shots}</p>
            <p>ゴール数: {self.goals}</p>
            <p>セーブ数: {self.saves}</p>
            <p>攻撃成功率: {self.success}%</p>
            <p>セーブ率: {self.saveRate}%</p>
          </div>
        </div>
      ))}

      <div className="mt-6 text-center text-gray-600">
        {date && opponent && (
          <p>
            {date} vs {opponent}
          </p>
        )}
      </div>
    </div>
  );
}

export default App;
