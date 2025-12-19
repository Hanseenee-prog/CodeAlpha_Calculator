import { useState, useEffect, useRef } from "react";
import { parseVoiceCommand } from "../utils/helpers/parseVoiceCommand";

const SoundRecorder = ({ onTranscript }) => {
    const recognitionRef = useRef(null);
    const accumulatedTranscript = useRef("");
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
        recognition.continuous = true;       // PC respects this
        recognition.interimResults = true;

        recognitionRef.current = recognition;

        recognition.onstart = () => {
            console.log("🎤 Voice recognition started");
            accumulatedTranscript.current = "";
        };

        recognition.onresult = (e) => {
            if (isMobile) {
                // ✅ ANDROID: process ONLY new final results
                for (let i = e.resultIndex; i < e.results.length; i++) {
                    if (e.results[i].isFinal) {
                        accumulatedTranscript.current +=
                            e.results[i][0].transcript + " ";
                    }
                }

                console.log(
                    "📱 Accumulated (Android):",
                    accumulatedTranscript.current.trim()
                );
            } else {
                // ✅ PC: process immediately on final result
                const lastIndex = e.results.length - 1;
                const result = e.results[lastIndex];

                if (result.isFinal) {
                    const text = result[0].transcript;
                    console.log("🖥 Processing (PC):", text);

                    const command = parseVoiceCommand(text);
                    if (command && onTranscript) onTranscript(command);
                }
            }
        };

        recognition.onend = () => {
            console.log("🛑 Voice recognition ended");
            setIsListening(false);

            // ✅ Android sends ONCE when recognition ends
            if (isMobile && accumulatedTranscript.current.trim()) {
                const command = parseVoiceCommand(
                    accumulatedTranscript.current.trim()
                );
                if (command && onTranscript) {
                    onTranscript(command);
                }
                accumulatedTranscript.current = "";
            }
        };

        recognition.onerror = (e) => {
            console.error("Speech recognition error:", e.error);
        };

        return () => {
            recognition.stop();
        };
    }, [onTranscript, isMobile]);

    const startVoiceRecorder = () => {
        const recognition = recognitionRef.current;
        if (!recognition || isListening) return;

        try {
            accumulatedTranscript.current = "";
            recognition.start();
            setIsListening(true);
        } catch (e) {
            console.error(e);
        }
    };

    const stopVoiceRecorder = () => {
        const recognition = recognitionRef.current;
        if (!recognition) return;

        recognition.stop();
        setIsListening(false);
    };

    return (
        <button className="absolute bottom-1 left-3 h-9 flex flex-row items-center gap-2">
            <span
                onClick={isListening ? stopVoiceRecorder : startVoiceRecorder}
                className={`
                    cursor-pointer h-full rounded-xl w-9
                    flex items-center justify-center transition-all duration-300
                    ${
                        isListening
                            ? "bg-red-600 dark:bg-red-700 text-white shadow-lg shadow-red-500/40 animate-pulse"
                            : "bg-blue-300 dark:bg-slate-700 text-slate-800 dark:text-slate-200 hover:scale-105"
                    }
                `}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-4 h-4"
                >
                    <rect x="9" y="3" width="6" height="10" rx="3" />
                    <path d="M19 11a7 7 0 0 1-14 0" />
                    <path d="M12 21v-3" />
                    <path d="M8 22h8" />
                </svg>
            </span>

            {isListening && (
                <span
                    className="
                        bg-red-600 dark:bg-red-700 text-white font-medium
                        rounded-xl h-full text-[12px] px-3 flex items-center
                        shadow-lg shadow-red-500/20 transition-all
                    "
                >
                    Listening...
                </span>
            )}
        </button>
    );
};

export default SoundRecorder;