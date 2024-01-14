import React, {useState, useEffect} from 'react'
import TypingArea from '../Components/TypingArea'
import '../Styles/Main.css'

const Main = (props) => {
    const [wordsArray, setWordsArray] = useState([]);
    const [downloaded, setDownloaded] = useState(false)

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch('/src/Data/Words.json');
          const data = await response.json();
          setWordsArray(data);
        } catch (error) {
          console.error('Błąd podczas pobierania danych:', error);
        }
      };
  
      fetchData();
      setDownloaded(true)
      console.log(wordsArray)
    }, []);

    return(
        <div>
            {downloaded?<TypingArea words = {wordsArray} defaultWords={wordsArray}/> : <p>Loading</p> }           
        </div>
    )
}
export default Main