export const SOCKET_STATUS_MAP = {
    ONLINE: 'online',
    OFFLINE: 'offline',
    CONNECTING: 'connecting',
}

export const SolaceType = {
    SOCKET_ERROR: 'SOL/SOCKET_ERROR',
    SEND: 'SOL/SEND',
    BUFF_SEND: 'SOL/BUFF_SEND',
    CONNECT: 'SOL/CONNECT',
    DISCONNECT: 'SOL/DISCONNECT',
    CONNECTED: 'SOL/CONNECTED',
    RECONNECTED: 'SOL/RECONNECTED',
    DISCONNECTED: 'SOL/DISCONNECTED',
    FLUSH_QUEUE: 'SOL/FLUSH_QUEUE',

    SUBSCRIBE: "SOL/SUBSCRIBE",
    UNSUBSCRIBE: "SOL/UNSUBSCRIBE",

    DATA_AUTH_CONFIGURED: 'SOL/DATA_AUTH_CONFIGURED',
    DATA_AUTH_TOKEN: 'SOL/DATA_AUTH_TOKEN',
    DATA_WEB_AUTH_SUCCESS: 'SOL/DATA_WEB_AUTH_SUCCESS',
    AUTH_API_VALIDATING: 'SOL/AUTH_API_VALIDATING',
    DATA_MARKETS: 'SOL/DATA_MARKETS',
    DATA_STRATEGY: 'SOL/DATA_STRATEGY',
    DATA_REMOVE_STRATEGY: 'SOL/DATA_REMOVE_STRATEGY',
    DATA_STRATEGIES: 'SOL/DATA_STRATEGIES',
    DATA_API_CREDENTIALS_CONFIGURED: 'SOL/DATA_API_CREDENTIALS_CONFIGURED',
    DATA_CLIENT_STATUS_UPDATE: 'SOL/DATA_CLIENT_STATUS_UPDATE',
    DATA_POSITIONS: 'SOL/DATA_POSITIONS',
    DATA_POSITION: 'SOL/DATA_POSITION',
    DATA_POSITION_CLOSE: 'SOL/DATA_POSITION_CLOSE',
    DATA_BALANCES: 'SOL/DATA_BALANCES',
    SET_BALANCES: 'SOL/SET_BALANCES',
    DATA_BALANCE: 'SOL/DATA_BALANCE',
    SET_BALANCE: 'SOL/SET_BALANCE',
    DATA_ORDERS: 'SOL/DATA_ORDERS',
    DATA_ORDER: 'SOL/DATA_ORDER',
    DATA_ORDER_CLOSE: 'SOL/DATA_ORDER_CLOSE',
    DATA_ORDER_CLOSE_ASYNC: 'SOL/DATA_ORDER_CLOSE_ASYNC',
    DATA_ALGO_ORDER_STOPPED: 'SOL/DATA_ALGO_ORDER_STOPPED',
    DATA_ALGO_ORDER: 'SOL/DATA_ALGO_ORDER',
    DATA_ALGO_ORDERS: 'SOL/DATA_ALGO_ORDERS',
    DATA_NOTIFICATION: 'SOL/DATA_NOTIFICATION',
    CLEAR_ALGO_ORDERS: 'SOL/CLEAR_ALGO_ORDERS',

    PURGE_DATA_BACKTEST: 'SOL/PURGE_DATA_BACKTEST',

    RESET_DATA_BACKTEST: 'SOL/RESET_DATA_BACKTEST',
    RESET_DATA_EXECUTION: 'SOL/RESET_DATA_EXECUTION',

    DATA_SYNC_START: 'SOL/DATA_SYNC_START',
    DATA_SYNC_END: 'SOL/DATA_SYNC_END',

    BACKTEST_EXECUTE: 'SOL/BACKTEST_EXECUTE',
    BACKTEST_CANDLE: 'SOL/BACKTEST_CANDLE',
    BACKTEST_TRADE: 'SOL/BACKTEST_TRADE',
    BACKTEST_START: 'SOL/BACKTEST_START',
    BACKTEST_RESULTS: 'SOL/BACKTEST_RESULTS',
    BACKTEST_STOPPED: 'SOL/BACKTEST_STOPPED',
    BACKTEST_STARTED: 'SOL/BACKTEST_STARTED',
    EXECUTION_LOADING: 'SOL/EXECUTION_LOADING',
    EXECUTION_LOADING_GID: 'SOL/EXECUTION_LOADING_GID',
    SET_EXECUTION_RESULTS: 'SOL/SET_EXECUTION_RESULTS',
    SET_PRICE_UPDATE: 'SOL/SET_PRICE_UPDATE',
    SET_LIVE_EXECUTION_TRADES: 'SOL/SET_LIVE_EXECUTION_TRADES',
    SET_PAST_STRATEGIES: 'SOL/SET_PAST_STRATEGIES',
    SET_STARTED_LIVE_STRATEGY: 'SOL/SET_STARTED_LIVE_STRATEGY',
    SET_STOPPED_LIVE_STRATEGY: 'SOL/SET_STOPPED_LIVE_STRATEGY',
    SET_BACKTEST_LOADING: 'SOL/SET_BACKTEST_LOADING',
    UPDATE_FAVORITE_PAIRS: 'SOL/UPDATE_FAVORITE_PAIRS',

    BUFFER_DATA_FROM_EXCHANGE: 'SOL/BUFFER_DATA_FROM_EXCHANGE',
    UPDATING_API_KEY: 'SOL/UPDATING_API_KEY',

    DATA_ORDER_HIST: 'SOL/DATA_ORDER_HIST',
    SET_ORDER_HIST: 'SOL/SET_ORDER_HIST',
}