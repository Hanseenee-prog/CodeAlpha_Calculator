import { useState, useEffect, useRef } from "react";
import { parseVoiceCommand } from "../utils/helpers/parseVoiceCommand";

const SoundRecorder = ({ onTranscript }) => {
    const recognitionRef = useRef(null);
    const accumulatedTranscript = useRef(""); // store raw mobile transcript
    const [isListening, setIsListening] = useState(false);

    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
    );

    useEffect(() => {
        const SpeechRecognition =
            window.SpeechRecognition || window.webkitSpeechRecognition;

        if (!SpeechRecognition) {
            console.warn("Speech recognition not supported");
            return;
        }

        const recognition = new SpeechRecognition();
        recognition.lang = "en-US";
        recognition.continuous = true;
        recognition.interimResults = true;

        recognitionRef.current = recognition;

        recognition.onstart = () => {
            accumulatedTranscript.current = "";
        };

        recognition.onresult = (e) => {
            if (isMobile) {
                // ✅ Mobile: accumulate raw transcript only
                for (let i = e.resultIndex; i < e.results.length; i++) {
                    if (e.results[i].isFinal) {
                        accumulatedTranscript.current += e.results[i][0].transcript + " ";
                    }
                }
            } else {
                // ✅ PC: parse immediately
                const lastIndex = e.results.length - 1;
                const result = e.results[lastIndex];
                if (result.isFinal) {
                    const command = parseVoiceCommand(result[0].transcript);
                    if (command && onTranscript) onTranscript(command);
                }
            }
        };

        recognition.onend = () => {
            setIsListening(false);

            if (isMobile && accumulatedTranscript.current.trim()) {
                // ✅ Mobile: parse once when recognition ends
                const command = parseVoiceCommand(accumulatedTranscript.current.trim());
                if (command && onTranscript) {
                    onTranscript(command); // replace, don't append
                }
                accumulatedTranscript.current = "";
            }
        };

        recognition.onerror = (e) => {
            console.error("Speech recognition error:", e.error);
        };

        return () => recognition.stop();
    }, [onTranscript, isMobile]);

    const startVoiceRecorder = () => {
        if (!recognitionRef.current || isListening) return;
        accumulatedTranscript.current = "";
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
        // ⚠️ Leave your button, SVG, and styling exactly as they are
        <button className="absolute bottom-1 left-3 h-9 flex flex-row items-center gap-2">
            <span
                onClick={isListening ? stopVoiceRecorder : startVoiceRecorder}
                className={`cursor-pointer h-full rounded-xl w-9 flex items-center justify-center transition-all duration-300
                    ${isListening
                        ? "bg-red-600 dark:bg-red-700 text-white shadow-lg shadow-red-500/40 animate-pulse"
                        : "bg-blue-300 dark:bg-slate-700 text-slate-800 dark:text-slate-200 hover:scale-105"
                    }`}
            >
                {/* Keep your original SVG here */}
            </span>

            {isListening && (
                <span className="bg-red-600 dark:bg-red-700 text-white font-medium rounded-xl h-full text-[12px] px-3 flex items-center shadow-lg shadow-red-500/20 transition-all">
                    Listening...
                </span>
            )}
        </button>
    );
};

export default SoundRecorder;