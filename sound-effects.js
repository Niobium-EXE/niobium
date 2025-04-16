const sound_effects = {
    "fart1": "dry-fart.mp3",
    "fart2": "wet-fart.mp3",
    "fart3": "perfect-fart.mp3",
    "fart4": "nuclear-fart.mp3",
    "fart5": "progressively louder fart meme.mp3",
    "fart6": "mario fart.mp3",
    "wow": "anime-wow-sound-effect.mp3",
    "bruh": "bruh.mp3",
    "oh-no": "oh-no_7.mp3",
    "ok": "ok.mp3",
    "oof": "oof.mp3",
    "oof2": "classic minecraft hurt.mp3",
    "order66": "order66.mp3",
    "pew": "pew.mp3",
    "buzzer": "portal 2 buzzer.mp3",
    "goal": "rocket-league-goal-sound.mp3",
    "point": "sfx_point.mp3",
    "snore": "snore-mimimimimimi.mp3",
    "congratulations": "trump congradulations.mp3",
    "stop it": "trump stop it.mp3",
    "stop it get some help": "stop it get some help.mp3",
    "thankyou1": "turret-thankyou.mp3",
    "thankyou2": "trump thank you very much.mp3",
    "quiet1": "trump-quiet-quiet.mp3",
    "limit on talking": "limit-on-talking.mp3",
    "are you still there": "turret are you still there.mp3",
    "goodbye": "turret goodbye.mp3",
    "bye": "discord-leave-noise.mp3",
    "bye2": "roblox-bye.mp3",
    "hello": "turret hello.mp3",
    "hooray": "turret hooray.mp3",
    "children yay": "children-yay.mp3",
    "im different": "turret im different.mp3",
    "no": "turret nooooo.mp3",
    "goodnight": "turret-goodnight.mp3",
    "sleep": "turret-sleep.mp3",
    "stinky": "uh oh stinky.mp3",
    "boom": "vine-boom-sound-effect.mp3",
    "we do not care": "we-do-not-care.mp3",
    "dog": "what da dog doin.mp3",
    "what1": "what did he sayyy.mp3",
    "what2": "what-bottom-text-meme.mp3",
    "error": "win xp error.mp3",
    "shutdown": "win xp shutdown.mp3",
    "startup1": "windows-xp-startup.mp3",
    "startup2": "win3 1 startup tada.mp3",
    "connect": "win 10 connect.mp3",
    "disconnect": "win 10 disconnect.mp3",
    "notif": "windows10_sound.mp3",
    "yeet": "yeet.mp3",
    "banned1": "you shall not pass.mp3",
    "banned2": "you were banned from the server.mp3",
    "not that guy": "youre-not-that-guy-pall.mp3",
    "poggies1": "poggies-1-elevenlabs.mp3",
    "poggies2": "poggies-2-elevenlabs.mp3",
    "poggies3": "poggies-3-elevenlabs.mp3",
    "poggies4": "poggies-4-elevenlabs.mp3",
    "mission failed": "mission failed.mp3",
    "gasp": "gasp_SJHmiqB.mp3",
    "Wii Aww": "Wii CrowdAw.wav",
    "Wii Cheer": "Wii CrowdCheer.wav",
    "Wii Oh": "Wii CrowdOh.wav",
    "Wii SlowClap": "Wii CrowdSlowClap.wav",
    "Wii Woah": "Wii CrowdWoah.wav",
    "Wii Wyay": "Wii CrowdWyay.wav",
    "Wii Yay": "Wii CrowdYay.wav",
    "siren": "999-social-credit-siren.mp3",
    "pipe-low": "metal-pipe-clang e not as loud.mp3",
    "pipe":"metal-pipe-clang.mp3",
    "pipe-loud": "metal-pipe-clang e loud.mp3",
    "crack": "bone-crack.mp3",
    "smoke detector": "smoke-detector-beep.mp3",
    "potion": "minecraft-potion-drinking-sound-effect-1.mp3",
    "shield": "fn shield.mp3",
    "xp": "minecraft xp.mp3",
    "level up": "minecraft xp level up.mp3",
    "get out": "tuco-get-out.mp3",
    "smasnug": "smasnug notification.mp3",
    "run": "run-vine-sound-effect.mp3",
    "rizz": "rizz-sound-effect.mp3",
    "news intro": "News intro.mp3",
    "name is jeff": "my name is jef.mp3",
    "achievement": "minecraft-achievements-sound.mp3",
    "crickets" : "awkward-cricket-sound-effect.mp3",
    "boi": "boi.mp3",
    "villagers": "oh-these-dudes-theyre-the-villagers.mp3",
    "lava chicken": "lava chicken song.mp3",
    "i am steve": "i-am-steve.mp3",
    "flint and steel": "flint-and-steel.mp3",
    "chicken jockey": "chicken-jockey.mp3",
    "water bucket": "water-bucket-release.mp3"
}

