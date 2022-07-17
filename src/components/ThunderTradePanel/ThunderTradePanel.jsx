import PropTypes from 'prop-types'
import { Button, useTheme } from "react-daisyui"

const themeBoardColor = (theme) => {
    return theme === "dark" ? 'border-slate-500' : 'border-slate-300'
}

const Cell = (props) => {
    const {
        data,
        isBid,
        isPrice,
        isPos,
    } = props
    const hidden = isBid ? "" : "hidden"
    const color = isBid ? "text-red-500" : "text-green-500"
    const bgColor = ""//isBid ? "bg-red-100": "bg-green-100"
    const { theme } = useTheme()
    const boardColor = themeBoardColor(theme)
    const boardDashed = isPos ? "hover:border-dashed" : ""
    const hover = isPrice ? "hover:cursor-pointer" : ""
    // "border-r-0 border-b-0"
    return (
        <span className={`flex w-16 h-8 p-1 align-middle border items-center text-xs text-center justify-center ${boardColor} ${bgColor} ${color} ${boardDashed} ${hover}`}>
            {data}
            {/* <p className={`text-xs text-center`}>{data}</p> */}
        </span>
    )
}

Cell.propTypes = {
    data: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    isBid: PropTypes.bool.isRequired,
    isPrice: PropTypes.bool.isRequired,
    isPos: PropTypes.bool.isRequired,
}

Cell.defaultProps = {
    isPos: false,
    isPrice: false
}

const ThunderRow = (props) => {
    const {
        long_pos, price, volume, isBid, short_pos
    } = props
    const bid_volume = isBid ? volume : null
    const ask_volume = isBid ? null : volume
    const { theme } = useTheme()
    const boardColor = ""//themeBoardColor(theme)
    // border-r 
    return (
        <div className={`flex${boardColor}`}>
            <Cell data={long_pos} isBid={true} isPos={true}></Cell>
            <Cell data={bid_volume} isBid={true}></Cell>
            <Cell data={price} isBid={isBid} isPrice={true}></Cell>
            <Cell data={ask_volume} isBid={false}></Cell>
            <Cell data={short_pos} isBid={false} isPos={true}></Cell>
        </div>
    )
}

ThunderRow.propTypes = {
    long_pos: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    volume: PropTypes.number.isRequired,
    isBid: PropTypes.bool.isRequired,
    short_pos: PropTypes.number.isRequired,
}

const ThunderTable = () => {
    const { theme } = useTheme()
    const boardColor = ""//themeBoardColor(theme)
    // border-b
    return (
        <div className={`${boardColor}`}>
            <ThunderRow long_pos={null} price={100.5} volume={110} isBid={false} short_pos={null}></ThunderRow>
            <ThunderRow long_pos={null} price={100.4} volume={95} isBid={false} short_pos={null}></ThunderRow>
            <ThunderRow long_pos={null} price={100.3} volume={38} isBid={false} short_pos={null}></ThunderRow>
            <ThunderRow long_pos={null} price={100.2} volume={20} isBid={false} short_pos={null}></ThunderRow>
            <ThunderRow long_pos={null} price={100.1} volume={3} isBid={false} short_pos={null}></ThunderRow>
            <ThunderRow long_pos={null} price={100.0} volume={10} isBid={true} short_pos={null}></ThunderRow>
            <ThunderRow long_pos={null} price={99.9} volume={12} isBid={true} short_pos={null}></ThunderRow>
            <ThunderRow long_pos={null} price={99.8} volume={28} isBid={true} short_pos={null}></ThunderRow>
            <ThunderRow long_pos={null} price={99.7} volume={80} isBid={true} short_pos={null}></ThunderRow>
            <ThunderRow long_pos={null} price={99.6} volume={150} isBid={true} short_pos={null}></ThunderRow>
        </div>

    )
}

const ThunderTradePanel = () => {
    return (
        <ThunderTable></ThunderTable>
    )
}

export default ThunderTradePanel