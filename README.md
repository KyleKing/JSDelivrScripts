# JSDelivrScripts

Scripts hosted on JSDelivr for `Custom JavaScript for Websites 2`

Released scripts are available through jsDeliver. To update cache on JSDeliver, must query the latest release version (https://cdn.jsdelivr.net/gh/KyleKing/JSDelivrScripts@0.0.7/cjs-redmine-dist.js), which will update the more generic version references (https://cdn.jsdelivr.net/gh/KyleKing/JSDelivrScripts@latest/cjs-redmine-dist.js).

## Install Instructions

See full Firefox/Chrome instructions in the header comments of `cjs-redmine-dist.js`. Brief summary below:

To for Redmine, navigate to the correct domain and paste code from `cjs-custom.js` into CJS2. Set the External Scripts to the below code. Click `Save`

```
# Uncomment address of script below or type your own (one per line and must end with)
//cdnjs.cloudflare.com/ajax/libs/crel/3.1.0/crel.min.js;
```

Most of the code will be loaded and automatically updated from the `cjs-redmine-dist.js` hosted on jsDeliver, but the `cjs-custom.js` needs to pasted in for CREL to work
