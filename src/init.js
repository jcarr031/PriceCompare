$(document).ready(function () {
    app.Utilities.loadApplication(function (done) {
        if (done) {
            //Remove SplashScreen after everything loads
            $('#splashscreen').hide();
        }
    });
});