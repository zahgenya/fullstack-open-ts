import { useEffect, useState } from "react";
import { Diary } from "./types";
import { getAllDiaries, createDiary } from "./services/diaryService";

const App = () => {
  const [diaries, setDiaries] = useState<Diary[]>([]);
  const [newDiary, setNewDiary] = useState({
    date: '',
    weather: '',
    visibility: '',
    comment: ''
  });

  useEffect(() => {
    getAllDiaries().then((data) => {
      setDiaries(data);
    });
  }, []);

  const diaryCreation = (event: React.SyntheticEvent) => {
    event.preventDefault()
    const { date, weather, visibility, comment } = newDiary;

    if (date && weather && visibility && comment) {
      createDiary({ date, weather, visibility, comment }).then((data) => {
        setDiaries(diaries.concat(data))
      })
    }

    setNewDiary({
      date: '',
      weather: '',
      visibility: '',
      comment: ''
    })
  }

  return (
    <>
      <h1>Diary entries</h1>
      {diaries.map((diary: Diary) => (
        <div key={diary.id}>
          <h2>{diary.date}</h2>
          <p>
            visibility: {diary.visibility}
            <br />
            weather: {diary.weather}
            <br />
            comment: {diary.comment}
          </p>
        </div>
      ))}
      <h1>
        Add new entry
      </h1>
      <form onSubmit={diaryCreation}>
        Date:
        <input
          type="text"
          value={newDiary.date}
          onChange={(event) =>
            setNewDiary({ ...newDiary, date: event.target.value })
          }
        /><br />
        Weather:
        <input
          type="text"
          value={newDiary.weather}
          onChange={(event) =>
            setNewDiary({ ...newDiary, weather: event.target.value })
          }
        /><br />
        Visibility:
        <input
          type="text"
          value={newDiary.visibility}
          onChange={(event) =>
            setNewDiary({ ...newDiary, visibility: event.target.value })
          }
        /><br />
        Comment:
        <input
          type="text"
          value={newDiary.comment}
          onChange={(event) =>
            setNewDiary({ ...newDiary, comment: event.target.value })
          }
        /><br />
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default App;
