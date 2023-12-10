import { FC, useEffect, useState } from "react";
import { Diary } from "./types";
import { getAllDiaries, createDiary } from "./services/diaryService";
import axios from "axios";

const App = () => {
  const [diaries, setDiaries] = useState<Diary[]>([]);
  const [newDiary, setNewDiary] = useState({
    date: "",
    weather: "",
    visibility: "",
    comment: "",
  });
  const [errMsg, setErrMsg] = useState<string | null>('')

  useEffect(() => {
    getAllDiaries().then((data) => {
      setDiaries(data);
    });
  }, []);

  const diaryCreation = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    const { date, weather, visibility, comment } = newDiary;

    try {
      const data = await createDiary({ date, weather, visibility, comment });
      setDiaries(diaries.concat(data));
      setNewDiary({
        date: "",
        weather: "",
        visibility: "",
        comment: "",
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error.status);
        console.error(error.response);
        setErrMsg(error.message)
        setTimeout(() => {
          setErrMsg(null)
        }, 5000)
      } else {
        console.error(error);
      }
    }
  };

  interface ErrNotificationProps {
    message: string | null;
  }

  const ErrNotification: FC<ErrNotificationProps> = ({ message }) => {
    if (message === null) {
      return null
    }

    return <div>{message}</div>
  }

  return (
    <>
      <ErrNotification message={errMsg}/>
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
      <h1>Add new entry</h1>
      <form onSubmit={diaryCreation}>
        Date:
        <input
          type="date"
          value={newDiary.date}
          onChange={(event) =>
            setNewDiary({ ...newDiary, date: event.target.value })
          }
        />
        <br />
        Weather:
        sunny
        <input
          type="radio"
          value="sunny"
          onChange={(event) =>
            setNewDiary({ ...newDiary, weather: event.target.value })
          }
        />
        rainy
        <input
          type="radio"
          value="rainy"
          onChange={(event) =>
            setNewDiary({ ...newDiary, weather: event.target.value })
          }
        />
        cloudy
        <input
          type="radio"
          value="cloudy"
          onChange={(event) =>
            setNewDiary({ ...newDiary, weather: event.target.value })}
          />
        stormy
        <input
          type="radio"
          value="stormy"
          onChange={(event) =>
            setNewDiary({ ...newDiary, weather: event.target.value })}
          />
        windy
        <input
          type="radio"
          value="windy"
          onChange={(event) =>
            setNewDiary({ ...newDiary, weather: event.target.value })}
          />
        <br />
        Visibility:
        great
        <input
          type="radio"
          value="great"
          onChange={(event) =>
            setNewDiary({ ...newDiary, visibility: event.target.value })
          }
        />good
        <input
          type="radio"
          value="good"
          onChange={(event) =>
            setNewDiary({ ...newDiary, visibility: event.target.value })
          }
        />ok
        <input
          type="radio"
          value="ok"
          onChange={(event) =>
            setNewDiary({ ...newDiary, visibility: event.target.value })
          }
        />poor
        <input
          type="radio"
          value="poor"
          onChange={(event) =>
            setNewDiary({ ...newDiary, visibility: event.target.value })
          }
        />
        <br />
        Comment:
        <input
          type="text"
          value={newDiary.comment}
          onChange={(event) =>
            setNewDiary({ ...newDiary, comment: event.target.value })
          }
        />
        <br />
        <button type="submit">add</button>
      </form>
    </>
  );
};

export default App;
