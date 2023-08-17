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
	const { stdout: currentFontDir } = await exec("pwd", false)
	await cd(mainDir)
	await appendFontToCss(currentFontDir, fontFiles, fontName)
	await cd(currentFontDir)
}

// Create fonts.css at main directory of fonts folder, then appends @font-face for each file
async function appendFontToCss(currentFontDir, fontFiles, fontName){
	 let fontSrcFolder
	 const currentFontDirArray = currentFontDir.slice(0, currentFontDir.length - 1).split("/")
	 currentFontDirArray.shift()
	 
	 // Structures the font folder path
	 if(currentFontDirArray[currentFontDirArray.length - 1] === "static"){
		fontSrcFolder = ['.',
		currentFontDirArray[currentFontDirArray.length - 2],
		currentFontDirArray[currentFontDirArray.length - 1]
		].join("/")
	 } else {
	 	fontSrcFolder = ['.',
		currentFontDirArray[currentFontDirArray.length - 1]
		].join("/")
	 }
	
	// Final array of each font-family in formmated css
	let cssFormattedFinal = []
	
	// Loops through font files and create @font-face if file format is a valid font
	fontFiles.forEach((font) => {
		if(font.split(".")[1] === "ttf"){
			const src = `${fontSrcFolder}/${font}`
			
			let cssFormatted
			// For italic
			if(font.includes("ThinItalic") && !font.includes("Condensed")){
				cssFormatted = `@font-face {
	font-family: '${fontName.join(" ")}';
	font-style: italic;
	font-weight: 100;
	src: url('${src}');
}
`
			} else if(font.includes("ExtraLightItalic") && !font.includes("Condensed")){
				cssFormatted = `@font-face {
	font-family: '${fontName.join(" ")}';
	font-style: italic;
	font-weight: 200;
	src: url('${src}');
}
`
			} else if(font.includes("LightItalic") && !font.includes("Condensed")){
				cssFormatted = `@font-face {
	font-family: '${fontName.join(" ")}';
	font-style: italic;
	font-weight: 300;
	src: url('${src}');
}
`
			} else if(font.includes("RegularItalic") && !font.includes("Condensed")){
				cssFormatted = `@font-face {
	font-family: '${fontName.join(" ")}';
	font-style: italic;
	font-weight: 400;
	src: url('${src}');
}
`
			} else if(font.includes("MediumItalic") && !font.includes("Condensed")){
				cssFormatted = `@font-face {
	font-family: '${fontName.join(" ")}';
	font-style: italic;
	font-weight: 500;
	src: url('${src}');
}
`
			} else if(font.includes("SemiBoldItalic") && !font.includes("Condensed")){
				cssFormatted = `@font-face {
	font-family: '${fontName.join(" ")}';
	font-style: italic;
	font-weight: 600;
	src: url('${src}');
}
`
			} else if(font.includes("ExtraBoldItalic") && !font.includes("Condensed")){
				cssFormatted = `@font-face {
	font-family: '${fontName.join(" ")}';
	font-style: italic;
	font-weight: 700;
	src: url('${src}');
}
`
			} else if(font.includes("BoldItalic") && !font.includes("Condensed")){
				cssFormatted = `@font-face {
	font-family: '${fontName.join(" ")}';
	font-style: italic;
	font-weight: 800;
	src: url('${src}');
}
`
			} else if(font.includes("BlackItalic") && !font.includes("Condensed")){
				cssFormatted = `@font-face {
	font-family: '${fontName.join(" ")}';
	font-style: italic;
	font-weight: 900;
	src: url('${src}');
}
`
			}
			
			// For normal version
			else if(font.includes("Thin") && !font.includes("Condensed")){
				cssFormatted = `@font-face {
	font-family: '${fontName.join(" ")}';
	font-weight: 100;
	src: url('${src}');
}
`
			} else if(font.includes("ExtraLight") && !font.includes("Condensed")){
				cssFormatted = `@font-face {
	font-family: '${fontName.join(" ")}';
	font-weight: 200;
	src: url('${src}');
}
`
			} else if(font.includes("Light") && !font.includes("Condensed")){
				cssFormatted = `@font-face {
	font-family: '${fontName.join(" ")}';
	font-weight: 300;
	src: url('${src}');
}
`
			} else if(font.includes("Regular") && !font.includes("Condensed")){
				cssFormatted = `@font-face {
	font-family: '${fontName.join(" ")}';
	font-weight: 400;
	src: url('${src}');
}
`
			} else if(font.includes("Medium") && !font.includes("Condensed")){
				cssFormatted = `@font-face {
	font-family: '${fontName.join(" ")}';
	font-weight: 500;
	src: url('${src}');
}
`
			} else if(font.includes("SemiBold") && !font.includes("Condensed")){
				cssFormatted = `@font-face {
	font-family: '${fontName.join(" ")}';
	font-weight: 600;
	src: url('${src}');
}
`
			} else if(font.includes("ExtraBold") && !font.includes("Condensed")){
				cssFormatted = `@font-face {
	font-family: '${fontName.join(" ")}';
	font-weight: 700;
	src: url('${src}');
}
`
			} else if(font.includes("Bold") && !font.includes("Condensed")){
				cssFormatted = `@font-face {
	font-family: '${fontName.join(" ")}';
	font-weight: 800;
	src: url('${src}');
}
`
			} else if(font.includes("Black") && !font.includes("Condensed")){
				cssFormatted = `@font-face {
	font-family: '${fontName.join(" ")}';
	font-weight: 900;
	src: url('${src}');
}
`
			}
			
			// undefined means its not font file
			if(cssFormatted !== undefined) cssFormattedFinal.push(cssFormatted)
		}
	})
	
	// Append final formatted css fonts to fonts.css
	await exec(`echo "${cssFormattedFinal.join("\n")}" >> fonts.css`)
	console.log(chalk.green.bold(`Added ${fontName.join("_")}`))
}