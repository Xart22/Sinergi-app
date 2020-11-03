
var options = {
    url: function (phrase) {
        return "http://sinergi-tes.herokuapp.com/kodeska";
    },

    getValue: "kode",
    template: {
        type: "description",
        fields: {
            description: "keterangan"
        }
    },
    list: {
        match: {
            enabled: true
        },
        onSelectItemEvent: function () {
            var value = $("#kode").getSelectedItemData().keterangan;

            $("#data-holder").val(value).trigger("change");
        }
    },
};
$("#kode").easyAutocomplete(options);
