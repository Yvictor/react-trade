import { unpack } from "msgpackr";
import { update_price } from "../../reducers";

export default (store) => (msg) => {
  const dest = msg.getDestination().getName();
  if (dest.startsWith("TIC")) {
    const [
      code,
      date,
      time,
      ,
      ,
      ,
      ,
      ,
      close,
      ,
      ,
      ,
      ,
      volume,
      volsum,
      ,
      ,
      ,
      ,
      simtrade,
    ] = unpack(msg.getBinaryAttachment());
    // console.log(`tick ${code} ${date} ${time} ${close} ${volume} ${volsum} ${simtrade}`)
    store.dispatch(
      update_price({ type: "tick", price: close, volume: volume }),
      "UPDATE_TICK"
    );
  } else if (dest.startsWith("QUO")) {
    // const [code, date, time, bvsum, avsum, bid_price, bid_volume, diffbv, ask_price, ask_volume, diffav, fbp, fap, fbv, fav, target_price, simtrade] = unpack(msg.getBinaryAttachment())
    const [
      code,
      date,
      time,
      ,
      ,
      bid_price,
      bid_volume,
      ,
      ask_price,
      ask_volume,
      ,
      ,
      ,
      ,
      ,
      ,
      simtrade,
    ] = unpack(msg.getBinaryAttachment());
    // console.log(`bidask ${code} ${date} ${time} ${ask_price} ${ask_volume} ${bid_price} ${bid_volume} ${simtrade}`)
    const ask = {};
    const bid = {};
    ask_price.forEach((p, i) => {
      ask[p] = ask_volume[i];
    });
    bid_price.forEach((p, i) => {
      bid[p] = bid_volume[i];
    });
    store.dispatch(
      update_price({ type: "bidask", ask: ask, bid: bid }),
      "UPDATE_BIDASK"
    );
  }
};
