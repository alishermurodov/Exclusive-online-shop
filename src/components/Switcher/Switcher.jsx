import React, {useState} from 'react'
import useDarkSise from '../../Hooks/UseDarkSise'
import { DarkModeSwitch } from 'react-toggle-dark-mode/dist'


export default function Switcher() {
    const [colorTheme, setTheme] = useDarkSise()
    const [darkSide, setDarkSide] = useState(colorTheme === 'dark' ? true : false)
    // console.log(darkSide);

    const toggleDarkMode = (checked) => {
        
        setTheme(colorTheme)
        setDarkSide(checked)
    }

    return(
        <>
          <div>
            <DarkModeSwitch
                checked={darkSide}
                onChange={toggleDarkMode}
                size={20}
                moonColor='#fff'
                sunColor='#fff'
            />
          </div>
        </>
    )
}