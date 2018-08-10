//Price compare
app = {
    metaData  : {
        unitNames         : {
            grams      : 'grams',
            ounces     : 'ounces',
            pounds     : 'pounds',
            milligrams : 'milligrams',
            kilograms  : 'kilograms'
        },
        conversionFactors : {
            grams  : {
                ounces     : 0.035274,
                pounds     : 0.00220462,
                kilograms  : 0.001,
                milligrams : 1000
            },
            ounces : {
                grams      : 28.3495,
                pounds     : 0.0625,
                kilograms  : 0.0283495,
                milligrams : 28349.5
            }
        }
    },
    Utilities : {
        getFoodItems        : function () {},
        compareItemCosts    : function (item1, item2) {
            let item1Price    = item1.info.price,
                item2Price    = item2.info.price,
                item1Units    = item1.info.units,
                item2Units    = item2.info.units,
                item1UnitName = item1.info.unitName,
                item2UnitName = item2.info.unitName,
                pricePerUnit1 = item1Price / item1Units,
                pricePerUnit2;

            if (item1UnitName !== item2UnitName) {
                item2Units = app.Utilities.convertUnits(item2, item1UnitName);
            }
            if (!item1Units) {
                return null;
            }
            pricePerUnit2 = item2Price / item2Units;

            if (pricePerUnit1 === pricePerUnit2) {
                return null;
            }

            //Return True if Item one is a better buy
            //Return False if Item two is a better buy
            return pricePerUnit1 < pricePerUnit2;

        },
        convertUnits        : function (item, newUnitName) {
            let conversionFactor = app.Utilities.getConversionFactor(item.info.unitName, newUnitName);

            if (!conversionFactor) {
                return null;
            }

            return item.info.units * conversionFactor;
        },
        getConversionFactor : function (unit1, unit2) {
            return app.metaData.conversionFactors[unit1][unit2];
        },
        addNewItem          : function (params) {
            app.Items.push({
                               name  : params.name,
                               id    : new Date().getTime(),
                               brand : params.brand,
                               info  : {
                                   price    : params.price,
                                   units    : params.units,
                                   unitName : params.unitName
                               }
                           });
        },
        editFood            : function () {}
    },
    Items     : [
        /*Template for item
            {
            name : 'Item',
            id   : 1234567890852,
            brand : 'Brand'
            info : {
                //copy finished Nutrition info
            }
        }*/
    ]
};
$(document).ready(function () {
    setTimeout(function () {
        app.Utilities.addNewItem({
                                     name     : 'Bread',
                                     price    : 3.00,
                                     units    : 200,
                                     unitName : 'grams'
                                 });
    }, 500);

    setTimeout(function () {
        app.Utilities.addNewItem({
                                     name     : 'Bread',
                                     price    : 3.69,
                                     units    : 16,
                                     unitName : 'ounces'
                                 });
    }, 500);

    setTimeout(function () {
        let item1 = app.Items[0], item2 = app.Items[1];
        alert('Is Item One Cheaper?' + app.Utilities.compareItemCosts(item1, item2));
    }, 500);
});