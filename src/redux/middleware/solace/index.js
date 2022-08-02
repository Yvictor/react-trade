import { SolaceType, SOCKET_STATUS_MAP } from "../../constants/solace";
import solace from "solclientjs";
import { unpack, pack } from "msgpackr";
import onSolaceMessage from "./on_message";
import { addContracts } from "../../reducers/contracts";
import _ from "lodash";

export default () => {
  const sockets = []; // [{ alias, socket }, ...]
  solace.SolclientFactory.init({
    profile: solace.SolclientFactoryProfiles.version10_5,
    logLevel: solace.LogLevel.WARN,
    logger: {
      trace: (...args) => console.log("trace", args),
      debug: (...args) => console.log("debug", args),
      info: (...args) => console.log("info", args),
      warn: (...args) => console.log("warn", args),
      error: (...args) => console.log("error", args),
      fatal: (...args) => console.log("fatal", args),
    },
  });
  const solace_session_config = {
    url: import.meta.env.VITE_SOL_HOST,
    vpnName: "sinopac",
    userName: "shioaji",
    password: import.meta.env.VITE_SOL_PASS,
    clientName: import.meta.env.VITE_SOL_CLIENT,
    // compressionLevel: 1,
    generateSequenceNumber: true,
    generateSendTimestamps: true,
    generateReceiveTimestamps: true,
    reapplySubscriptions: true,
    connectTimeoutInMsecs: 3000,
    reconnectRetries: 3,
    keepAliveIntervalInMsecs: 3000,
    keepAliveIntervalsLimit: 6,
  };
  let session = solace.SolclientFactory.createSession(solace_session_config);
  let socket_status = SOCKET_STATUS_MAP.OFFLINE;
  session.on(solace.SessionEventCode.UP_NOTICE, (event) => {
    console.log(`${event}`);
    socket_status = SOCKET_STATUS_MAP.ONLINE;
    console.log(socket_status);
    // session.subscribe(solace.SolclientFactory.createTopicDestination(`TIC/v1/STK/*/TSE/2603`), true, "corr0", 5000)
    // session.subscribe(solace.SolclientFactory.createTopicDestination(`QUO/v1/STK/*/TSE/2603`), true, "corr1", 5000)
    // session.subscribe(solace.SolclientFactory.createTopicDestination("TIC/v1/FOP/*/*/*"), true, "corr0", 5000)
    // session.subscribe(solace.SolclientFactory.createTopicDestination("QUO/v1/FOP/*/*/*"), true, "corr0", 5000)
  });

  session.on(solace.SessionEventCode.DOWN_ERROR, (event) => {
    console.log(`${event}`);
  });

  session.on(solace.SessionEventCode.SUBSCRIPTION_OK, (event) => {
    console.log(`${event}`);
  });

  const subscribed = [];
  const content_type = new solace.SDTMapContainer();
  content_type.addField(
    "ct",
    new solace.SDTField(solace.SDTFieldType.STRING, "msgpack")
  );
  const packSolMsg = (topic, body) => {
    const msg = solace.SolclientFactory.createMessage();
    msg.setDestination(solace.SolclientFactory.createTopicDestination(topic));
    msg.setUserPropertyMap(content_type);
    msg.setBinaryAttachment(pack(body));
    return msg;
  };
  const request = (topic, body) => {
    const msg = packSolMsg(topic, body);
    const res = session.sendRequest(
      msg,
      5000,
      (_, msg) => {
        console.log(msg.getDestination().getName());
        console.log(unpack(msg.getBinaryAttachment()));
      },
      (_, error) => {
        console.log(error);
      }
    );
  };
  let token = "";
  return (store) =>
    (next) =>
    (action = {}) => {
      const { type, payload = {} } = action;

      switch (type) {
        case SolaceType.CONNECT: {
          // session.connect()
          if (socket_status === SOCKET_STATUS_MAP.OFFLINE) {
            session.connect();
            socket_status = SOCKET_STATUS_MAP.CONNECTING;
            session.on(solace.SessionEventCode.MESSAGE, onSolaceMessage(store));
          }
          console.log(`solace ${type} ${socket_status} `);
          next(action);
          break;
        }
        case SolaceType.SUBSCRIBE: {
          let [security_type, exchange, code] = payload.symbol.split("/");
          if ((security_type === "FUT") | (security_type === "OPT")) {
            security_type = "FOP";
          }
          if (exchange == "TAIFEX") {
            exchange = "TFE";
          }
          console.log(`TIC/v1/${security_type}/*/${exchange}/${code}`);
          session.subscribe(
            solace.SolclientFactory.createTopicDestination(
              `TIC/v1/${security_type}/*/${exchange}/${code}`
            ),
            true,
            "corr0",
            5000
          );
          session.subscribe(
            solace.SolclientFactory.createTopicDestination(
              `QUO/v1/${security_type}/*/${exchange}/${code}`
            ),
            true,
            "corr1",
            5000
          );
          next(action);
          break;
        }
        case SolaceType.UNSUBSCRIBE: {
          let [security_type, exchange, code] = payload.symbol.split("/");
          if ((security_type === "FUT") | (security_type === "OPT")) {
            security_type = "FOP";
          }
          if (exchange == "TAIFEX") {
            exchange = "TFE";
          }
          session.unsubscribe(
            solace.SolclientFactory.createTopicDestination(
              `TIC/v1/${security_type}/*/${exchange}/${code}`
            ),
            true,
            "corr3",
            5000
          );
          session.unsubscribe(
            solace.SolclientFactory.createTopicDestination(
              `QUO/v1/${security_type}/*/${exchange}/${code}`
            ),
            true,
            "corr4",
            5000
          );
          next(action);
          break;
        }
        case SolaceType.REQUEST: {
          request(action.payload.topic, action.payload.body);
          next(action);
          break;
        }
        case SolaceType.DOWNLOAD_CONTRACTS: {
          // request(action.payload.topic, action.payload.body);
          // const msg = packSolMsg("api/v1/data/contracts", {
          //   security_type: "STK",
          //   page: -1,
          //   page_size: 100,
          //   token:
          //     "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJuYmYiOjE2NTkzMzk4ODksImV4cCI6MTY1OTQyNjI4OSwic2ltdWxhdGlvbiI6ZmFsc2UsInBlcnNvbl9pZCI6IlAxMjQwODEwNDYiLCJ2ZXJzaW9uIjoiMC4zLjYuZGV2MiIsInAycCI6IiNQMlAvdjppZGNzb2xhY2UwMS9Pcnlma3FxbS9QWUFQSS9QMTI0MDgxMDQ2LzA4MDEvMDc0NDQ5LzAyMjA1MS8xMjguMTEwLjIzLjkxLyMifQ.udv7gTHU2PfPGeylzBpd4SMMU9q_XhHsTpoQLGhlwEU",
          // });
          // session.sendRequest(
          //   msg,
          //   30000,
          //   (_, msg) => {
          //     const { status, response } = unpack(msg.getBinaryAttachment());
          //     console.log(response);
          //     if (status.status_code === 200) {
          //       store.dispatch(addContracts(response))
          //       // const { max_page } = response;
          //       // const pages = _.range(1, max_page);
          //       // pages.forEach((page) => {
          //       //   const msg = packSolMsg("api/v1/data/contracts", {
          //       //     security_type: "STK",
          //       //     page: page,
          //       //     page_size: 100,
          //       //     token:
          //       //       "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJuYmYiOjE2NTkzMzk4ODksImV4cCI6MTY1OTQyNjI4OSwic2ltdWxhdGlvbiI6ZmFsc2UsInBlcnNvbl9pZCI6IlAxMjQwODEwNDYiLCJ2ZXJzaW9uIjoiMC4zLjYuZGV2MiIsInAycCI6IiNQMlAvdjppZGNzb2xhY2UwMS9Pcnlma3FxbS9QWUFQSS9QMTI0MDgxMDQ2LzA4MDEvMDc0NDQ5LzAyMjA1MS8xMjguMTEwLjIzLjkxLyMifQ.udv7gTHU2PfPGeylzBpd4SMMU9q_XhHsTpoQLGhlwEU",
          //       //   });
          //       //   sess.sendRequest(msg, 5000, (_, msg) => {
          //       //     const { status, response } = unpack(
          //       //       msg.getBinaryAttachment()
          //       //     );
          //       //     if (status.status_code === 200) {
          //       //       const { security_type, contracts } = response;
          //       //       contracts.map((contract) => {
          //       //         store.dispatch(addContract(contract));
          //       //       });
          //       //     }
          //       //   });
          //       // });
          //     }
          //     // store.dispatch(addContract())
          //   },
          //   (_, error) => {
          //     console.log(error);
          //   }
          // );
          session.sendRequest(
            packSolMsg("api/v1/data/contracts", {
              security_type: "FUT",
              page: -1,
              page_size: 100,
              token:
                "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJuYmYiOjE2NTkzMzk4ODksImV4cCI6MTY1OTQyNjI4OSwic2ltdWxhdGlvbiI6ZmFsc2UsInBlcnNvbl9pZCI6IlAxMjQwODEwNDYiLCJ2ZXJzaW9uIjoiMC4zLjYuZGV2MiIsInAycCI6IiNQMlAvdjppZGNzb2xhY2UwMS9Pcnlma3FxbS9QWUFQSS9QMTI0MDgxMDQ2LzA4MDEvMDc0NDQ5LzAyMjA1MS8xMjguMTEwLjIzLjkxLyMifQ.udv7gTHU2PfPGeylzBpd4SMMU9q_XhHsTpoQLGhlwEU",
            }),
            30000,
            (_, msg) => {
              const { status, response } = unpack(msg.getBinaryAttachment());
              console.log(response);
              if (status.status_code === 200) {
                store.dispatch(addContracts(response));
              }
            },
            (_, error) => {
              console.log(error);
            }
          );
          next(action);
          break;
        }
      }
      return next(action);
    };
};
