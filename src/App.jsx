import React, { useState } from "react";
import "./App.css";

function App() {
  const [opponent, setOpponent] = useState("");
  const [date, setDate] = useState("");
  const [stats, setStats] = useState({
    own: { fast: 0, set: 0, on: 0, off: 0, goal: 0 },
    opp: { fast: 0, set: 0, on: 0, off: 0, goal: 0 },
  });

  const handleIncrement = (team, key) => {
    setStats((prev) => ({
      ...prev,
      [team]: { ...prev[team], [key]: prev[team][key] + 1 },
    }));
  };

  const resetStats = () => {
    setStats({
      own: { fast: 0, set: 0, on: 0, off: 0, goal: 0 },
      opp: { fast: 0, set: 0, on: 0, off: 0, goal: 0 },
    });
    setOpponent("");
    setDate("");
  };

  const calculate = (team) => {
    const s = stats[team];
    const totalAttacks = s.fast + s.set;
    const totalShots = s.on + s.off;
    const goals = s.goal;
    const saves = s.on - goals;
    const successRate = totalAttacks ? ((goals / totalAttacks) * 100).toFixed(1) : 0;
    const saveRate = s.on ? ((saves / s.on) * 100).toFixed(1) : 0;
    return { totalAttacks, totalShots, goals, saves, successRate, saveRate };
  };

  const own = calculate("own");
  const opp = calculate("opp");

  return (
    <div style={{ fontFamily: "sans-serif", padding: "10px", textAlign: "center" }}>
      <h1>ハンドボール 試合記録</h1>
      <div style={{ marginBottom: "15px" }}>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          style={{ marginRight: "10px" }}
        />
        <input
          type="text"
          placeholder="相手チーム名"
          value={opponent}
          onChange={(e) => setOpponent(e.target.value)}
        />
      </div>
      <h2>
        {date && `${date} `}
        近江兄弟社 vs {opponent || "？？？"}
      </h2>

      <div style={{ display: "flex", justifyContent: "space-around", flexWrap: "wrap" }}>
        {["own", "opp"].map((team) => {
          const s = calculate(team);
          const isOwn = team === "own";
          return (
            <div
              key={team}
              style={{
                border: "2px solid #ccc",
                borderRadius: "10px",
                padding: "15px",
                margin: "10px",
                width: "280px",
                background: isOwn ? "#e6f0ff" : "#ffe6e6",
              }}
            >
              <h3 style={{ fontSize: "20px", marginBottom: "10px" }}>
                {isOwn ? "近江兄弟社" : opponent || "相手チーム"}
              </h3>
              <p><strong>総攻撃:</strong> <span style={{ fontSize: "22px" }}>{s.totalAttacks}</span></p>
              <p><strong>シュート:</strong> <span style={{ fontSize: "22px" }}>{s.totalShots}</span></p>
              <p><strong>ゴール:</strong> <span style={{ fontSize: "26px", color: "green" }}>{s.goals}</span></p>
              <p><strong>成功率:</strong> <span style={{ fontSize: "22px" }}>{s.successRate}%</span></p>
              <p><strong>セーブ率:</strong> <span style={{ fontSize: "22px" }}>{s.saveRate}%</span></p>

              <div style={{ marginTop: "10px" }}>
                <button onClick={() => handleIncrement(team, "fast")}>速攻</button>
                <button onClick={() => handleIncrement(team, "set")}>セット</button>
                <button onClick={() => handleIncrement(team, "on")}>枠内</button>
                <button onClick={() => handleIncrement(team, "off")}>枠外</button>
                <button
                  onClick={() => handleIncrement(team, "goal")}
                  style={{ marginLeft: "10px", background: "green", color: "white" }}
                >
                  ゴール
                </button>
              </div>
            </div>
          );
        })}
      </div>
      <button
        onClick={resetStats}
        style={{ marginTop: "20px", padding: "10px", background: "#ff9999", border: "none", borderRadius: "5px" }}
      >
        リセット
      </button>
    </div>
  );
}

export default App;
