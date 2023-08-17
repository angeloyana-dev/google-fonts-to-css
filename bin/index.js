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

// Temporary
console.log(mainDir, folderArray)