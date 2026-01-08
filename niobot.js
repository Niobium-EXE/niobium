function createSwitch(checked) {
    const label = document.createElement("label");
    label.className = "switch";

    const input = document.createElement("input");
    input.type = "checkbox";
    input.checked = !!checked;

    const slider = document.createElement("span");
    slider.className = "slider round";

    label.appendChild(input);
    label.appendChild(slider);

    return { label, input };
}

// On page load, collapse all panels
document.addEventListener('DOMContentLoaded', function () {
    const panels = document.querySelectorAll('.toggle-panel');
    const buttons = document.querySelectorAll('.collapsible-panel');
    panels.forEach((panel, idx) => {
        panel.classList.add('panel-hidden');
        buttons[idx].classList.add('collapsed');
    });
    buttons.forEach((btn, idx) => {
        btn.addEventListener('click', () => {
            const panel = btn.nextElementSibling;
            if (panel.classList.contains('panel-hidden')) {
                panel.classList.remove('panel-hidden');
                btn.classList.remove('collapsed');
            } else {
                panel.classList.add('panel-hidden');
                btn.classList.add('collapsed');
            }
        });
    });
});

async function loadNiobotConfig(view) {
    const root = document.getElementById("config-window");
    if (!root) return;

    root.textContent = "Loading settings...";

    let resp;
    try {
        resp = await fetch("/api/niobot/config");
    } catch (e) {
        console.error("Network error when loading config", e);
        root.textContent = "Failed to contact server.";
        return;
    }

    if (!resp.ok) {
        const text = await resp.text();  // just to help debugging
        console.error("Config API error:", resp.status, text);
        root.textContent = "Server error " + resp.status + " while loading config.";
        return;
    }

    const data = await resp.json();

    if (!data.logged_in) {
        root.textContent = "Login with Twitch to edit your settings.";
        return;
    }

    // default view if something weird happens
    const safeView = view || "timed";
    renderNiobotConfig(root, data, safeView);
}

function renderNiobotConfig(root, data, view) {
    root.innerHTML = "";

    const title = document.createElement("h2");
    title.style.color = "white";
    let sectionTitle = "Settings";

    if (view === "timed") sectionTitle = "Your Timed Messages";
    else if (view === "timers") sectionTitle = "Your Timers";
    else if (view === "quotes") sectionTitle = "Your Quotes";
    else if (view === "shoutouts") sectionTitle = "Your Shoutouts";

    title.textContent = sectionTitle;
    root.appendChild(title);

    if (view === "timed") {
        renderTimedMessages(root, data);
    } else if (view === "shoutouts") {
        renderShoutouts(root, data);
    } else if (view === "timers") {
        renderTimers(root, data);
    } else if (view === "quotes") {
        renderQuotes(root, data);
    }
}

function renderTimedMessages(root, data) {
    const tmSection = document.createElement("div");
    tmSection.style.color = "white";
    root.appendChild(tmSection);

    const tmList = document.createElement("div");
    tmSection.appendChild(tmList);

    const timedMessages = data.timed_messages || {};

    if (Object.keys(timedMessages).length === 0) {
        tmList.textContent = "No timed messages yet.";
    } else {
        for (const [name, tm] of Object.entries(timedMessages)) {
            tmList.appendChild(makeTimedMessageRow(name, tm));
        }
    }

    tmSection.appendChild(makeTimedMessageAddForm());
}

function renderShoutouts(root, data) {
    const soSection = document.createElement("div");
    soSection.style.color = "white";
    root.appendChild(soSection);

    const soList = document.createElement("ul");
    soSection.appendChild(soList);

    (data.shoutout_users || []).forEach(user => {
        const li = document.createElement("li");
        li.textContent = user + " ";

        const btn = document.createElement("button");
        btn.textContent = "Remove";
        btn.onclick = () => removeShoutoutUser(user);
        li.appendChild(btn);

        soList.appendChild(li);
    });

    const soForm = document.createElement("form");
    soForm.onsubmit = async (ev) => {
        ev.preventDefault();
        const input = soForm.querySelector("input[name='user']");
        const user = input.value.trim();
        if (!user) return;
        await addShoutoutUser(user);
        input.value = "";
    };
    soForm.innerHTML = `
        <input type="text" name="user" placeholder="twitch_username" required>
        <button type="submit">Add Shoutout User</button>
    `;
    soSection.appendChild(soForm);
}

// For now, these can be placeholders until you wire up API data
function renderTimers(root, data) {
    const div = document.createElement("div");
    div.style.color = "white";
    div.textContent = "Timers UI not implemented yet, but this is where it will go.";
    root.appendChild(div);
}

function renderQuotes(root, data) {
    const div = document.createElement("div");
    div.style.color = "white";
    div.textContent = "Quotes UI not implemented yet, but this is where it will go.";
    root.appendChild(div);
}

