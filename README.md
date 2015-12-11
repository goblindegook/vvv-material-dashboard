# Material Dashboard for VVV

## What is it?

This is a custom dashboard for [Varying Vagrant Vagrants](https://github.com/Varying-Vagrant-Vagrants/VVV) (VVV) using Material Design and written in React and Redux.

If you're a WordPress developer and don't know about VVV, you're really missing out.

If you don't care about WordPress, though, then I'm afraid you're not going to have much fun here.

## Okay, what does it look like?

![Material VVV Screenshot](assets/screenshot.png)

## But why?

I needed an excuse to experiment with [Redux](https://github.com/rackt/react-redux), [Material UI](https://github.com/callemall/material-ui) and [Webpack](https://webpack.github.io), but didn't feel like writing another to-do or counter application.

## May I have it?

Download the [pre-built project](https://dl.dropboxusercontent.com/u/767182/material-dashboard/latest.zip) and unzip it inside the `<VVV ROOT>/www/dashboard` folder.

You should see a new `material-dashboard` folder.  Now enter it and copy the `dashboard-custom.php` file into the parent folder to activate the dashboard.

## I want to build the dashboard myself

The project requires the [NPM](https://www.npmjs.com) and [Composer](https://getcomposer.org) package management applications, both of which are provided by VVV, so you may not need to install anything else.  If you want to use the host operating system, though, you'll have to install these first.

1. Using the terminal, `cd` into the `<VVV ROOT>/www` directory.
2. Clone the repository into the `material-dashboard` directory by running `git clone https://github.com/goblindegook/vvv-material-dashboard.git material-dashboard`.
3. Enter the `material-dashboard` directory you've just created.
4. Execute `npm install` to install dependencies.
5. Execute `npm run build` to build the project.
6. Execute `npm run activate` to copy the dashboard override to the parent directory.

If you're compiling from within VVV, please note that the `npm run build` command will occasionally fail with a "process out of memory" error. Re-running the command has worked for me.

Your new dashboard interface should now be available at [http://vvv/](http://vvv/). Enjoy!

## Will you continue to develop and support it?

I can neither confirm nor deny the existence of a roadmap.

## Show me something else

Material Dashboard is not the only option out there, go ahead and give these others a try:

* [VVV-Dashboard by @leogopal](https://github.com/leogopal/VVV-Dashboard/)
* [VVV-Dashboard by @topdown](https://github.com/topdown/VVV-Dashboard/)
