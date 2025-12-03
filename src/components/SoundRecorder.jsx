import { useState, useEffect, useRef } from "react";
import { parseVoiceCommand } from "../utils/parseVoiceCommand";

const SoundRecorder = ({ onTranscript }) => {
    const recognitionRef = useRef(null);
    const [isListening, setIsListening] = useState(false);

    useEffect(() => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

        if (!SpeechRecognition) {
            console.log('Your brower doesn\'t support speech recognition');
            return;
        }
    
        // Initialize the speech recorder once
        const recognition = new SpeechRecognition();
        recognition.lang = 'en-US';
        recognition.continuous = true;
        recognition.interimResults = true;

        // Save it`
        recognitionRef.current = recognition;

        // Event listeners
        recognition.onstart = () => {
            console.log('Voice recognition started. Speak into the microphone.');
        }

        recognition.onend = () => {
            console.log('Voice recognition ended.');
            setIsListening(false);
        }

        recognition.onresult = (e) => {
            // Get the latest result
            const lastResultIndex = e.results.length - 1;
            const result = e.results[lastResultIndex];
            
            // Only process final results
            if (result.isFinal) {
                const text = result[0].transcript;
                console.log('Final:', text);
                // console.log(e.results);

                const command = parseVoiceCommand(text);
                if (command && onTranscript) onTranscript(command);
            }
            else {
                const text = result[0].transcript;
                console.log('Interim', text);
            }
        }

        recognition.onerror = (e) => {
            console.log('Speech error', e.error);
            if (e.error === 'network') {
                console.log('Network error - retrying...')

                // Auto-restart after network error
                setTimeout(() => {
                    if (isListening) {
                        try {
                            recognition.start();
                        } catch {
                            console.log('Already running.')
                        }
                    }
                }, 1000);
            }

            if (e.error === 'no-speech') console.log('No speech detected, try again..');
            if (e.error === 'aborted') console.log('Recognition aborted')
        }

        // Cleanup function
        return () => {
            if (recognitionRef.current) recognitionRef.current.stop();
        }
    }, [onTranscript, isListening]) // Only run once after the component unmounts

    const startVoiceRecorder = () => {
        const recognition = recognitionRef.current;
        if (!recognition) return;

        try {
            recognition.start();
            console.log('Voice recorder started...');
            setIsListening(true);
        } catch (e) {
            console.log('Recognition already started', e.error);
        }
    }

    const endVoiceRecorder = () => {
        const recognition = recognitionRef.current;
        if (!recognition) return;
        recognition.stop();
        console.log('Voice recorder stopped.');
        setIsListening(false);
    }

    return ( 
        <div className={`
            absolute bottom-1 right-1 w-16 h-12
            rounded-full cursor-pointer 
        `}>
            <span 
                onClick={isListening ? endVoiceRecorder : startVoiceRecorder}
                className={`
                    cursor-pointer w-full h-full
                    flex flex-row items-center justify-center
                    rounded-full
                    ${ isListening ? 'bg-red-500' : 'bg-blue-300 hover:scale-110' }
                `}
            >
                { isListening && (
                    <span className="
                        relative top-0 left-0 w-full h-full
                    ">Listening...</span> 
                    )
                }

                <svg 
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24" fill="none" 
                    stroke="currentColor" strokeWidth="2" 
                    strokeLinecap="round" strokeLinejoin="round"
                    className={`w-6 h-6`}
                    >
                    <rect x="9" y="3" width="6" height="10" rx="3" />
                    <path d="M19 11a7 7 0 0 1-14 0" />
                    <path d="M12 21v-3" />
                    <path d="M8 22h8" />
                </svg>
            </span>
        </div>
    );
}
 
export default SoundRecorder;