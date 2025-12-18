import { useState, useEffect, useRef } from "react";
import { parseVoiceCommand } from "../utils/helpers/parseVoiceCommand";

const SoundRecorder = ({ onTranscript }) => {
    const recognitionRef = useRef(null);
    const [isListening, setIsListening] = useState(false);
    const processedResultsRef = useRef(0);

    useEffect(() => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

        if (!SpeechRecognition) {
            console.log('Your browser doesn\'t support speech recognition');
            return;
        }
    
        const recognition = new SpeechRecognition();
        recognition.lang = 'en-US';
        recognition.continuous = true;
        recognition.interimResults = true;

        recognitionRef.current = recognition;

        recognition.onstart = () => {
            console.log('Voice recognition started.');
            processedResultsRef.current = 0;
        }

        recognition.onend = () => {
            setIsListening(false);
            processedResultsRef.current = 0;
            console.log('Voice recognition ended.');
        }

        recognition.onresult = (e) => {
            for (let i = processedResultsRef.current; i < e.results.length - 1; i++) {
                const result = e.results[i];

                if (result.isFinal) {
                    const text = result[0].transcript;
                    const command = parseVoiceCommand(text);
                    if (command && onTranscript) onTranscript(command);
                }
            // const lastResultIndex = e.results.length - 1;
            // const result = e.results[lastResultIndex];
            processedResultsRef.current = i + 1;
            }
        }

        recognition.onerror = (e) => {
            if (e.error === 'network' && isListening) {
                setTimeout(() => {
                    try { recognition.start(); } catch { /* Already running */ }
                }, 1000);
            }
        }

        return () => {
            if (recognitionRef.current) recognitionRef.current.stop();
        }
    }, [onTranscript, isListening])

    const startVoiceRecorder = () => {
        const recognition = recognitionRef.current;
        if (!recognition) return;
        try {
            processedResultsRef.current = 0;
            recognition.start();
            setIsListening(true);
        } catch (e) { console.log(e); }
    }

    const endVoiceRecorder = () => {
        const recognition = recognitionRef.current;
        if (!recognition) return;
        recognition.stop();
        setIsListening(false);
    }

    return ( 
        <button className="absolute bottom-1 left-3 h-9 flex flex-row items-center gap-2">
            <span 
                onClick={isListening ? endVoiceRecorder : startVoiceRecorder}
                className={`
                    cursor-pointer h-full rounded-xl w-9
                    flex items-center justify-center transition-all duration-300
                    ${ isListening 
                        ? 'bg-red-600 dark:bg-red-700 text-white shadow-lg shadow-red-500/40 animate-pulse' 
                        : 'bg-blue-300 dark:bg-slate-700 text-slate-800 dark:text-slate-200 hover:scale-105' 
                    }
                `}
            >
                <svg 
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24" fill="none" 
                    stroke="currentColor" strokeWidth="2.5" 
                    strokeLinecap="round" strokeLinejoin="round"
                    className="w-4 h-4"
                >
                    <rect x="9" y="3" width="6" height="10" rx="3" />
                    <path d="M19 11a7 7 0 0 1-14 0" />
                    <path d="M12 21v-3" />
                    <path d="M8 22h8" />
                </svg>
            </span>

            { isListening && (
                <span className="
                    bg-red-600 dark:bg-red-700 text-white font-medium 
                    rounded-xl h-full text-[12px] px-3 flex items-center 
                    shadow-lg shadow-red-500/20 transition-all
                ">
                    Listening...
                </span> 
            )}
        </button>
    );
}
 
export default SoundRecorder;