function makeTimedMessageRow(name, tm) {
    const wrapper = document.createElement("div");
    wrapper.style.marginBottom = "1rem";

// --- Header row (Enabled switch + name) ---
    const headerWrap = document.createElement("div");
    headerWrap.style.display = "flex";
    headerWrap.style.alignItems = "center";
    headerWrap.style.justifyContent = "center";
    headerWrap.style.gap = "0.5rem";

// Enabled switch
    const enabledSwitch = createSwitch(!!tm.enabled);
    headerWrap.appendChild(enabledSwitch.label);

// Name
    const nameLabel = document.createElement("strong");
    nameLabel.textContent = name + ":";
    headerWrap.appendChild(nameLabel);

    wrapper.appendChild(headerWrap);

// --- Message input on its own line ---
    const msgInput = document.createElement("input");
    msgInput.type = "text";
    msgInput.value = tm.message || "";
    msgInput.size = 40;
    msgInput.style.display = "block";
    msgInput.style.margin = "0.4rem auto 0 auto";
    wrapper.appendChild(msgInput);


// --- Online Interval ---
    const onlineIntervalInput = document.createElement("input");
    onlineIntervalInput.type = "number";
    onlineIntervalInput.min = "5";
    onlineIntervalInput.value = (typeof tm.online_interval === "number") ? Math.floor(tm.online_interval / 1000) : (tm.interval ? Math.floor(tm.interval / 1000) : 60);
    onlineIntervalInput.style.marginLeft = "0.5rem";
    onlineIntervalInput.style.width = "7rem";

    const offlineIntervalInput = document.createElement("input");
    offlineIntervalInput.type = "number";
    offlineIntervalInput.min = "5";
    offlineIntervalInput.value = (typeof tm.offline_interval === "number") ? Math.floor(tm.offline_interval / 1000) : (tm.interval ? Math.floor(tm.interval / 1000) : 60);
    offlineIntervalInput.style.marginLeft = "0.5rem";
    offlineIntervalInput.style.width = "7rem";

    const onlineWrap = document.createElement("div");
    onlineWrap.style.display = "flex";
    onlineWrap.style.justifyContent = "center";
    onlineWrap.style.alignItems = "center";
    onlineWrap.style.marginTop = "0.5rem";

    const onlineSwitch = createSwitch(tm.online_interval_toggle !== false);
    onlineSwitch.label.style.marginRight = "0.5rem";
    onlineWrap.appendChild(onlineSwitch.label);

    onlineWrap.appendChild(document.createTextNode("Online interval: "));
    onlineWrap.appendChild(onlineIntervalInput);

// --- Offline Interval ---
    const offlineWrap = document.createElement("div");
    offlineWrap.style.display = "flex";
    offlineWrap.style.justifyContent = "center";
    offlineWrap.style.alignItems = "center";
    offlineWrap.style.marginTop = "0.25rem";

    const offlineToggleVal = (tm.offline_interval_toggle !== undefined)
        ? tm.offline_interval_toggle
        : tm.offline_inerval_toggle; // support old typo key
    const offlineSwitch = createSwitch(offlineToggleVal !== false);
    offlineSwitch.label.style.marginRight = "0.5rem";
    offlineWrap.appendChild(offlineSwitch.label);

    offlineWrap.appendChild(document.createTextNode("Offline interval: "));
    offlineWrap.appendChild(offlineIntervalInput);

// --- adding the intervals in ---
    wrapper.appendChild(onlineWrap);
    wrapper.appendChild(offlineWrap);

// --- Minimum chats ---
    const minChatsInput = document.createElement("input");
    minChatsInput.type = "number";
    minChatsInput.min = "0";
    minChatsInput.value = (typeof tm.minimum_chats === "number") ? tm.minimum_chats : 0;
    minChatsInput.style.marginLeft = "0.5rem";
    minChatsInput.style.width = "7rem";

    const minChatsWrap = document.createElement("div");
    minChatsWrap.style.display = "flex";
    minChatsWrap.style.justifyContent = "center";
    minChatsWrap.style.alignItems = "center";
    minChatsWrap.style.marginTop = "0.35rem";

    const minChatsSwitch = createSwitch(tm.minimum_chats_toggle === true);
    minChatsSwitch.label.style.marginRight = "0.5rem";

    minChatsWrap.appendChild(minChatsSwitch.label);
    minChatsWrap.appendChild(document.createTextNode("Minimum chats: "));
    minChatsWrap.appendChild(minChatsInput);

    wrapper.appendChild(minChatsWrap);

// --- save button ---
    const saveBtn = document.createElement("button");
    saveBtn.textContent = "Save";
    saveBtn.style.marginLeft = "0.5rem";
    saveBtn.onclick = async () => {
        await saveTimedMessage(name, {
            message: msgInput.value,
            online_interval_seconds: parseInt(onlineIntervalInput.value, 10) || 60,
            online_interval_toggle: onlineSwitch.input.checked,
            offline_interval_seconds: parseInt(offlineIntervalInput.value, 10) || 60,
            offline_interval_toggle: offlineSwitch.input.checked,
            minimum_chats: parseInt(minChatsInput.value, 10) || 0,
            minimum_chats_toggle: minChatsSwitch.input.checked,
            enabled: enabledSwitch.input.checked,
        });
    };
    wrapper.appendChild(saveBtn);

// --- delete button ---
    const delBtn = document.createElement("button");
    delBtn.textContent = "Delete";
    delBtn.style.marginLeft = "0.5rem";
    delBtn.onclick = async () => {
        if (!confirm("Delete timed message " + name + "?")) return;
        await deleteTimedMessage(name);
    };
    wrapper.appendChild(delBtn);

    // --- enabled / disabled visual + input state ---
    const updateDisabledState = () => {
        const isEnabled = enabledSwitch.input.checked;

        wrapper.style.opacity = isEnabled ? "1" : "0.5";

        msgInput.disabled = !isEnabled;
        onlineIntervalInput.disabled = !isEnabled;
        offlineIntervalInput.disabled = !isEnabled;
        minChatsInput.disabled = !isEnabled;

        onlineSwitch.input.disabled = !isEnabled;
        offlineSwitch.input.disabled = !isEnabled;
        minChatsSwitch.input.disabled = !isEnabled;
    };

// initial state
    updateDisabledState();

// react to toggle
    enabledSwitch.input.onchange = updateDisabledState;

    return wrapper;
}




