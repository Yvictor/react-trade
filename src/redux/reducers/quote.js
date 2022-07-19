const initState = {
    prices: [],
    asks: [],
    bids: [],
}

const quoteReducer = (state = initState, action) => {
    switch (action.type) {
        case "UPDATE_QUOTE":
            return {
                quote: action.quote
            }
    }
}

export default quoteReducer
