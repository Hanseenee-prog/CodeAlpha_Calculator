const About = () => {
    return ( 
        <div className="p-2 overflow-hidden md:p-4 text-slate-900 dark:text-slate-100">
            <p className="mb-1">
                <span className="font-semibold text-blue-800 dark:text-blue-300">App Name:</span> SmartCalcX
            </p>
            <p className="mb-1">
                <span className="font-semibold text-blue-800 dark:text-blue-300">Version Number:</span> 1.0.0
            </p>
            <p className="mb-1">
                <span className="font-semibold text-blue-800 dark:text-blue-300">Email:</span> hansonemma398@gmail.com
            </p>
            <p>
                <span className="font-semibold text-blue-800 dark:text-blue-300">How to use: </span>
                <a href="#" className="text-blue-600 dark:text-blue-400 underline hover:text-blue-500 transition-colors">
                    link to txt file
                </a>
            </p>
        </div>
     );
}
 
export default About;