function makeTimedMessageAddForm() {
    const form = document.createElement("form");
    form.style.marginTop = "1rem";

    form.innerHTML = `
                        <h4>Add Timed Message</h4>
                        <label>Name: <input type="text" name="name" required></label><br>
                        <label>Message: <input type="text" name="message" required size="40"></label><br>
                        <label>Interval (seconds): <input type="number" name="interval_seconds" value="600" min="5"></label><br>
                        <label>Online interval (seconds): <input type="number" name="online_interval_seconds" value="600" min="5"></label><br>
                        <label>Online interval enabled: <input type="checkbox" name="online_interval_toggle" checked></label><br>
                        <label>Offline interval (seconds): <input type="number" name="offline_interval_seconds" value="600" min="5"></label><br>
                        <label>Offline interval enabled: <input type="checkbox" name="offline_interval_toggle" checked></label><br>
                        <label>Minimum chats: <input type="number" name="minimum_chats" value="0" min="0"></label><br>
                        <label>Minimum chats enabled: <input type="checkbox" name="minimum_chats_toggle"></label><br>
                        <label>Enabled: <input type="checkbox" name="enabled" checked></label><br>
                        <button type="submit">Add</button>
                    `;

    form.onsubmit = async (ev) => {
        ev.preventDefault();
        const fd = new FormData(form);
        const payload = {
            name: fd.get("name"),
            message: fd.get("message"),
            online_interval_seconds: parseInt(fd.get("online_interval_seconds"), 10) || 600,
            online_interval_toggle: fd.get("online_interval_toggle") === "on",
            offline_interval_seconds: parseInt(fd.get("offline_interval_seconds"), 10) || 600,
            offline_interval_toggle: fd.get("offline_interval_toggle") === "on",
            minimum_chats: parseInt(fd.get("minimum_chats"), 10) || 0,
            minimum_chats_toggle: fd.get("minimum_chats_toggle") === "on",
            enabled: fd.get("enabled") === "on",
            action: "add"
        };
        await postJSON("/api/niobot/timed-messages", payload);
        await loadNiobotConfig();
    };

    return form;
}

// --------- API helpers from JS ---------

async function postJSON(url, body) {
    const resp = await fetch(url, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(body)
    });
    return resp.json();
}

async function saveTimedMessage(name, data) {
    await postJSON("/api/niobot/timed-messages", {
        action: "update",
        name,
        message: data.message,
        online_interval_seconds: data.online_interval_seconds,
        offline_interval_seconds: data.offline_interval_seconds,
        online_interval_toggle: data.online_interval_toggle,
        offline_interval_toggle: data.offline_interval_toggle,
        enabled: data.enabled
    });
    await loadNiobotConfig();
}

async function deleteTimedMessage(name) {
    await postJSON("/api/niobot/timed-messages", {
        action: "delete",
        name
    });
    await loadNiobotConfig();
}

async function addShoutoutUser(user) {
    await postJSON("/api/niobot/shoutouts", {
        action: "add",
        user
    });
    await loadNiobotConfig();
}

async function removeShoutoutUser(user) {
    await postJSON("/api/niobot/shoutouts", {
        action: "remove",
        user
    });
    await loadNiobotConfig();
}

document.addEventListener("DOMContentLoaded", () => {
    const overlay  = document.getElementById("config-overlay");   // NEW
    const closeBtn = document.getElementById("close-config-window");

    document.querySelectorAll(".showing-new-window-button").forEach(btn => {
        const view = btn.dataset.view;  // "timed", "timers", "quotes", "shoutouts"
        btn.addEventListener("click", async () => {
            if (!overlay) return;
            overlay.style.display = "block";
            await loadNiobotConfig(view); // tell it which view to render
        });
    });

    if (closeBtn && overlay) {
        closeBtn.addEventListener("click", () => {
            overlay.style.display = "none";
        });
    }
});