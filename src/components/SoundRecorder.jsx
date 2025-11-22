import { useState, useEffect, useRef } from "react";

const SoundRecorder = () => {
    const recognitionRef = useRef(null);
    const [isListening, setIsListening] = useState(false);

    useEffect(() => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

        if (!SpeechRecognition) {
            console.log('Your brower doesn\'t support speech recognition');
            return;
        }
        console.log('supported')
    
        // Initialize the speech recorder once
        const recognition = new SpeechRecognition();
        recognition.lang = 'en-US';
        recognition.continuous = true;
        recognition.interimResults = false;

        // Save it
        recognitionRef.current = recognition;

        // Event listeners
        recognition.onstart = () => {
            console.log('Voice recognition started. Speak into the microphone.');
        }

        recognition.onend = () => {
            console.log('Voice recognition ended.');
        }

        recognition.onresult = (e) => {
            const text = e.results[0][0].transcript;
            console.log(e.results);
            console.log('You said', text);

            // if (onTranscript) onTranscript(text);
        }

        recognition.onerror = (e) => {
            console.log('Speech error', e);
        }
    }, []) // Only run once after the component unmounts

    const startVoiceRecorder = () => {
        const recognition = recognitionRef.current;
        if (!recognition) return;

        try {
            recognition.start();
            console.log('Voice recorder started...');
            setIsListening(true);
        } catch (e) {
            console.log('Recognition already started', e);
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
                    ${ isListening ? 'bg-blue-500' : 'bg-red-300 hover:scale-110' }
                `}
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="9" y="3" width="6" height="10" rx="3" />
                    <path d="M19 11a7 7 0 0 1-14 0" />
                    <path d="M12 21v-3" />
                    <path d="M8 22h8" />
                </svg>

                { isListening && (
                    <span className="
                        absolute top-0 left-0 w-full h-full
                    ">Listening...</span> 
                    )
                }
            </span>
        </div>
    );
}
 
export default SoundRecorder;