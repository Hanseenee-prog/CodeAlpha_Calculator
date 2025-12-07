import { Sun, Moon } from 'lucide-react';

const Themes = () => {
    return ( 
        <div className="
            p-4 flex flex-row rounded-full h-12 bg-red-100
            justify-around items-center
        ">
            <span className='flex items-center'>
                <Sun className="inline w-5 h-5 mr-2" />
                <p>Light</p>
            </span>

            <span className='
                flex items-center rounded-full bg-red-400 text-white
                w-1/2 h-full justify-center p-6
            '>
                <Moon className="inline w-5 h-5 mr-2" />
                <p>Dark</p>
            </span>
        </div>
     );
}
 
export default Themes;