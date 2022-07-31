import { SolaceType, SOCKET_STATUS_MAP } from "../../constants/solace"
import solace from "solclientjs"
import { unpack } from 'msgpackr';
import onSolaceMessage from "./on_message";


export default () => {
    const sockets = [] // [{ alias, socket }, ...]
    solace.SolclientFactory.init({
        profile: solace.SolclientFactoryProfiles.version10_5,
        logLevel: solace.LogLevel.WARN,
        logger: {
            trace: (...args) => console.log('trace', args),
            debug: (...args) => console.log('debug', args),
            info: (...args) => console.log('info', args),
            warn: (...args) => console.log('warn', args),
            error: (...args) => console.log('error', args),
            fatal: (...args) => console.log('fatal', args),
        },
    })
    const solace_session_config = {
        url: import.meta.env.VITE_SOL_HOST,
        vpnName: 'sinopac',
        userName: 'shioaji',
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
    }
    let session = solace.SolclientFactory.createSession(solace_session_config)
    let socket_status = SOCKET_STATUS_MAP.OFFLINE
    session.on(solace.SessionEventCode.UP_NOTICE, (event) => {
        console.log(`${event}`)
        socket_status = SOCKET_STATUS_MAP.ONLINE
        console.log(socket_status)
        // session.subscribe(solace.SolclientFactory.createTopicDestination(`TIC/v1/STK/*/TSE/2603`), true, "corr0", 5000)
        // session.subscribe(solace.SolclientFactory.createTopicDestination(`QUO/v1/STK/*/TSE/2603`), true, "corr1", 5000)
        // session.subscribe(solace.SolclientFactory.createTopicDestination("TIC/v1/FOP/*/*/*"), true, "corr0", 5000)
        // session.subscribe(solace.SolclientFactory.createTopicDestination("QUO/v1/FOP/*/*/*"), true, "corr0", 5000)
    })

    session.on(solace.SessionEventCode.DOWN_ERROR, (event) => {
        console.log(`${event}`)
    })

    session.on(solace.SessionEventCode.SUBSCRIPTION_OK, (event) => {
        console.log(`${event}`)
    })

    const subscribed = []
    return store => next => (action = {}) => {
        const { type, payload = {} } = action
        
        switch (type) {
            case SolaceType.CONNECT: {
                // session.connect()
                if (socket_status === SOCKET_STATUS_MAP.OFFLINE) {
                    session.connect()
                    socket_status = SOCKET_STATUS_MAP.CONNECTING
                    session.on(solace.SessionEventCode.MESSAGE, onSolaceMessage(store))
                }
                console.log(`solace ${type} ${socket_status} `)
                next(action)
                break
            }
            case SolaceType.SUBSCRIBE: {
                // const { exchange, code } = payload
                // console.log(payload.code)
                // const subcode = `${exchange}/${code}`
                // if (socket_status === SOCKET_STATUS_MAP.ONLINE & subscribed.indexOf(subcode) < 0) {
                //     subscribed.push(subcode)
                //     session.subscribe(solace.SolclientFactory.createTopicDestination(`TIC/v1/STK/*/${subcode}`), true, "corr0", 5000)
                //     console.log(`subscribe ${subcode}`)
                // }
                session.subscribe(solace.SolclientFactory.createTopicDestination("TIC/v1/FOP/*/TFE/TXFH2"), true, "corr0", 5000)
                session.subscribe(solace.SolclientFactory.createTopicDestination("QUO/v1/FOP/*/TFE/TXFH2"), true, "corr1", 5000)
                next(action)
                break
            }
            case SolaceType.UNSUBSCRIBE: {        
                session.unsubscribe(solace.SolclientFactory.createTopicDestination("TIC/v1/FOP/*/TFE/TXFH2"), true, "corr0", 5000)
                session.unsubscribe(solace.SolclientFactory.createTopicDestination("QUO/v1/FOP/*/TFE/TXFH2"), true, "corr1", 5000)
                next(action)
                break
            }

        }
        return next(action)
    }
}