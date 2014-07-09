/*
 * assets.js
 */
module.exports = function (assets) {
    
    assets.root = __dirname;
    // .addJs(filename [, namespace])
    
    //bundle to load first / before angular app implementation    
    assets.addJs('/public/js/jquery-2.0.3.min.js', 'first');
    assets.addJs('/public/js/angular.min.js', 'first');
    assets.addJs('/public/js/angular-resource.min.js', 'first');
    assets.addJs('/public/js/angular-animate.min.js', 'first');
    assets.addJs('/public/js/angular-route.min.js', 'first');
    assets.addJs('/public/js/angular-sanitize.min.js', 'first');
    assets.addJs('/public/js/bootstrap.min.js', 'first');
    assets.addJs('/public/js/toastr.min.js', 'first');
    assets.addJs('/public/js/moment.min.js', 'first');
    assets.addJs('/public/js/ui-bootstrap-0.6.0.min.js', 'first');
    assets.addJs('/public/js/ui-bootstrap-tpls-0.6.0.min.js', 'first');
    assets.addJs('/public/js/spin.min.js', 'first');
    
    //assets.addJs(__dirname + '/public/js/**'); //adds all files in /public/js (subdirectories included)
    //assets.addJs(__dirname + '/public/*.js'); //adds all js files in /public
    //assets.addJs(__dirname + '/cs/**.coffee'); //adds all coffee files in /cs (subdirectories included)
    
    //load the angular app implementation into a bundle
    assets.addJs(__dirname + '/public/angular/**');

    // New .addJsUrl(object [, namespace])
    //assets.addJsUrl('/socket.io.js');
    
    // addCss(filename [, namespace])
    assets.addCss('/public/styles/ie10mobile.css');
    assets.addCss('/public/styles/bootstrap.min.css');
    assets.addCss('/public/styles/font-awesome.min.css');
    assets.addCss('/public/styles/toastr.min.css');
    assets.addCss('/public/styles/customtheme.min.css');
    assets.addCss('/public/styles/styles.min.css');
    
    // New .addCssUrl(object [, namespace])
    //assets.addCssUrl('http://twitter.github.com/bootstrap/assets/css/bootstrap.css');
    
    // New .addJsObject(object [, namespace])
    //assets.addJsObject({ "Redsmin.app": {} });// Will create Redsmin.app = {};
}