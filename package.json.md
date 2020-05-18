
# Version Numbers:

    5 . 19  . 2
    ^----^----^
major  minor  patch
ver.   ver.   ver.


## In package.json:

We don't include 'node_modules' folder in our final package that we publish on GitHub. So when we get a repository from GitHub we usually first have to run 'npm install' in order to download 'node_modules' necessary for that file, which are specified in 'dependencies' object inside 'package.json' file. So we can specify what behavior should 'npm' have when retrieving this dependencies on another machine.

### package.json
...
"dependencies" : {
  "module" : "*"        =>  update major, minor, and patch versions
  "module" : "^x.xx.x"  =>  keep major, but update minor and patch versions
  "module" : "~x.xx.x"  =>  keep major and minor, but update patch version
  "module" : "x.xx.x"   =>  keep major, minor, and patch versions
}

( ^ is carrot symbol and ~ is tilde symbol)

### package-lock.json
This file is for managing the dependencies of your dependencies specified in package.json.