import shell from "shelljs"

// General execution
export async function exec(command, isNotSilent){
	return new Promise(resolve => {
		if(isNotSilent === true){
			shell.exec(command, (code, stdout, stderr) => {
				resolve({ code, stdout, stderr })
			})
		} else {
			shell.exec(command, { silent: true }, (code, stdout, stderr) => {
				resolve({ code, stdout, stderr })
			})
		}
	})
}

// For change directory
export async function cd(destination){
	return await new Promise(resolve => {
		resolve(shell.cd(destination))
	})
}