// Map DOM checkbox ids -> channels.json keys
const TOGGLE_MAP = {
    "bot-overall-switch-toggle": "main_bot_toggle",
    "gpt-toggle-switch-toggle": "use_gpt_toggle",
    "commands-toggle-switch-toggle": "commands_toggle",
    "eightball-toggle-switch-toggle": "8ball_toggle",
    "eightball-toggle-switch-toggle-misc": "8ball_toggle",
    "timed-messages-toggle-switch-toggle": "timed_messages_toggle",
    "timer-toggle-switch-toggle": "timers_toggle",
    "timer-toggle-switch-toggle-misc": "timers_toggle",
    "quote-toggle-switch-toggle": "quote_toggle",
    "chat-alerts-toggle-switch-toggle": "chat_alerts_toggle",
    "ads-timer-toggle-switch-toggle": "ads_timer_toggle",
    "ads-break-toggle-switch-toggle": "ads_break_toggle",
    "follow-thank-toggle-switch-toggle": "follow_thank_toggle",
    "sub-thank-toggle-switch-toggle": "sub_thank_toggle",
    "gift-sub-thank-toggle-switch-toggle": "gift_sub_thank_toggle",
    "bits-thank-toggle-switch-toggle": "bits_thank_toggle",
    "live-announcement-toggle-switch-toggle": "live_announcement_toggle",
    "raid-announcement-toggle-switch-toggle": "raid_announcement_toggle",

    // "moderation-toggle-switch-toggle": "moderation_toggle",
    // "caps-protection-toggle-switch-toggle": "caps_protection_toggle",
    // "symbol-protection-toggle-switch-toggle": "symbol_protection_toggle",
    // "word-protection-toggle-switch-toggle": "word_protection_toggle",
    // "paragraph-protection-toggle-switch-toggle": "paragraph_protection_toggle",
    // "emote-protection-toggle-switch-toggle": "emote_protection_toggle",
    // "zagloo-protection-toggle-switch-toggle": "zagloo_protection_toggle",

    "auto-shoutout-toggle-switch-toggle": "auto_shoutout_toggle",
};

function getCheckbox(id) {
    return document.getElementById(id);
}

async function toggleById(inputId) {
    const el = getCheckbox(inputId);
    if (!el) return;

    const key = TOGGLE_MAP[inputId];
    if (!key) {
        console.warn("No TOGGLE_MAP entry for:", inputId);
        return;
    }

    const desired = !!el.checked;

    // optimistic update; revert if server rejects
    const resp = await postJSON("/api/niobot/toggles", { key, value: desired });
    if (!resp || resp.ok !== true) {
        console.error("Failed to update toggle", key, resp);
        el.checked = !desired;
        alert("Failed to save setting. Are you logged in?");
    }
}

// Initialize checkboxes from server on page load
async function initTogglesFromServer() {
    let resp;
    try {
        resp = await fetch("/api/niobot/config");
    } catch (e) {
        console.error("Failed to load config for toggles", e);
        return;
    }
    if (!resp.ok) return;

    const data = await resp.json();
    const cfg = (data && data.config && typeof data.config === "object") ? data.config : null;
    const loggedIn = !!data.logged_in;

    Object.keys(TOGGLE_MAP).forEach((inputId) => {
        const el = getCheckbox(inputId);
        if (!el) return;

        if (!loggedIn || !cfg) {
            el.checked = false;
            el.disabled = true;
            return;
        }

        el.disabled = false;
        const key = TOGGLE_MAP[inputId];
        el.checked = !!cfg[key];
    });
}

document.addEventListener("DOMContentLoaded", () => {
    initTogglesFromServer();
});

// ---- per-toggle handlers (called by onchange="...") ----
function botOverallSwitchToggle() { return toggleById("bot-overall-switch-toggle"); }
function gptToggleSwitchToggle() { return toggleById("gpt-toggle-switch-toggle"); }
function commandsToggleSwitchToggle() { return toggleById("commands-toggle-switch-toggle"); }
function eightballToggleSwitchToggle() { return toggleById("eightball-toggle-switch-toggle"); }

function timedMessagesToggleSwitchToggle() { return toggleById("timed-messages-toggle-switch-toggle"); }
function timerToggleSwitchToggle() { return toggleById("timer-toggle-switch-toggle"); }
function quoteToggleSwitchToggle() { return toggleById("quote-toggle-switch-toggle"); }

function chatAlertsToggleSwitchToggle() { return toggleById("chat-alerts-toggle-switch-toggle"); }
function adsTimerToggleSwitchToggle() { return toggleById("ads-timer-toggle-switch-toggle"); }
function adsBreakToggleSwitchToggle() { return toggleById("ads-break-toggle-switch-toggle"); }
function followThankToggleSwitchToggle() { return toggleById("follow-thank-toggle-switch-toggle"); }
function subThankToggleSwitchToggle() { return toggleById("sub-thank-toggle-switch-toggle"); }
function giftSubThankToggleSwitchToggle() { return toggleById("gift-sub-thank-toggle-switch-toggle"); }
function bitsThankToggleSwitchToggle() { return toggleById("bits-thank-toggle-switch-toggle"); }
function liveAnnouncementToggleSwitchToggle() { return toggleById("live-announcement-toggle-switch-toggle"); }
function raidAnnouncementToggleSwitchToggle() { return toggleById("raid-announcement-toggle-switch-toggle"); }

// Your HTML calls RiveAnnouncementToggleSwitchToggle() (typo). Keep alias so it works.
function RiveAnnouncementToggleSwitchToggle() { return raidAnnouncementToggleSwitchToggle(); }

// function moderationToggleSwitchToggle() { return toggleById("moderation-toggle-switch-toggle"); }
// function capsProtectionToggleSwitchToggle() { return toggleById("caps-protection-toggle-switch-toggle"); }
// function symbolProtectionToggleSwitchToggle() { return toggleById("symbol-protection-toggle-switch-toggle"); }
// function wordProtectionToggleSwitchToggle() { return toggleById("word-protection-toggle-switch-toggle"); }
// function paragraphProtectionToggleSwitchToggle() { return toggleById("paragraph-protection-toggle-switch-toggle"); }
// function emoteProtectionToggleSwitchToggle() { return toggleById("emote-protection-toggle-switch-toggle"); }
// function zaglooProtectionToggleSwitchToggle() { return toggleById("zagloo-protection-toggle-switch-toggle"); }

function autoShoutoutToggleSwitchToggle() { return toggleById("auto-shoutout-toggle-switch-toggle"); }