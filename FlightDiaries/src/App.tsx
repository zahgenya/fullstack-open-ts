import axios from "axios";
import { useEffect, useState } from "react";
import { Diary } from "./types";

const App = () => {
  const [diary, setDiary] = useState<Diary[]>([])

  useEffect(() => {
    axios.get('http://localhost:3000/api/diaries').then(response => {
      console.log(response.data)
    })
  }, [])

  return (
    <>
    helo
    </>
  )
}

export default App
