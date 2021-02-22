# BootHTML
CLI for initializing a web project quickly. This project was made for fun & personal use, but feel free to try it out! Made using NodeJS. 

## How to install
To install this CLI:

 - Clone this repo
 - Run `npm install` to install the project dependencies (there's only one!)
 - Run `npm install . -g` to install the CLI

Done! You should be able to run `boothtml`.

## Manual
`boothtml <project name> [options]`
 
Inits a new web application. Creates a folder with the project name and the following structure:
- `index.html`
- `index.css`
- `src/`
	 - `index.js`
- `.gitignore`
- `package.json`

### Options

 - `-p` or `--plain` : does not create a `package.json` nor executes any package manager.
 - `-g` or `--no-git` : does not initialize a git repository.
