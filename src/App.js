import { useEffect, useState, useRef } from 'react';
import './App.css';
import LoadingIcon from './assets/Loading.gif';
import MenuIcon from './assets/Menu.gif';
import Swal from 'sweetalert2';
import AngryIcon from './assets/angry.gif'
import CryingIcon from './assets/crying.gif';
import LonelyIcon from './assets/lonely.gif';
import SadIcon from './assets/sad.gif';
import SuperAngry from './assets/SuperAngry.gif';
import SendGift from './assets/sendgift.gif';
import CelebrateIcon from './assets/Celebrate.gif'
import Letter from './Letter';


function App() {
  const [submit,setSubmit] = useState(false);
  const [loading, setLoading] = useState(true);
  const [denied, setDenied] = useState(false);
  const [msg, setMes] = useState('');
  const [final, setFinal] = useState(false);

  if(denied){
    Swal.fire({
      title: 'Are you sure? 😢',
      allowOutsideClick: false,
      showDenyButton: true,
      imageUrl: SadIcon,
      imageWidth: 200,
      imageHeight: 200,
      imageAlt: 'Crying',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Gusto',
      denyButtonText: 'Ayaw'
    }).then((result) => {
      if (result.isConfirmed) {
        setSubmit(true)
        setDenied(false)
      }
      if (result.isDenied) {
        Swal.fire({
          title: 'Sure ka ba talaga ayaw mo? 🥺',
          allowOutsideClick: false,
          showDenyButton: true,
          imageUrl: CryingIcon,
          imageWidth: 200,
          imageHeight: 200,
          imageAlt: 'Crying',
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes gusto',
          denyButtonText: 'No ayaw'
        }).then((result) => {
          if (result.isConfirmed) {
            setSubmit(true)
            setDenied(false)
          }
          if(result.isDenied){
            Swal.fire({
              title: 'Hindi ka ba naawa sakin? 😭',
              showDenyButton: true,
              allowOutsideClick: false,
              imageUrl: LonelyIcon,
              imageWidth: 200,
              imageHeight: 200,
              imageAlt: 'Lonely',
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Yes gustong gusto',
              denyButtonText: 'No ayoko'
            }).then((result) => {
              if (result.isConfirmed) {
                setSubmit(true)
                setDenied(false)
              }
              if (result.isDenied) {
                Swal.fire({
                  title: 'Ang Kulet mo! Yes mo na! 😠',
                  imageUrl: AngryIcon,
                  imageWidth: 200,
                  imageHeight: 200,
                  imageAlt: 'Angry',
                  showDenyButton: true,
                  allowOutsideClick: false,
                  confirmButtonColor: '#3085d6',
                  confirmButtonText: 'YEESS!!!',
                  denyButtonText: 'No ayoko nga'
                }).then((result) => {
                  if (result.isDenied){
                    Swal.fire({
                      title: 'Wala ka na choice kundi YESSSS!!!!!!!😡',
                      imageUrl: SuperAngry,
                      imageWidth: 200,
                      imageHeight: 200,
                      imageAlt: 'Angry',
                      showDenyButton: false,
                      allowOutsideClick: false,
                      confirmButtonColor: '#3085d6',
                      confirmButtonText: 'YESSSS!!!!!!!',
                    }).then((result)=>{
                      if (result.isConfirmed) {
                        setSubmit(true)
                        setDenied(false)
                      }
                    })
                  }
                })
              }
            })
          }
        })
      }
    })
  }

  useEffect(() => {
    if(submit){
      setTimeout(() => {
        setFinal(true)
      }, 5000);
    }
  }, [submit])

  useEffect(()=>{
    setTimeout(() => {
      setLoading(false)
    }, 5000);
  },[])

  const string = 'Will you accept my gift?😊'
  const index = useRef(-1);

  useEffect(() => {
    if(!loading){
      function tick() {
        setMes(prev => prev + string[index.current]);
        index.current++;
      }
      if (index.current < string.length-1) {
        let addChar = setInterval(tick, 100);
        return () => clearInterval(addChar);
      }
    }
  }, [msg,loading]);

  const Menu = () =>{
    return(
      <div>
        <div className="loading-icon text-center">
          <img src={MenuIcon} width="150rem" height="150rem" alt="Menu"/>
        </div>
        <div className="message-text text-center">
          <h3>Chrissa!!!</h3>
          <h3>{msg}</h3>
        </div>
        {index.current === 25 ? 
          <div className="text-center">
            <button className="btn btn-primary m-2" onClick={()=>{setSubmit(true)}}>YES 🥰</button>
            <button className="btn btn-danger" onClick={()=>{setDenied(true)}}>NO 😔</button>
          </div>
          :
          null
        }    
      </div>
    );
  }



  const Submitted = () =>{
    if(!final){
      return(
        <div>
          <div className="loading-icon text-center">
            <img src={SendGift} width="200rem" height="200rem" alt="Loading"/>
          </div>
          <div className="loading-text text-center">
            <h3>Sending Gift...</h3>
          </div>
        </div>
      );
    }
    else{
      return(
        <div>
          <div className="loading-icon text-center">
          <img src={CelebrateIcon} width="175rem" height="150rem" alt="Loading"/>
          </div>
          <div className="loading-text text-center">
            <h4>Yehey!!! Wear mo yung ring</h4>
            <p style={{fontSize: 15}}>Papicturan naman sa kamay mo 🥺</p>
          </div>
          {/* <div className="loading-text text-center">
            <button className="btn btn-success">📝Read Letter📝</button>
          </div> */}
            <Letter/>
        </div>
      );
    }

  }


  const Loading = () =>{
    
    return(
      <div>
        <div className="loading-icon text-center">
          <img src={LoadingIcon} width="200rem" height="200rem" alt="Loading"/>
        </div>
        <div className="loading-text text-center">
          <h3>Please Wait...</h3>
        </div>
      </div>
    );
  }

  return (
    <div className="App-header">
      <div className="text_box">
      {loading ? <Loading/> : <>{submit? <Submitted/> : <Menu/>}</>}
    </div>
  </div>
  );
}

export default App;
