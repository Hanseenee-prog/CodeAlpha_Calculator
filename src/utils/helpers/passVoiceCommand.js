import { parseVoiceCommand } from "./parseVoiceCommand";

/**
 * Handles a voice command differently based on source type
 * @param {string} text - raw recognized speech
 * @param {"PC" | "Mobile"} sourceType - source device type
 * @returns {object | array | null} - processed command(s)
 */
export const passVoiceCommand = (text, sourceType = "PC") => {
    if (!text || text.trim() === "") return null;

    const commands = parseVoiceCommand(text);

    if (!commands) return null;

    // Mobile: pick only the last item if array
    if (sourceType === "Mobile" && Array.isArray(commands)) {
        return commands[commands.length - 1];
    }

    // PC: keep full array or single command
    return commands;
};