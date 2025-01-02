const PastebinAPI = require('pastebin-js'),
pastebin = new PastebinAPI('EMWTMkQAVfJa9kM-MRUrxd5Oku1U7pgL')
const {makeid} = require('./id');
const QRCode = require('qrcode');
const express = require('express');
const path = require('path');
const fs = require('fs');
let router = express.Router()
const pino = require("pino");
const {
	default: James_Tech,
	useMultiFileAuthState,
	jidNormalizedUser,
	Browsers,
	delay,
	makeInMemoryStore,
} = require("@whiskeysockets/baileys");

function removeFile(FilePath) {
	if (!fs.existsSync(FilePath)) return false;
	fs.rmSync(FilePath, {
		recursive: true,
		force: true
	})
};
const {
	readFile
} = require("node:fs/promises")
router.get('/', async (req, res) => {
	const id = makeid();
	async function JAMES_MD_QR_CODE() {
		const {
			state,
			saveCreds
		} = await useMultiFileAuthState('./temp/' + id)
		try {
			let Qr_Code_By_James_Tech = james_Tech({
				auth: state,
				printQRInTerminal: false,
				logger: pino({
					level: "silent"
				}),
				browser: Browsers.macOS("Desktop"),
			});

			Qr_Code_By_james_Tech.ev.on('creds.update', saveCreds)
			Qr_Code_By_james_Tech.ev.on("connection.update", async (s) => {
				const {
					connection,
					lastDisconnect,
					qr
				} = s;
				if (qr) await res.end(await QRCode.toBuffer(qr));
				if (connection == "open") {
					await delay(5000);
					let data = fs.readFileSync(__dirname + `/temp/${id}/creds.json`);
					await delay(800);
				   let b64data = Buffer.from(data).toString('base64');
				   let session = await Qr_Code_By_james_Tech.sendMessage(Qr_Code_By_james_Tech.user.id, { text: '' + b64data });
	
				   let JAMES_MD_TEXT = `
╔═══════════════════════
║JAMES-MD V1 SESSION IS 
║SUCCESSFULLY
║CONNECTED ⇨⇨⇨
╚═══════════════════════
◥◣◣◥◣◣◥◣◥◣◥◣◥◣◥◣◥◣◥◣◥
❶ || 𝐜𝐫𝐞𝐚𝐭𝐨𝐫 = 𝐉𝐀𝐌𝐄𝐒
◥◣◣◥◣◣◥◣◥◣◥◣◥◣◥◣◥◣◥◣◥
❷ || WhattsApp Channel = https://whatsapp.com/channel/0029Vanxv5pB4hdUQlTg7Q2J
◥◣◣◥◣◣◥◣◥◣◥◣◥◣◥◣◥◣◥◣◥
Please Follow My Support Channel
Wanna talk to me  = https://wa.me/255628470507
◥◣◣◥◣◣◥◣◥◣◥◣◥◣◥◣◥◣◥◣◥
2024-2099 ᴶᴬᴹᴱˢ
_____________________________________
	
_Don't Forget To Give Star To My Repo_`
	 await Qr_Code_By_James_Tech.sendMessage(Qr_Code_By_James_Tech.user.id,{text:James_MD_TEXT},{quoted:session})



					await delay(100);
					await Qr_Code_By_James_Tech.ws.close();
					return await removeFile("temp/" + id);
				} else if (connection === "close" && lastDisconnect && lastDisconnect.error && lastDisconnect.error.output.statusCode != 401) {
					await delay(10000);
					James_MD_QR_CODE();
				}
			});
		} catch (err) {
			if (!res.headersSent) {
				await res.json({
					code: "Service is Currently Unavailable"
				});
			}
			console.log(err);
			await removeFile("temp/" + id);
		}
	}
	return await James_MD_QR_CODE()
});
module.exports = router
