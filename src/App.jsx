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
    <div style={{ fontFamily: "sans-serif", padding: "5px", textAlign: "center" }}>
      <h2>ハンドボール 試合記録</h2>

      {/* 試合情報 */}
      <div style={{ marginBottom: "10px" }}>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          style={{ marginRight: "5px" }}
        />
        <input
          type="text"
          placeholder="相手チーム名"
          value={opponent}
          onChange={(e) => setOpponent(e.target.value)}
        />
      </div>

      {/* 試合スコア */}
      <h3 style={{ margin: "10px 0" }}>
        {date && `${date}`}<br />
        近江兄弟社 ({own.goals}) - ({opp.goals}) {opponent || "？？？"}
      </h3>

      {/* チームカード 横並び */}
      <div style={{ display: "flex", gap: "5px" }}>
        {["own", "opp"].map((team) => {
          const s = calculate(team);
          const isOwn = team === "own";
          return (
            <div
              key={team}
              style={{
                flex: 1,
                border: "1px solid #ccc",
                borderRadius: "8px",
                padding: "8px",
                background: isOwn ? "#e6f0ff" : "#ffe6e6",
              }}
            >
              <h4 style={{ marginBottom: "5px" }}>
                {isOwn ? "近江兄弟社" : opponent || "相手チーム"}
              </h4>

              {/* スタッツ横並び */}
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px" }}>
                <div>攻撃 {s.totalAttacks}</div>
                <div>シュート {s.totalShots}</div>
                <div style={{ color: "green", fontWeight: "bold" }}>G {s.goals}</div>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px" }}>
                <div>成功率 {s.successRate}%</div>
                <div>セーブ率 {s.saveRate}%</div>
              </div>

              {/* ボタン（色分け＆小さめ） */}
              <div style={{ marginTop: "5px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4px" }}>
                <button onClick={() => handleIncrement(team, "fast")} style={{ background: "#4da6ff", color: "white" }}>速攻</button>
                <button onClick={() => handleIncrement(team, "set")} style={{ background: "#33cc33", color: "white" }}>セット</button>
                <button onClick={() => handleIncrement(team, "on")} style={{ background: "#ff9933", color: "white" }}>枠内</button>
                <button onClick={() => handleIncrement(team, "off")} style={{ background: "#999999", color: "white" }}>枠外</button>
                <button
                  onClick={() => handleIncrement(team, "goal")}
                  style={{ gridColumn: "span 2", background: "red", color: "white", fontWeight: "bold" }}
                >
                  ゴール
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* リセット */}
      <button
        onClick={resetStats}
        style={{ marginTop: "10px", padding: "5px", background: "#ff6666", border: "none", borderRadius: "5px", color: "white" }}
      >
        リセット
      </button>
    </div>
  );
}

export default App;
