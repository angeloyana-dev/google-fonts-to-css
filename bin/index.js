#!/usr/bin/env node
import chalk from "chalk"
import { exec, cd } from "../modules/shell-exec.js"

// Gets the main directory of the fonts folder
let mainDir = await exec("pwd").then(status => status.stdout.slice(0, status.stdout.length - 1))
const { stdout: folders } = await exec("ls")
const folderArray = folders.split("\n").filter((folder) => folder !== "fonts.css") // Filter fonts.css if already made
folderArray.pop()

// Tracks folder while looping through folders
let index = 0

openFolder()
// Function to loop through each fonts folder
async function openFolder(){
	const destination = folderArray[index]
	await cd(destination)
	const { stdout: content } = await exec("ls")
	// Checks if theres a static folder inside font folder
	if(!content.includes("static")){
		const fontFiles = content.split("\n")
		fontFiles.pop()
		
		await applyFontToCss(fontFiles, false, destination.split("_"))
		index++
		
		// Checks if theres still a folder to open
		if(folderArray.length !== index){
			await cd(mainDir)
			
			// Call this function again for the next folder
			openFolder()
		}
	} else {
		await cd("static")
		const { stdout: staticContents } = await exec("ls", false)
		let fontFiles = staticContents.split("\n")
		fontFiles.pop()
		
		await applyFontToCss(fontFiles, true, destination.split("_"))
		index++
		
		// Checks if theres still a folder to open
		if(folderArray.length !== index){
			await cd(mainDir)
			
			// Call this function again for the next folder
			openFolder()
		}
	}
}

// Goes back to the main directory to create fonts.css later
async function applyFontToCss(fontFiles, isStatic, fontName){
	// Temporary
	console.log({ fontFiles, isStatic, fontName})
}