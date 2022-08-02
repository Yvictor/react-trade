import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import { Button, Navbar } from "react-daisyui";
import ThemeButton from "./theme";
import ThunderTradePanel from "./components/ThunderTradePanel/ThunderTradePanel";
import ResponsiveReactGridLayout from "react-grid-layout";
import "/node_modules/react-grid-layout/css/styles.css";
import "/node_modules/react-resizable/css/styles.css";

function App() {
  const layout = [
    { i: "a", x: 0, y: 0, w: 3, h: 15, minW: 3, },
    { i: "b", x: 3, y: 0, w: 3, h: 2, minW: 2, maxW: 4 },
    { i: "c", x: 3, y: 0, w: 3, h: 1},
  ];
  return (
    <div className="w-screen h-screen touch-none">
      <div className="h-full w-full bg-secondary">
        <div className="flex w-full h-16 bg-base-100 p-0 items-start">
          <Navbar>
            <div className="flex-1">
              <p className="font-serif normal-case text-xl p-2">ReactTrade</p>
            </div>
            <div className="ml-auto items-center p-1">
              <ThemeButton />
            </div>
          </Navbar>
        </div>
        <div></div>

        <ResponsiveReactGridLayout
          className="layout"
          layout={layout}
          cols={12}
          width={window.innerWidth}
          rowHeight={22}
          draggableHandle=".icon-move"
          resizeHandles={["s", "se"]}
          onLayoutChange={(e)=>{console.log(e)}}
        >
          <div key="a"><ThunderTradePanel/></div>
          <div key="b" className="border">b</div>
          <div key="c" className="border">c</div>
          {/* <ThunderTradePanel key="a"></ThunderTradePanel> */}
        </ResponsiveReactGridLayout>
      </div>
    </div>
  );
}

export default App;
