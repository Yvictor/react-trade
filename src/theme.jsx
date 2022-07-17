import {useTheme, Swap} from 'react-daisyui'
import { FiMoon, FiSun } from 'react-icons/fi'


const ThemeButton = () => {
    const { theme, setTheme } = useTheme()
    const iconSize = 24
    return (
      <div className='p-1'>
        <Swap onChange={() => setTheme((theme) => (theme === "light" ? "dark" : "light"))}
          rotate={true} onElement={<FiMoon size={iconSize} />}
          offElement={<FiSun size={iconSize} />}>
        </Swap>
      </div>
  
    )
  }

export default ThemeButton