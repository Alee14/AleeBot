import { version as discordVersion } from 'discord.js';
import { readFileSync } from 'node:fs';
const { version: abVersion } = JSON.parse(readFileSync('./package.json', 'utf-8'));

export const activities = [
    { name: `AleeBot ${abVersion}`, type: 4 },
    { name: `Now running on Discord.JS ${discordVersion}!`, type: 4 },
    { name: 'Coding bytes', type: 4 },
    { name: 'Drawing shapes', type: 4 },
    { name: 'Fighting Quad', type: 4 },
    { name: 'Installing Windows 11', type: 4 },
    { name: 'Breaking Windows 10', type: 4 },
    { name: 'Beating up big tech', type: 4 },
    { name: 'Deleting Google', type: 4 },
    { name: 'Deleting Apple', type: 4 },
    { name: 'Deleting System32', type: 4 },
    { name: 'Deleting /usr/bin/', type: 4 },
    { name: 'Watering down the Apple walled garden', type: 4 },
    { name: 'Reticulating splines', type: 4 },
    { name: 'Generating world', type: 4 },
    { name: 'Never punch a tree...', type: 4 },
    { name: 'Collecting data', type: 4 },
    { name: 'Dag dag!', type: 4 },
    { name: 'Developed by Andrew Lee', type: 4 },
    { name: 'When will 2.13 release?', type: 4 },
    { name: 'Alert Irruption !!!', type: 4},
    { name: 'when', type: 4 },
    { name: 'Frying Shrimpbot', type: 4 },
    { name: 'RADIATION BABY', type: 4 },
    { name: 'Frivolously Spending', type: 4 },
    { name: 'Thanks! @Victor', type: 4 },
    { name: 'MCA DiscoVision', type: 2 },
    { name: 'Werq', type: 2 },
    { name: 'Pombo', type: 4 },
    { name: 'Ian Clary\'s First Day At FrivoloCo!', type: 0 },
    { name: 'Squid Airlines', type: 0 },
    { name: 'AirCS Race', type: 1 },
    { name: 'FrivoloCo', type: 2 },
    { name: 'I WANT 2 ORDER', type: 4 },
    { name: 'I REALLY WANT 2 ORDER', type: 4 },
    { name: 'Monica Is Going To Cosume You', type: 4 },
    { name: 'BLÅHAJ', type: 4 },
    { name: 'ShiftOS', type: 0 },
    { name: 'Histacom', type: 0 },
    { name: 'Wall Street', type: 4 },
    { name: 'Mac OS X Jaguar', type: 0 },
    { name: 'Abunchoo 12.10', type: 0 },
    { name: 'MikeOS', type: 0 },
    { name: 'theBeat', type: 0 },
    { name: 'FRESHMusicPlayer', type: 0 },
    { name: 'theShell', type: 0 },
    { name: 'theBeat', type: 0 },
    { name: 'theSlate', type: 0 },
    { name: 'theDesk', type: 0 },
    { name: 'Ultra Jump Mania!', type: 0 },
    { name: 'Battle Blaze', type: 0 },
    { name: 'Tempest', type: 0 },
    { name: 'Turbo Crash 9', type: 0 },
    { name: 'Pocket Gakusei', type: 0 },
    { name: 'Hidden Heroes', type: 0 },
    { name: 'Skybreakers', type: 0 },
    { name: 'Always Running', type: 2 },
    { name: 'Only Up', type: 2 },
    { name: 'Trade', type: 2 },
    { name: 'Breeze', type: 2 },
    { name: 'Steady', type: 2 },
    { name: 'Bluejay', type: 2 },
    { name: 'Exposing TAS-Corp', type: 4 },
    { name: 'Fighting Evelyn Claythorne', type: 4 },
    { name: 'Frying Dr. Sheridan', type: 4 },
    { name: 'Hacking SherCorp', type: 4 },
    { name: 'Games with Tari', type: 0 },
    { name: 'Decommissioning Meta Runners', type: 4 },
    { name: 'Installing Meta Runners', type: 4 },
    { name: '90% bug free!', type: 4 },
    { name: 'Google Wallet', type: 0 },
    { name: 'Apple Pay', type: 0 },
    { name: 'Splatoon 3', type: 0 },
    { name: 'Super Mario 64', type: 0 },
    { name: 'Minceraft', type: 0 },
    { name: 'Minecraft', type: 0 },
    { name: 'Mario Kart 8', type: 0 },
    { name: 'bnbmc', type: 0 },
    { name: 'Evaluating JavaScript code', type: 4 },
    { name: 'Evaluating C# code', type: 4 },
    { name: 'Evaluating Rust code', type: 4 },
    { name: 'Forkbombing FMP', type: 4 },
    { name: 'Merging with DLAP', type: 4 },
    { name: 'Now asbestos-free!', type: 4 },
    { name: 'May contain nuts!', type: 4 },
    { name: 'MythOS', type: 0 },
    { name: 'Also try Scratch!', type: 4 },
    { name: 'Funky!', type: 4 },
    { name: 'Apple Vision Pro', type: 0 },
    { name: 'What is Web3?', type: 4 },
    { name: 'GNU\'s NOT UNIX!', type: 4 },
    { name: 'Linux, but actually GNU/Linux', type: 0 },
    { name: 'Debloating my ThinkPad', type: 4 },
    { name: 'Turbotastic!', type: 4 },
    { name: 'Leap of Faith', type: 0 },
    { name: 'Lexi Dimante', type: 2 },
    { name: 'Artemis', type: 0 },
    { name: 'Helping Kapuletti Industries', type: 4 },
    { name: 'Frank (The Game)', type: 0 },
    { name: 'Blasting earbuds with the Maraca Cracker 9000', type: 4 },
    { name: 'Scarlet Fire', type: 2 },
    { name: 'The Beat 92.5 - MTL\'s Perfect Mix', type: 2 },
    { name: 'Removing unsafe code', type: 4 },
    { name: 'Google Pixel 7', type: 0 },
    { name: 'FreeSO', type: 0 },
    { name: 'The Sims 1', type: 0 },
    { name: 'The Sims 2', type: 0 },
    { name: 'The Sims 3', type: 0 },
    { name: 'The Sims 4', type: 0 },
    { name: 'inZOI', type: 0 },
    { name: 'Paralives', type: 0 },
    { name: 'CollabVM', type: 0 },
    { name: '86Box', type: 0 },
    { name: 'AIM', type: 0 },
    { name: 'Software Inc.', type: 0 },
    { name: 'Nintendo Game Boy', type: 0 },
    { name: 'Nintendo Game Boy Advance', type: 0 },
    { name: 'Nintendo DS', type: 0 },
    { name: 'Nintendo DSi', type: 0 },
    { name: 'Nintendo 3DS', type: 0 },
    { name: 'Nintendo Entertainment System', type: 0 },
    { name: 'Super Nintendo Entertainment System', type: 0 },
    { name: 'Nintendo 64', type: 0 },
    { name: 'Nintendo Gamecube', type: 0 },
    { name: 'Nintendo Wii', type: 0 },
    { name: 'Nintendo Wii U', type: 0 },
    { name: 'Nintendo Switch', type: 0 },
    { name: 'Nintendo Switch 2', type: 0 },
    { name: 'Sony Playstation', type: 0 },
    { name: 'Sony Playstation 2', type: 0 },
    { name: 'Sony Playstation 3', type: 0 },
    { name: 'Sony Playstation 4', type: 0 },
    { name: 'Sony Playstation 5', type: 0 },
    { name: 'Microsoft Xbox', type: 0 },
    { name: 'Microsoft Xbox 360', type: 0 },
    { name: 'Microsoft Xbox One', type: 0 },
    { name: 'Microsoft Xbox Series X', type: 0 },
    { name: 'Microsoft Xbox Series S', type: 0 },
    { name: 'Dance Dance Revolution', type: 0 },
    { name: 'Dance Dance Revolution SuperNOVA', type: 0 },
    { name: 'Pump It Up', type: 0 }
];