const sound_effects_map = {
    "fart": "fart",
    "wow": "wow",
    "bruh": "bruh",
    "oh-no": "oh-no",
    "ok": "ok",
    "oof": "oof",
    "order66": "order66",
    "pew": "pew",
    "buzzer": "buzzer",
    "goal": "goal",
    "point": "point",
    "snore": "snore",
    "congratulations": "congratulations",
    "stop it": "stop it",
    "stop it get some help": "stop it get some help",
    "thankyou": "thankyou",
    "quiet": `quiet${randomNumberPlease(1,2)}`,
    "are you still there": "are you still there",
    "goodbye": "goodbye",
    "hello": "hello",
    "hooray": "hooray",
    "im different": "im different",
    "no": "no",
    "goodnight": "goodnight",
    "sleep": "sleep",
    "stinky": "stinky",
    "boom": "boom",
    "we do not care": "we do not care",
    "dog": "dog",
    "what": "what1",
    "what bottom text": "what2",
    "error": "error",
    "shutdown": "shutdown",
    "startup": `startup${randomNumberPlease(1,2)}`,
    "connect": "connect",
    "disconnect": "disconnect",
    "notif": "notif",
    "yeet": "yeet",
    "banned": `banned${randomNumberPlease(1,2)}`,
    "your not that guy pall": "not that guy",
    "poggies": `poggies${randomNumberPlease(1,4)}`,
    "mission failed": "mission failed",
    "aww": "Wii Aww",
    "cheer": "Wii Cheer",
    "oh": "Wii Oh",
    "clap": "Wii SlowClap",
    "woah": "Wii Woah",
    "wyay": "Wii Wyay",
    "yay": "Wii Yay",
    "d:": "gasp",
    "sabaping": "siren",
    "pipe": "pipe-low",
    "crack": "crack",
    "smoke detector": "smoke detector",
    "potion": "potion",
    "shield": "shield",
    "xp": "xp",
    "level up": "level up",
    "limit on talking": "limit on talking",
    "get out": "get out",
    "smasnug": "smasnug",
    "run": "run",
    "rizz": "rizz",
    "news": "news intro",
    "name is jeff": "name is jeff",
    "achievement": "achievement",
    "crickets": "crickets",
    "water bucket": "water bucket",
    "boi": "boi",
    "villager": "villagers",
    "flint and steel": "flint and steel",
    "chicken jockey": "chicken jockey",
    "lava chicken": "lava chicken",
    "i am steve": "i am steve"
}

const tts_sounds = {
    "tts-Sarah": "sarah.mp3",
    "tts-Anika": "anika.mp3",
    "tts-TikTok Guy": "brian.mp3",
    "tts-Rachel": "rachel.mp3",
    "tts-Jesus Hernandez": "jesus hernandez.mp3",
    "tts-Harrison": "harrison gale.mp3",
    "tts-Santa": "santa claus.mp3",
    "tts-Old Narrator Guy": "father christmas.mp3",
    "tts-Trailer Guy": "oliver haddington.mp3",
    "tts-Adam": "adam.mp3",
    "tts-John Doe": "john doe.mp3",
    "tts-Spanish Guy": "hernán cortés.mp3",
    "tts-Infomercial Guy": "jay johnson.mp3",
    "tts-Cowboy": "vf.mp3",
    "tts-Boston Guy": "boston bob.mp3",
    "tts-Ron": "ron.mp3",
    "tts-Frederick Surrey": "frederick surrey.mp3",
    "tts-British TV": "russell.mp3",
    "tts-Radio Guy": "david castlemore.mp3",
    "tts-Epic Trailer Guy": "david.mp3",
    "tts-Car Salesman": "zach.mp3",
    "tts-Grumpy Guy": "marshal.mp3",
    "tts-Italian Grandpa": "antonio.mp3",
}

function randomNumberPlease(numMin, numMax) {
    return Math.floor(Math.random() * (numMax - numMin + 1)) + numMin;
}

function playSFX(sound) {

    if (sound.startsWith("tts")) {
        const soundSource = `elevenlabs-preview/${tts_sounds[sound]}`
        const soundToPlay = new Audio (soundSource);
        soundToPlay.volume = 1;
        soundToPlay.play().catch(error => {
            console.log("playback of: ", sound, " located at: ", soundSource, " failed: ", error)
        });
    } else if (sound === "fart" || sound === "thankyou" || sound === "potion" || sound === "oof" || sound === "goodbye") {
        if (sound === "fart") {
            let chance = Math.random() * 100;
            if (chance < 1) {
                sound = "fart6";
            } else if (chance < 6) {
                sound = "fart5";
            } else if (chance < 16) {
                sound = "fart4";
            } else if (chance < 41) {
                sound = "fart3";
            } else if (chance < 71) {
                sound = "fart2";
            } else {
                sound = "fart1";
            }
        } else if (sound === "thankyou") {
            if (Math.random() <= 0.75) {
                sound = "thankyou1";
            } else {
                sound  = "thankyou2";
            }
        } else if (sound === "potion") {
            if (Math.random() <= 0.75) {
                sound = "potion";
            } else {
                sound = "shield";
            }
        } else if (sound === "shield") {
            if (Math.random() <= 0.75) {
                sound = "shield";
            } else {
                sound = "potion";
            }
        } else if (sound === "oof") {
            if (Math.random() <= 0.75) {
                sound = "oof";
            } else {
                sound = "oof2";
            }
        } else if (sound === "goodbye") {
            chance = Math.random() * 100;
            if (chance < 33.333333) {
                sound = "goodbye"
            } else if (chance < 66.6666) {
                sound = "bye"
            } else {
                sound = "bye2"
            }
        }
        const soundSource = `SFX/${sound_effects[sound]}`
        const soundToPlay = new Audio (soundSource);
        soundToPlay.volume = 1;
        soundToPlay.play().catch(error => {
            console.log("playback of: ", sound, " located at: ", soundSource, " failed: ", error)
        });
    } else {
        const soundSource = `SFX/${sound_effects[sound_effects_map[sound]]}`
        const soundToPlay = new Audio(soundSource);
        soundToPlay.volume = 1;
        soundToPlay.play().catch(error => {
            console.log("playback of: ", sound, " located at: ", soundSource, " failed: ", error)
        });
    }
}