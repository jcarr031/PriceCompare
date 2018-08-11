app.Utilities.loadApplication = function (callback) {
    setTimeout(function () {
        app.Utilities.addNewItem({
            name    : 'Bread',
            price   : 3.00,
            units   : 200,
            unitName: 'grams'
        });
        setTimeout(function () {
            app.Utilities.addNewItem({
                name    : 'Bread',
                price   : 3.69,
                units   : 16,
                unitName: 'ounces'
            });
            callback(true);
        }, 500);
    }, 500);
};