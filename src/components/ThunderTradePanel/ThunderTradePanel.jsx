import PropTypes from 'prop-types'
import { Button, useTheme } from "react-daisyui"

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
    const boardColor = themeBoardColor(theme)
    // const boardDashed = isPos ? "hover:outline hover:outline-dashed mt-px ml-px" : "outline mt-px ml-px"
    const board = `border ${isRight? "": "border-r-0"} ${isBottom? "": "border-b-0"}`
    const boardStyle = isPos ? "hover:border hover:border-dashed" : board
    const hover = isPrice ? "hover:cursor-pointer" : ""
    // "border-r-0 border-b-0"
    return (
        <span className={`table-cell w-16 h-8 text-center ${boardStyle} ${boardColor} ${hover} ${bgColor} ${color}`}>
            <span className={`w-full h-full align-middle items-center text-xs text-center justify-center`}>
                {data}
            </span>
            {/* <p className={`text-xs text-center`}>{data}</p> */}
        </span>
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
    const bid_volume = isBid ? volume : null
    const ask_volume = isBid ? null : volume
    const { theme } = useTheme()
    const boardColor = ""//themeBoardColor(theme)
    // border-r 
    return (
        <div className={`table-row ${boardColor}`}>
            <Cell data={long_pos} isBid={true} isPos={true} isBottom={isBottom}></Cell>
            <Cell data={bid_volume} isBid={true} isBottom={isBottom}></Cell>
            <Cell data={price} isBid={isBid} isPrice={true} isBottom={isBottom}></Cell>
            <Cell data={ask_volume} isBid={false} isRight={true} isBottom={isBottom}></Cell>
            <Cell data={short_pos} isBid={false} isPos={true} isBottom={isBottom}></Cell>
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
    isBottom: false,
}

const ThunderTable = () => {
    const { theme } = useTheme()
    const boardColor = ""//themeBoardColor(theme)
    // border-b
    return (
        <div className={`table${boardColor}`}>
            <ThunderRow long_pos={null} price={100.5} volume={110} isBid={false} short_pos={null}></ThunderRow>
            <ThunderRow long_pos={null} price={100.4} volume={95} isBid={false} short_pos={null}></ThunderRow>
            <ThunderRow long_pos={null} price={100.3} volume={38} isBid={false} short_pos={null}></ThunderRow>
            <ThunderRow long_pos={null} price={100.2} volume={20} isBid={false} short_pos={null}></ThunderRow>
            <ThunderRow long_pos={null} price={100.1} volume={3} isBid={false} short_pos={null}></ThunderRow>
            <ThunderRow long_pos={null} price={100.0} volume={10} isBid={true} short_pos={null}></ThunderRow>
            <ThunderRow long_pos={null} price={99.9} volume={12} isBid={true} short_pos={null}></ThunderRow>
            <ThunderRow long_pos={null} price={99.8} volume={28} isBid={true} short_pos={null}></ThunderRow>
            <ThunderRow long_pos={null} price={99.7} volume={80} isBid={true} short_pos={null}></ThunderRow>
            <ThunderRow long_pos={null} price={99.6} volume={150} isBid={true} short_pos={null} isBottom={true}></ThunderRow>
        </div>

    )
}

const ThunderTradePanel = () => {
    return (
        <ThunderTable></ThunderTable>
    )
}

export default ThunderTradePanel