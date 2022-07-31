import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { Button, useTheme } from "react-daisyui";
import { useDispatch, useSelector } from "react-redux";
import {
  init_price,
  update_price,
  update_price_from_idx,
  update_position,
  CONNECT,
  SUBSCRIBE,
  UNSUBSCRIBE,
} from "../../redux/reducers";
import { classnames } from "tailwindcss-classnames";
import {
  FiMinimize,
  FiSettings,
  FiMove,
  FiXOctagon,
  FiX,
  FiXCircle,
  FiZap,
  FiZapOff,
} from "react-icons/fi";

const themeBoardColor = (theme) => {
  return theme === "dark"
    ? "border-slate-700 outline-slate-700"
    : "border-slate-100 outline-slate-100";
};

const cellbase = classnames(
  "table-cell",
  "w-16",
  "h-6",
  "text-center",
  "w-full",
  "h-full",
  "cursor-default",
  "select-none",
  "items-center",
  "align-middle",
  "text-xs",
  "justify-center"
);

const Cell = (props) => {
  const { data, price, isBid, isPrice, isPos, isBottom, isRight, onClick } =
    props;
  const dispatch = useDispatch();
  const hidden = isBid ? "" : "hidden";
  const color = isBid ? "text-rose-400" : "text-emerald-400";
  const bgColor = ""; //isBid ? "bg-red-100": "bg-green-100"
  const { theme } = useTheme();
  const borderColor = themeBoardColor(theme);
  // const boardDashed = isPos ? "hover:outline hover:outline-dashed mt-px ml-px" : "outline mt-px ml-px"
  const border = `border ${isRight ? "" : "border-r-0"} ${
    isBottom ? "" : "border-b-0"
  }`;
  const borderStyle = isPos
    ? `${border} hover:bg-slate-100 hover:border-dash active:bg-slate-200 transition duration-0 active:duration-500`
    : border;
  const hover = isPrice ? "hover:cursor-pointer" : "";
  const prices = useSelector((state) => state.quote.prices);
  const price_data = prices[price];
  const pos =
    price_data === undefined ? 0 : price_data[isBid ? "buyv" : "sellv"];
  const cellstyle = classnames(
    cellbase,
    borderStyle,
    borderColor,
    hover,
    bgColor,
    color
  );
  return (
    <div
      className={cellstyle}
      onClick={(e) => {
        dispatch(
          update_position({ price: price, side: isBid ? "BUY" : "SELL" })
        );
      }}
    >
      {isPos ? (pos === 0 ? null : pos) : data === 0 ? null : data}
      {/*<span className={``}> </span>*/}
      {/* <p className={`text-xs text-center`}>{data}</p> */}
    </div>
  );
};

