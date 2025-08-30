import React, { useState } from "react";
import "./App.css";

function App() {
  const [opponent, setOpponent] = useState("");
  const [date, setDate] = useState("");
  const [stats, setStats] = useState({
    own: { fast: 0, set: 0, on: 0, off: 0, goal: 0 },
    opp: { fast: 0, set: 0, on: 0, off: 0, goal: 0 },
  });

  const [history, setHistory] = useState([]);

  const handleIncrement = (team, key) => {
    setHistory([...history, { ...stats }]); // 履歴保存
    setStats((prev) => ({
      ...prev,
      [team]: {
        ...prev[team],
        [key]: prev[team][key] + 1,
      },
    }));
  };

  const resetStats = () => {
    setHistory([...history, { ...stats }]);
    setStats({
      own: { fast: 0, set: 0, on: 0, off: 0, goal: 0 },
      opp: { fast: 0, set: 0, on: 0, off: 0, goal: 0 },
    });
    setOpponent("");
    setDate("");
  };

  const handleUndo = () => {
    if (history.length > 0) {
      setStats(history[history.length - 1]);
      setHistory(history.slice(0, -1));
    }
  };

  const calculate = (team) => {
    const s = stats[team];
    const totalAttacks = s.fast + s.set;
    const totalShots = s.on + s.off;
    const saves = s.on - s.goal;

    // セーブされた率
    const saveRate = s.on ? ((saves / s.on) * 100).toFixed(1) : 0;

    // シュートミス率（セーブ + 枠外）/ シュート
    const missed = saves + s.off;
    const missRate = totalShots ? ((missed / totalShots) * 100).toFixed(1) : 0;

    return { totalAttacks, fast: s.fast, set: s.set, totalShots, saveRate, missRate };
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

      {/* スコア */}
      <h3 style={{ margin: "10px 0" }}>
        {date && `${date}`}<br />
        近江兄弟社 ({stats.own.goal} - {stats.opp.goal}) {opponent || "？？？"}
      </h3>

      {/* チームカード */}
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

              {/* スタッツ */}
              <div style={{ fontSize: "12px", lineHeight: "1.6" }}>
                <div>
                  攻撃回数 {s.totalAttacks}（{s.fast}/{s.set}）
                </div>
                <div>
                  シュート {s.totalShots}（{stats[team].on}/{stats[team].off}）
                </div>
                <div>セーブされた率 {s.saveRate}%</div>
                <div>シュートミス率 {s.missRate}%</div>
              </div>

              {/* ボタン */}
              <div
                style={{
                  marginTop: "5px",
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "4px",
                }}
              >
                <button
                  onClick={() => handleIncrement(team, "fast")}
                  style={{ background: "#4da6ff", color: "white" }}
                >
                  速攻
                </button>
                <button
                  onClick={() => handleIncrement(team, "set")}
                  style={{ background: "#33cc33", color: "white" }}
                >
                  セット
                </button>
                <button
                  onClick={() => handleIncrement(team, "on")}
                  style={{ background: "#ff9933", color: "white" }}
                >
                  枠内
                </button>
                <button
                  onClick={() => handleIncrement(team, "off")}
                  style={{ background: "#999999", color: "white" }}
                >
                  枠外
                </button>
                <button
                  onClick={() => handleIncrement(team, "goal")}
                  style={{
                    gridColumn: "span 2",
                    background: "red",
                    color: "white",
                    fontWeight: "bold",
                  }}
                >
                  ゴール
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* リセット & 戻る */}
      <button
        onClick={resetStats}
        style={{
          marginTop: "10px",
          padding: "5px",
          background: "#ff6666",
          border: "none",
          borderRadius: "5px",
          color: "white",
        }}
      >
        リセット
      </button>
      <button
        onClick={handleUndo}
        style={{
          marginTop: "10px",
          marginLeft: "5px",
          padding: "5px",
          background: "#9999ff",
          border: "none",
          borderRadius: "5px",
          color: "white",
        }}
      >
        戻る
      </button>
    </div>
  );
}

export default App;
