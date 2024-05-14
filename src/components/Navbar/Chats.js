import axios from "axios";
import { Fragment, useEffect, useRef, useState } from "react";
import classes from "./Chats.module.css";
import TelegramIcon from "@mui/icons-material/Telegram";
import PersonPinIcon from "@mui/icons-material/PersonPin";

const Chats = () => {
  const [chat, setChat] = useState([]);

  useEffect(() => {
    async function allChat() {
      const getChat = await axios.get(
        `https://practice-dd32e-default-rtdb.firebaseio.com/user.json`
      );
      if (getChat.data == null) setChat([]);
      else setChat(Object.values(getChat.data));
    }
    allChat();
  }, []);
  const nameref = useRef();
  function clickHandler() {
    fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization:
          "Bearer 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",
        // "HTTP-Referer": `${YOUR_SITE_URL}`, // Optional, for including your app on openrouter.ai rankings.
        // "X-Title": `${YOUR_SITE_NAME}`, // Optional. Shows in rankings on openrouter.ai.
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "openai/gpt-3.5-turbo",
        messages: [{ role: "user", content: nameref.current.value }],
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json().then(async (data) => {
          let msj = {
            sent: nameref.current.value,
            response: await data.choices[0].message.content,
          };
          const addItems = async () => {
            try {
              const response = await axios.post(
                `https://practice-dd32e-default-rtdb.firebaseio.com/user.json`,
                msj
              );
              const getChat = await axios.get(
                `https://practice-dd32e-default-rtdb.firebaseio.com/user.json`
              );

              setChat(Object.values(getChat.data));
            } catch (error) {
              console.error("Error posting data:", error);
            }
          };
          addItems();
        });
      } else {
        return res.json().then((data) => {
          console.log(data.error.message);
        });
      }
    });
  }

  return (
    <Fragment>
      <div className={classes.main}>
        <div className={classes.left}></div>
        <div className={classes.right}>
          <div className={classes.fetchinput_div}>
            {chat.map((item, i) => {
              return (
                <div key={i}>
                  <div className={classes.sent}>
                    <div>
                      <PersonPinIcon />
                    </div>
                    <div className={classes.sentmsj}>{item.sent}</div>
                  </div>

                  <div>
                    <div className={classes.ai}>
                      <PersonPinIcon />
                    </div>
                    <p className={classes.response}>{item.response}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className={classes.input_div}>
            <div>
              <input ref={nameref} placeholder="Type a message here..." />
            </div>
            <div>
              <TelegramIcon
                className={classes.sendIcon}
                onClick={clickHandler}
              />
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
export default Chats;
