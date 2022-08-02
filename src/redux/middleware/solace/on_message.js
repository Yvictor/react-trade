import { unpack } from "msgpackr";
import { update_price } from "../../reducers";

export default (store) => (msg) => {
  const dest = msg.getDestination().getName();
  if (dest.startsWith("TIC")) {
    const topic_arr = dest.split("/");
    const format_type = topic_arr[2];
    if (format_type === "STK") {
      const [
        code,
        date,
        time,
        open,
        avg_price,
        close,
        high,
        low,
        amount,
        amount_sum,
        volume,
        volsum,
        tick_type,
        diff_type,
        diff_price,
        diff_rate,
        trade_bid_vol_sum,
        trade_ask_vol_sum,
        trade_bid_cnt,
        trade_ask_cnt,
        closing_oddlot_shares,
        closing_oddlot_close,
        closing_oddlot_amount,
        closing_oddlot_bid_price,
        closing_oddlot_ask_price,
        fixed_trade_volume,
        fixed_trade_amount,
        suspend,
        simtrade,
      ] = unpack(msg.getBinaryAttachment());
      store.dispatch(
        update_price({ type: "tick", price: Number(close), volume: volume }),
        "UPDATE_TICK"
      );
    } else if (format_type === "FOP") {
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
      store.dispatch(
        update_price({ type: "tick", price: Number(close), volume: volume }),
        "UPDATE_TICK"
      );
    }
    // console.log(`tick ${code} ${date} ${time} ${close} ${volume} ${volsum} ${simtrade}`)
  } else if (dest.startsWith("QUO")) {
    const topic_arr = dest.split("/");
    const format_type = topic_arr[2];
    if (format_type === "STK") {
      const [
        code,
        date,
        time,
        bid_price,
        bid_volume,
        diff_bid_vol,
        ask_price,
        ask_volume,
        diff_ask_vol,
        suspendt,
        simtrade,
      ] = unpack(msg.getBinaryAttachment());
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
    } else if (format_type === "FOP") {
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
    // console.log(`bidask ${code} ${date} ${time} ${ask_price} ${ask_volume} ${bid_price} ${bid_volume} ${simtrade}`)
  } else {
    console.log(dest);
  }
};
