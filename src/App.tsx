import React from "react";
import "./App.css";

function App() {
  const [state, setState] = React.useState<Convid19[]>([]);
  React.useEffect(() => {
    const fetchLatest = async () => {
      const url =
        "https://raw.githubusercontent.com/Leko/data-jp-covid19-vaccination/main/data/nationwide/senior_citizen/latest.json";
      try {
        const response = await fetch(url);
        if (response.ok) {
          const json = await response.json();
          setState(json);
        } else {
          throw new Error("erorr convid19 latest response");
        }
      } catch (e) {
        console.log(e);
      }
    };
    fetchLatest();
  }, []);

  return (
    <div className="App">
      <table>
        <tr>
          <th>日付</th>
          <th>1回目</th>
          <th>2回目</th>
          <th>合計</th>
        </tr>
        {state.map((row) => (
          <Row {...row} />
        ))}
      </table>
    </div>
  );
}

interface Convid19 {
  date: string;
  total_vaccinations: number;
  "1st_vaccinations": number;
  "2nd_vaccinations": number;
}

function Row(props: Convid19) {
  return (
    <tr>
      <td>{props.date}</td>
      <td>{props["1st_vaccinations"]}</td>
      <td>{props["2nd_vaccinations"]}</td>
      <td>{props.total_vaccinations}</td>
    </tr>
  );
}

export default App;
