"use strict";
// Class definition

var KTSummernoteDemo = function () {
    // Private functions
    var demos = function () {
        $('.summernote').summernote({
            height: 400,
            tabsize: 2,
            toolbar: [
                ['style', ['style']],
                ['font', ['bold', 'italic', 'subscript', 'superscript', 'clear']],
                ['color', ['color']],
                ['para', ['ol', 'ul', 'paragraph']],
                // ['insert', ['link', 'unlink', 'picture']],
                // ['view', ['fullscreen']]
            ]
        });

        // $('div.note-group-image-url').remove();
    }

    return {
        // public functions
        init: function() {
            demos();
        }
    };
}();

// Initialization
jQuery(document).ready(function() {
    KTSummernoteDemo.init();
});