Cell.propTypes = {
  data: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  price: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  isBid: PropTypes.bool.isRequired,
  isPrice: PropTypes.bool.isRequired,
  isPos: PropTypes.bool.isRequired,
  isBottom: PropTypes.bool.isRequired,
  isRight: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

Cell.defaultProps = {
  isPos: false,
  isPrice: false,
  isBottom: false,
  isRight: false,
};

const ThunderRow = (props) => {
  const { long_pos, price, volume, isBid, short_pos, isBottom, onClick } =
    props;
  const bid_volume = isBid ? volume : 0;
  const ask_volume = isBid ? 0 : volume;
  const { theme } = useTheme();
  const boardColor = ""; //themeBoardColor(theme)
  const prices = useSelector((state) => state.quote.prices);
  // border-r
  return (
    <div className={`table-row ${boardColor} snap-center`}>
      <Cell
        data={long_pos}
        price={price}
        isBid={true}
        isPos={true}
        isBottom={isBottom}
        onClick={onClick}
      ></Cell>
      <Cell
        data={bid_volume}
        price={price}
        isBid={true}
        isBottom={isBottom}
        onClick={onClick}
      ></Cell>
      <Cell
        data={price}
        price={price}
        isBid={isBid}
        isPrice={true}
        isBottom={isBottom}
        onClick={onClick}
      ></Cell>
      <Cell
        data={ask_volume}
        price={price}
        isBid={false}
        isBottom={isBottom}
        onClick={onClick}
      ></Cell>
      <Cell
        data={short_pos}
        price={price}
        isBid={false}
        isPos={true}
        isRight={true}
        isBottom={isBottom}
        onClick={onClick}
      ></Cell>
    </div>
  );
};

ThunderRow.propTypes = {
  long_pos: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
  volume: PropTypes.number.isRequired,
  isBid: PropTypes.bool.isRequired,
  short_pos: PropTypes.number.isRequired,
  isBottom: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

ThunderRow.defaultProps = {
  long_pos: 0,
  isBottom: false,
  short_pos: 0,
};

const ThunderTable = () => {
  const { theme } = useTheme();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(CONNECT(), "SOL/CONNECT");
    // dispatch(SUBSCRIBE({ exchange: "TSE", code: 2388 }), "SOL/SUBSCRIBE")
    dispatch(
      init_price(
        {
          price: 100,
          limit_down: 94.6,
          limit_up: 113,
          price_step_type: "tws",
          ask: { 100: 10, 100.5: 30, 101: 33, 101.5: 45, 102: 31 },
          bid: { 99.9: 5, 99.8: 45, 99.7: 17, 99.6: 23, 99.5: 11 },
        },
        "INIT"
      )
    );
    // dispatch(init_price({
    //     price: 14940, limit_down: 14000, limit_up: 15600, price_step_type: "tfe",
    //     ask: {},
    //     bid: {},
    // }, "INIT"))
    while (rows.length > 0) {
      rows.pop();
    }
    for (var i = 1; i <= display_num; i++) {
      const p = parr[price_from_idx - i];
      const inBid = p in bid;
      const inAsk = p in ask;
      const v = inAsk ? ask[p] : inBid ? bid[p] : 0;
      const isBid = inBid ? true : inAsk ? false : p < price;
      const display_p = p == price ? `${price}(${volume})` : `${p}`;
      rows.push(
        <ThunderRow
          key={i}
          price={display_p}
          volume={v}
          isBid={isBid}
          isBottom={i === display_num}
        ></ThunderRow>
      );
    }
  }, []);
  const display_num = useSelector((state) => state.quote.display_num);
  const prices = useSelector((state) => state.quote.prices);
  const parr = useSelector((state) => state.quote.parr);
  const price_from_idx = useSelector((state) => state.quote.price_from_idx);
  const ask = useSelector((state) => state.quote.ask);
  const bid = useSelector((state) => state.quote.bid);
  const price = useSelector((state) => state.quote.price);
  const volume = useSelector((state) => state.quote.volume);
  const [touchLastY, setTouchLastY] = useState(0);
  // console.log(prices)
  const boardColor = ""; //themeBoardColor(theme)
  // border-b
  const rows = [];
  for (var i = 1; i <= display_num; i++) {
    const p = parr[price_from_idx - i];
    const inBid = p in bid;
    const inAsk = p in ask;
    const v = inAsk ? ask[p] : inBid ? bid[p] : 0;
    const isBid = inBid ? true : inAsk ? false : p < price;
    const display_p = p == price ? `${price} (${volume})` : `${p}`;
    // console.log(display_p)
    rows.push(
      <ThunderRow
        key={i}
        price={display_p}
        volume={v}
        isBid={isBid}
        isBottom={i === display_num}
        // onClick={(e) => {
        //     dispatch(update_position({price: p, side: p < price? "BUY": "SELL"}))
        // }}
      ></ThunderRow>
    );
  }

  return (
    <div
      className={`table ${boardColor} sticky top-0`}
      onWheel={(e) => {
        // console.log(e.currentTarget.scrollTop)
        // console.log(e.deltaY)
        if (e.deltaY > 2) {
          dispatch(
            update_price_from_idx({ direction: "down" }, "UPDATE_IDX_UP")
          );
          // console.log("scrollup")
        } else if (e.deltaY < -2) {
          dispatch(
            update_price_from_idx({ direction: "up" }, "UPDATE_IDX_DOWN")
          );
          // console.log("scrolldown")
        }
        // e.target.scrollTop = 24
        // e.target.scrollTo(0, 24)
        // console.log(e)
      }}
      onTouchMove={(e) => {
        e.preventDefault();
        const deltaY = e.changedTouches.item(0).clientY - touchLastY;
        if (deltaY > 2) {
          dispatch(
            update_price_from_idx({ direction: "up" }, "UPDATE_IDX_DOWN")
          );
        } else if (deltaY < -2) {
          dispatch(
            update_price_from_idx({ direction: "down" }, "UPDATE_IDX_UP")
          );
        }
        console.log(deltaY);
        setTouchLastY(e.changedTouches.item(0).clientY);
      }}
    >
      {rows}
    </div>
  );
};

const ThunderTradePanel = () => {
  const dispatch = useDispatch();
  return (
    <div className="m-3">
      <div className="bg-base-100 border border-base-300 rounded-xl">
        <div className="m-3 flex flex-row-reverse">
          <FiXCircle className="m-1 hover:stroke-base-300" />
          <FiSettings className="m-1 hover:stroke-base-300" />
          <FiMove className="m-1 rotate-45 hover:stroke-base-300" />
        </div>
        <div className="bg-base-100 m-3">
          <ThunderTable></ThunderTable>
        </div>
        <div className="flex justify-center">
          <Button
            color="ghost"
            onClick={(e) => {
              dispatch(SUBSCRIBE({}), "SUB");
            }}
          >
            <FiZap>subscribe</FiZap>
          </Button>
          <Button
            color="ghost"
            onClick={(e) => {
              dispatch(UNSUBSCRIBE({}), "UNSUB");
            }}
          >
            <FiZapOff>unsubscribe</FiZapOff>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ThunderTradePanel;
