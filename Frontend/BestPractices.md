# Best Practices
Do NOT include `node_modules/` in any commit!

It is good practice to only modify `package-lock.json` to adjust the packages list, and it is best practice to modify them through the use of `npm install` or `npm uninstall` and also `.gitignore node_modules/`. Leave the actual file management to NPM, and source files can then be consistent across multiple local repos, assuming NPM does not suddenly bork a rock to their own feet.

Whenever the package list is changed, which may or may not cause build failures, do `npm install`, and NPM will update the local `node_modules/` according to `package-lock.json`, and perform library updates/cleanups.

Reference: https://nodejs.dev/learn/the-package-lock-json-file
