import { useState, useEffect, useRef, useCallback } from "react";
import { parseVoiceCommand } from "../utils/helpers/parseVoiceCommand";
import { Mic } from 'lucide-react';

const SoundRecorder = ({ onTranscript }) => {
    const recognitionRef = useRef(null);
    const [isListening, setIsListening] = useState(false);

    useEffect(() => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) return;

        const recognition = new SpeechRecognition();
        recognition.lang = "en-US";
        recognition.continuous = true;
        recognition.interimResults = true;

        recognitionRef.current = recognition;

        recognition.onstart = () => {
            console.log("Voice recognition started");
        };

        recognition.onend = () => {
            setIsListening(false);
            console.log("Voice recognition ended");
        };

        recognition.onresult = (e) => {
            const lastResultIndex = e.results.length - 1;
            const result = e.results[lastResultIndex];
            
            if (result.isFinal) {
                const text = result[0].transcript.trim();

                if (text) {
                    const command = parseVoiceCommand(text);
                    if (command && onTranscript) onTranscript(command);
                }
            }
        };

        recognition.onerror = (e) => {
            if (e.error === 'network' && isListening) {
                setTimeout(() => {
                    try {
                        recognition.start();
                        setIsListening(true);
                    }
                    catch (e) { console.log(e) };
                }, 1000);
            }
        }

        return () => recognition.stop();
    }, [onTranscript, isListening]);

    const renderRecorder = useCallback(() => {
        const startVoiceRecorder = () => {
            if (!recognitionRef.current || isListening) return;

            try {
                recognitionRef.current.start();
                setIsListening(true);
            } catch (e) {
                console.error(e);
            }
        };

        const stopVoiceRecorder = () => {
            recognitionRef.current?.stop();
            setIsListening(false);
        };

        return (
            <button className="hidden absolute bottom-1 left-3 h-9 md:flex flex-row items-center gap-2">
                <span
                    onClick={isListening ? stopVoiceRecorder : startVoiceRecorder}
                    className={`cursor-pointer h-full rounded-xl w-9 flex items-center justify-center transition-all duration-300
                        ${isListening
                            ? "bg-red-600 dark:bg-red-700 text-white shadow-lg shadow-red-500/40 animate-pulse"
                            : "bg-blue-300 dark:bg-slate-700 text-slate-800 dark:text-slate-200 hover:scale-105"
                        }`}
                >
                    {/* Keep your original SVG here */}
                    <Mic size={20}/>
                </span>

                {isListening && (
                    <span className="bg-red-600 dark:bg-red-700 text-white font-medium rounded-xl h-full text-[12px] px-3 flex items-center shadow-lg shadow-red-500/20 transition-all">
                        Listening...
                    </span>
                )}
            </button>
        );
    }, [isListening]);

   return renderRecorder(); 
};

export default SoundRecorder;
