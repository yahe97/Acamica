import React, { useEffect, useState } from 'react';
import "./styles.css";
import corazon from "./corazon.svg";
import logo from "./logo.svg";
import google from "./google.svg";
import hello from "./hello.svg";
import loadingicon from "./gif.gif";
import Button from 'react-bootstrap/Button';
import Toast from 'react-bootstrap/Toast';

import { firestore,getCurrentUser, loginConGoogle, auth, logout } from "./firebase";

export default function App() {
  const [loading] = useState(false);
  const user1 = getCurrentUser();
  const [tweets, setTweets] = useState([]);
  const [tweet, setTweet] = useState({
    tweet: "",
    autor: "",
    usert: ""
  });
  const [user, setUser] = useState(null);
  useEffect(() => {
    const desuscribir = firestore
      .collection("tweets")
      .onSnapshot((snapshot) => {
        const tweets = snapshot.docs.map((doc) => {
          return {
            tweet: doc.data().tweet,
            autor: doc.data().autor,
            id: doc.id,
            likes: doc.data().likes,
            usert: doc.data().usert
          };
        });
        setTweets(tweets);
      });
    auth.onAuthStateChanged((user) => {
      setUser(user);
      console.log(user);
    });
    return () => desuscribir();
  }, []);

  const handleChange = (e) => {
    let nuevoTweet = {
      ...tweet,
      [e.target.name]: e.target.value,
      usert: user1.email
    };
    setTweet(nuevoTweet);
  };

  const sendTweet = (e) => {
    e.preventDefault();
    // enviamos el tweet a la colección
    firestore.collection("tweets").add(tweet);
    { !loading ? (
      <div className="loading">
        {" "}
        <img src={loadingicon} alt="loading" />
      </div>
    ) : null};
    <p>HEllO</p>
  };

  //const sendUsert = (id) => {
    // enviamos el tweuseret a la colección
    //firestore.doc(`tweets/${id}`).update({ Usert: user.email });
  //};



  const deleteTweet = (id) => {
    // borramos el tweet en firebase
    firestore.doc(`tweets/${id}`).delete();
  };

  const ExampleToast = ({ children }) => {
    const [show, toggleShow] = useState(false);
  
    return (
      <>
        {!show && <Button onClick={() => toggleShow(true)}>Borrar</Button>}
        <Toast show={show} onClose={() => toggleShow(false)}>
          <Toast.Header>
            <strong className="mr-auto">¿Seguro de Borrar?</strong>
          </Toast.Header>
          <Toast.Body>{children}</Toast.Body>
        </Toast>
      </>
    );
  };
  const likeTweet = (id, likes) => {
    if (!likes) likes = 0;
    // actualizamos el tweet en firebase
    firestore.doc(`tweets/${id}`).update({ likes: likes + 1 });
  };

  return (
    <div className="App">
      
      <img height="107 px" weight="361 px" src={logo} alt="" />
      {user ? (
        <>
          
            <div className="user-profile">
              
              <img className="user-profile-pic" src={user.photoURL} alt="" />
              <div><img src={hello} alt="" /> </div>
              <p font="white">{user.email}</p>
              <button onClick={logout}> Log out</button>
            </div>
        </>
      ) : (
        <div className="btn_login">
          <img  background="white" src={google} alt="" />
          <button className="login-btn" onClick={loginConGoogle}>
            Sigin with Google
          </button>
        </div>
      )}
      <form className="formulario">
        <textarea
          name="tweet"
          onChange={handleChange}
          value={tweet.tweet}
          cols="30"
          rows="5"
          placeholder="What's happening"
        />
        <div className="input-group">
          <input
            name="autor"
            onChange={handleChange}
            value={tweet.autor}
            type="text"
            placeholder="Type your username"
          />
          <button className="post" onClick={sendTweet}>POST</button>
          {tweet.tweet == null ? (
          <div className="loading">
            {" "}
          <img src={loadingicon} alt="loading" />
          </div>):null};
        </div>
      </form>
      
      <h1>Tweets:</h1>
      {tweets.map((tweet) => {
        return (
          
          <div className="tweet-container">
            <div className="tweet" key={tweet.id}>
              <div className="tweet-info">
                <p>{tweet.tweet}</p>
                <p className="tweet-autor">por: {tweet.autor}</p>
              </div>
              <div className="acciones">
              {user ? (
                  <>
                    {tweet.usert == user1.email ? (
                      
                        <ExampleToast>
                          <button onClick={() => deleteTweet(tweet.id)} className="delete">borrar</button>
                        </ExampleToast>
                      
                    ):(<span> </span>)}
                  </>
                ): (<span> </span>)}
                <span
                  onClick={() => likeTweet(tweet.id, tweet.likes)}
                  className="likes"
                >
                  <img height="13px" src={corazon} alt="" />
                  <span>{tweet.likes ? tweet.likes : 0}</span>
                </span>
              </div>
            </div>
                      </div>
        );
      })}
      
    </div>
  );
}
