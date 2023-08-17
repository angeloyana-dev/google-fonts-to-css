# Google fonts to css

Google fonts to css is a _cli_ that extracts google fonts and reference it to a css files to be able to **use locally**.

## Installation

Run

```sh
npm install -g google-fonts-to-css
```

## Usage

#### Here are the steps to use this cli:

1. Go to [Google Fonts](https://fonts.google.com/) and choose the fonts you want to use.

2. Click the button at the **top right corner** then click Download all.

3. Next, at your project directory, create a new directory called fonts or whatever you want to call it, then extract the `zip file` of the fonts you just downloaded inside that directory.

The directories structure should look like this:
```
Project/root directory
  └─ fonts
       └─ Open_Sans
       └─ Poppins
       └─ etc.
```

4. Finally, on your terminal, go to fonts directory then run:
```sh
extract-fonts
```

That all! this should work if you follow the instructions carefully. If you run `ls`, you should see the file called `fonts.css` then you can link it to your html.

## Notes
This are the currently supported font type:

- Thin
- Extra light
- Light
- Regular
- Medium
- Semi bold
- Bold
- Extra bold
- Black
- Thin italic
- Extra light italic
- Light italic
- Regular italic
- Medium italic
- Semi bold italic
- Bold italic
- Extra bold italic
- Black italic

## Packages used

[shelljs](https://github.com/shelljs/shelljs) |
[chalk](https://github.com/chalk/chalk)