import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import { Button, useTheme } from "react-daisyui"
import { useDispatch, useSelector } from 'react-redux'
import { init_price, update_price } from '../../redux/reducers'

const themeBoardColor = (theme) => {
    return theme === "dark" ? 'border-slate-500 outline-slate-500' : 'border-slate-300 outline-slate-300'
}

const Cell = (props) => {
    const {
        data,
        isBid,
        isPrice,
        isPos,
        isBottom,
        isRight,
    } = props
    const hidden = isBid ? "" : "hidden"
    const color = isBid ? "text-red-500" : "text-green-500"
    const bgColor = ""//isBid ? "bg-red-100": "bg-green-100"
    const { theme } = useTheme()
    const borderColor = themeBoardColor(theme)
    // const boardDashed = isPos ? "hover:outline hover:outline-dashed mt-px ml-px" : "outline mt-px ml-px"
    const border = `border ${isRight ? "" : "border-r-0"} ${isBottom ? "" : "border-b-0"}`
    const borderStyle = isPos ? `${border} hover:border hover:border-dashed` : border
    const hover = isPrice ? "hover:cursor-pointer" : ""
    const [pos, setPos] = useState(0)
    // 
    return (
        <div className={`table-cell w-16 h-6 text-center ${borderStyle} ${borderColor} ${hover} ${bgColor} ${color} w-full h-full cursor-default select-none items-center align-middle text-xs text-center justify-center`}
            onClick={() => setPos((count) => count + 1)}
        >
            {isPos ? ((pos === 0) ? null : pos) : (data === 0) ? null : data}
            {/*<span className={``}> </span>*/}
            {/* <p className={`text-xs text-center`}>{data}</p> */}
        </div>
    )
}

Cell.propTypes = {
    data: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    isBid: PropTypes.bool.isRequired,
    isPrice: PropTypes.bool.isRequired,
    isPos: PropTypes.bool.isRequired,
    isBottom: PropTypes.bool.isRequired,
    isRight: PropTypes.bool.isRequired
}

Cell.defaultProps = {
    isPos: false,
    isPrice: false,
    isBottom: false,
    isRight: false,
}

const ThunderRow = (props) => {
    const {
        long_pos, price, volume, isBid, short_pos, isBottom
    } = props
    const bid_volume = isBid ? volume : 0
    const ask_volume = isBid ? 0 : volume
    const { theme } = useTheme()
    const boardColor = ""//themeBoardColor(theme)
    // border-r 
    return (
        <div className={`table-row ${boardColor}`}>
            <Cell data={long_pos} isBid={true} isPos={true} isBottom={isBottom}></Cell>
            <Cell data={bid_volume} isBid={true} isBottom={isBottom}></Cell>
            <Cell data={price} isBid={isBid} isPrice={true} isBottom={isBottom}></Cell>
            <Cell data={ask_volume} isBid={false} isBottom={isBottom}></Cell>
            <Cell data={short_pos} isBid={false} isPos={true} isRight={true} isBottom={isBottom}></Cell>
        </div>
    )
}

ThunderRow.propTypes = {
    long_pos: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    volume: PropTypes.number.isRequired,
    isBid: PropTypes.bool.isRequired,
    short_pos: PropTypes.number.isRequired,
    isBottom: PropTypes.bool.isRequired,
}

ThunderRow.defaultProps = {
    long_pos: 0,
    isBottom: false,
    short_pos: 0,
}

const ThunderTable = () => {
    const { theme } = useTheme()
    const dispatch = useDispatch()
    useEffect(
        () => {
            dispatch(init_price({ price: 100, limit_down: 99, limit_up: 110, price_step_type: "tws" , 
            ask: {100: 10, 100.5: 30, 101: 33, 101.5: 45, 102: 31},
            bid: {99.9: 5, 99.8: 45, 99.7: 17, 99.6: 23, 99.5: 11},
        }, "INIT"))
        }, []
    )
    const display_num = useSelector((state) => state.quote.display_num)
    const prices = useSelector((state) => state.quote.prices)
    const parr = useSelector((state) => state.quote.parr)
    const price_from_idx = useSelector((state) => state.quote.price_from_idx)
    const ask = useSelector((state) => state.quote.ask)
    const bid = useSelector((state) => state.quote.bid)
    const price = useSelector((state) => state.quote.price)
    console.log(prices)
    const boardColor = ""//themeBoardColor(theme)
    // border-b
    const rows = []
    for (var i = 1; i <= display_num; i++) {
        const p = parr[price_from_idx-i]
        const v = (p in ask)? ask[p] : (p in bid) ? bid[p]: 0
        rows.push(<ThunderRow key={i} price={p} volume={v} isBid={p < price} isBottom={i === display_num}></ThunderRow>)
    }
    return (
        <div className={`table${boardColor} p-1`}>
            {rows}
        </div>

    )
}

const ThunderTradePanel = () => {
    return (
        <ThunderTable></ThunderTable>
    )
}

export default ThunderTradePanel