import { useState, useEffect, useRef } from "react";
import { parseVoiceCommand } from "../utils/helpers/parseVoiceCommand";

const SoundRecorder = ({ onTranscript }) => {
    const recognitionRef = useRef(null);
    const accumulatedTranscript = useRef("");
    const lastFinalIndexRef = useRef(-1); // 🔥 KEY FIX
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
            console.log("🎤 Listening started");
            accumulatedTranscript.current = "";
            lastFinalIndexRef.current = -1; // reset
        };

        recognition.onresult = (e) => {
            if (isMobile) {
                // ✅ ANDROID: process ONLY NEW final results
                for (let i = 0; i < e.results.length; i++) {
                    if (
                        e.results[i].isFinal &&
                        i > lastFinalIndexRef.current
                    ) {
                        accumulatedTranscript.current +=
                            e.results[i][0].transcript + " ";

                        lastFinalIndexRef.current = i; // 🔒 lock it
                    }
                }

                console.log(
                    "📱 Android accumulated:",
                    accumulatedTranscript.current.trim()
                );
            } else {
                // ✅ PC: immediate final processing
                const lastIndex = e.results.length - 1;
                const result = e.results[lastIndex];

                if (result.isFinal) {
                    const text = result[0].transcript;
                    console.log("🖥 PC:", text);

                    const command = parseVoiceCommand(text);
                    if (command && onTranscript) onTranscript(command);
                }
            }
        };

        recognition.onend = () => {
            console.log("🛑 Listening ended");
            setIsListening(false);

            // ✅ Android: send ONCE
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
            console.error("Speech error:", e.error);
        };

        return () => recognition.stop();
    }, [onTranscript, isMobile]);

    const startVoiceRecorder = () => {
        if (!recognitionRef.current || isListening) return;

        accumulatedTranscript.current = "";
        lastFinalIndexRef.current = -1;

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
        <button className="absolute bottom-1 left-3 h-9 flex flex-row items-center gap-2">
            <span
                onClick={isListening ? stopVoiceRecorder : startVoiceRecorder}
                className={`
                    cursor-pointer h-full rounded-xl w-9
                    flex items-center justify-center transition-all duration-300
                    ${
                        isListening
                            ? "bg-red-600 dark:bg-red-700 text-white animate-pulse"
                            : "bg-blue-300 dark:bg-slate-700 text-slate-800 dark:text-slate-200"
                    }
                `}
            >
                🎤
            </span>

            {isListening && (
                <span className="bg-red-600 text-white text-xs px-3 rounded-xl">
                    Listening...
                </span>
            )}
        </button>
    );
};

export default SoundRecorder;